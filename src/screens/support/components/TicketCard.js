import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import TicketStatusChip from "./TicketStatusChip";
import PriorityBadge from "./PriorityBadge";

const TicketCard = ({ ticket, onPress }) => {
  const unread =
    ticket.unreadUser || ticket.unreadAdmin || 0;

  const formattedTime = new Date(
    ticket.lastMessageAt || ticket.updatedAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* Header */}

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={styles.subject}
          >
            {ticket.subject}
          </Text>

          <Text style={styles.category}>
            {ticket.category}
          </Text>
        </View>

        <PriorityBadge
          priority={ticket.priority}
        />
      </View>

      {/* Status */}

      <View style={styles.statusRow}>
        <TicketStatusChip
          status={ticket.status}
        />

        <Text style={styles.date}>
          {formattedTime}
        </Text>
      </View>

      {/* Last Message */}

      <Text
        numberOfLines={2}
        style={styles.message}
      >
        {ticket.lastMessage ||
          "No messages yet"}
      </Text>

      {/* Footer */}

      <View style={styles.footer}>
        <View style={styles.left}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={16}
            color="#64748B"
          />

          <Text style={styles.ticketNumber}>
            {ticket.ticketNumber}
          </Text>
        </View>

        {unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {unread}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TicketCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 16,
    marginTop: 14,

    borderRadius: 20,

    padding: 18,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  subject: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  category: {
    marginTop: 4,

    color: "#64748B",

    fontSize: 13,

    textTransform: "capitalize",
  },

  statusRow: {
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
  },

  message: {
    marginTop: 16,

    color: "#475569",

    lineHeight: 22,

    fontSize: 14,
  },

  footer: {
    marginTop: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  ticketNumber: {
    marginLeft: 6,

    color: "#64748B",

    fontSize: 12,

    fontWeight: "600",
  },

  unreadBadge: {
    minWidth: 24,

    height: 24,

    borderRadius: 12,

    backgroundColor: "#EF4444",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 7,
  },

  unreadText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 12,
  },
});