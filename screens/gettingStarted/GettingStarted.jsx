import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import GettingStartedPage from "../../components/gettingStarted/GettingStartedPage.jsx";
import { gettingStartedData } from "../../utilities/data/gettingStartedData.js";
import Pagination from "../../components/gettingStarted/Pagination.js";
import * as Haptics from "expo-haptics";
import { storage } from "../../utilities/storage/mmkv";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NextButton from "./NextButton.jsx";

const GettingStarted = ({ navigation, route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const [dontShowGettingStarted, setDontShowGettingStarted] = useState(() => {
    const value = storage.getBoolean("dontShowGettingStarted");
    console.log("Initial dontShowGettingStarted value:", value);
    return value;
  });
  const viewableItemChanged = ({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  };

  useEffect(() => {
    console.log("dontshow setting: ", dontShowGettingStarted);
    if (dontShowGettingStarted) {
      // Add a small delay to ensure navigation stack is ready, otherwise ignored
      setTimeout(() => {
        navigation.navigate("Home");
      }, 0);
    }
  }, [dontShowGettingStarted, navigation]);

  const viewConfig = { viewAreaCoveragePercentThreshold: 50 };

  const scrollToNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex === gettingStartedData.length) return;
    Animated.timing(
      slideRef.current?.scrollToIndex({
        index: nextIndex,
        viewPosition: 0.5,
        animated: true,
      }),
      {
        useNativeDriver: false,
      }
    ).start((finished) => {
      if (finished) {
        scrollToNextSlide();
      }
    });
  };

  //   useEffect(() => {
  //     const interval = setInterval(scrollToNextSlide, 5000);
  //     return () => clearInterval(interval);
  //   }, [currentIndex, gettingStartedData.length, slideRef]);

  async function handlePress() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate("Home");
  }

  const updateGettingStarted = () => {
    setDontShowGettingStarted(true);
    storage.set("dontShowGettingStarted", true);
    handlePress();
  };
  const scrollTo = () => {
    if (currentIndex < gettingStartedData.length - 1) {
      slideRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      console.log("Last slide");
      handlePress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <Pagination
          data={gettingStartedData}
          scrollX={scrollX}
          index={currentIndex}
        />
      </View>
      <FlatList
        data={gettingStartedData}
        renderItem={({ item }) => <GettingStartedPage item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={viewConfig}
        ref={(ref) => {
          slideRef.current = ref;
        }}
      />
      {/* Next button to move along to next page */}
      <View
        style={{
          marginBottom: 55,
        }}
      >
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / gettingStartedData.length)}
        />
      </View>

      {/* Dont show again button */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#3DDAD730",
            borderRadius: 25,
          }}
          onPress={() => {
            updateGettingStarted();
          }}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
              color: COLORS.phantom,
              fontFamily: FONT.InterMedium,
            }}
          >
            Don't show this again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  paginationContainer: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
});
