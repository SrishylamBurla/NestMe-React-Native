import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function UserStats({
  properties,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.count}>
        {properties.length}
      </Text>

      <Text style={styles.label}>
        Properties
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 18,

    backgroundColor: "#fff",

    borderRadius: 20,

    padding: 22,

    alignItems: "center",

    elevation: 3,
  },

  count: {
    fontSize: 34,
    fontWeight: "700",
    color: "#4F46E5",
  },

  label: {
    marginTop: 6,
    color: "#64748B",
    fontWeight: "600",
  },
});