import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";

const RelTypeChip = ({ textValue }) => {
  const [chipColor, setChipColor] = useState("blue");
  const [fontColor, setFontColor] = useState("white");

  useEffect(() => {
    const dynamicChipColor = (textValue) => {
      switch (textValue) {
        case "Key Influencer":
          setChipColor(COLORS.keyInfluencer);
          setFontColor(COLORS.keyInfluencerFont);
          break;
        case "Colleague":
          setChipColor(COLORS.colleague);
          setFontColor(COLORS.colleagueFont);
          break;
        case "Saboteur":
          setChipColor(COLORS.saboteur);
          setFontColor(COLORS.saboteurFont);
          break;
        case "Friend":
          setChipColor(COLORS.friend);
          setFontColor(COLORS.friendFont);
          break;
        case "2nd Degree Influencer":
          setChipColor(COLORS.secInfluencer);
          setFontColor(COLORS.secInfluencerFont);
          break;
        case "Target":
          setChipColor(COLORS.target);
          setFontColor(COLORS.targetFont);
          break;
        case "Dominance":
          setChipColor(COLORS.dominance);
          setFontColor(COLORS.dominanceFont);
          break;
        case "Steadiness":
          setChipColor(COLORS.steadiness);
          setFontColor(COLORS.steadinessFont);
          break;
        case "Influence":
          setChipColor(COLORS.influence);
          setFontColor(COLORS.influenceFont);
          break;
        case "Conscientious":
          setChipColor(COLORS.conscientious);
          setFontColor(COLORS.conscientiousFont);
          break;
        case "At risk":
          setChipColor(COLORS.atRisk);
          setFontColor(COLORS.atRiskFont);
          break;
        case "Add people":
          setChipColor(COLORS.addPeople);
          setFontColor(COLORS.addPeopleFont);
          break;
        case "Need Influencers":
          setChipColor(COLORS.needInfluencers);
          setFontColor(COLORS.needInfluencersFont);
          break;
        case "High":
          setChipColor(COLORS.high);
          setFontColor(COLORS.highFont);
          break;
        case "Medium":
          setChipColor(COLORS.medium);
          setFontColor(COLORS.mediumFont);
          break;
        case "Low":
          setChipColor(COLORS.low);
          setFontColor(COLORS.lowFont);
          break;
        case "Run Relationship Questionnaire":
          setChipColor(COLORS.runQuestionnaire);
          setFontColor(COLORS.runQuestionnaireFont);
          break;
        case "Assess Comms. Style":
          setChipColor(COLORS.runQuestionnaire);
          setFontColor(COLORS.runQuestionnaireFont);
          break;
        case "?":
          setChipColor(COLORS.medium);
          setFontColor(COLORS.mediumFont);
          break;
        case "Help":
          setChipColor(COLORS.medium);
          setFontColor(COLORS.mediumFont);
          break;
        default:
          setChipColor("gray");
          setFontColor("white");
      }
    };
    dynamicChipColor(textValue);
  }, [textValue]);
  return (
    <View style={[styles.chip, { backgroundColor: chipColor }]}>
      <Text style={[styles.chipText, { color: fontColor }]}>{textValue}</Text>
    </View>
  );
};

export default RelTypeChip;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginVertical: 2,
    marginLeft: 2,
    marginRight: 2,
  },
  chipText: {
    fontSize: SIZES.small,
    fontWeight: 500,
    fontFamily: FONT.InterRegular,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
  },
});
