import {
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const CohortFirstRecord = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AddContacts2", { goal })}
          style={{
            paddingVertical: 15,
            width: "90%",
            backgroundColor: COLORS.actionButton,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              style={{ alignSelf: "center", marginRight: 5 }}
              name="adduser"
              size={24}
              color="black"
            />
            <Text
              style={{
                fontSize: SIZES.large,
                fontFamily: FONT.InterRegular,
                textAlign: "center",
              }}
            >
              Run the Questionnaire
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 0.8, backgroundColor: "red" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONT.InterBold,
            textAlign: "center",
          }}
        >
          Every connection counts!
        </Text>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.InterRegular,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Think about everyone who can impact your outcome. Add all key players,
          regardless of their role.
        </Text>

        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.InterRegular,
            marginHorizontal: 15,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 200,
          }}
        ></Text>
      </ScrollView>
      <View style={{ flex: 0.2 }}>
        <View style={{ height: 100, backgroundColor: COLORS.actionButton }}>
          <Text
            style={{
              fontSize: SIZES.large,
              textAlign: "center",
              color: "white",
              paddingVertical: 20,
              fontFamily: FONT.InterRegular,
            }}
          >
            Let's get started
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CohortFirstRecord;

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: "35%",
  },
});
