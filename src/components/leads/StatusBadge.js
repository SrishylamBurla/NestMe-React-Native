import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function StatusBadge({ status }) {
  const current = (status || "new").toLowerCase();

  const config = {
    new: {
      bg: "#FEF3C7",
      color: "#B45309",
      icon: "time-outline",
      label: "New",
    },
    contacted: {
      bg: "#DBEAFE",
      color: "#1D4ED8",
      icon: "call-outline",
      label: "Contacted",
    },
    closed: {
      bg: "#DCFCE7",
      color: "#15803D",
      icon: "checkmark-circle-outline",
      label: "Closed",
    },
  };

  const item = config[current] || config.new;

  return (
    <View style={[styles.badge, { backgroundColor: item.bg }]}>
      <Ionicons
        name={item.icon}
        size={14}
        color={item.color}
      />
      <Text style={[styles.text, { color: item.color }]}>
        {item.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  text: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
  },
});