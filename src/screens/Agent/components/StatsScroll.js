import React from "react";
import {
  View,
  Text,
 StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

function StatCard({
  icon,
  title,
  value,
  subtitle,
  color,
  background,
}) {
  return (
    <View style={styles.card}>

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

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: color,
          },
        ]}
      />

    </View>
  );
}

export default function StatsScroll({
  activeListings,
  pendingListings,
  closedDeals,
  newLeads,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Overview
        </Text>

        <Text style={styles.updated}>
          Updated now
        </Text>

      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        <StatCard
          icon="home"
          title="Active Listings"
          value={activeListings}
          subtitle={`${pendingListings} Pending`}
          color="#3B82F6"
          background="#DBEAFE"
        />

        <StatCard
          icon="people"
          title="New Leads"
          value={newLeads}
          subtitle="Need Follow-up"
          color="#10B981"
          background="#DCFCE7"
        />

        <StatCard
          icon="checkmark-circle"
          title="Closed Deals"
          value={closedDeals}
          subtitle="Sold / Rented"
          color="#8B5CF6"
          background="#EDE9FE"
        />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -18,
    marginBottom: 20,
  },

  header: {
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  updated: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },

  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  card: {
    width: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginRight: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  value: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  title: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  bottomBar: {
    marginTop: 18,
    height: 4,
    borderRadius: 2,
    width: "100%",
  },
});