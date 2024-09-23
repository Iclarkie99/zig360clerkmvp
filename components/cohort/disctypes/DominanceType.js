import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";

const DominanceType = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <LinearGradient
        colors={["green", "aqua"]}
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
        locations={[0, 0.9]}
      >
        <Text style={{ fontSize: SIZES.xLarge, padding: 20, color: "white" }}>
          Dominance
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          People with a dominant style are often described as assertive, direct,
          and confident.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          They tend to be results-oriented and may come across as task-focused
          rather than people-focused.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          When communicating with someone who has a dominant style, it's
          important to be direct and to the point.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          Avoid small talk and get to the main topic quickly. Focus on the
          results or outcomes that you want to achieve, and be prepared to back
          up your ideas with facts and data.
        </Text>
      </ScrollView>
    </View>
  );
};

export default DominanceType;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.xLarge,
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 15,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 25,
    marginLeft: 5,
    marginRight: 5,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "95%",
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 20,
  },
});
