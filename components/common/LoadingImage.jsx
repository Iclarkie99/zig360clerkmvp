import React from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants"

export default function LoadingImage() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={COLORS.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.8,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  }
})
