import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants"
import { Feather, Ionicons } from "@expo/vector-icons"

const LandingPage = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images.takeaseat}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={{ marginTop: 140, alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 48
            }}
          >
            OUTTA-TEN
          </Text>
        </View>
        <View
          style={{
            marginTop: "auto",
            alignContent: "center"
          }}
        >
          <View style={{ width: "95%" }}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.actionBtnText}>Take a seat and join us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterRegular,
    marginTop: 60,
    marginBottom: 30,
    marginLeft: 15
  }
})
