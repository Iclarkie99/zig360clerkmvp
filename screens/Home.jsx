import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  LogBox,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Context as GoalContext } from "../context/GoalContext";
import { useUser } from "../utilities/context/User/UserContext";
import RelTypeChip from "../components/cohort/RelTypeChip";
import LoadingImage from "../components/common/LoadingImage";
//import GettingStartedSlider from "../components/gettingStarted/Slider";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { storage } from "../utilities/storage/mmkv";
import { useAuth } from "@clerk/clerk-expo";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../constants";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import GettingStartedAudioHelp from "../components/gettingStarted/GettingStartedAudioHelp";

const Home = () => {
  const isSubscribed = false;
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, userId } = useAuth();
  const { state, getGoals, editGoal } = useContext(GoalContext);
  const { userData, refreshUserData, updateUserData } = useUser();
  const openGoals = state.filter((open) => open.status !== "closed");
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalHelpAudio, setGoalHelpAudio] = useState(false);
  const [dontShowGettingStarted, setDontShowGettingStarted] = useState(
    storage.getBoolean("dontShowGettingStarted")
  );
  const [gettingStarted, setGettingStarted] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [validSubscription, setValidSubscription] = useState(true); //DEFAULTING TO TRUE UNTIL SUBSCRIPTION IS IMPLEMENTED
  const [contactSelected, setContectSelected] = useState([]);
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const handleSelect = (item) => {
    setContectSelected(item);
    setModalVisible(true);
  };
  let row = [];
  let prevOpenedRow;
  const finalData = searchValue.length ? filteredData : openGoals;

  const init = async () => {
    if (isLoaded && userId) {
      if (!userData) {
        refreshUserData();
      }
      if (userData && userData.subscriptionEndDate) {
        console.log("users", userData);
        const subscriptionEndDate = new Date(userData?.subscriptionEndDate);
        if (subscriptionEndDate > Date.now()) {
          console.log("subscriptionEndDate", subscriptionEndDate);
          setValidSubscription(true);
        }
      } else {
        try {
          await getUser(userId);
          console.log("users", users);
          const subscriptionEndDate = new Date(userData?.subscriptionEndDate);
          if (subscriptionEndDate > Date.now()) {
            console.log("subscriptionEndDate", subscriptionEndDate);
            setValidSubscription(true);
          }
        } catch (error) {
          console.log(error);
        }
      }

      await getGoals(userId);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, [userId]);

  const createGoal = () => {
    if (validSubscription) {
      navigation.navigate("CreateGoal");
    } else {
      return null;
    }
  };
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
          item.status.toLowerCase().startsWith(value.toLowerCase()) ||
          item.priority.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.goalName.toLowerCase().includes(value.toLowerCase()) ||
          item.priority.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase());

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
              {/* <View style={{ alignItems: "center" }}>
                <Text style={{ marginLeft: 7, fontFamily: FONT.InterRegular }}>
                  Priority
                </Text>
                <RelTypeChip textValue={item.priority} />
              </View> */}
              <View style={{ alignItems: "center", flexDirection: "row" }}>
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
            marginTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONT.InterBold,
              paddingHorizontal: 15,
            }}
          >
            Clerk Prod issue Replication
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{
              padding: 4,
              marginBottom: 10,
              marginRight: 15,
              borderRadius: 10,

              shadowColor: COLORS.actionButton,
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.7,
              shadowRadius: 7,
            }}
          >
            <Image
              // source={{
              //   uri: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZEZ5WVpLOHpZQWtOeFZuaDZncUxXbzZaeHkifQ",
              // }}
              //source={{ uri: userData?.avatar }} //
              source={images.Logo2}
              style={{ width: 45, height: 45, borderRadius: 10 }}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => {
                setImageLoading(false);
              }}
            />
            {imageLoading ? <LoadingImage /> : null}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.xLarge,
              fontFamily: FONT.InterBold,
              paddingHorizontal: 15,
            }}
          ></Text>

          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("GettingStarted")}
          >
            <Text>.</Text>
          </TouchableOpacity>
        </View>
        {/*
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            setGettingStarted(true);
          }}
        >
          {dontShowGettingStarted ? (
            <RelTypeChip textValue={"Set true"} />
          ) : (
            <RelTypeChip textValue={"Set false"} />
          )}
        </TouchableOpacity>
        */}

        {finalData.length > 5 ? (
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
        ) : null}
        {isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={COLORS.phantom} />
            </View>
          </>
        ) : (
          <>
            {!isLoading && finalData.length ? (
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
            ) : null}

            {/* If the data is loaded and there are no goals, display get started page. */}
            {!isLoading && state.length === 0 ? (
              <>
                <ScrollView style={{ flex: 0.8, marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: SIZES.xLarge,
                      fontFamily: FONT.InterBold,
                      alignSelf: "center",
                    }}
                  >
                    Home page once signIn is ok
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      marginTop: 10,
                      fontFamily: FONT.InterRegular,
                      alignSelf: "center",
                      marginHorizontal: 20,
                      marginTop: 50,
                      textAlign: "center",
                    }}
                  >
                    Only working for email sign in at present if connecting to
                    PRD.
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      marginTop: 10,
                      fontFamily: FONT.InterRegular,
                      alignSelf: "center",
                      marginHorizontal: 20,
                      marginTop: 50,
                      textAlign: "center",
                    }}
                  >
                    Dev is ok for both email and social.
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      marginTop: 40,
                      fontFamily: FONT.InterRegular,
                      marginHorizontal: 20,
                      textAlign: "center",
                    }}
                  ></Text>
                </ScrollView>
                {/* <View style={{ flex: 0.2 }}>
                  <GettingStartedAudioHelp />
                </View> */}
              </>
            ) : null}
          </>
        )}
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;

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
    marginRight: 10,
  },
  registrationModal: {
    alignItems: "center",
    flex: 1,
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
  bgStyle: { marginTop: 80 },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 1,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 610,
    borderRadius: 20,
    backgroundColor: "#0578F3",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
  },
  image: {
    width: "80%",
    height: "30%",
  },
  helpImage: {
    width: "80%",
    height: "10%",
    alignSelf: "center",
    marginVertical: 20,
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
