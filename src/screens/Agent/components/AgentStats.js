import React from "react";
import {
  View,
  Text,
 StyleSheet,
} from "react-native";

function Stat({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

export default function AgentStats({
  agent,
}) {
  return (
    <View style={styles.container}>
      <Stat
        label="Active Listings"
        value={agent.totalListings || 0}
      />

      <Stat
        label="Deals Closed"
        value={agent.dealsClosed || 0}
      />

      <Stat
        label="Rating"
        value={agent.rating || 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 18,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 3,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
  },

  label: {
    marginTop: 8,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
  },
});