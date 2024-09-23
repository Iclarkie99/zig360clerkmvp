import {
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import GoalAudioHelp from "../gettingStarted/GoalAudioHelp";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";

const GoalFirstRecord = ({ goal }) => {
  const navigation = useNavigation();
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
              Add Influencer
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONT.InterBold,
            textAlign: "center",
            marginTop: 40,
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
            marginBottom: 50,
          }}
        >
          Think about everyone who can impact your outcome. Add all key players,
          regardless of their role.
        </Text>

        <Image source={images.addInfluencers} style={styles.image} />
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONT.InterBold,
            marginHorizontal: 15,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 200,
          }}
        >
          Let's get started!
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
      {/* <View style={{ flex: 0.2, backgroundColor: "transparent" }}>
        <GoalAudioHelp />
      </View> */}
    </View>
  );
};

export default GoalFirstRecord;

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: "38%",
  },
});
