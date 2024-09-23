import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../../screens/user/SignUp";
import SignIn from "../../screens/user/SignIn";
import Intro from "../../screens/Intro";
import GettingStarted from "../../screens/gettingStarted/GettingStarted";
import CreateUserDetails from "../../screens/user/CreateUserDetails";
// import Tabs from "../../navigation/Tabs"
import Home from "../../screens/Home";

import { COLORS } from "../../constants";

const Stack = createStackNavigator();
const OpenRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      backgroundColor: COLORS.pageBackground,
    }}
  >
    <Stack.Screen
      name="Intro"
      component={Intro}
      options={{ headerShown: false }}
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
      name="CreateUserDetails"
      component={CreateUserDetails}
      options={{ headerShown: false }}
    />

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
  </Stack.Navigator>
);

export default OpenRoutes;
