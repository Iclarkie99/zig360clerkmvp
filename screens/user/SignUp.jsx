import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { useUser } from "../../utilities/context/User/UserContext";
import Toast from "react-native-toast-message";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useSignUp, useOAuth, useAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../utilities/hooks/warmUpBrowser";
import * as Haptics from "expo-haptics";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { COLORS, images, SIZES, FONT } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const generatedUsername = "Undefined";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [code, setCode] = useState("");
  const bottomSheetModalRef = useRef(null);
  const [userIdReturn, setUserIdReturn] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const snapPoints = ["77%"];
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const { userId } = useAuth();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: AppleAuth } = useOAuth({ strategy: "oauth_apple" });

  useWarmUpBrowser();

  const onSelectGoogleAuth = useCallback(async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });

        // Wait for a short time to ensure the session is active
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await refreshUserData();
        navigation.navigate("CreateUserDetails");
      } else {
        Toast.show({
          type: "error",
          text1: "Error occurred - restart the app",
        });
      }
    } catch (err) {
      console.error("OAuth error", err);
      const errorMessage = err.errors?.[0]?.message || "Error occurred";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    }
  }, []);

  const onSelectAppleAuth = useCallback(async () => {
    console.log("Apple oAuth kickoff");
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const { createdSessionId, setActive } = await AppleAuth();

      if (createdSessionId) {
        console.log("Apple oAuth - Inside createdSessionId");
        await setActive({ session: createdSessionId });

        // Wait for a short time to ensure the session is active
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await refreshUserData();
        navigation.navigate("CreateUserDetails");
      } else {
        Toast.show({
          type: "error",
          text1: "Error occurred - restart the app",
        });
      }
    } catch (err) {
      const errorMessage =
        (err.errors && err.errors[0] && err.errors[0].message) ||
        "Error occurred";
      console.error("OAuth error", errorMessage);
      console.error("OAuth error2", err);
      console.error(JSON.stringify(err.errors[0], null, 2));
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    }
  }, []);

  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }

  const createUser = async (_userId) => {
    console.log("UserId Return :", userIdReturn);

    const payload = {
      userId: _userId, //user.userId,
      userName: username,
      email: email.toLowerCase(),
      userType: "Social",
      emailNotifications: true,
      pushNotifications: true,
      memberSince: Date(),
      avatar: "https://zig360-images.s3.amazonaws.com/icon.png",
    };
    try {
      addUser(payload);
      console.log("addUser in SignUp successful:", payload);
    } catch (error) {
      console.log("Failed to add user for ", email);
      Toast.show({
        type: "error",
        text1: "Whoops something major went wrong",
      });
    }
  };

  const resendVerificationCode = async () => {
    Toast.show({
      type: "success",
      text1: "Resent your verification code",
      text2: "Check your spam/junk folders",
    });
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  };
  // start the sign up process using Clerk.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await signUp.create({
        emailAddress: email,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err.errors, null, 2));
      const errorMessage = err.errors && err.errors[0] && err.errors[0].message;
      Toast.show({
        type: "error",
        text1: errorMessage || "Error occurred",
      });
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    console.log("Inside verify email");
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      await createUser(completeSignUp.createdUserId);
      navigation.navigate("Home");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err.errors && err.errors[0] && err.errors[0].message;
      Toast.show({
        type: "error",
        text1: errorMessage || "Error occurred",
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        {!pendingVerification && (
          <View>
            <View style={{}}>
              <View style={{}}>
                <Text
                  style={{
                    marginTop: 140,
                    marginLeft: 20,
                    color: COLORS.black,
                    fontFamily: FONT.InterBold,
                    fontSize: SIZES.xxLarge,
                  }}
                >
                  Let's get started
                </Text>

                <Text
                  style={{
                    color: COLORS.black,
                    marginLeft: 20,
                    fontFamily: FONT.InterRegular,
                    fontSize: SIZES.large,
                    marginTop: 10,
                  }}
                >
                  Sign up for an account
                </Text>
              </View>

              <View
                style={{ width: "90%", marginTop: 15, marginHorizontal: 20 }}
              >
                <TouchableOpacity
                  style={{
                    padding: 14,
                    backgroundColor: COLORS.black,
                    marginVertical: 3,
                    width: "100%",
                    shadowColor: COLORS.black,
                    borderRadius: SIZES.xSmall,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                  }}
                  onPress={() => {
                    onSelectAppleAuth();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="logo-apple"
                      color={COLORS.white}
                      size={20}
                      style={{ marginRight: 20 }}
                    />
                    <Text style={styles.orRegisterBtn}>Sign Up with Apple</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{ width: "90%", marginTop: 10, marginHorizontal: 20 }}
              >
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderColor: COLORS.DarkFont,
                    borderWidth: 1,
                    marginVertical: 3,
                    width: "100%",
                    shadowColor: COLORS.DarkFont,
                    borderRadius: SIZES.xSmall,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                  }}
                  onPress={() => {
                    onSelectGoogleAuth();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="logo-google"
                      color={COLORS.black}
                      size={20}
                      style={{ marginRight: 20 }}
                    />
                    <Text style={styles.orRegisterBlkBtn}>
                      Sign Up with Google
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    AlignSelf: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.InterRegular,
                      fontSize: SIZES.medium,
                      color: COLORS.DarkFont,
                    }}
                  >
                    OR
                  </Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <FloatingLabelInput
                    autoCapitalize={"none"}
                    readOnly={false}
                    multiline={false}
                    isPassword={false}
                    label={"Email"}
                    value={email}
                    hintTextColor={COLORS.LightFont}
                    onChangeText={setEmail}
                    animationDuration={100}
                    isFocused={emailFocus}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    selectionColor={COLORS.DarkFont}
                    customLabelStyles={{
                      colorFocused: COLORS.primary,
                      colorBlurred: COLORS.black,
                    }}
                    inputStyles={{
                      color: "#000",
                      fontSize: SIZES.large,
                    }}
                    containerStyles={{
                      borderWidth: 1,
                      padding: 13,
                      borderColor: emailFocus
                        ? COLORS.primary
                        : COLORS.lightGray,
                      color: COLORS.white,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <FloatingLabelInput
                    autoCapitalize={"none"}
                    readOnly={false}
                    multiline={false}
                    isPassword={false}
                    label={"Username"}
                    value={username}
                    hintTextColor={COLORS.lightGray}
                    onChangeText={setUsername}
                    animationDuration={100}
                    isFocused={usernameFocus}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    selectionColor={COLORS.DarkFont}
                    customLabelStyles={{
                      colorFocused: COLORS.primary,
                      colorBlurred: COLORS.black,
                    }}
                    inputStyles={{
                      color: "#000",
                      fontSize: SIZES.large,
                    }}
                    containerStyles={{
                      borderWidth: 1,
                      padding: 13,
                      borderColor: emailFocus
                        ? COLORS.primary
                        : COLORS.lightGray,
                      color: COLORS.white,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <FloatingLabelInput
                    autoCapitalize={"none"}
                    readOnly={false}
                    multiline={false}
                    isPassword={true}
                    label={"Password"}
                    value={password}
                    hintTextColor={COLORS.lightGray}
                    hint={"Must be min. 8 characters"}
                    onChangeText={setPassword}
                    animationDuration={100}
                    isFocused={passwordFocus}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    selectionColor={COLORS.DarkFont}
                    customShowPasswordComponent={
                      <Text style={{ color: "#000" }}>Show</Text>
                    }
                    customHidePasswordComponent={
                      <Text style={{ color: "#000" }}>Hide</Text>
                    }
                    customLabelStyles={{
                      colorFocused: COLORS.primary,
                      colorBlurred: COLORS.black,
                    }}
                    inputStyles={{
                      color: "#000",
                      fontSize: SIZES.large,
                    }}
                    containerStyles={{
                      borderWidth: 1,
                      padding: 13,
                      borderColor: passwordFocus
                        ? COLORS.primary
                        : COLORS.lightGray,
                      color: COLORS.white,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>

              <View style={{ width: "90%", marginHorizontal: 20 }}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={onSignUpPress}
                >
                  <Text style={styles.actionBtnText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={{
                  padding: 10,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.InterMedium,
                    fontSize: SIZES.medium,
                    color: COLORS.phantom,
                  }}
                >
                  Already a user? Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View id="clerk-captcha" />
          </View>
        )}
        {pendingVerification && (
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              marginBottom: 400,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  padding: 4,
                  borderRadius: 4,
                  marginTop: 60,
                }}
              >
                <Feather
                  name="arrow-left"
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  marginTop: 50,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.InterBold,
                    fontSize: 20,
                    color: COLORS.phantom,
                  }}
                >
                  Enter your verification code
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={{
                      color: COLORS.DarkFont,
                      fontFamily: FONT.InterRegular,
                      fontSize: SIZES.medium,
                    }}
                    value={code}
                    placeholder="Enter your code..."
                    onChangeText={(code) => setCode(code)}
                    placeholderTextColor={COLORS.iconGray}
                  />
                </View>
              </View>
              <View style={{ width: "90%", marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={onPressVerify}
                >
                  <Text style={styles.actionBtnText}>Verify</Text>
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={resendVerificationCode}
                  style={{
                    padding: 10,
                    marginBottom: 40,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.InterMedium,
                      fontSize: SIZES.medium,
                      color: COLORS.phantom,
                    }}
                  >
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  textAlign: "center",
                  fontFamily: FONT.InterRegular,
                  fontSize: SIZES.medium,
                  marginBottom: 10,
                }}
              >
                Didn't receive a code?
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: FONT.InterRegular,
                  fontSize: SIZES.medium,
                }}
              >
                Check your spam/junk from ZIG360
              </Text>
              <Text style={styles.smallFont}></Text>
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  orRegisterBtn: {
    alignContent: "center",
    fontFamily: FONT.InterRegular,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  orRegisterBlkBtn: {
    alignContent: "center",
    fontFamily: FONT.InterRegular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
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
    borderColor: COLORS.iconGray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
    height: "100%",
  },
  pwdResetInputWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderColor: COLORS.iconGray,
    borderWidth: 1,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  inputInput: {
    fontFamily: FONT.InterLight,
    fontSize: SIZES.medium,
    width: "100%",
    height: "100%",
    color: COLORS.black,
    paddingHorizontal: SIZES.medium,
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
