import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../../constants";

const ConscientiousnessType = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <LinearGradient
        colors={["orange", "yellow"]}
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
          Conscientiousness
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          People with a conscientious style are often described as analytical,
          detail-oriented, and precise.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          They tend to be task-oriented and may prioritize accuracy and quality
          over building relationships.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          When communicating with someone who has a conscientious style, it's
          important to be prepared and organized.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          Provide detailed information and be ready to answer questions and
          provide evidence to support your ideas.
        </Text>
        <Text style={{ fontSize: SIZES.large, marginBottom: 20 }}>
          Avoid making vague statements or using emotional appeals, and focus on
          providing clear and logical arguments.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ConscientiousnessType;

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
