import React, { useMemo, useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useGetSupportTicketsQuery } from "../../services/supportApi"

import SupportHeader from "./components/SupportHeader";
import SearchBar from "./components/SearchBar";
import TicketCard from "./components/TicketCard";
import EmptyTickets from "./components/EmptyTickets";
import NewTicketFAB from "./components/NewTicketFAB";

const SupportHomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");

    const {
        data,
        isLoading,
        isFetching,
        refetch,
        error
    } = useGetSupportTicketsQuery();

    const tickets = data?.tickets || [];

    const filteredTickets = useMemo(() => {
        if (!search.trim()) return tickets;

        return tickets.filter((ticket) => {
            const keyword = search.toLowerCase();

            return (
                ticket.subject?.toLowerCase().includes(keyword) ||
                ticket.category?.toLowerCase().includes(keyword)
            );
        });
    }, [tickets, search]);

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#5B3DF5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SupportHeader
                title="Support"
                showBack
                onBackPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        navigation.navigate("Home");
                    }
                }}
            />

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredTickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TicketCard
                        ticket={item}
                        onPress={() =>
                            navigation.navigate(
                                "SupportChat",
                                {
                                    ticketId: item._id,
                                }
                            )
                        }
                    />
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <EmptyTickets
                        onCreate={() =>
                            navigation.navigate("CreateTicket")
                        }
                    />
                }
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
            />

            <NewTicketFAB
                onPress={() =>
                    navigation.navigate("CreateTicket")
                }
            />
        </View>
    );
};

export default SupportHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FC",
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F7FC",
    },
});