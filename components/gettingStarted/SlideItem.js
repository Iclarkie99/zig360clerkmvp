import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
// import { Video, ResizeMode } from "expo-av";
const { width, height } = Dimensions.get("screen");
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(30);
  const translateYImageParallax = new Animated.Value(30);
  const video = useRef(null);
  const [status, setStatus] = useState("");

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
      <Text style={styles.title2}>{item.title2}</Text>
      <View style={styles.imageContainer}>
        <View style={{ justifyContent: "center" }}>
          {item.id !== 1 ? (
            <AntDesign
              style={{ marginLeft: 7 }}
              name="arrowleft"
              size={30}
              color={COLORS.white}
            />
          ) : (
            <Text style={{ paddingRight: 15 }}> </Text>
          )}
        </View>
        {item.id !== 1 ? (
          <Image
            source={item.img}
            resizeMode="contain"
            style={[styles.image]}
          />
        ) : (
          <>
            <View style={styles.videoContainer}>
              {/* <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: "https://zig360-advice-videos.s3.amazonaws.com/Zig360_+Intro.mp4",
                }}
                useNativeControls
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              /> */}
            </View>
          </>
        )}
        <View style={{ justifyContent: "center" }}>
          {item.id !== 5 ? (
            <AntDesign
              style={{ marginRight: 7 }}
              name="arrowright"
              size={30}
              color={COLORS.white}
            />
          ) : (
            <Text style={{ paddingLeft: 15 }}> </Text>
          )}
        </View>
      </View>
      <View style={styles.content}>
        {/* <Text style={styles.subTitle}>{item.subTitle}</Text> */}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: height - 270,
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 5,
    width: "95%",
    alignItems: "center",
    marginBottom: 20,
  },
  separator: {
    height: 3,
    width: 30,
    marginTop: 25,
    marginBottom: 15,
  },
  imagexx: {
    flex: 1,
    width: "50%",
    position: "relative",
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  imageParallax: {
    width: 70,
    height: 30,
    position: "absolute",
    top: "30%",
    right: 65,
    zIndex: 5,
  },
  title: {
    marginTop: 20,
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.InterBold,
    color: COLORS.white,
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
  },
  title2: {
    marginVertical: 20,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterBold,
    color: COLORS.white,
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
  },
  subTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.InterBold,
    color: COLORS.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  description: {
    fontSize: SIZES.medium,
    fontFamily: FONT.InterRegular,
    color: COLORS.white,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
  },
  video: {
    alignSelf: "center",
    width: "73%",
    height: 445,
    borderRadius: 20,
    backgroundColor: "#0578F3",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
