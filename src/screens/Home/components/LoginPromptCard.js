import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginPromptCard({
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Create an Account
      </Text>

      <Text style={styles.desc}>
        Sign in to start listing properties and receiving enquiries.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          Login / Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  desc: {
    color: "#CBD5E1",
    marginVertical: 16,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 16,
  },
});