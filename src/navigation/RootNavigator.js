import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationService";

import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {

  const linking = {
  prefixes: [
    "nestme://",
    "https://nestme.in",
    "https://www.nestme.in",
  ],

  config: {
    screens: {
      Login: "login",

      ResetPassword: {
        path: "reset-password/:token",
      },
    },
  },
};
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <AuthNavigator />
    </NavigationContainer>
  );
}