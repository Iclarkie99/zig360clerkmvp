import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useContext } from "react";

const { width } = Dimensions.get("screen");
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {data.map((_, idx) => {
            const inputRange = [
              (idx - 1) * width,
              idx * width,
              (idx + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [15, 30, 15],
              extrapolate: "clamp",
            });

            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: [COLORS.target, "red", COLORS.colleague],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={idx.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, backgroundColor },
                  idx === index && styles.dotActive,
                ]}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        ></View>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    alignContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "Gray",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 3,
    backgroundColor: "#000",
  },
  dotActive: {
    backgroundColor: "#384B77",
  },
});
