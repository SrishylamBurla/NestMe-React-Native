import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminStatsCard({
  title,
  value,
  icon,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.iconBox}>
        {icon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  title: {
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
});