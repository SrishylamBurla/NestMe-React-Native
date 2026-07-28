import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import VerticalPropertyCard from "../../../components/VerticalPropertyCard";

export default function AgentProperties({
  properties,
}) {
  if (!properties.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          No active listings from this agent
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Properties by this Agent
      </Text>

      <FlatList
        scrollEnabled={false}
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VerticalPropertyCard
            property={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    color: "#111827",
  },

  empty: {
    margin: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    elevation: 2,
  },

  emptyText: {
    color: "#6B7280",
    fontSize: 15,
  },
});