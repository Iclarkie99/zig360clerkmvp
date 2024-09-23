import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import SlideItem from "./SlideItem";
import Sliders from "./Data";
import Pagination from "./Pagination";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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
      <Pagination data={Sliders} scrollX={scrollX} index={index} />
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
  );
};

export default Slider;

const styles = StyleSheet.create({
  content: {},
});
