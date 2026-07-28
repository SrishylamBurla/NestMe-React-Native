import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useGetAllLeadsQuery } from "../../services/adminApi"

import SearchBar from "../../components/leads/SearchBar";
import FilterChips from "../../components/leads/FilterChips";
import LeadCard from "../../components/leads/LeadCard";
import AdminStatsCard from "../../components/admin/AdminStatsCard";

export default function AdminLeadsScreen({ navigation }) {
  const { data, isLoading, isError, refetch } =
    useGetAllLeadsQuery();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const leads = useMemo(
    () => data?.leads || [],
    [data]
  );

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    if (filter !== "all") {
      filtered = filtered.filter(
        item =>
          item.status?.toLowerCase() === filter
      );
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      filtered = filtered.filter(
        item =>
          item.user?.name
            ?.toLowerCase()
            .includes(keyword) ||

          item.property?.title
            ?.toLowerCase()
            .includes(keyword) ||

          item.agent?.user?.name
            ?.toLowerCase()
            .includes(keyword)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }, [leads, search, filter]);

  const stats = useMemo(
    () => ({
      total: leads.length,

      new: leads.filter(
        item => item.status === "new"
      ).length,

      contacted: leads.filter(
        item =>
          item.status === "contacted"
      ).length,

      closed: leads.filter(
        item => item.status === "closed"
      ).length,
    }),
    [leads]
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#FACC15"
        />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>
          Failed to load leads.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}

    <Header
    title="lead Management"
    subtitle="Track all customer leads"
     />

      {/* Search */}

      <View style={styles.searchContainer}>
  <SearchBar
    value={search}
    onChangeText={setSearch}
    placeholder="Search leads..."
  />
</View>
      {/* Stats */}

      <View style={styles.statsContainer}>

        <AdminStatsCard
          title="Total Leads"
          value={stats.total}
          icon={
            <Ionicons
              name="people"
              size={24}
              color="#CA8A04"
            />
          }
        />

        <AdminStatsCard
          title="New"
          value={stats.new}
          icon={
            <Ionicons
              name="time"
              size={24}
              color="#CA8A04"
            />
          }
        />

      </View>

      <View style={styles.statsContainer}>

        <AdminStatsCard
          title="Contacted"
          value={stats.contacted}
          icon={
            <Ionicons
              name="call"
              size={24}
              color="#CA8A04"
            />
          }
        />

        <AdminStatsCard
          title="Closed"
          value={stats.closed}
          icon={
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#CA8A04"
            />
          }
        />

      </View>

      {/* Filters */}
          <View style={{marginTop: 10}}>
      <FilterChips
        selected={filter}
        onSelect={setFilter}
      /></View>


      {/* Leads List */}

      <FlatList
        data={filteredLeads}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onRefresh={refetch}
        refreshing={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={60}
              color="#D1D5DB"
            />

            <Text style={styles.emptyTitle}>
              No Leads Found
            </Text>

            <Text style={styles.emptySubtitle}>
              No leads match your search or filter.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <LeadCard
            lead={item}
            role="admin"
            onPress={() =>
              navigation.navigate(
                "LeadDetails",
                {
                  lead: item,
                  role: "admin",
                }
              )
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
  },
searchContainer: {
  marginTop: 12,
  marginBottom: 16,
},
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 16,
    marginBottom: 10,
  },

      headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },

statsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
  gap: 15
},
  listContainer: {
    paddingTop: 16,
    paddingBottom: 30,
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 22,
  },

  error: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
});