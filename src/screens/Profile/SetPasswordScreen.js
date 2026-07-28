import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import {
  useSetPasswordMutation,
} from "../../services/userApi";

import {
  useGetMeQuery,
} from "../../services/authApi";

export default function SetPasswordScreen() {
  const navigation = useNavigation();

  const { refetch } = useGetMeQuery();

  const [setPassword, { isLoading }] =
    useSetPasswordMutation();

  const [password, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const handleSave = async () => {
    if (!password.trim()) {
      Alert.alert(
        "Error",
        "Please enter a password."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match."
      );
      return;
    }

    try {
      await setPassword({
        password,
        confirmPassword,
      }).unwrap();

      await refetch();

      Alert.alert(
        "Success",
        "Password created successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      Alert.alert(
        "Error",
        err?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor="#0F172A"
        barStyle="light-content"
      />

      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Create Password
            </Text>

            <View style={{ width: 42 }} />
          </View>

          <View style={styles.card}>
            <Ionicons
              name="lock-closed"
              size={60}
              color="#4F46E5"
            />

            <Text style={styles.title}>
              Secure Your Account
            </Text>

            <Text style={styles.subtitle}>
              Create a password so you
              can login using both
              Google and Email.
            </Text>

            <Text style={styles.label}>
              New Password
            </Text>

            <View style={styles.input}>
              <TextInput
                value={password}
                secureTextEntry={
                  !showPassword
                }
                onChangeText={
                  setNewPassword
                }
                placeholder="Enter password"
                style={styles.textInput}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>
              Confirm Password
            </Text>

            <View style={styles.input}>
              <TextInput
                value={confirmPassword}
                secureTextEntry={
                  !showConfirmPassword
                }
                onChangeText={
                  setConfirmPassword
                }
                placeholder="Confirm password"
                style={styles.textInput}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              disabled={isLoading}
              onPress={handleSave}
            >
              {isLoading ? (
                <ActivityIndicator
                  color="#fff"
                />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={22}
                    color="#fff"
                  />

                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Create Password
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#0F172A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 18,
    paddingHorizontal: 18,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
  },

  card: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 18,
    color: "#111827",
  },

  subtitle: {
    marginTop: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },

  label: {
    alignSelf: "flex-start",
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  button: {
    marginTop: 16,
    width: "100%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
});