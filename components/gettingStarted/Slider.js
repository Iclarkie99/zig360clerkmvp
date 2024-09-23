import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import SlideItem from "./SlideItem";
import Sliders from "./Data";
import Pagination from "./Pagination";
import { storage } from "../../utilities/storage/mmkv";

import { COLORS, images, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const GettingStartedSlider = ({ gettingStarted, setGettingStarted }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dontShowGettingStarted, setDontShowGettingStarted] = useState(
    storage.getBoolean("dontShowGettingStarted")
  );

  const updateGettingStarted = () => {
    storage.set("dontShowGettingStarted", true);
    setGettingStarted(false);
  };
  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChange = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabolityConfig = useRef({
    intemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.content}>
      <Pagination
        data={Sliders}
        scrollX={scrollX}
        index={index}
        gettingStarted={gettingStarted}
        setGettingStarted={setGettingStarted}
      />

      <View
        style={{
          height: "77%",
        }}
      >
        <FlatList
          data={Sliders}
          renderItem={({ item }) => <SlideItem item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChange}
          viewabolityConfig={viewabolityConfig}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "90%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              marginTop: 40,
              borderRadius: 10,
              padding: 10,
            }}
            onPress={() => {
              setGettingStarted(false);
              console.log("Getting Started set to false");
            }}
          >
            <Text
              style={{
                fontSize: SIZES.xLarge,
                textAlign: "center",
                color: COLORS.phantom,
                fontFamily: FONT.InterMedium,
              }}
            >
              Get Started with ZIG360
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              updateGettingStarted(true);
            }}
          >
            {dontShowGettingStarted ? (
              <MaterialCommunityIcons
                name="checkbox-intermediate"
                size={24}
                color={COLORS.white}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color={COLORS.white}
              />
            )}
          </TouchableOpacity>

          <Text
            style={{
              marginLeft: 15,
              fontSize: SIZES.medium,
              color: COLORS.white,
              fontFamily: FONT.InterMedium,
            }}
          >
            Don't show this again
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GettingStartedSlider;

const styles = StyleSheet.create({
  content: {},
});
