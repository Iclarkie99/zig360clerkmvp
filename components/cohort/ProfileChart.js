import React, { useContext } from "react"
import { ProgressChart } from "react-native-chart-kit"
import { StyleSheet, Text, View, Dimensions } from "react-native"

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants"
import { Ionicons } from "@expo/vector-icons"

const ProfileChart = () => {
  const data = {
    labels: ["Influence", "Advocacy", "Interaction"],
    data: [0.4, 0.6, 0.5]
  }
  const screenWidth = Dimensions.get("window").width

  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth - 20}
        height={270}
        strokeWidth={20}
        radius={20}
        chartConfig={{
          backgroundColor: COLORS.phantom,
          backgroundGradientFrom: COLORS.phantom,
          backgroundGradientTo: COLORS.phantom,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 2,
          style: {
            borderRadius: 16
          }
        }}
        style={{ marginVertical: 8, borderRadius: 30 }}
        hideLegend={false}
      />
    </View>
  )
}

export default ProfileChart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#ecf0f1"
  }
})
