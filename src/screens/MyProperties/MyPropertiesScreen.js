import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { skipToken } from "@reduxjs/toolkit/query";

import Header from "../../components/Header";

import OwnerPropertyCard from "./components/OwnerPropertyCard";

import {
    useGetMeQuery,
    useGetMyPropertiesQuery,
} from "../../services/authApi";

import {
    useGetAgentPropertiesQuery,
} from "../../services/agentApi";

export default function MyPropertiesScreen() {
    /* ================= USER ================= */

    const {
        data: me,
        isLoading: userLoading,
    } = useGetMeQuery();

    const user = me?.user;

    const isAgent = user?.role === "agent";

    /* ================= USER PROPERTIES ================= */

    const {
        data: userData,
        isLoading: userPropertiesLoading,
    } = useGetMyPropertiesQuery(undefined, {
        skip: isAgent,
    });

    /* ================= AGENT PROPERTIES ================= */

    const {
        data: agentData,
        isLoading: agentPropertiesLoading,
    } = useGetAgentPropertiesQuery(
        isAgent
            ? user?.agentProfileId
            : skipToken
    );

    /* ================= DATA ================= */

    const data = isAgent
        ? agentData
        : userData;

    const isLoading =
        userLoading ||
        userPropertiesLoading ||
        agentPropertiesLoading;

    /* ================= STATES ================= */

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("all");

    const [sort, setSort] =
        useState("latest");

    /* ================= PROCESS ================= */

    const properties = useMemo(() => {
        if (!data?.properties) return [];

        let list = [...data.properties];

        /* FILTER */

        if (filter !== "all") {
            list = list.filter((item) => {
                if (filter === "pending") {
                    return (
                        item.approvalStatus ===
                        "pending"
                    );
                }

                if (filter === "rejected") {
                    return (
                        item.approvalStatus ===
                        "rejected"
                    );
                }

                if (isAgent) {
                    return (
                        item.approvalStatus ===
                        filter
                    );
                }

                return (
                    item.approvalStatus ===
                    "approved" &&
                    item.listingStatus ===
                    filter
                );
            });
        }

        /* SEARCH */

        if (search.trim()) {
            list = list.filter(
                (item) =>
                    item.title
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    item.city
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
        }

        /* SORT */

        switch (sort) {
            case "oldest":
                list.sort(
                    (a, b) =>
                        new Date(a.createdAt) -
                        new Date(b.createdAt)
                );
                break;

            case "priceHigh":
                list.sort(
                    (a, b) =>
                        (b.priceValue || 0) -
                        (a.priceValue || 0)
                );
                break;

            case "priceLow":
                list.sort(
                    (a, b) =>
                        (a.priceValue || 0) -
                        (b.priceValue || 0)
                );
                break;

            default:
                list.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );
        }

        return list;
    }, [
        data,
        search,
        filter,
        sort,
        isAgent,
    ]);

    /* ================= LOADING ================= */

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    size="large"
                    color="#4F46E5"
                />
            </View>
        );
    }

    /* ================= FILTERS ================= */

    const filters = isAgent
        ? [
            "all",
            "approved",
            "pending",
            "rejected",
        ]
        : [
            "all",
            "available",
            "rented",
            "sold",
            "pending",
            "rejected",
        ];

    /* ================= UI ================= */

    return (
        <View style={styles.container}>
            <Header
                showBack
                title="My Properties"
                subtitle={`${properties.length} Listings`}
            />

            {/* SEARCH */}

            <View
                style={styles.searchRow}
            >
                <TextInput
                    placeholder="Search title or city..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                    placeholderTextColor="#94A3B8"
                />

                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => {
                        const next =
                            sort === "latest"
                                ? "oldest"
                                : sort === "oldest"
                                    ? "priceHigh"
                                    : sort ===
                                        "priceHigh"
                                        ? "priceLow"
                                        : "latest";

                        setSort(next);
                    }}
                >
                    <Text
                        style={
                            styles.sortText
                        }
                    >
                        {sort === "latest"
                            ? "Latest"
                            : sort ===
                                "oldest"
                                ? "Oldest"
                                : sort ===
                                    "priceHigh"
                                    ? "High"
                                    : "Low"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* FILTERS */}

            <FlatList
                horizontal
                data={filters}
                keyExtractor={(i) => i}
                showsHorizontalScrollIndicator={
                    false
                }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 10,

                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            setFilter(item)
                        }
                        style={[
                            styles.filterChip,
                            filter === item &&
                            styles.activeChip,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === item &&
                                styles.activeFilterText,
                            ]}
                        >
                            {item
                                .charAt(0)
                                .toUpperCase() +
                                item.slice(1)}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* LIST */}

            <FlatList
                data={properties}
                keyExtractor={(i) => i._id}
                renderItem={({
                    item,
                }) => (
                    <OwnerPropertyCard
                        property={item}
                        isAgent={isAgent}
                        onPreview={() =>
                            navigation.navigate(
                                "PropertyDetails",
                                { id: item._id }
                            )
                        }
                        onEdit={() =>
                            navigation.navigate(
                                "EditProperty",
                                { id: item._id }
                            )
                        }
                    />
                )}
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 120,
                    marginTop: 10,
                }}
                ListEmptyComponent={
                    <View
                        style={
                            styles.empty
                        }
                    >
                        <Text
                            style={
                                styles.emptyTitle
                            }
                        >
                            No Properties
                            Found
                        </Text>

                        <Text
                            style={
                                styles.emptySub
                            }
                        >
                            Your
                            properties
                            will
                            appear
                            here.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: 10,
            backgroundColor:
                "#F8FAFC",
        },

        loading: {
            flex: 1,
            justifyContent:
                "center",
            alignItems:
                "center",
        },

        searchRow: {
            flexDirection:
                "row",
            paddingHorizontal: 16,
            marginTop: 18,
            marginBottom: 12,
        },

        searchInput: {
            flex: 1,
            height: 48,
            backgroundColor:
                "#FFFFFF",
            borderRadius: 14,
            paddingHorizontal: 16,
            elevation: 2,
            marginRight: 10,
            fontSize: 15,
        },

        sortButton: {
            paddingHorizontal: 18,
            borderRadius: 14,
            backgroundColor:
                "#4F46E5",
            justifyContent:
                "center",
        },

        sortText: {
            color: "#fff",
            fontWeight:
                "700",
        },

        filterChip: {
            height: 38,
            paddingHorizontal: 22,
            borderRadius: 19,
            backgroundColor:
                "#FFFFFF",
            justifyContent:
                "center",
            marginRight: 10,
            marginBottom: 15,
            elevation: 2,
        },

        activeChip: {
            backgroundColor:
                "#4F46E5",
        },

        filterText: {
            color: "#475569",
            fontWeight:
                "600",
        },

        activeFilterText:
        {
            color: "#fff",
        },

        empty: {
            alignItems:
                "center",
            marginTop: 120,
        },

        emptyTitle: {
            fontSize: 22,
            fontWeight:
                "700",
            color: "#334155",
        },

        emptySub: {
            marginTop: 8,
            color: "#64748B",
            textAlign:
                "center",
        },
    });