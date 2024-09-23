import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { discTypes } from "../../../utilities/data/discTypes";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";

const DiscTypes = ({ cohort }) => {
  const disc = discTypes.filter((v) => v.type === cohort.commsStyle);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LinearGradient
        colors={[disc[0]?.color1, disc[0]?.color2]}
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
          {disc[0].type}
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          {disc[0].description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DiscTypes;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.xLarge,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "95%",
    height: "75%",
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 20,
  },
});
