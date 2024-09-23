import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";

const InfluenceType = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <LinearGradient
        colors={["red", "orange"]}
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
          Influence
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          People with an influential style are often described as outgoing,
          enthusiastic, and persuasive.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          They tend to be people-oriented and may prioritize building
          relationships over getting things done.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          When communicating with someone who has an influential style, it's
          important to show enthusiasm and be personable.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          Take the time to build a rapport and establish a connection before
          diving into the main topic.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          Use stories and anecdotes to illustrate your points, and be prepared
          to negotiate and compromise to find a mutually beneficial solution.
        </Text>
      </ScrollView>
    </View>
  );
};

export default InfluenceType;

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
