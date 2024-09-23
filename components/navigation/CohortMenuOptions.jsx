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
import { Ionicons } from "@expo/vector-icons";

const cohortMenuOptions = [
  { option: "cohort-Overview", name: "Overview" },
  { option: "cohort-Disc", name: "DiSC" },
  { option: "cohort-AI2", name: "AI Advice" },
];

const CohortMenuOptions = ({ menu, onChange }) => {
  const [option, setOption] = useState("cohort-Overview");

  const handlePress = (option) => {
    setOption(option);
    onChange(option);
  };

  return (
    <View style={{ backgroundColor: "#F7F7F7" }}>
      <FlatList
        horizontal={true}
        data={cohortMenuOptions}
        keyExtractor={(item) => item.option}
        renderItem={({ item }) => (
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
                  backgroundColor: "#0578F3",
                  borderRadius: 5,
                  marginTop: 5,
                }}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CohortMenuOptions;

const styles = StyleSheet.create({});
