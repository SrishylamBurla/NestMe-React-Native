import React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

export default function AuthLayout({
  title,
  quote,
  children,
}) {
  return (
    <LinearGradient
      colors={["#0F172A", "#020617", "#111827"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
          }
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}

            <Image
              source={require("../../assets/icons/splashlogo.png")}
              style={styles.logo}
            />

            {/* Brand */}

            <Text style={styles.brand}>
              nestme
              <Text style={styles.domain}>.in</Text>
            </Text>

            {/* Heading */}

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.quote}>{quote}</Text>

            {/* Card */}

            <View style={styles.card}>
              {children}
            </View>

            {/* Footer */}

            <Text style={styles.footer}>
              © 2026 NestMe Technologies
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    alignSelf: "center",
  },

  brand: {
    marginTop: 8,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  domain: {
    color: "#60A5FA",
  },

  title: {
    marginTop: 30,
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  quote: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  card: {
    marginTop: 35,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 24,
  },

  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
  },
});