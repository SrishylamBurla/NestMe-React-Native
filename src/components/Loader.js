import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";

export default function Loader() {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 42,
    height: 42,
    borderRadius: 21,

    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.15)",
    borderTopColor: "#6366F1",
    borderRightColor: "#22D3EE",
  },
});