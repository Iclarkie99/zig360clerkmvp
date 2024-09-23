import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const goalMenuOptions = [
  { option: "goal-Overview", name: "Overview" },
  { option: "goal-Cohorts", name: "Influencers" },
  // { option: "goal-Status", name: "Status" },
  { option: "goal-Notes", name: "Notes" },
];

const cohortMenuOptions = [
  { option: "cohort-Overview", name: "Overview" },
  { option: "cohort-Disc", name: "DiSC" },
  { option: "cohort-Advice", name: "Advice" },
  { option: "cohort-Notes", name: "Notes" },
];

const MenuOptions = ({ menu, onChange }) => {
  const [option, setOption] = useState("goal-Overview");
  const handlePress = (option) => {
    setOption(option);
    onChange(option);
  };

  return (
    <View style={{ backgroundColor: "#F7F7F7" }}>
      {menu === "Goal" && (
        <FlatList
          horizontal={true}
          data={goalMenuOptions}
          keyExtractor={(menuOptions) => goalMenuOptions.option}
          renderItem={({ item, key }) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress(item.option)}
                key={key}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: SIZES.medium,
                      fontWeight: 500,
                      fontFamily: FONT.InterBold,
                      marginTop: 20,
                    },
                    option === item.option && { color: COLORS.phantom },
                  ]}
                >
                  {item.name}
                </Text>
                {option === item.option && (
                  <View
                    style={{
                      height: 4,
                      width: 70,
                      backgroundColor: "#0578F3",
                      borderRadius: 5,
                      marginTop: 5,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}

      {menu === "Cohort" && (
        <FlatList
          horizontal={true}
          data={cohortMenuOptions}
          keyExtractor={(menuOptions) => cohortMenuOptions.option}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress(item.option)}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: SIZES.medium,
                      fontWeight: 500,
                      fontFamily: FONT.InterBold,
                      marginTop: 20,
                    },
                    option === item.option && { color: COLORS.phantom },
                  ]}
                >
                  {item.name}
                </Text>
                {option === item.option && (
                  <View
                    style={{
                      height: 4,
                      width: 70,
                      backgroundColor: COLORS.phantom,
                      borderRadius: 5,
                      marginTop: 5,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default MenuOptions;

const styles = StyleSheet.create({});
