import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PRIORITY_CONFIG = {
  low: {
    label: "Low",
    background: "#ECFDF5",
    color: "#10B981",
    dot: "#10B981",
  },

  medium: {
    label: "Medium",
    background: "#FEF3C7",
    color: "#D97706",
    dot: "#F59E0B",
  },

  high: {
    label: "High",
    background: "#FEE2E2",
    color: "#DC2626",
    dot: "#EF4444",
  },

  urgent: {
    label: "Urgent",
    background: "#FCE7F3",
    color: "#BE185D",
    dot: "#EC4899",
  },
};

const PriorityBadge = ({ priority = "medium" }) => {
  const config =
    PRIORITY_CONFIG[priority?.toLowerCase()] ||
    PRIORITY_CONFIG.medium;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.background,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: config.dot,
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: config.color,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

export default PriorityBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 18,
  },

  dot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});