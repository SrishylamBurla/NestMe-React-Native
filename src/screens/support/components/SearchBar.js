import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search tickets...",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#94A3B8"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value?.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onChangeText("")}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,

    height: 54,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  input: {
    flex: 1,

    marginLeft: 12,

    color: "#111827",

    fontSize: 15,

    fontWeight: "500",
  },
});