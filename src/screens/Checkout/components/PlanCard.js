import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function PlanCard({
  plan = "Basic",
  price = 999,
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4338CA", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            NESTME AGENT
          </Text>
        </View>

        <Text style={styles.planName}>
          {plan} Plan
        </Text>

        <Text style={styles.price}>
          ₹{price}
        </Text>

        <Text style={styles.billing}>
          Billed Monthly • Cancel Anytime
        </Text>
      </LinearGradient>

      <View style={styles.features}>
        <Feature text="Unlimited Property Listings" />
        <Feature text="Verified Buyer & Tenant Leads" />
        <Feature text="Priority Listing Visibility" />
        <Feature text="Direct Buyer Contact Access" />
      </View>
    </View>
  );
}

function Feature({ text }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.checkCircle}>
        <Ionicons
          name="checkmark"
          size={14}
          color="#fff"
        />
      </View>

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  gradient: {
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 20,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  planName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 18,
  },

  price: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "800",
    marginTop: 10,
  },

  billing: {
    color: "#E2E8F0",
    marginTop: 8,
    fontSize: 14,
  },

  features: {
    padding: 24,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  featureText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
});