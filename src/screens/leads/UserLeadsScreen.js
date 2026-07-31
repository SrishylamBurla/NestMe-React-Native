import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import { useGetMyLeadsQuery } from "../../services/authApi";

import SearchBar from "../../components/leads/SearchBar";
import FilterChips from "../../components/leads/FilterChips";
import LeadCard from "../../components/leads/LeadCard";

export default function UserLeadsScreen() {
  const navigation = useNavigation();

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

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = ({ item }) => (
    <LeadCard
      lead={item}
      role="user"
      onPress={() =>
        navigation.navigate("LeadDetails", {
          lead: item,
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
            subtitle={`${filteredLeads.length} Leads`}
          />

          <View style={styles.searchSection}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search by buyer or property..."
            />

            <FilterChips
              selected={filter}
              onSelect={setFilter}
            />
          </View>

          <FlatList
            data={filteredLeads}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 30,
              flexGrow:
                filteredLeads.length === 0 ? 1 : undefined,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={onRefresh}
              />
            }
            ListEmptyComponent={
              !isLoading && (
                <View style={styles.empty}>
                  <Text style={styles.emptyTitle}>
                    No Leads Found
                  </Text>

                  <Text style={styles.emptyText}>
                    Leads for your properties will appear here.
                  </Text>
                </View>
              )
            }
          />
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 15,
  },

  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
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