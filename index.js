/**
 * @format
 */

import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";

import App from "./App";
import { name as appName } from "./app.json";

// Runs when the app is in the background or terminated
messaging().setBackgroundMessageHandler(async remoteMessage => {
});

function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Root);