import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

const SearchInput = ({
  value = "",
  onSearch,
  placeholder = "Search city, locality, landmark...",
}) => {
  const [text, setText] = useState(value);

  // Keep local state synced with parent
  useEffect(() => {
    setText(value);
  }, [value]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(text);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, onSearch]);

  const clearSearch = () => {
    setText("");
    onSearch?.("");
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={22}
        color="#64748B"
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {text.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={clearSearch}
        >
          <Ionicons
            name="close-circle"
            size={22}
            color="#94A3B8"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 46,
    backgroundColor: "#FFFFFF",
borderColor: "#E2E8F0",
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 30,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#0F172A",
    paddingVertical: 0,
  },
});