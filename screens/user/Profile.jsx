import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { useUser } from "../../utilities/context/User/UserContext";
import { FloatingLabelInput } from "react-native-floating-label-input";
import LoadingImage from "../../components/common/LoadingImage";
import { storage } from "../../utilities/storage/mmkv";
//import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import Purchases from "react-native-purchases";
//import { S3 } from "aws-sdk";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
// const s3 = new S3({
//   accessKeyId: process.env.EXPO_PUBLIC_OUT_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.EXPO_PUBLIC_OUT_S3_SECRET_ACCESS_KEY,
//   region: process.env.EXPO_PUBLIC_OUT_S3_REGION,
// });

import { useNavigation } from "@react-navigation/native";

import { COLORS, images, SIZES, FONT } from "../../constants";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function Profile() {
  const { isLoaded, userId, signOut } = useAuth();

  const [permissionStatus, setPermissionStatus] = useState(null);
  const bottomSheetModalPictures = useRef(null);
  const bottomSheetModalDeleteAccount = useRef(null);
  const snapPoints = ["92%"];
  const [isLoading, setIsLoading] = useState(false);
  const { userData, refreshUserData } = useUser();
  const navigation = useNavigation();
  const [userType, setuserType] = useState("Social");
  const [userName, setUserName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  const [selectedImage, setSelectedImage] = useState(userData.avatar);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [subscribed, setSubscribed] = useState(undefined);
  const [customerSub, setCustomerSub] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(
    userData.emailNotifications
  );
  //users.emailNotifications
  const [pushNotifications, setPushNotifications] = useState(
    userData.pushNotifications
  );

  const [dontShowGettingStarted, setDontShowGettingStarted] = useState(
    storage.getBoolean("dontShowGettingStarted")
  );
  const [dontShowGettingStartedAudioHelp, setDontShowGettingStartedAudioHelp] =
    useState(storage.getBoolean("dontShowGettingStartedAudioHelp"));
  const [dontShowGoalAudioHelp, setDontShowGoalAudioHelp] = useState(
    storage.getBoolean("dontShowGoalAudioHelp")
  );
  const [dontShowCohortAudioHelp, setDontShowCohortAudioHelp] = useState(
    storage.getBoolean("dontShowCohortAudioHelp")
  );

  const [dontShow, setDontShow] = useState(dontShowGettingStarted);

  // const uploadImage = async (uri) => {
  //   const response = await fetch(uri);
  //   const imageExt = uri.split(".").pop();
  //   const randomNumber = Math.floor(Math.random() * 100) + 1;

  //   const blob = await response.blob();

  //   const params = {
  //     Bucket: "outtaten-platform-images",
  //     Key: "profile-" + Date.now() + "-" + randomNumber + "." + imageExt,
  //     Body: blob,
  //   };

  //   try {
  //     const stored = await s3.upload(params).promise();
  //     console.log("stored", stored);

  //     return stored;
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // };

  const signoff = () => {
    signOut();
    navigation.navigate("SignIn");
  };
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setIsLoading(true);
  //     const upload = await uploadImage(result.assets[0].uri).then((res) => {
  //       console.log("upload", res);
  //       setSelectedImage(res.Location);
  //       setIsLoading(false);
  //     });
  //   }
  // };
  function handlePressPictureModal() {
    bottomSheetModalPictures.current?.present();
  }
  function closePressPictureModal() {
    bottomSheetModalPictures.current?.dismiss();
  }

  function handlePressDeleteModal() {
    bottomSheetModalDeleteAccount.current?.present();
  }
  function closePressDeleteModal() {
    bottomSheetModalDeleteAccount.current?.dismiss();
  }

  const emailToggleSwitch = () => {
    setEmailNotifications((previousState) => !previousState);
  };
  const pushToggleSwitch = () => {
    setPushNotifications((previousState) => !previousState);
  };

  const updateGettingStarted = () => {
    if (dontShow) {
      storage.set("dontShowGettingStarted", true);
    } else {
      storage.set("dontShowGettingStarted", false);
    }
    console.log("Getting Started Switch :", dontShowGettingStarted);
  };

  const updateStorage = ({ value, setBoolean }) => {
    console.log("value", value, "setBoolean", setBoolean);

    storage.set(`${value}`, setBoolean);
    if (value === "dontShowCohortAudioHelp") {
      setDontShowCohortAudioHelp(setBoolean);
    } else if (value === "dontShowGoalAudioHelp") {
      setDontShowGoalAudioHelp(setBoolean);
    } else if (value === "dontShowGettingStartedAudioHelp") {
      setDontShowGettingStartedAudioHelp(setBoolean);
    } else if (value === "dontShowGettingStarted") {
      setDontShow(setBoolean);
    }

    console.log("updateStorage", value, setBoolean);
  };

  const checkSubscription = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log("Customer Info: ", JSON.stringify(customerInfo, null, 2));
      const entitlement = customerInfo.entitlements.active["Use ZIG360"];
      if (entitlement) {
        console.log("entitlement", JSON.stringify(entitlement, null, 2));
        setSubscribed(true);
        setExpirationDate(entitlement.expirationDate);
      } else {
        setSubscribed(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function updateUser() {
    const payload = {
      userId: userData.userId,
      userName,
      email,
      avatar: selectedImage,
      emailNotifications,
      pushNotifications,
      userType,
    };

    try {
      console.log("Profile Update - edit User payload : ", payload);
      editUser(payload);
      updateGettingStarted();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({
        type: "success",
        text1: "Profile updated",
      });
      navigation.goBack();
    } catch (error) {
      console.log("Failed to add user for ", email);
      Toast.show({
        type: "error",
        text1: "Whoops something major went wrong",
      });
    }
  }

  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <BottomSheetModalProvider>
      <React.Fragment>
        {isLoaded && userId ? (
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                marginTop: 70,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 10,
                  backgroundColor: "white",
                  paddingHorizontal: 5,
                  paddingVertical: 4,
                  borderColor: COLORS.phantom,
                  borderWidth: 1,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="arrow-left"
                  size={SIZES.medium}
                  color={COLORS.phantom}
                />
              </TouchableOpacity>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: SIZES.xLarge,
                  fontWeight: 500,
                  fontFamily: FONT.InterBold,
                  paddingHorizontal: 15,
                }}
              >
                Profile
              </Text>
            </View>

            <View
              style={{
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 20,
              }}
            >
              <View style={{ width: "100%", marginTop: 5 }}>
                <Text
                  style={{
                    fontSize: SIZES.large,
                    fontFamily: FONT.InterBold,
                    color: COLORS.phantom,
                    textAlign: "center",
                  }}
                >
                  {email}
                </Text>
              </View>
            </View>
            {subscribed ? (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  marginTop: 20,
                  borderRadius: 10,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    marginTop: 20,
                    borderColor: COLORS.zigGreenOpaque,
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.InterBold,
                      color: COLORS.phantom,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Subscription
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.InterRegular,
                      color: COLORS.phantom,
                      textAlign: "center",
                    }}
                  >
                    Amount: $24.99
                  </Text>

                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.InterRegular,
                      color: COLORS.phantom,
                      textAlign: "center",
                    }}
                  >
                    Expiry: {new Date(expirationDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.InterBold,
                  color: COLORS.black,
                  marginLeft: 20,
                }}
              >
                App Settings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 30,
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
                  thumbColor={
                    emailNotifications ? COLORS.primary : COLORS.white
                  }
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

              {/* SHOW GETTING STARTED HELP POPUP */}
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
                  {dontShow ? (
                    <Feather
                      name="eye-off"
                      color={COLORS.black}
                      size={SIZES.large}
                    />
                  ) : (
                    <Feather
                      name="eye"
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
                    Hide Getting Started help
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: COLORS.lightGray,
                    true: COLORS.phantom,
                  }}
                  thumbColor={dontShow ? COLORS.primary : COLORS.white}
                  ios_backgroundColor="#e3e3e3"
                  onValueChange={() => {
                    updateStorage({
                      value: "dontShowGettingStarted",
                      setBoolean: !dontShow,
                    });
                  }}
                  value={dontShow}
                />
              </View>
            </View>

            {/* SHOW GETTING STARTED AUDIO HELP POPUP */}
            {/* <View
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
                {dontShowGettingStartedAudioHelp ? (
                  <Feather
                    name="eye-off"
                    color={COLORS.black}
                    size={SIZES.large}
                  />
                ) : (
                  <Feather name="eye" color={COLORS.black} size={SIZES.large} />
                )}
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONT.InterRegular,
                    color: COLORS.black,
                    marginLeft: 20,
                  }}
                >
                  Hide Getting Started Audio Help
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: COLORS.lightGray,
                  true: COLORS.phantom,
                }}
                thumbColor={
                  dontShowGettingStartedAudioHelp
                    ? COLORS.primary
                    : COLORS.white
                }
                ios_backgroundColor="#e3e3e3"
                onValueChange={() => {
                  updateStorage({
                    value: "dontShowGettingStartedAudioHelp",
                    setBoolean: !dontShowGettingStartedAudioHelp,
                  });
                }}
                value={dontShowGettingStartedAudioHelp}
              />
            </View> */}

            {/* SHOW GOAL AUDIO HELP POPUP */}
            {/* <View
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
                {dontShowGoalAudioHelp ? (
                  <Feather
                    name="eye-off"
                    color={COLORS.black}
                    size={SIZES.large}
                  />
                ) : (
                  <Feather name="eye" color={COLORS.black} size={SIZES.large} />
                )}
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONT.InterRegular,
                    color: COLORS.black,
                    marginLeft: 20,
                  }}
                >
                  Hide Goal Audio Help
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: COLORS.lightGray,
                  true: COLORS.phantom,
                }}
                thumbColor={
                  dontShowGoalAudioHelp ? COLORS.primary : COLORS.white
                }
                ios_backgroundColor="#e3e3e3"
                onValueChange={() => {
                  updateStorage({
                    value: "dontShowGoalAudioHelp",
                    setBoolean: !dontShowGoalAudioHelp,
                  });
                }}
                value={dontShowGoalAudioHelp}
              />
            </View> */}

            {/* SHOW COHORT AUDIO HELP POPUP */}
            {/* <View
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
                {dontShowCohortAudioHelp ? (
                  <Feather
                    name="eye-off"
                    color={COLORS.black}
                    size={SIZES.large}
                  />
                ) : (
                  <Feather name="eye" color={COLORS.black} size={SIZES.large} />
                )}
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONT.InterRegular,
                    color: COLORS.black,
                    marginLeft: 20,
                  }}
                >
                  Hide Influencer Audio Help
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: COLORS.lightGray,
                  true: COLORS.phantom,
                }}
                thumbColor={
                  dontShowCohortAudioHelp ? COLORS.primary : COLORS.white
                }
                ios_backgroundColor="#e3e3e3"
                onValueChange={() => {
                  updateStorage({
                    value: "dontShowCohortAudioHelp",
                    setBoolean: !dontShowCohortAudioHelp,
                  });
                }}
                value={dontShowCohortAudioHelp}
              />
            </View> */}

            <View
              style={{
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.InterBold,
                  color: COLORS.black,
                  marginLeft: 20,
                }}
              >
                Need help?
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 10,
                }}
                onPress={() => navigation.navigate("Help")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <FontAwesome
                    name="support"
                    color={COLORS.black}
                    size={SIZES.large}
                  />

                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.InterRegular,
                      color: COLORS.black,
                      marginLeft: 20,
                    }}
                  >
                    Help & Support
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontFamily: FONT.InterBold,
                  color: COLORS.black,
                  marginLeft: 20,
                }}
              >
                Delete your account?
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 10,
                }}
                onPress={() => {
                  handlePressDeleteModal();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <FontAwesome
                    name="trash"
                    color={COLORS.black}
                    size={SIZES.large}
                  />

                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.InterRegular,
                      color: COLORS.black,
                      marginLeft: 20,
                    }}
                  >
                    Click to start process
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={COLORS.black}
                  size={SIZES.large}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginHorizontal: 20,
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: COLORS.red,
                  borderRadius: 10,
                  width: "90%",
                  height: 50,
                  justifyContent: "center",
                  padding: 10,
                }}
                onPress={() => {
                  signoff();
                }}
              >
                <MaterialIcons
                  name="logout"
                  color={COLORS.red}
                  size={SIZES.large}
                />
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONT.InterRegular,
                    color: COLORS.red,
                    marginLeft: 20,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: COLORS.phantom,
                    textAlign: "center",
                    fontSize: SIZES.small,
                    fontFamily: "Inter-Variable",
                    marginBottom: 30,
                  }}
                >
                  Version: 1.0.13
                </Text>
              </View>
            </View>
          </View>
        ) : null}
        <BottomSheetModal
          ref={bottomSheetModalDeleteAccount}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: COLORS.phantom,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={images.Logo2}
              style={{
                width: "30%",
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: FONT.InterBold,
                fontSize: SIZES.xLarge,
                marginHorizontal: 20,
                color: COLORS.white,
              }}
            >
              Delete Account
            </Text>

            <Text
              style={{
                fontFamily: FONT.InterRegular,
                fontSize: SIZES.large,
                marginTop: 40,
                marginHorizontal: 20,
                textAlign: "center",
                color: COLORS.white,
              }}
            >
              If you choose to proceed, your account will immediately be deleted
              from this app and ZIG360.com
            </Text>

            <View
              style={{
                justifyContent: "center",
                width: "100%",
                marginTop: 50,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: COLORS.red,
                    backgroundColor: COLORS.red,
                    borderRadius: 10,
                    width: "80%",
                    height: 50,
                    justifyContent: "center",
                    padding: 10,
                  }}
                  onPress={() => {}}
                >
                  <FontAwesome
                    name="trash"
                    color={COLORS.white}
                    size={SIZES.large}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      fontFamily: FONT.InterRegular,
                      color: COLORS.white,
                      marginLeft: 20,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => closePressDeleteModal()}>
                <Text
                  style={{
                    fontFamily: FONT.InterRegular,
                    fontSize: SIZES.large,
                    marginTop: 40,
                    marginHorizontal: 20,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
        {/* <BottomSheetModal
          ref={bottomSheetModalPictures}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.homeTitles}>Image Upload</Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: "80%" }}>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: COLORS.phantom,
                      marginVertical: 30,
                      borderRadius: 10,
                      shadowColor: COLORS.phantom,
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                    }}
                    onPress={pickImage}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: SIZES.large,
                      }}
                    >
                      Access your phone photos
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : null}
              {selectedImage ? (
                <>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 300, height: 300, borderRadius: 10 }}
                  />

                  {selectedImage !== users.avatar ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ width: "80%" }}>
                        <TouchableOpacity
                          style={{
                            padding: 15,
                            backgroundColor: COLORS.phantom,
                            marginVertical: 30,
                            borderRadius: 10,
                            shadowColor: COLORS.phantom,
                            shadowOffset: {
                              width: 0,
                              height: 10,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                          }}
                          onPress={closePressPictureModal}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: SIZES.large,
                            }}
                          >
                            Add Photo
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </>
              ) : null}
            </View>
          </View>
        </BottomSheetModal> */}
      </React.Fragment>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  homeTitles: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.InterMedium,
    color: COLORS.darkText,
    marginVertical: 10,
  },
  actionBtn: {
    padding: 15,
    backgroundColor: COLORS.primary,
    marginVertical: 30,
    width: "100%",
    shadowColor: COLORS.primary,
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
    color: COLORS.black,
    textAlign: "center",
  },
});
