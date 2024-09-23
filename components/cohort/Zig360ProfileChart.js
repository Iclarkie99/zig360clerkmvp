import { StyleSheet, Text, View } from "react-native";
import React from "react";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

const datax = [{ influence: "60", interaction: "50", advocacy: "90" }];

const Zig360ProfileChart = ({ cohort }) => {
  const interactionGraphLine = Math.round(cohort.interactionScore / 1.3);
  const advocacyGraphLine = Math.round(cohort.advocacyScore / 1.3);
  const influenceGraphLine = Math.round(cohort.influenceScore / 1.3);

  let formattedSurveyRunDate;
  let surveyRunDaysAgo;
  if (cohort?.surveyLastRun !== undefined) {
    formattedSurveyRunDate = format(
      new Date(cohort?.surveyLastRun),
      "MMM d', 'yyyy"
    );
    // No. of days since survey was last run
    surveyRunDaysAgo = Math.ceil(
      (Date.now() - new Date(cohort?.surveyLastRun).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  console.log("cohort details : ", cohort);
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Text style={{ marginLeft: 10, marginRight: 20 }}>Influence: </Text>
        <View
          style={{
            height: 15,
            width: `73%`,
            marginLeft: 107,
            backgroundColor: COLORS.steadiness,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            position: "absolute",
          }}
        />
        <View
          style={{
            height: 15,
            width: `${influenceGraphLine}%`,
            backgroundColor: "#2B4EE5",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,

            shadowColor: "#2B4EE5",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Text style={{ marginLeft: 10, marginRight: 17 }}>Advocacy: </Text>
        <View
          style={{
            height: 15,
            width: `73%`,
            marginLeft: 107,
            backgroundColor: COLORS.steadiness,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            position: "absolute",
          }}
        />
        <View
          style={{
            height: 15,
            width: `${advocacyGraphLine}%`,
            backgroundColor: "#3D7FE5",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,

            shadowColor: "#3D7FE5",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Text style={{ marginLeft: 10, marginRight: 10 }}>Interaction: </Text>
        <View
          style={{
            height: 15,
            width: `73%`,
            marginLeft: 107,
            backgroundColor: COLORS.steadiness,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            position: "absolute",
          }}
        />
        <View
          style={{
            height: 15,
            width: `${interactionGraphLine}%`,
            backgroundColor: "#4EF9D5",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            shadowColor: "#4EF9D5",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        />
      </View>

      <Text
        style={{
          fontSize: SIZES.small,
          marginLeft: 10,
          fontFamily: FONT.InterRegular,
        }}
      >
        Relationship last assessed: {formattedSurveyRunDate}
      </Text>
      {surveyRunDaysAgo > 180 && (
        <Text
          style={{
            fontSize: SIZES.medium,
            marginLeft: 10,
            marginTop: 10,
            color: "red",
            fontFamily: FONT.InterBold,
          }}
        >
          Maybe time to run this assessment again?
        </Text>
      )}
    </View>
  );
};

export default Zig360ProfileChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "95%",
    marginVertical: 3,
    marginLeft: 10,
    marginRight: 10,
  },
});
