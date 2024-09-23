import React from "react";
import { Platform } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import OpenRoutes from "./open.routes.js";
import AuthRoutes from "./auth.routes.js";
import * as SecureStore from "expo-secure-store";
import { setupInterceptors } from "../API/Api.js";

//fonts
import { useFonts } from "expo-font";
import fonts from "../fonts/fonts";

const Routes = () => {
  const [fontsLoaded] = useFonts(fonts);

  // useEffect(() => {
  //   const setupInitialInterceptors = async () => {
  //     console.log("useEffect interceptors setup");
  //     const token = await SecureStore.getItemAsync("__clerk_client_jwt");
  //     if (token) {
  //       console.log("useEffect interceptors setup - token: ", token);
  //       setupInterceptors(token);
  //     }
  //   };

  //   setupInitialInterceptors();
  // }, []);

  return (
    <>
      <SignedIn>
        <AuthRoutes />
      </SignedIn>
      <SignedOut>
        <OpenRoutes />
      </SignedOut>
    </>
  );
};

export default Routes;
