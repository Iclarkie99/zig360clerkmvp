import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"
import Contacts from "../screens/contacts/Contacts"
import { useAuth } from "@clerk/clerk-react"
import CreateGoal from "../screens/goals/CreateGoal"
import React, { useContext, useEffect } from "react"
// import { Context as UserContext } from "../utilities/context/User/userContext"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { COLORS, images, SIZES, FONT } from "../constants"
import { Feather, Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  // const { users, getUser } = useContext(UserContext)
  // const { userId, isLoaded } = useAuth()

  // useEffect(() => {
  //   if (isLoaded) {
  //     console.log("Tabs : ", userId)
  //     getUser(userId)
  //   }
  // }, [userId])

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#103EE3" //colors.foreground,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "black " },
        cardStyle: { backgroundColor: "black" },
        tabBarStyle: {
          tabBarShowLabel: false,
          position: "absolute",
          bottom: 1,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 70,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarOptions: { showLabel: false },
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: 20 }}>
              <Feather
                name="home"
                size={25}
                color={focused ? "blue" : "gray"}
                style={{ justifyContent: "center" }}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
        name="New Plan"
        component={CreateGoal}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="plus"
              size={35}
              color={"white"}
              style={{ width: 35, height: 35 }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />

      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "absolute", top: 20 }}>
              <Feather
                name="users"
                size={25}
                color={focused ? "blue" : "gray"}
                style={{ justifyContent: "center" }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#103EE3",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})
