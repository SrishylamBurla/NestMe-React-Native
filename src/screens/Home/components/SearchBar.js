import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function SearchBar({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#f3f4f6" }}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.95 },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#9CA3AF"
        />
      </View>

      <Text
        numberOfLines={1}
        style={styles.placeholder}
      >
        Search city, locality, project
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  iconContainer: {
    marginRight: 12,
  },

  placeholder: {
    flex: 1,
    color: "#9CA3AF",
    fontSize: 15,
    fontWeight: "500",
  },
});