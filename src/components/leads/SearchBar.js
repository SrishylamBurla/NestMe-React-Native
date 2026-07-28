import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search leads...",
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#9CA3AF"
        style={styles.icon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />

      {!!value && (
        <Ionicons
          name="close-circle"
          size={20}
          color="#9CA3AF"
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 16,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
});