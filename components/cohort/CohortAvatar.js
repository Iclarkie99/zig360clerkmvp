import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const CohortAvatar = ({
  relationshipType,
  commsStyle,
  firstName,
  lastName,
}) => {
  const [chipColor, setChipColor] = useState("blue");
  const [fontColor, setFontColor] = useState("white");
  const first = firstName ? firstName.substring(0, 1) : "";
  const second = lastName ? lastName.substring(0, 1) : "";
  const initials = first + second;

  useEffect(() => {
    const dynamicChipColor = (commsStyle) => {
      switch (commsStyle) {
        case "Dominance":
          setChipColor(COLORS.green);
          setFontColor(COLORS.black);
          break;
        case "Influence":
          setChipColor(COLORS.red);
          setFontColor(COLORS.black);
          break;
        case "Steadiness":
          setChipColor(COLORS.blue);
          setFontColor(COLORS.black);
          break;
        case "Conscientious":
          setChipColor(COLORS.yellow);
          setFontColor(COLORS.black);
          break;
        case "Assess Comms. Style":
          setChipColor("pink");
          setFontColor("black");
          break;
        default:
          setChipColor("gray");
          setFontColor("black");
      }
    };
    dynamicChipColor(commsStyle);
  }, [commsStyle]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={[styles.chip, { borderColor: chipColor }]}>
        <Text
          style={[
            styles.chipText,
            { color: fontColor, fontFamily: FONT.InterBold },
          ]}
        >
          {initials}
        </Text>
      </View>
    </View>
  );
};

export default CohortAvatar;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    backgroundColor: "white",
    borderWidth: 2,
    paddingHorizontal: 5,
    width: 45,
    height: 45,
    borderRadius: 30,
    marginVertical: 3,
    marginLeft: 2,
    marginRight: 10,
  },
  chipText: {
    fontSize: SIZES.medium,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

// useEffect(() => {
//   const dynamicChipColor = (relationshipType) => {
//     switch (relationshipType) {
//       case "Key Influencer":
//         setChipColor(COLORS.keyInfluencer);
//         setFontColor(COLORS.keyInfluencerFont);
//         break;
//       case "Colleague":
//         setChipColor(COLORS.colleague);
//         setFontColor(COLORS.colleagueFont);
//         break;
//       case "Saboteur":
//         setChipColor(COLORS.saboteur);
//         setFontColor(COLORS.saboteurFont);
//         break;
//       case "Friend":
//         setChipColor(COLORS.friend);
//         setFontColor(COLORS.friendFont);
//         break;
//       case "2nd Degree Influencer":
//         setChipColor(COLORS.secInfluencer);
//         setFontColor(COLORS.secInfluencerFont);
//         break;
//       case "Target":
//         setChipColor(COLORS.target);
//         setFontColor(COLORS.targetFont);
//         break;
//       case "Run Relationship Questionnaire":
//         setChipColor("gray");
//         setFontColor("gray");
//         break;
//       default:
//         setChipColor("gray");
//         setFontColor("gray");
//     }
//   };
//   dynamicChipColor(relationshipType);
// }, [relationshipType]);
