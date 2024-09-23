import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Context as CohortContext } from "../../context/CohortContext";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const CohortRelTypeReset = ({ cohort }) => {
  const { editCohort } = useContext(CohortContext);

  async function handlePress() {
    console.log("Updating Disc for cohort");
    const updateCohort = async () => {
      try {
        const discRun = cohort.discLastRun;
        const relTypeReset = "Run Relationship Questionnaire";
        const fname = cohort.firstName;
        const lname = cohort.lastName;
        const eml = cohort.email;
        const inflScore = 0;
        const advScore = 0;
        const intScore = 0;
        const survId = cohort.surveyId;
        const survRun = cohort.surveyLastRun;
        const uId = cohort.userId;
        const cont = cohort.contact;
        const xCoord = 20;
        const yCoord = 15;
        let mobileXCoords = 0;
        let mobileYCoords = 0;
        const disc = cohort.discAssessment;

        const content = {
          firstName: fname,
          lastName: lname,
          email: eml,
          discAssessment: disc,
          commsStyle: disc,
          discLastRun: discRun,
          xCoordinates: xCoord,
          yCoordinates: yCoord,
          mobileXCoordinates: mobileXCoords,
          mobileYCoordinates: mobileYCoords,
          relationshipType: relTypeReset,
          influenceScore: inflScore,
          advocacyScore: advScore,
          interactionScore: intScore,
          surveyId: survId,
          surveyLastRun: survRun,
          userId: uId,
          contact: cont,
        };

        editCohort(cohort.goalId, cohort.cohortId, content);
        console.log("reset RelType for questionnaire rerun");
      } catch (error) {
        console.log("Cohort (put) api error:", error);
      }
    };
    updateCohort();
  }

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          handlePress();
        }}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 12,
          backgroundColor: COLORS.phantom,
          borderRadius: 10,
          width: "85%",
          shadowColor: COLORS.phantom,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: SIZES.large,
          }}
        >
          Rerun Questionnaire
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CohortRelTypeReset;

const styles = StyleSheet.create({});
