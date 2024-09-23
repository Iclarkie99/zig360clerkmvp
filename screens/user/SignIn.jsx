import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useRef, useContext, useCallback } from "react";
import { useUser } from "../../utilities/context/User/UserContext";
import Toast from "react-native-toast-message";
import { useSignIn, useAuth, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useWarmUpBrowser } from "../../utilities/hooks/warmUpBrowser";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { storage } from "../../utilities/storage/mmkv";

import { COLORS, images, SIZES, FONT } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["77%"];
  const { signIn, setActive, isLoaded } = useSignIn();
  const { userId, isSignedIn, signOut } = useAuth();
  const { userData, refreshUserData, isLoading } = useUser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

  let tryAppleCount = 0;
  let tryGoogleCount = 0;
  const [dontShowGettingStarted, setDontShowGettingStarted] = useState(
    storage.getBoolean("dontShowGettingStarted")
  );
  useWarmUpBrowser();

  const onSelectGoogleAuth = useCallback(async () => {
    console.log("Linking URL :", Linking.createURL("/oauth-native-callback"));
    try {
      const { createdSessionId, setActive } = await googleAuth({
        redirectUrl: "https://clerk.zig360.com/v1/oauth_callback",
      });
      //   redirectUrl: Linking.createURL("/oauth-native-callback"),
      // });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "No account exists - Register a new account",
        });
        navigation.navigate("SignUp");
      }
    } catch (err) {
      const errorMessage = err.errors && err.errors[0] && err.errors[0].message;
      Toast.show({
        type: "error",
        text1: errorMessage || "Error occurred",
      });
      console.log("error :", err.errors[0]);
    }
  }, []);

  // const onSelectGoogleAuth = useCallback(async () => {
  //   if (isLoaded && isSignedIn) {
  //     console.log("Inside signedIN already accounts - trying to sign in again");
  //     await signOut();
  //   }
  //   while (tryGoogleCount < 2) {
  //     try {
  //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  //       const { createdSessionId, setActive } = await googleAuth();

  //       console.log("createSessionId :", createdSessionId);
  //       if (createdSessionId) {
  //         console.log("We have sessionID, now getting user data");
  //         await setActive({ session: createdSessionId });

  //         // Wait for a short time to ensure the session is active
  //         await new Promise((resolve) => setTimeout(resolve, 1000));

  //         await refreshUserData();
  //         console.log("going to navigate home...");
  //         navigation.navigate("Home");
  //         return;
  //       } else {
  //         Toast.show({
  //           type: "error",
  //           text1: "No account exists - Register a new account",
  //         });
  //         navigation.navigate("SignUp");
  //       }
  //     } catch (err) {
  //       const errorMessage =
  //         err.errors && err.errors[0] && err.errors[0].message;
  //       Toast.show({
  //         type: "error",
  //         text1: errorMessage || "Error occurred",
  //       });
  //       await signOut();
  //       tryGoogleCount++;
  //       if (tryGoogleCount >= 2) {
  //         Toast.show({
  //           type: "error",
  //           text1: "Apologies - please try again",
  //         });
  //       }
  //     }
  //   }
  // }, []);

  const onSelectAppleAuth = useCallback(async () => {
    if (isLoaded && isSignedIn) {
      console.log("Inside signedIN already accounts - trying to sign in again");
      await signOut();
    }
    while (tryAppleCount < 2) {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const { createdSessionId, setActive } = await appleAuth();

        console.log("createSessionId :", createdSessionId);
        if (createdSessionId) {
          await setActive({ session: createdSessionId });

          // Wait for a short time to ensure the session is active
          await new Promise((resolve) => setTimeout(resolve, 1000));

          await refreshUserData();
          navigation.navigate("Home");
          return;
        } else {
          Toast.show({
            type: "error",
            text1: "No account exists - Register a new account",
          });
          navigation.navigate("SignUp");
        }
      } catch (err) {
        const errorMessage =
          err.errors && err.errors[0] && err.errors[0].message;
        Toast.show({
          type: "error",
          text1: errorMessage || "Error occurred",
        });
        await signOut();
        tryAppleCount++;
        if (tryAppleCount >= 2) {
          Toast.show({
            type: "error",
            text1: "Apologies - please try again",
          });
        }
      }
    }
  }, []);

  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }
  function closePressModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  async function handleReset() {
    try {
      if (resetEmail.length) {
        // Implement password reset functionality
        Toast.show({
          type: "success",
          text1: `Reset email sent to ${resetEmail}`,
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));

      const errorMessage = error.message || "Error occurred";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    }
  }

  const onSignInPress = async () => {
    if (!isLoaded) {
      Toast.show({
        type: "info",
        text1: "Authentication is still loading. Please try again in a moment.",
      });
      return;
    }

    if (isSignedIn) {
      console.log("Signing out an old account");
      await signOut();
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const completeSignIn = await signIn.create({
          identifier: email,
          password,
        });
        await setActive({ session: completeSignIn.createdSessionId });

        // Wait for a short time to ensure the session is active
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Refresh user data after successful sign-in
        await refreshUserData();

        if (isLoading) {
          console.log("User data is still loading");
        } else if (!userData) {
          console.log("User data is not available after refresh");
        } else {
          console.log("User data refreshed successfully");
        }

        navigation.navigate("Home");
        return;
      } catch (err) {
        const errorMessage = err.errors?.[0]?.message || "An error occurred";
        console.error("Sign-in error:", errorMessage);
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
        await signOut();
      }
    }

    Toast.show({
      type: "error",
      text1: "Apologies - please try again later",
    });
  };

  return (
    <BottomSheetModalProvider>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
      >
        <View style={{}}>
          <View>
            <View style={{ marginTop: 140, marginBottom: 10, marginLeft: 20 }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONT.InterBold,
                  fontSize: SIZES.xxLarge,
                }}
              >
                Welcome Back
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONT.InterRegular,
                  fontSize: SIZES.large,
                  marginTop: 10,
                }}
              >
                Sign In
              </Text>
            </View>

            <View style={{ width: "90%", marginTop: 5, marginHorizontal: 20 }}>
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
                  <Text style={styles.orRegisterBtn}>Sign In with Apple</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ width: "90%", marginTop: 10, marginHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  padding: 14,
                  borderColor: COLORS.DarkFont,
                  borderWidth: 1,
                  backgroundColor: COLORS.background,
                  marginVertical: 3,
                  width: "100%",
                  shadowColor: COLORS.LightGrayTransparent,
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
                    Sign In with Google
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
                    color: COLORS.black,
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
                    borderColor: emailFocus ? COLORS.primary : COLORS.lightGray,
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

            <View style={{ width: "90%", marginTop: 20, marginLeft: 20 }}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={onSignInPress}
              >
                <Text style={styles.actionBtnText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{
                padding: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.InterMedium,
                  fontSize: SIZES.medium,
                  color: COLORS.phantom,
                }}
              >
                New user? Click to register
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONT.InterMedium,
                fontSize: SIZES.medium,
                color: COLORS.phantom,
              }}
            >
              use test@testing.com Qwedcxzaq!@# to confirm PRD email sign in
              works
            </Text>
          </View>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 50,
            backgroundColor: "#5728AB",
          }}
        >
          <View style={styles.registrationModal}>
            <Text style={styles.registrationModalTitle}>
              Forgot your password? No problem.
            </Text>
            <Text style={styles.registrationModalText}>
              Enter your profile email and we will send you a reset link:
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.pwdResetInputWrapper}>
                <TextInput
                  style={styles.inputInput}
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.AVIDDarkFont}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "80%", marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    handleReset();
                  }}
                >
                  <Text style={styles.actionBtnText}>Send reset request</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={{
                fontWeight: 500,
                padding: 15,
                alignContent: "center",
              }}
              onPress={() => closePressModal()}
            >
              <Text
                style={{
                  fontFamily: FONT.AVIDRegular,
                  fontSize: SIZES.large,
                  marginLeft: 20,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </BottomSheetModal>
      </KeyboardAwareScrollView>
    </BottomSheetModalProvider>
  );
};

export default SignIn;

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
