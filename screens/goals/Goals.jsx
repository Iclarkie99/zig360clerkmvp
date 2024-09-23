import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Context as GoalContext } from "../../context/GoalContext";
import RelTypeChip from "../../components/cohort/RelTypeChip";
import LoadingImage from "../../components/common/LoadingImage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Goals = () => {
  const isSubscribed = false;
  const { isLoaded, userId } = useAuth();
  const { state, getGoals, editGoal } = useContext(GoalContext);
  const openGoals = state.filter((open) => open.status !== "closed");
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactSelected, setContectSelected] = useState([]);
  const handleSelect = (item) => {
    setContectSelected(item);
    setModalVisible(true);
  };
  let row = [];
  let prevOpenedRow;
  const finalData = searchValue.length ? filteredData : openGoals;

  useEffect(() => {
    LogBox.ignoreLogs([
      "Found screens with the same nested inside one another",
    ]);
  }, []);
  const bottomSheetModalRef = useRef(null);
  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }
  const snapPoints = ["90%"];

  const handleFilter = (searchInput) => {
    const value = searchInput;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = openGoals.filter((item) => {
        const startsWith =
          item.goalName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase()); //||
        //item.priority.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.goalName.toLowerCase().includes(value.toLowerCase()) ||
          item.priority.toLowerCase().includes(value.toLowerCase()); //||
        //item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  useEffect(() => {
    getGoals(userId);

    const listener = navigation.addListener("didFocus", () => {
      getGoals(userId);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const renderItem = ({ item, index }, onClick) => {
    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
      return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.9}>
          <View style={styles.deleteBox}>
            <Ionicons name="close" size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: 700,
                fontFamily: FONT.InterBold,
                marginTop: 10,
              }}
            >
              Close
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Goal", { goalId: item.goalId })}
      >
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}
        >
          <View style={[styles.container, styles.shadowProp]}>
            <Text
              style={{
                fontSize: SIZES.large,
                fontFamily: FONT.InterBold,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {item.goalName}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ marginLeft: 7, fontFamily: FONT.InterRegular }}>
                  Priority
                </Text>
                <RelTypeChip textValue={item.priority} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontFamily: FONT.InterRegular }}>Status</Text>
                <RelTypeChip textValue={item.status} />
              </View>
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    const content = {
      status: "closed",
    };
    console.log("Updating goal to close it :", item.goalId, content);
    editGoal(item.goalId, content);
    handleSelect(item);
  };

  return (
    <BottomSheetModalProvider>
      <StatusBar style="dark" />
      <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
        <View
          style={{
            marginTop: 60,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.phantom,
              borderRadius: 20,
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
            }}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 45, height: 45, borderRadius: 10 }}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => {
                setImageLoading(false);
              }}
            />
            <Text>ZZ</Text>
            {imageLoading ? <LoadingImage /> : null}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.xLarge,
              fontFamily: FONT.InterBold,
              paddingHorizontal: 15,
            }}
          >
            Your Strategic Alliance Plans
          </Text>

          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={handlePressModal}
          >
            <RelTypeChip textValue={"?"} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 12,
            marginLeft: 13,
            marginRight: 13,
          }}
        >
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Search"
            value={searchValue}
            onChangeText={(text) => handleFilter(text)}
            style={{ marginLeft: 19, fontFamily: FONT.InterRegular }}
          />
        </View>
        {finalData.length ? (
          <View style={{ marginBottom: 200 }}>
            <FlatList
              data={finalData}
              renderItem={(v) =>
                renderItem(v, () => {
                  deleteItem(v);
                })
              }
              keyExtractor={(goal) => goal.goalId}
            ></FlatList>
            <Text> </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LinkCohorts", { goal })}
              style={{
                padding: 15,
                marginBottom: 10,
                marginRight: 15,
                backgroundColor: COLORS.actionButton,
                borderRadius: 10,
                width: 200,
                shadowColor: COLORS.actionButton,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.7,
                shadowRadius: 7,
              }}
            >
              <MaterialIcons
                style={{ alignSelf: "center" }}
                name="add-link"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: SIZES.xLarge,
                marginTop: 40,
                fontFamily: FONT.InterRegular,
              }}
            >
              Add new Strategic Alliance Plan
            </Text>
          </View>
        )}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: COLORS.phantom,
        }}
      >
        <View style={styles.registrationModal}>
          <Text
            style={{
              fontSize: SIZES.xLarge,
              fontWeight: 600,
              fontFamily: FONT.InterBold,
              color: "white",
              marginVertical: 14,
            }}
          >
            Strategic Alliance Plans
          </Text>
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 10,
              }}
            >
              Create a plan you want to focus on and add the people who you will
              interact with. Create a strategic alliance plan and how these
              people can help you be successful.
            </Text>

            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 30,
              }}
            >
              Define what each of these looks like for you...
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 13,
              }}
            >
              - Who do you need to connect with on a regular basis?
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 13,
              }}
            >
              - Who needs to know how good you are at what you do at work?
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 13,
              }}
            >
              - If you left someone out, what are the ramifications?
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 13,
              }}
            >
              - What’s your action plan to build the relationship?
            </Text>

            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 20,
              }}
            >
              It doesn’t matter how good your idea, plan, program or initiative
              is if you don’t have advocates to drive it forward, talk about it
              or support the outcomes.
            </Text>

            <Text
              style={{
                fontSize: SIZES.medium,
                fontWeight: 400,
                fontFamily: FONT.InterRegular,
                color: "white",
                marginVertical: 30,
              }}
            >
              It doesn’t matter how good your idea, plan, program or initiative
              is if you don’t have advocates to drive it forward, talk about it
              or support the outcomes.
            </Text>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Goals;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterBold,
    marginTop: 60,
    marginBottom: 30,
    marginLeft: 15,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "95%",
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 20,
  },
  registrationModal: {
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.InterBold,
  },
  icon: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterRegular,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    marginTop: 46,
    alignItems: "center",
    marginTop: 13,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 25,
    width: 119,
    height: 110,
    paddingVertical: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 75,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// <View style={styles.centeredView}>
// <Modal
// animationType="fade"
// transparent={true}
// visible={modalVisible}
// onRequestClose={() => {
//   setModalVisible(!modalVisible)
// }}>
// <View style={styles.centeredView}>
//   <View style={styles.modalView}>
//   <Feather name="trash" size={36} color="black" />
//     <Text style={styles.modalText}>Remove your plan {contactSelected.goalName}?</Text>
//     <View style={{flexDirection: "row"}}>
//       <Pressable
//         style={[styles.button, styles.buttonClose]}
//         onPress={() => setModalVisible(!modalVisible)}>
//         <Text style={styles.textStyle}> Yes  </Text>
//       </Pressable>
//       <Pressable
//         style={{fontWeight: 500, padding: 15, alignContent: 'center'}}
//         onPress={() => setModalVisible(!modalVisible)}>
//         <Text>Cancel</Text>
//       </Pressable>
//     </View>

//   </View>
// </View>
// </Modal>
// </View>
