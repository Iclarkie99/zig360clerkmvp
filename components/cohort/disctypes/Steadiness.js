import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";

const SteadinessType = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <LinearGradient
        colors={["navy", "aqua"]}
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
          Steadiness
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: SIZESlarge, marginBottom: 20 }}>
          People with a steady style are often described as supportive, patient,
          and dependable.
        </Text>
        <Text style={{ fontSize: SIZESlarge, marginBottom: 20 }}>
          They tend to be people-oriented and may prioritize building
          relationships and maintaining harmony over achieving results.
        </Text>
        <Text style={{ fontSize: SIZESlarge, marginBottom: 20 }}>
          When communicating with someone who has a steady style, it's important
          to be patient and build trust over time.
        </Text>
        <Text style={{ fontSize: SIZESlarge, marginBottom: 20 }}>
          Take the time to listen to their concerns and build a personal
          connection before diving into the main topic.
        </Text>
        <Text style={{ fontSize: SIZESlarge, marginBottom: 20 }}>
          Use a friendly and supportive tone, and focus on building consensus
          and finding a solution that everyone can agree on.
        </Text>
      </ScrollView>
    </View>
  );
};

export default SteadinessType;

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
