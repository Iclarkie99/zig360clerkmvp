import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("screen");
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(30);
  const translateYImageParallax = new Animated.Value(30);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 20000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  Animated.timing(translateYImageParallax, {
    toValue: 0,
    duration: 10000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.title}>{item.title2}</Text>
      {/* //<Image source={item.img} resizeMode="contain" style={[styles.image]} /> */}

      {item.imgParallax && (
        <Animated.Image
          source={item.imgParallax}
          resizeMode="contain"
          style={[
            styles.imageParallax,
            {
              transform: [
                {
                  translateY: translateYImageParallax,
                },
              ],
            },
          ]}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.subTitle}>{item.subTitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 260,
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 25,
    width: "90%",
    alignItems: "center",
  },
  separator: {
    height: 3,
    width: 30,
    backgroundColor: "#f9bb0b",
    marginTop: 25,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: "60%",
    position: "relative",
    top: 60,
  },
  imageParallax: {
    width: 70,
    height: 70,
    position: "absolute",
    top: "30%",
    right: 65,
    zIndex: 5,
  },
  title: {
    position: "relative",
    top: 120,
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.InterRegular,
    color: "#000",
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
  },

  subTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterBold,
    color: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  description: {
    fontSize: SIZES.medium,
    fontFamily: FONT.InterRegular,
    color: "#000",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
