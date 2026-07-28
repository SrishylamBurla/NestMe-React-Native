import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function PaymentButton({
  gateway,
  loading = false,
  onPress,
}) {
  const isRazorpay = gateway === "razorpay";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading}
      onPress={onPress}
      style={styles.wrapper}
    >
      <LinearGradient
        colors={
          loading
            ? ["#64748B", "#64748B"]
            : ["#4F46E5", "#7C3AED"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator
            color="#FFFFFF"
            size="small"
          />
        ) : (
          <>
            <Ionicons
              name={
                isRazorpay
                  ? "card-outline"
                  : "globe-outline"
              }
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.text}>
              {isRazorpay
                ? "Continue with Razorpay"
                : "Continue with Stripe"}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 20,
  },

  button: {
    height: 58,
    borderRadius: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },
});