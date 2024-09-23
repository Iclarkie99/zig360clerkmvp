import { View, Text, TouchableOpacity } from "react-native"
import React, { useContext, useRef } from "react"
import { useNavigation } from "@react-navigation/native"
// UX Imports
import { COLORS, images, FONT, SIZES } from "../constants"
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet"
import Slider from "../components/slider/Slider"

const Intro = () => {
  const navigation = useNavigation()
  const bottomSheetModalRef = useRef(null)

  function handlePressModal() {
    bottomSheetModalRef.current?.present()
  }
  const snapPoints = ["43%"]

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <Slider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn")
            }}
            style={{
              padding: 15,
              backgroundColor: COLORS.phantom,
              marginVertical: 3,
              marginRight: 15,
              borderRadius: 10,
              width: "42%",
              shadowColor: COLORS.phantom,
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowOpacity: 0.3,
              shadowRadius: 10
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: SIZES.large
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp")
            }}
            style={{
              padding: 15,
              backgroundColor: COLORS.smokeWhite,
              marginVertical: 3,
              borderRadius: 10,
              width: "42%",
              shadowColor: COLORS.phantom,
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowOpacity: 0.3,
              shadowRadius: 10
            }}
          >
            <Text
              style={{
                color: COLORS.phantom,
                textAlign: "center",
                fontSize: SIZES.large
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

export default Intro
