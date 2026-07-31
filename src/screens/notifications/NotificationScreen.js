// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";

// import Header from "../../components/Header";
// import NotificationCard from "./components/NotificationCard";

// import {
//   useGetNotificationsQuery,
// } from "../../services/notificationApi"

// export default function NotificationsScreen() {
//   const { data, isLoading, error } =
//     useGetNotificationsQuery();


//   if (isLoading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator
//           size="large"
//           color="#4F46E5"
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Notifications"
//         showBack
//       />

//       {data?.length === 0 ? (
//         <View style={styles.empty}>
//           <Text style={styles.emptyIcon}>🔔</Text>

//           <Text style={styles.emptyTitle}>
//             No Notifications
//           </Text>

//           <Text style={styles.emptySub}>
//             We'll notify you when something
//             important happens.
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <NotificationCard
//               notification={item}
//             />
//           )}
//           contentContainerStyle={{
//             paddingVertical: 12,
//             paddingBottom: 100,
//           }}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   empty: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },

//   emptyIcon: {
//     fontSize: 58,
//   },

//   emptyTitle: {
//     marginTop: 18,
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#1E293B",
//   },

//   emptySub: {
//     marginTop: 8,
//     textAlign: "center",
//     color: "#64748B",
//     fontSize: 15,
//     lineHeight: 22,
//   },
// });

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import NotificationCard from "./components/NotificationCard";

import {
  useGetNotificationsQuery,
} from "../../services/notificationApi";

export default function NotificationsScreen() {
  const { data, isLoading } =
    useGetNotificationsQuery();

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
            title="Notifications"
            subtitle="Latest updates"
          />

          {data?.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🔔</Text>

              <Text style={styles.emptyTitle}>
                No Notifications
              </Text>

              <Text style={styles.emptySub}>
                We'll notify you when something
                important happens.
              </Text>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <NotificationCard
                  notification={item}
                />
              )}
              contentContainerStyle={{
                paddingVertical: 12,
                paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
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

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 58,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
  },

  emptySub: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
  },
});