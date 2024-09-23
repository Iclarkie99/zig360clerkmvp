import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PaginationGettingStarted = ({ data }) => {
  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        return <View style={[styles.dot, { width: 10 }]} key={i.toString()} />;
      })}
    </View>
  );
};

export default PaginationGettingStarted;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 5,
    marginHorizontal: 8,
  },
});
