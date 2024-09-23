import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { Platform } from "react-native";
import React, { useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { usePushNotifications } from "./utilities/hooks/usePushNotifications";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import Routes from "./utilities/routes";
import Toast from "react-native-toast-message";

// Data

import { UserProvider } from "./utilities/context/User/UserContext";
import { Provider as GoalProvider } from "./context/GoalContext";

// UX Imports
import { COLORS, images, FONT, SIZES } from "./constants";

export default function App() {
  const { expoPushToken } = usePushNotifications();
  console.log("Push Notifications token :", expoPushToken);

  const tokenCache = {
    async getToken(key) {
      console.log("getToken....", key);
      try {
        return SecureStore.getItemAsync(key);
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      console.log('saveToken started....: "key"', key);
      try {
        console.log('token cache saved....: "key"', key);
        console.log("token cache saved....:", value);
        return SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.error("SecureStore save item error: ", error);
        return;
      }
    },
  };

  const clerkPublishableKey =
    process.env.EXPO_PUBLIC_OUT_PRD_CLERK_PUBLISHABLE_KEY;
  console.log("key :", clerkPublishableKey);

  return (
    <NavigationContainer>
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <UserProvider>
          <GoalProvider>
            {/* <CohortxProvider>
              <CohortState>
                <ContactProvider> */}
            <Routes />
            {/* </ContactProvider>
              </CohortState>
            </CohortxProvider> */}
          </GoalProvider>
        </UserProvider>
        <Toast />
      </ClerkProvider>
    </NavigationContainer>
  );
}
registerRootComponent(App);

function Main() {
  return <App />;
}
