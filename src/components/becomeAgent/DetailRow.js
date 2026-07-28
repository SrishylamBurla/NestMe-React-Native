import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailRow({
  label,
  value,
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#94A3B8",
  },

  value: {
    color: "#fff",
    fontWeight: "700",
  },
});