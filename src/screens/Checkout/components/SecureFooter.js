import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function SecureFooter({ gateway }) {
  const isRazorpay = gateway === "razorpay";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons
          name="shield-checkmark"
          size={20}
          color="#22C55E"
        />

        <Text style={styles.secureText}>
          100% Secure Payments
        </Text>
      </View>

      <Text style={styles.powered}>
        Powered by{" "}
        <Text style={styles.gateway}>
          {isRazorpay ? "Razorpay" : "Stripe"}
        </Text>
      </Text>

      <View style={styles.divider} />

      <View style={styles.features}>
        <Feature
          icon="lock-closed"
          text="SSL Encrypted"
        />

        <Feature
          icon="checkmark-circle"
          text="Verified Payment"
        />

        <Feature
          icon="flash"
          text="Instant Activation"
        />
      </View>
    </View>
  );
}

function Feature({ icon, text }) {
  return (
    <View style={styles.feature}>
      <Ionicons
        name={icon}
        size={16}
        color="#6366F1"
      />

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30,
    paddingTop: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  secureText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  powered: {
    textAlign: "center",
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 14,
  },

  gateway: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 20,
  },

  features: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  feature: {
    alignItems: "center",
    flex: 1,
  },

  featureText: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 16,
  },
});