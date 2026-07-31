import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useGetAgentLeadsQuery } from "../../../services/agentApi";

function LeadCard({ lead, navigation, agentId }) {
  const customerName =
    lead?.user?.name ||
    lead?.name ||
    "Unknown Customer";

  const propertyName =
    lead?.property?.title ||
    "Property Not Available";

  const date = lead?.createdAt
    ? new Date(lead.createdAt).toLocaleDateString()
    : "";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
        navigation.navigate("AgentLeads")
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {customerName.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.info}>

        <View style={styles.nameRow}>
          <Text
            numberOfLines={1}
            style={styles.name}
          >
            {customerName}
          </Text>

          {!lead?.isRead && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                NEW
              </Text>
            </View>
          )}
        </View>

        <Text
          numberOfLines={1}
          style={styles.property}
        >
          {propertyName}
        </Text>

        <View style={styles.bottomRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color="#94A3B8"
          />

          <Text style={styles.date}>
            {date}
          </Text>
        </View>

      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#CBD5E1"
      />
    </TouchableOpacity>
  );
}

export default function LeadsPreview({
  navigation,
  agentId,
}) {
  const {
    data,
    isLoading,
  } = useGetAgentLeadsQuery(agentId, {
    skip: !agentId,
  });

  const leads =
    data?.leads?.slice(0, 3) || [];

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Recent Leads
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AgentLeads")
          }
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      {isLoading && (
        <Text style={styles.message}>
          Loading leads...
        </Text>
      )}

      {!isLoading &&
        leads.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons
              name="people-outline"
              size={42}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Leads Yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Customer enquiries will appear here.
            </Text>
          </View>
        )}

      {!isLoading &&
        leads.length > 0 && (
          <FlatList
            data={leads}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <LeadCard
                lead={item}
                navigation={navigation}
                agentId={agentId}
              />
            )}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  viewAll: {
    color: "#5B3DF5",
    fontWeight: "600",
    fontSize: 14,
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    borderColor: "#5B3DF5"
  },

  message: {
    color: "#64748B",
    paddingVertical: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#5B3DF5",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
  },

  info: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  property: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  date: {
    marginLeft: 4,
    color: "#94A3B8",
    fontSize: 12,
  },

  badge: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },

  badgeText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 10,
  },

  emptyBox: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 36,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 6,
    color: "#64748B",
    textAlign: "center",
  },
});