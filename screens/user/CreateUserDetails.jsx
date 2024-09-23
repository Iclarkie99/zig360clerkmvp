import React, { useState, useEffect, useContext } from "react";
import Toast from "react-native-toast-message";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";

import { useNavigation } from "@react-navigation/native";
import { useUser, useAuth } from "@clerk/clerk-expo";

import { useUser as useUser_Context } from "../../utilities/context/User/UserContext";

import { COLORS, images, SIZES, FONT } from "../../constants";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function CreateUserDetails() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [socialMember, setSocialMember] = useState(true);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const { addUser } = useUser_Context();
  const { isSignedIn, user } = useUser();
  const { userId, isLoaded } = useAuth();
  const [socialAvatar, setSocialAvatar] = useState(
    "https://zig360-images.s3.amazonaws.com/icon.png"
  );

  const emailToggleSwitch = () => {
    setEmailNotifications((previousState) => !previousState);
  };
  const pushToggleSwitch = () => {
    setPushNotifications((previousState) => !previousState);
  };
  const socialToggleSwitch = () => {
    setSocialMember((previousState) => !previousState);
  };

  const createUser = async () => {
    const payload = {
      userId: userId, //user.userId,
      userName: userName, //adding email for username if you use social login and dont provide username on signup
      email: user.primaryEmailAddress.emailAddress,
      userType: "Social",
      emailNotifications,
      pushNotifications,
      memberSince: Date(),
      avatar: socialAvatar,
    };
    try {
      console.log("addUser in SignUp successful:", payload);
      await addUser(payload);
      console.log("addUser in SignUp successful:", payload);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Failed to add user for ", email);
      Toast.show({
        type: "error",
        text1: "Whoops something major went wrong",
      });
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (
      userName === undefined ||
      (typeof userName === "string" && userName.trim() === "")
    ) {
      Toast.show({
        type: "error",
        text1: "Username is required",
      });
    } else {
      createUser();
    }
  };

  useEffect(() => {
    console.log("CreateUserDetails screen");
    if (isLoaded && isSignedIn) {
      console.log("CreateUserDetails screen - user :", user);
      if (user.imageUrl) {
        setSocialAvatar(user.imageUrl);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={{ uri: socialAvatar }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        </View>

        <Text
          style={{
            fontFamily: FONT.medium,
            marginTop: SIZES.xxLarge,
            fontSize: SIZES.xLarge,
            color: COLORS.primary,
            alignSelf: "center",
          }}
        >
          Complete your Profile
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              autoCapitalize={"words"}
              readOnly={false}
              multiline={false}
              isPassword={false}
              label={"Username"}
              value={userName}
              hintTextColor={COLORS.lightGray}
              onChangeText={setUserName}
              animationDuration={100}
              isFocused={userNameFocus}
              onFocus={() => setUserNameFocus(true)}
              onBlur={() => setUserNameFocus(false)}
              selectionColor={COLORS.DarkFont}
              customLabelStyles={{
                colorFocused: COLORS.primary,
                colorBlurred: COLORS.lightGray,
              }}
              inputStyles={{
                color: "#000",
                fontSize: SIZES.large,
              }}
              containerStyles={{
                borderWidth: 1,
                padding: 13,
                borderColor: userNameFocus ? COLORS.primary : COLORS.MidGray,
                color: COLORS.white,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              {emailNotifications ? (
                <MaterialCommunityIcons
                  name="email-check-outline"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              ) : (
                <MaterialCommunityIcons
                  name="email-remove-outline"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              )}
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.InterRegular,
                  color: COLORS.black,
                  marginLeft: 20,
                }}
              >
                Email Notifications are {emailNotifications ? "on" : "off"}
              </Text>
            </View>
            <Switch
              trackColor={{
                false: COLORS.lightGray,
                true: COLORS.phantom,
              }}
              thumbColor={emailNotifications ? COLORS.primary : COLORS.white}
              ios_backgroundColor="#e3e3e3"
              onValueChange={emailToggleSwitch}
              value={emailNotifications}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              {pushNotifications ? (
                <Ionicons
                  name="notifications-outline"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              ) : (
                <Ionicons
                  name="notifications-off-outline"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              )}
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.InterRegular,
                  color: COLORS.black,
                  marginLeft: 20,
                }}
              >
                Push Notifications are {pushNotifications ? "on" : "off"}
              </Text>
            </View>
            <Switch
              trackColor={{
                false: COLORS.lightGray,
                true: COLORS.phantom,
              }}
              thumbColor={pushNotifications ? COLORS.primary : COLORS.white}
              ios_backgroundColor="#e3e3e3"
              onValueChange={pushToggleSwitch}
              value={pushNotifications}
            />
          </View>
        </View>
      </View>
      <View style={{ width: "80%", marginTop: 10 }}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onSignUpPress()}
        >
          <Text style={styles.actionBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateUserDetails;

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
    height: "100%",
  },
  actionBtn: {
    padding: 15,
    backgroundColor: COLORS.phantom,
    marginVertical: 30,
    width: "100%",
    shadowColor: COLORS.phantom,
    borderRadius: SIZES.xSmall,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  actionBtnText: {
    fontFamily: FONT.InterMedium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    textAlign: "center",
  },
});
