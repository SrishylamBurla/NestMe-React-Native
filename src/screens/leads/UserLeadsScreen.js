import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
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
        item =>
          item.status?.toLowerCase() === filter
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter(
        item =>
          item.user?.name
            ?.toLowerCase()
            .includes(q) ||
          item.property?.title
            ?.toLowerCase()
            .includes(q)
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
        navigation.navigate(
          "LeadDetails",
          {
            lead: item,
          }
        )
      }
    />
  );

  return (
    <View
      style={styles.container}
      edges={["top"]}
    >
      <StatusBar
        barStyle="light-content"
      />
      <View style={styles.content}>
        <View
          style={[
            styles.headerContainer,
          ]}
        >

          <Header
            showBack
            title="Leads on Your Properties"
            subtitle={`${filteredLeads.length} Leads`}
          />
          {/* <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color="#f3f4f7"
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.title}>
                My Leads
              </Text>

              <Text style={styles.subtitle}>
                {filteredLeads.length} Leads
              </Text>
            </View>
          </View> */}
        </View>
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
        <View style={{marginHorizontal:16}}>
        <FlatList
          data={filteredLeads}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
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
            !isLoading && (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  No Leads Found
                </Text>

                <Text style={styles.emptyText}>
                  Leads for your properties
                  will appear here.
                </Text>
              </View>
            )
          }
        /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    // backgroundColor: "#FFFFFF",
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
    fontSize: 26,
    fontWeight: "700",
    color: "#f2f3f7",
    marginBottom: 18,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748B",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
});