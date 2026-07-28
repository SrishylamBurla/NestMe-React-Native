import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import {
  useGetAgentPropertiesQuery,
  useGetAgentLeadsQuery,
} from "../../../services/agentApi";

function ActionCard({
  icon,
  title,
  subtitle,
  color,
  background,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.card,
        disabled && styles.disabledCard,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={color}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

export default function QuickActions({
  navigation,
  agentId,
}) {
  const { data: propertiesData } =
    useGetAgentPropertiesQuery(agentId, {
      skip: !agentId,
    });

  const { data: leadsData } =
    useGetAgentLeadsQuery(agentId, {
      skip: !agentId,
    });

  const properties =
    propertiesData?.properties || [];

  const leads =
    leadsData?.leads || [];

  const pendingCount = useMemo(() => {
    return properties.filter(
      p => p.approvalStatus === "pending"
    ).length;
  }, [properties]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.heading}>
          Quick Actions
        </Text>

        <Text style={styles.small}>
          Manage Faster ⚡
        </Text>
      </View>

      <View style={styles.grid}>

        <ActionCard
          icon="add-circle"
          title="Add Listing"
          subtitle={`${pendingCount} Pending`}
          color="#5B3DF5"
          background="#EDE9FE"
          onPress={() =>
            navigation.navigate("AddProperty")
          }
        />

        <ActionCard
          icon="people"
          title="Leads"
          subtitle={`${leads.length} Total`}
          color="#10B981"
          background="#DCFCE7"
          onPress={() =>
            navigation.navigate("AgentLeads")
          }
        />

        <ActionCard
          icon="business"
          title="My Listings"
          subtitle={`${properties.length} Properties`}
          color="#3B82F6"
          background="#DBEAFE"
          onPress={() =>
            navigation.navigate(
              "MyProperties"
            )
          }
        />

        <ActionCard
          icon="calendar"
          title="Appointments"
          subtitle="Coming Soon"
          color="#F59E0B"
          background="#FEF3C7"
          disabled
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
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

  small: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  disabledCard: {
    opacity: 0.55,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
});