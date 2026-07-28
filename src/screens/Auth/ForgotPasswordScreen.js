import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useForgotPasswordMutation } from "../../services/userApi";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading }] =
    useForgotPasswordMutation();

  const handleSubmit = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Email is required",
      });
      return;
    }

    try {
      const res = await forgotPassword({ email }).unwrap();

      Toast.show({
        type: "success",
        text1: res.message,
      });

      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Forgot Password
      </Text>

      <Text style={styles.subtitle}>
        Enter your registered email address.
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Send Reset Link
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 54,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#5B3DF5",
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});