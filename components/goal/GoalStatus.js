import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants"
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons"

const GoalStatus = ({ goal }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>{goal.status}</Text>
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONT.InterBold,
            fontWeight: 600,
            marginBottom: 30
          }}
        >
          Kim to generate the content for these....{" "}
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </View>
  )
}

export default GoalStatus

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.large,
    fontWeight: 700,
    fontFamily: FONT.InterBold,
    marginTop: 10,
    marginBottom: 30
  },
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "95%",
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 20
  }
})
