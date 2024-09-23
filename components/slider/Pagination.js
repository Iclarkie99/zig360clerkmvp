import { StyleSheet, View, Animated, Dimensions } from "react-native"
import React, { useContext } from "react"

const { width } = Dimensions.get("screen")
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants"

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [15, 30, 15],
          extrapolate: "clamp"
        })

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#4EF9D5", "#4EF9D5", "#4EF9D5"],
          extrapolate: "clamp"
        })

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
              idx === index && styles.dotActive
            ]}
          />
        )
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    left: 20,
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    zIndex: 5
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 3,
    backgroundColor: "#000"
  },
  dotActive: {
    backgroundColor: "#384B77"
  }
})
