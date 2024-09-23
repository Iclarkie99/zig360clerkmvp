import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CohortRelTypeReset from "../../../components/cohort/CohortRelTypeReset";
import { LinearGradient } from "expo-linear-gradient";
import { relTypes } from "../../../utilities/data/relTypes";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";

const CohortTypeColleague = ({ cohort }) => {
  const rel = relTypes.filter((v) => v.type === cohort.relationshipType);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.85, marginBottom: 5 }}>
        <LinearGradient
          colors={[rel[0]?.color1, rel[0]?.color2, rel[0]?.color3]}
          style={[
            styles.linearGradient,
            {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 4,
              marginLeft: 5,
              marginRight: 5,
              borderBottomRightRadius: 4,
            },
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.4, 0.8]}
        >
          <Text
            style={{
              fontSize: SIZES.xLarge,
              fontFamily: FONT.InterRegular,
              padding: 20,
              color: "white",
            }}
          >
            {rel[0]?.type}
          </Text>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONT.InterRegular,
            }}
          >
            {rel[0]?.description}
          </Text>
        </ScrollView>
      </View>
      <View style={{ flex: 0.15 }}>
        {cohort.relationshipType !== "Run Relationship Questionnaire" ? (
          <CohortRelTypeReset cohort={cohort} />
        ) : null}
      </View>
    </View>
  );
};

export default CohortTypeColleague;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.xLarge,
    marginTop: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginHorizontal: 5,
    flex: 1, //0.8,
    //height: "68%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: "center",
  },
});
