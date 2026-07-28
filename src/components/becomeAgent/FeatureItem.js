import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function FeatureItem({ text }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="checkmark"
          size={14}
          color="#fff"
        />
      </View>

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  text: {
    color: "#CBD5E1",
    fontSize: 15,
  },
});