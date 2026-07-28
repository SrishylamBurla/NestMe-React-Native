import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function GatewaySelector({
  gateway,
  setGateway,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Choose Payment Method
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.card,
          gateway === "razorpay" &&
            styles.selectedCard,
        ]}
        onPress={() =>
          setGateway("razorpay")
        }
      >
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>
              🇮🇳
            </Text>
          </View>

          <View>
            <Text style={styles.title}>
              Razorpay
            </Text>

            <Text style={styles.subtitle}>
              Recommended for India
            </Text>
          </View>
        </View>

        {gateway === "razorpay" && (
          <Ionicons
            name="checkmark-circle"
            size={26}
            color="#4F46E5"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.card,
          gateway === "stripe" &&
            styles.selectedCard,
        ]}
        onPress={() =>
          setGateway("stripe")
        }
      >
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>
              🌍
            </Text>
          </View>

          <View>
            <Text style={styles.title}>
              Stripe
            </Text>

            <Text style={styles.subtitle}>
              Recommended Internationally
            </Text>
          </View>
        </View>

        {gateway === "stripe" && (
          <Ionicons
            name="checkmark-circle"
            size={26}
            color="#4F46E5"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 28,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#0F172A",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  selectedCard: {
    borderColor: "#4F46E5",
    backgroundColor: "rgba(79,70,229,0.12)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  emoji: {
    fontSize: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 13,
  },
});