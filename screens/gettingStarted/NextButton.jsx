import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import Svg, { G, Circle } from "react-native-svg";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressRef = useRef(null);

  useEffect(() => {
    animation(percentage);
  }, [percentage]);
  console.log(percentage);
  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  const progressAnimation = useRef(new Animated.Value(0)).current;

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth * 2}
            color={COLORS.white}
          />
          <Circle
            stroke={"#02FFD5"}
            ref={progressRef}
            cx={center}
            cy={center}
            r={radius}
            fill={"white"}
            strokeWidth={strokeWidth * 2}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * 25) / 100}
          />
        </G>
      </Svg>
      {percentage !== 100 ? (
        <TouchableOpacity
          onPress={scrollTo}
          style={styles.button}
          activeOpacity={0.6}
        >
          <AntDesign name="arrowright" size={38} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={scrollTo}
            style={styles.buttonGo}
            activeOpacity={0.6}
          >
            <Text style={styles.letsgo}>Let's</Text>
            <Text style={styles.letsgo}>Go</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  button: {
    position: "absolute",
    backgroundColor: COLORS.phantom,
    borderRadius: 100,
    padding: 20,
  },
  buttonGo: {
    position: "absolute",
    backgroundColor: COLORS.actionButton,
    borderRadius: 100,
    padding: 28,
  },
  letsgo: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.InterRegular,
    textAlign: "center",
  },
});
