import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import SearchBar from "../../components/leads/SearchBar";
import FilterChips from "../../components/leads/FilterChips";
import LeadCard from "../../components/leads/LeadCard";
import AdminStatsCard from "../../components/admin/AdminStatsCard";

import {
  useGetMeQuery,
  useGetMyLeadsQuery,
} from "../../services/authApi";

export default function AgentLeadsScreen() {
  const navigation = useNavigation();

  // Keeping this query in case authentication is required elsewhere.
  useGetMeQuery();

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyLeadsQuery();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const leads = data?.leads || [];

  const filteredLeads = useMemo(() => {
    let list = [...leads];

    if (filter !== "all") {
      list = list.filter(
        item => item.status?.toLowerCase() === filter
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter(
        item =>
          item.user?.name?.toLowerCase().includes(q) ||
          item.property?.title?.toLowerCase().includes(q)
      );
    }

    return list.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }, [leads, search, filter]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter(l => l.status === "new").length,
      contacted: leads.filter(
        l => l.status === "contacted"
      ).length,
      closed: leads.filter(l => l.status === "closed")
        .length,
    }),
    [leads]
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = ({ item }) => (
    <LeadCard
      lead={item}
      role="agent"
      onPress={() =>
        navigation.navigate("LeadDetails", {
          lead: item,
          role: "agent",
        })
      }
    />
  );

  if (isLoading) {
    return (
      <>
        <StatusBar
          backgroundColor="#F8FAFC"
          barStyle="dark-content"
        />

        <SafeAreaView
          style={styles.safeArea}
          edges={["top"]}
        >
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color="#4F46E5"
            />

            <Text style={styles.loadingText}>
              Loading Leads...
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor="#F8FAFC"
        barStyle="dark-content"
      />

      <SafeAreaView
        style={styles.safeArea}
        edges={["top"]}
      >
        <View style={styles.container}>
          <Header
            title="Leads on Your Properties"
            subtitle="Manage all customer enquiries"
          />

          <View style={styles.content}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search buyer or property..."
            />

            <View style={styles.statsRow}>
              <AdminStatsCard
                title="Total"
                value={stats.total}
                icon={
                  <Ionicons
                    name="people"
                    size={22}
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
                    size={22}
                    color="#CA8A04"
                  />
                }
              />
            </View>

            <View style={styles.statsRow}>
              <AdminStatsCard
                title="Contacted"
                value={stats.contacted}
                icon={
                  <Ionicons
                    name="call"
                    size={22}
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
                    size={22}
                    color="#CA8A04"
                  />
                }
              />
            </View>

            <FilterChips
              selected={filter}
              onSelect={setFilter}
            />

            <FlatList
              data={filteredLeads}
              keyExtractor={item => item._id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingBottom: 30,
                flexGrow:
                  filteredLeads.length === 0
                    ? 1
                    : undefined,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={onRefresh}
                />
              }
              ListEmptyComponent={
                <View style={styles.empty}>
                  <Ionicons
                    name="document-text-outline"
                    size={60}
                    color="#D1D5DB"
                  />

                  <Text style={styles.emptyTitle}>
                    No Leads Yet
                  </Text>

                  <Text style={styles.emptyText}>
                    Buyer enquiries assigned to you
                    will appear here.
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#64748B",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
    fontSize: 15,
  },
});