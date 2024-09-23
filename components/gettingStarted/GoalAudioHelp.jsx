// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import Slider from "@react-native-community/slider";
// import * as Haptics from "expo-haptics";
// import { Audio } from "expo-av";
// import { Feather } from "@expo/vector-icons";
// import { COLORS, FONT, SIZES } from "../../constants";
// import { storage } from "../../utilities/storage/mmkv";

// const GoalAudioHelp = () => {
//   const [sound, setSound] = useState(null);
//   const [soundPosition, setSoundPosition] = useState(0);
//   const [soundDuration, setSoundDuration] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [dontShowAudio, setDontShowAudio] = useState(
//     storage.getBoolean("dontShowGoalAudioHelp") || false
//   );

//   const getTimestamp = (millis) => {
//     const seconds = Math.floor(millis / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const loadAndPlaySound = async () => {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     try {
//       const { sound } = await Audio.Sound.createAsync(
//         require("../../assets/Hello.mp3"),
//         { shouldPlay: true }
//       );
//       setSound(sound);

//       sound.setOnPlaybackStatusUpdate((status) => {
//         if (status.isLoaded) {
//           setSoundPosition(status.positionMillis);
//           setSoundDuration(status.durationMillis);
//           setIsPlaying(status.isPlaying);
//         }
//       });

//       await sound.playAsync();
//     } catch (error) {
//       console.log("Error playing sound: ", error);
//     }
//   };

//   const handlePlayPause = async () => {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     if (sound) {
//       if (isPlaying) {
//         await sound.pauseAsync();
//         setIsPlaying(false);
//       } else {
//         await sound.playAsync();
//         setIsPlaying(true);
//       }
//     } else {
//       loadAndPlaySound();
//     }
//   };

//   const handleSliderChange = async (value) => {
//     if (sound) {
//       await sound.setPositionAsync(value);
//       setSoundPosition(value);
//     }
//   };

//   const handleSlidingStart = async () => {
//     if (sound && isPlaying) {
//       await sound.pauseAsync();
//     }
//   };

//   const handleSlidingComplete = async (value) => {
//     if (sound) {
//       await sound.setPositionAsync(value);
//       if (isPlaying) {
//         await sound.playAsync();
//       }
//     }
//   };

//   const updateDontShowAudio = async (value) => {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     storage.set("dontShowGoalAudioHelp", value);
//     setDontShowAudio(value);
//   };

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   if (dontShowAudio) {
//     return null;
//   } else {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.helpTitle}>Play for help</Text>
//         <View style={styles.controlsContainer}>
//           <View style={styles.controls}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={soundDuration}
//                 thumbTintColor={COLORS.actionButton}
//                 value={soundPosition}
//                 minimumTrackTintColor={COLORS.actionButton}
//                 maximumTrackTintColor="#000000"
//                 onSlidingStart={handleSlidingStart}
//                 onSlidingComplete={handleSlidingComplete}
//                 onValueChange={handleSliderChange}
//               />
//               <Text style={styles.textCounter}>
//                 {getTimestamp(soundDuration - soundPosition)}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity onPress={handlePlayPause}>
//               {isPlaying ? (
//                 <Feather name="pause-circle" size={39} color="white" />
//               ) : (
//                 <Feather name="play-circle" size={39} color="white" />
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.checkboxContainer}
//           onPress={() => updateDontShowAudio(true)}
//         >
//           <Text style={styles.text}>Don't show again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// };

// export default GoalAudioHelp;

// const styles = StyleSheet.create({
//   container: {
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: COLORS.phantom,
//     borderRadius: 15,
//     shadowColor: COLORS.phantom,
//     shadowOffset: { width: 0, height: 10 },
//   },
//   controlsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     marginTop: 10,
//   },
//   controls: {
//     flex: 0.9,
//   },
//   slider: {
//     width: "85%",
//     height: 12,
//   },
//   checkboxContainer: {
//     backgroundColor: "#FFFFFF20",
//     alignSelf: "center",
//     width: "50%",
//     borderRadius: 20,
//     marginTop: -8,
//     marginBottom: 6,
//   },
//   buttonContainer: {
//     flex: 0.11,
//   },
//   text: {
//     fontSize: SIZES.medium,
//     color: "white",
//     paddingVertical: 5,
//     textAlign: "center",
//     fontFamily: FONT.InterRegular,
//   },
//   helpTitle: {
//     fontSize: SIZES.medium,
//     color: "white",
//     textAlign: "center",
//     fontFamily: FONT.InterRegular,
//     marginTop: 10,
//     marginBottom: -20,
//   },
//   textCounter: {
//     fontSize: SIZES.small,
//     color: "white",
//     fontFamily: FONT.InterRegular,
//     marginLeft: 5,
//   },
// });
