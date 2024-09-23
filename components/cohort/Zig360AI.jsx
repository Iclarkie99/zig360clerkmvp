// import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
// import React, { useContext, useState, useEffect } from "react"
// import { Context as CohortContext } from "../../context/CohortContext"
// import * as Haptics from "expo-haptics"
// import { FloatingLabelInput } from "react-native-floating-label-input"
// import * as Speech from 'expo-speech'
// import RunQuestionnaire from "./advice/RunQuestionnaire"
// import CohortAdvicePage from "./advice/CohortAdvicePage"
// import { dummyMessages } from "../../utilities/data/dummyMessages"

// // UX Imports
// import { COLORS, images, FONT, SIZES } from "../../constants"
// import { MaterialIcons, Feather, SimpleLineIcons, AntDesign } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"

// const Zig360AI = ({ cohortId }) => {
//   const { state } = useContext(CohortContext)
//   const [question, setQuestion] = useState("")
//   const [questionFocus, setQuestionFocus] = useState(false)
//   const [messages, setMessages] = useState(dummyMessages)
//   const [recording, setRecording] = useState(false)
//   const [speaking, setSpeaking] = useState(true)
//   const cohort = state.filter((item) => item.cohortId === cohortId)

//   async function handlePress() {
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
//   }
// const addQuestion = (message) => {
//   const appendedMessages = [...messages, {role: "user", content: message}]
//   const appendedMessages2 = [...appendedMessages, {role: "assistant", content: "Thanks for trying this.  Our AI capabilities are coming soon, just not quite yet..."}]

//   setMessages(appendedMessages2)
//   setQuestion("")

// }

//   const startRecording = async () => {
//     setRecording(true)
//     try {
//         const thingToSay = '1'
//         Speech.speak(thingToSay)
//     } catch (error) {
//         console.log('Error', error.message)
//     }
//   }

//   const stopRecording = async () => {
//     try {
//         Speech.stop()
//         setRecording(false)
//     } catch (error) {
//         console.log('Error', error.message)
//     }
//   }

//   const stopSpeaking = () => {
//     setSpeaking(!speaking)
//   }
//   return (
//     <View style={styles.container}>
//         <View>

//      <Text
//                 style={{
//                   fontSize: SIZES.large,
//                   fontFamily: FONT.InterBold,
//                   textAlign: "center",
//                   marginTop: 10
//                 }}
//               >
//                 ZIG360 AI Assistant (Beta)
//               </Text>
//               <Text
//               style={{
//                 color: COLORS.blue,
//                 fontFamily: FONT.InterRegular,
//                 textAlign: "center",
//                 fontSize: SIZES.medium,
//                 marginTop: 20
//               }}
//             >
//               Ask ZIG360 how to interact with
//             </Text>
//               <View style={{marginTop: 20}}>
//               <FloatingLabelInput
//               autoCapitalize={"sentences"}
//               readOnly={false}
//               multiline={true}
//               isPassword={false}
//               label={"Ask a question"}
//               value={question}
//               hintTextColor={COLORS.lightGray}
//               onChangeText={setQuestion}
//               animationDuration={100}
//               isFocused={questionFocus}
//               onFocus={() => setQuestionFocus(true)}
//               onBlur={() => setQuestionFocus(false)}
//               selectionColor={COLORS.DarkFont}
//               customLabelStyles={{
//                 colorFocused: COLORS.primary,
//                 colorBlurred: COLORS.black
//               }}
//               inputStyles={{
//                 color: "#000",
//                 fontSize: SIZES.large
//               }}
//               containerStyles={{
//                 borderWidth: 1,
//                 padding: 13,
//                 borderColor: questionFocus ? COLORS.primary : COLORS.lightGray,
//                 color: COLORS.white,
//                 borderRadius: 10
//               }}
//             />
//             </View>
//             </View>

//             <View>
//                 {messages.length>0?(
//                     <View style={{marginVertical: 20}}>
//                         <Text
//               style={{
//                 color: "black",
//                 fontFamily: FONT.InterRegular,
//                 fontSize: SIZES.large
//               }}
//             >
//               Assistant
//                 </Text>
//                 <View style={{backgroundColor: COLORS.lightBlue, paddingVertical:1, borderRadius: 10}}>

//                 <ScrollView
//                     bounces={false}
//                     showsVerticalScrollIndicator={false}
//                     style={{backgroundColor: "red"}}
//                 >
//                     {messages.map((message, index) => {

//                             if (message.role==="assistant") {
//                                 return (
//                                     <View key={index} style={{flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#FFF"}}>
//                                         <View style={{backgroundColor: "#384B77", width: "85%", paddingVertical: 10,  borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopRightRadius: 8, marginBottom: 10}}>
//                                             <Text style={{color: COLORS.white, marginLeft: 10}}>{message.content}</Text
//                                     ></View>
//                                     </View>
//                                 )
//                                 } else {
//                                 return (
//                                     <View key={index} style={{flexDirection: "row", justifyContent: "flex-end", backgroundColor: "#fff"}}>
//                                         <View style={{backgroundColor: "#34b7f1", width: "85%", paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopLeftRadius: 8, marginBottom: 10}}>
//                                         <Text style={{color: COLORS.black, marginRight: 10}}>{message.content}</Text
//                                     >
//                                         </View>
//                                     </View>
//                                 )
//                                 }

//                     })}
//                 </ScrollView>
//                 </View>
//             </View>
//                 ):null}
//             </View>
//             <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop : 150}}>

// {speaking && (<TouchableOpacity style={{backgroundColor: "white", borderRadius: 10, padding: 10}} onPress={()=>{stopSpeaking()}}>
//                 <Text style={{}}>    </Text>
//             </TouchableOpacity>)}

// {recording? (<TouchableOpacity style={{}} onPress={()=>{startRecording()}}>
//             <SimpleLineIcons
//                 name="question"
//                 size={44}
//                 color={COLORS.phantom}
//               />
//             </TouchableOpacity>) : (
//                 <TouchableOpacity style={{}} onPress={()=>{addQuestion(question)}}>
//                 <SimpleLineIcons
//                     name="question"
//                     size={44}
//                     color={"red"}
//                   />
//                 </TouchableOpacity>
//             )}

//             <TouchableOpacity style={{backgroundColor: "rgba(244, 244, 244, 1)", borderRadius: 10, padding: 10}} onPress={()=>{setMessages([])}}>
//                 <Text style={{}}>Clear</Text>
//             </TouchableOpacity>
//             </View>

//     </View>
//   )
// }

// export default Zig360AI

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginVertical: 3,
//     flex: 1,
//     justifyContent: "space-between"
//   }
// })
