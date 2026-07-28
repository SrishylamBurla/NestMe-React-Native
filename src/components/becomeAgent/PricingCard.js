import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FeatureItem from "./FeatureItem";

export default function PricingCard({ onSubscribe }) {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#4338CA", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.priceCard}
      >
        <Text style={styles.planLabel}>
          NESTME AGENT
        </Text>

        <Text style={styles.price}>
          ₹999
          <Text style={styles.month}>
            {" "}/month
          </Text>
        </Text>

        <Text style={styles.planName}>
          Basic Plan
        </Text>
      </LinearGradient>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>
          Everything Included
        </Text>

        <FeatureItem text="Unlimited property listings" />
        <FeatureItem text="Verified buyer & tenant leads" />
        <FeatureItem text="Priority listing visibility" />
        <FeatureItem text="Direct buyer contact access" />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={onSubscribe}
      >
        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            Subscribe Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.note}>
        Secure payments powered by Razorpay.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  priceCard: {
    paddingVertical: 35,
    alignItems: "center",
  },

  planLabel: {
    color: "#E2E8F0",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
  },

  price: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "800",
    marginTop: 12,
  },

  month: {
    fontSize: 18,
    color: "#E2E8F0",
    fontWeight: "500",
  },

  planName: {
    color: "#F8FAFC",
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },

  featuresContainer: {
    padding: 24,
  },

  featuresTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
  },

  button: {
    marginHorizontal: 24,
    marginBottom: 18,
    borderRadius: 16,
    overflow: "hidden",
  },

  buttonGradient: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
  },

  note: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
});