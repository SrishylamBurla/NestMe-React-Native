import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function BecomeAgentCard({ onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Recommended</Text>
      </View>

      <Text style={styles.title}>For Real Estate Agents</Text>

      <Text style={styles.desc}>
        Designed for professionals managing multiple listings.
      </Text>

      <View style={styles.item}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.itemText}>Unlimited property listings</Text>
      </View>

      <View style={styles.item}>
        <Ionicons name="grid" size={20} color="#fff" />
        <Text style={styles.itemText}>Advanced Agent Dashboard</Text>
      </View>

      <View style={styles.item}>
        <Ionicons name="people" size={20} color="#fff" />
        <Text style={styles.itemText}>Manage Leads & Enquiries</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Become an Agent</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#059669",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  badge: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 18,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  desc: {
    color: "#E5E7EB",
    marginVertical: 12,
    lineHeight: 22,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  itemText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#059669",
    fontWeight: "700",
    fontSize: 16,
  },
});