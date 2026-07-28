import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function AuthButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isDisabled}
      onPress={onPress}
      style={styles.shadow}
    >
      <LinearGradient
        colors={
          isDisabled
            ? ["#475569", "#475569"]
            : ["#2563EB", "#4F46E5", "#7C3AED"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="small"
          />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 10,

    elevation: 8,

    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  button: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});