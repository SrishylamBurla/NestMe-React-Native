import React from "react";
import { View, Text, StyleSheet } from "react-native";

const STATUS_CONFIG = {
  open: {
    label: "Open",
    background: "#DBEAFE",
    color: "#2563EB",
  },

  "waiting-support": {
    label: "Waiting for Support",
    background: "#FEF3C7",
    color: "#D97706",
  },

  "waiting-user": {
    label: "Waiting for You",
    background: "#EDE9FE",
    color: "#7C3AED",
  },

  resolved: {
    label: "Resolved",
    background: "#DCFCE7",
    color: "#16A34A",
  },

  closed: {
    label: "Closed",
    background: "#E5E7EB",
    color: "#6B7280",
  },
};

const TicketStatusChip = ({ status }) => {
  const config =
    STATUS_CONFIG[status] || STATUS_CONFIG.open;

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
            backgroundColor: config.color,
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

export default TicketStatusChip;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 30,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    marginRight: 8,
  },

  text: {
    fontSize: 12,

    fontWeight: "700",
  },
});