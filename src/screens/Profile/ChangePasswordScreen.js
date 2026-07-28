import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import { useChangePasswordMutation } from "../../services/userApi";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  const [
    changePassword,
    {
      isLoading,
    },
  ] =
    useChangePasswordMutation();

  /* ================= FORM ================= */

  const [form, setForm] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  /* ================= PASSWORD VISIBILITY ================= */

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        backgroundColor="#0F172A"
        barStyle="light-content"
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          {/* ================= HEADER ================= */}

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
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.headerTitle
              }
            >
              Change Password
            </Text>

            <View
              style={{
                width: 42,
              }}
            />
          </View>

          {/* ================= CARD ================= */}

          <View style={styles.card}>
            <Ionicons
              name="lock-closed"
              size={56}
              color="#4F46E5"
              style={{
                alignSelf: "center",
                marginBottom: 20,
              }}
            />

            <Text style={styles.title}>
              Update Your Password
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Use a strong password
              with at least 6
              characters.
            </Text>

            {/* CURRENT PASSWORD */}

            <Text
              style={styles.label}
            >
              Current Password
            </Text>

            <View
              style={
                styles.inputContainer
              }
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={
                  styles.input
                }
                placeholder="Current password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={
                  !showCurrent
                }
                value={
                  form.oldPassword
                }
                onChangeText={(
                  text
                ) =>
                  setForm({
                    ...form,
                    oldPassword:
                      text,
                  })
                }
              />

              <TouchableOpacity
                onPress={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
              >
                <Ionicons
                  name={
                    showCurrent
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            {/* NEW PASSWORD */}

            <Text
              style={styles.label}
            >
              New Password
            </Text>

            <View
              style={
                styles.inputContainer
              }
            >
              <Ionicons
                name="key-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={
                  styles.input
                }
                placeholder="New password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={
                  !showNew
                }
                value={
                  form.newPassword
                }
                onChangeText={(
                  text
                ) =>
                  setForm({
                    ...form,
                    newPassword:
                      text,
                  })
                }
              />

              <TouchableOpacity
                onPress={() =>
                  setShowNew(
                    !showNew
                  )
                }
              >
                <Ionicons
                  name={
                    showNew
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRM PASSWORD */}

            <Text
              style={styles.label}
            >
              Confirm Password
            </Text>

            <View
              style={
                styles.inputContainer
              }
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={
                  styles.input
                }
                placeholder="Confirm password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={
                  !showConfirm
                }
                value={
                  form.confirmPassword
                }
                onChangeText={(
                  text
                ) =>
                  setForm({
                    ...form,
                    confirmPassword:
                      text,
                  })
                }
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >
                <Ionicons
                  name={
                    showConfirm
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            {/* Continue in Part 2 */}

                        {/* ================= CHANGE BUTTON ================= */}

            <TouchableOpacity
              style={[
                styles.changeButton,
                isLoading &&
                  styles.changeButtonDisabled,
              ]}
              disabled={isLoading}
              onPress={async () => {
                /* VALIDATION */

                if (
                  !form.oldPassword ||
                  !form.newPassword ||
                  !form.confirmPassword
                ) {
                  alert(
                    "Please fill all fields."
                  );
                  return;
                }

                if (
                  form.newPassword.length < 6
                ) {
                  alert(
                    "Password must be at least 6 characters."
                  );
                  return;
                }

                if (
                  form.newPassword !==
                  form.confirmPassword
                ) {
                  alert(
                    "Passwords do not match."
                  );
                  return;
                }

                try {
                  await changePassword({
                    oldPassword:
                      form.oldPassword,
                    newPassword:
                      form.newPassword,
                  }).unwrap();

                  alert(
                    "Password changed successfully."
                  );

                  navigation.goBack();
                } catch (err) {
                  alert(
                    err?.data?.message ||
                      "Failed to change password."
                  );
                }
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <>
                  <Ionicons
                    name="shield-checkmark"
                    size={20}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.changeButtonText
                    }
                  >
                    Change Password
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* ================= SECURITY TIPS ================= */}

            <View
              style={styles.tipCard}
            >
              <Text
                style={styles.tipTitle}
              >
                Password Tips
              </Text>

              <View
                style={styles.tipRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#10B981"
                />

                <Text
                  style={styles.tipText}
                >
                  Use at least 8
                  characters.
                </Text>
              </View>

              <View
                style={styles.tipRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#10B981"
                />

                <Text
                  style={styles.tipText}
                >
                  Include uppercase &
                  lowercase letters.
                </Text>
              </View>

              <View
                style={styles.tipRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#10B981"
                />

                <Text
                  style={styles.tipText}
                >
                  Add numbers and
                  symbols for better
                  security.
                </Text>
              </View>

              <View
                style={styles.tipRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#10B981"
                />

                <Text
                  style={styles.tipText}
                >
                  Never reuse passwords
                  from other websites.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#0F172A",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.12)",

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  /* ================= CARD ================= */

  card: {
    marginHorizontal: 18,
    marginTop: 24,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 22,

    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 22,

    color: "#64748B",

    textAlign: "center",

    fontSize: 15,
    lineHeight: 22,
  },

  /* ================= INPUTS ================= */

  label: {
    marginBottom: 8,
    marginTop: 16,

    color: "#334155",

    fontWeight: "700",

    fontSize: 14,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 56,

    backgroundColor: "#F8FAFC",

    borderRadius: 16,

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  input: {
    flex: 1,

    marginLeft: 12,

    fontSize: 15,

    color: "#111827",
  },

  /* ================= BUTTON ================= */

  changeButton: {
    marginTop: 30,

    height: 56,

    borderRadius: 16,

    backgroundColor: "#4F46E5",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#4F46E5",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  changeButtonDisabled: {
    opacity: 0.7,
  },

  changeButtonText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",

    marginLeft: 10,
  },

  /* ================= TIPS ================= */

  tipCard: {
    marginTop: 28,

    backgroundColor: "#EEF2FF",

    borderRadius: 20,

    padding: 20,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3730A3",

    marginBottom: 14,
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: 12,
  },

  tipText: {
    flex: 1,

    marginLeft: 10,

    color: "#475569",

    fontSize: 14,

    lineHeight: 22,
  },
});