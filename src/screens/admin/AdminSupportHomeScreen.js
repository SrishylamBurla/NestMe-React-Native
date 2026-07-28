// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import { useGetAdminSupportTicketsQuery } from "../../services/supportApi"

// export default function AdminSupportHomeScreen() {
//   const navigation = useNavigation();

//   const {
//     data,
//     isLoading,
//     refetch,
//   } = useGetAdminSupportTicketsQuery();

//   const tickets = data?.tickets || [];

//   if (isLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={tickets}
//       keyExtractor={(item) => item._id}
//       onRefresh={refetch}
//       refreshing={isLoading}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() =>
//             navigation.navigate("AdminSupportChat", {
//               ticketId: item._id,
//             })
//           }
//         >
//           <Text style={styles.ticketNumber}>
//             {item.ticketNumber}
//           </Text>

//           <Text style={styles.subject}>
//             {item.subject}
//           </Text>

//           <Text>
//             {item.user?.name}
//           </Text>

//           <Text>
//             {item.user?.role?.toUpperCase()}
//           </Text>

//           <Text>
//             Status: {item.status}
//           </Text>

//           <Text>
//             Priority: {item.priority}
//           </Text>

//           <Text>
//             Assigned:
//             {" "}
//             {item.assignedTo
//               ? item.assignedTo.name
//               : "Unassigned"}
//           </Text>
//         </TouchableOpacity>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//   },

//   card: {
//     backgroundColor: "#fff",
//     margin: 10,
//     padding: 15,
//     borderRadius: 10,
//     elevation: 3,
//   },

//   ticketNumber: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },

//   subject: {
//     marginTop: 5,
//     fontSize: 15,
//   },
// });

import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useGetAdminSupportTicketsQuery } from "../../services/supportApi"

import SupportHeader from "../../screens/support/components/SupportHeader"
import SearchBar from "../../screens/support/components/SearchBar";
import EmptyTickets from "../../screens/support/components/EmptyTickets";

export default function AdminSupportHomeScreen() {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdminSupportTicketsQuery();

  const tickets = data?.tickets || [];

  const filteredTickets = useMemo(() => {
    if (!search.trim()) return tickets;

    const keyword = search.toLowerCase();

    return tickets.filter((ticket) => {
      return (
        ticket.ticketNumber?.toLowerCase().includes(keyword) ||
        ticket.subject?.toLowerCase().includes(keyword) ||
        ticket.user?.name?.toLowerCase().includes(keyword) ||
        ticket.user?.role?.toLowerCase().includes(keyword) ||
        ticket.status?.toLowerCase().includes(keyword) ||
        ticket.priority?.toLowerCase().includes(keyword)
      );
    });
  }, [tickets, search]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#5B3DF5"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SupportHeader
        title="Support Tickets"
        subtitle={`${tickets.length} Tickets`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item._id}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={<EmptyTickets />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("AdminSupportChat", {
                ticketId: item._id,
              })
            }
          >
            <Text style={styles.ticketNumber}>
              #{item.ticketNumber}
            </Text>

            <Text style={styles.subject}>
              {item.subject}
            </Text>

            <Text style={styles.info}>
              {item.user?.name} •{" "}
              {item.user?.role?.toUpperCase()}
            </Text>

            <Text style={styles.info}>
              Status: {item.status}
            </Text>

            <Text style={styles.info}>
              Priority: {item.priority}
            </Text>

            <Text style={styles.info}>
              Assigned:{" "}
              {item.assignedTo?.name || "Unassigned"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

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

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  ticketNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5B3DF5",
  },

  subject: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
    marginBottom: 8,
  },

  info: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },
});