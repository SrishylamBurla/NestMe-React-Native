import React, { useState } from "react";
import {
  View,
 Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "none",
  secureTextEntry = false,
  icon,
  error,
}) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry);

  const active = focused || value?.length > 0;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          error && styles.containerError,
        ]}
      >
        {/* Left Icon */}

        <Ionicons
          name={icon}
          size={22}
          color={focused ? "#60A5FA" : "#94A3B8"}
          style={styles.icon}
        />

        {/* Input */}

        <View style={styles.inputWrapper}>
          <Text
            style={[
              styles.label,
              active && styles.labelActive,
            ]}
          >
            {label}
          </Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={active ? "" : placeholder}
            placeholderTextColor="#64748B"
            style={styles.input}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={hidden}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>

        {/* Password Toggle */}

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
            style={styles.eye}
          >
            <Ionicons
              name={
                hidden
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },

  container: {
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.05)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  containerFocused: {
    borderColor: "#3B82F6",
  },

  containerError: {
    borderColor: "#EF4444",
  },

  icon: {
    marginRight: 14,
  },

  inputWrapper: {
    flex: 1,
  },

  label: {
    position: "absolute",
    top: 20,
    left: 0,
    fontSize: 16,
    color: "#94A3B8",
  },

  labelActive: {
    top: 8,
    fontSize: 12,
    color: "#60A5FA",
  },

  input: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 16,
    padding: 0,
  },

  eye: {
    marginLeft: 12,
  },

  error: {
    marginTop: 6,
    marginLeft: 4,
    color: "#EF4444",
    fontSize: 13,
  },
});