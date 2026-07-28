import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import StatusBadge from "./StatusBadge";

export default function LeadCard({
  lead,
  role = "user",
  onPress,
}) {
  if (!lead) return null;

  const buyer = lead.user;
  const property = lead.property;
  const agent = lead.agent?.user;

  const formattedDate = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString()
    : "";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {buyer?.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <View style={styles.headerContent}>
          <Text numberOfLines={1} style={styles.name}>
            {buyer?.name || "Unknown User"}
          </Text>

          <Text numberOfLines={1} style={styles.date}>
            {formattedDate}
          </Text>
        </View>
      </View>

      {/* Phone */}
      {!!lead.phone && (
        <View style={styles.row}>
          <Ionicons
            name="call-outline"
            size={18}
            color="#6B7280"
          />

          <Text style={styles.value}>
            {lead.phone}
          </Text>
        </View>
      )}

      {/* Property */}
      <View style={styles.row}>
        <Ionicons
          name="home-outline"
          size={18}
          color="#6B7280"
        />

        <Text
          numberOfLines={1}
          style={styles.value}
        >
          {property?.title || "Property"}
        </Text>
      </View>

      {/* Admin only */}
      {role === "admin" && agent && (
        <View style={styles.row}>
          <Ionicons
            name="person-outline"
            size={18}
            color="#6B7280"
          />

          <Text style={styles.value}>
            {agent.name}
          </Text>
        </View>
      )}

      {/* Message */}
      {!!lead.message && (
        <View style={styles.messageBox}>
          <Text
            numberOfLines={2}
            style={styles.message}
          >
            "{lead.message}"
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <StatusBadge status={lead.status} />

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#9CA3AF"
        />
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  header: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4F46E5",
  },

  headerContent: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    marginTop: 3,
    color: "#6B7280",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    marginLeft: 10,
    color: "#374151",
    fontSize: 14,
    flex: 1,
  },

  messageBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  message: {
    color: "#4B5563",
    fontStyle: "italic",
    lineHeight: 20,
  },

  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});