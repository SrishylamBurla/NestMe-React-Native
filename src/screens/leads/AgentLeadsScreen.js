import React, { useMemo, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import { useGetMyLeadsQuery } from "../../services/authApi";

import SearchBar from "../../components/leads/SearchBar";
import FilterChips from "../../components/leads/FilterChips";
import LeadCard from "../../components/leads/LeadCard";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import { useGetMeQuery } from "../../services/authApi";

export default function AgentLeadsScreen() {
    const navigation = useNavigation();
    const { data: me } = useGetMeQuery();

    const agentId = me?.user?.agentProfileId;
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
            new: leads.filter(
                l => l.status === "new"
            ).length,
            contacted: leads.filter(
                l => l.status === "contacted"
            ).length,
            closed: leads.filter(
                l => l.status === "closed"
            ).length,
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

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top"]}
        ><StatusBar
                barStyle="dark-content"
              />
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={22}
                                color="#111827"
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>
                            My Leads
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        Manage all customer enquiries assigned to you
                    </Text>
                </View>

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
                            filteredLeads.length === 0 ? 1 : 0,
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
                                <Ionicons
                                    name="document-text-outline"
                                    size={60}
                                    color="#D1D5DB"
                                />

                                <Text style={styles.emptyTitle}>
                                    No Leads Yet
                                </Text>

                                <Text style={styles.emptyText}>
                                    Buyer enquiries assigned to you will appear here.
                                </Text>
                            </View>
                        )
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
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
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 20,
        fontSize: 15,
        color: "#6B7280",
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
        marginTop: 5,
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