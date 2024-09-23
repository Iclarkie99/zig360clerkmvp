import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Context as CohortContext } from "../../context/CohortContext";
import RunQuestionnaire from "./advice/RunQuestionnaire";
import CohortAdvicePage from "./advice/CohortAdvicePage";

const Zig360Advice = ({ cohortId }) => {
  const { state } = useContext(CohortContext);
  const cohort = state.filter((item) => item.cohortId === cohortId);

  return (
    <View style={styles.container}>
      {cohort[0].relationshipType === "Run Relationship Questionnaire" &&
      cohort[0].discAssessment !== "Assess Comms. Style" ? (
        <RunQuestionnaire />
      ) : null}
      {cohort[0].relationshipType !== "Run Relationship Questionnaire" &&
      cohort[0].discAssessment === "Assess Comms. Style" ? (
        <RunQuestionnaire />
      ) : null}
      {cohort[0].relationshipType === "Run Relationship Questionnaire" &&
      cohort[0].discAssessment === "Assess Comms. Style" ? (
        <RunQuestionnaire />
      ) : (
        <CohortAdvicePage
          relationshipType={cohort[0].relationshipType}
          discAssessment={cohort[0].discAssessment}
        />
      )}
    </View>
  );
};

export default Zig360Advice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
});
