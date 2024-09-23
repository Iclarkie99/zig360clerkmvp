import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Home";
// import Tabs from "../../navigation/Tabs";
import SignUp from "../../screens/user/SignUp";
import SignIn from "../../screens/user/SignIn";
import Intro from "../../screens/Intro";
import Goals from "../../screens/goals/Goals";
import Profile from "../../screens/user/Profile";
import CreateUserDetails from "../../screens/user/CreateUserDetails";
//import Assistant from "../../screens/ai/Assistant";
import GettingStarted from "../../screens/gettingStarted/GettingStarted";

const Stack = createStackNavigator();

const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "yellow",
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "red",
    }}
  >
    <Stack.Screen
      name="GettingStarted"
      component={GettingStarted}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false, gestureEnabled: false }}
    />

    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Intro"
      component={Intro}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CreateUserDetails"
      component={CreateUserDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Goals"
      component={Goals}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthRoutes;
