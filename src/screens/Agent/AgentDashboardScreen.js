import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardHeader from './components/DashboardHeader';
import StatsScroll from './components/StatsScroll';
import ProfileStats from './components/ProfileStats';
import QuickActions from './components/QuickActions';
import LeadsPreview from './components/LeadsPreview';
import PropertiesPreview from './components/PropertiesPreview';

import { useGetMeQuery } from '../../services/authApi';
import {
  useGetAgentPropertiesQuery,
  useGetAgentLeadsQuery,
} from '../../services/agentApi';

export default function AgentDashboardScreen({ navigation }) {
  /* ---------------- Current User ---------------- */

  const {
    data: meData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetMeQuery();

  const user = meData?.user;
  const agentId = user?.agentProfileId;

  /* ---------------- Properties ---------------- */

  const {
    data: propertiesData,
    isFetching: propertiesLoading,
    refetch: refetchProperties,
  } = useGetAgentPropertiesQuery(agentId, {
    skip: !agentId,
  });

  /* ---------------- Leads ---------------- */

  const {
    data: leadsData,
    isFetching: leadsLoading,
    refetch: refetchLeads,
  } = useGetAgentLeadsQuery(agentId, {
    skip: !agentId,
  });

  /* ---------------- Loading ---------------- */

  if (userLoading) {
    return (
      <>
        <StatusBar backgroundColor="#F4F7FC" barStyle="dark-content" />

        <SafeAreaView style={styles.center} edges={['top']}>
          <ActivityIndicator size="large" color="#5B3DF5" />
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </SafeAreaView>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar backgroundColor="#F4F7FC" barStyle="dark-content" />

        <SafeAreaView style={styles.center} edges={['top']}>
          <Text style={styles.errorTitle}>Not Logged In</Text>
          <Text style={styles.errorText}>Please login to continue.</Text>
        </SafeAreaView>
      </>
    );
  }

  if (!agentId) {
    return (
      <>
        <StatusBar backgroundColor="#F4F7FC" barStyle="dark-content" />

        <SafeAreaView style={styles.center} edges={['top']}>
          <Text style={styles.errorTitle}>Invalid Agent</Text>
          <Text style={styles.errorText}>Agent profile not found.</Text>
        </SafeAreaView>
      </>
    );
  }

  /* ---------------- Data ---------------- */

  const properties = propertiesData?.properties || [];
  const leads = leadsData?.leads || [];

  /* ---------------- Dashboard Stats ---------------- */

  const stats = useMemo(() => {
    const activeListings = properties.filter(
      p => p.approvalStatus === 'approved' && p.listingStatus === 'available',
    ).length;

    const pendingListings = properties.filter(
      p => p.approvalStatus === 'pending',
    ).length;

    const closedDeals = properties.filter(
      p => p.listingStatus === 'sold' || p.listingStatus === 'rented',
    ).length;

    const newLeads = leads.filter(l => l.status === 'new').length;

    return {
      activeListings,
      pendingListings,
      closedDeals,
      newLeads,
    };
  }, [properties, leads]);

  /* ---------------- Refresh ---------------- */

  const onRefresh = async () => {
    await Promise.all([refetchUser(), refetchProperties(), refetchLeads()]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={propertiesLoading || leadsLoading}
              onRefresh={onRefresh}
              colors={['#5B3DF5']}
              tintColor="#5B3DF5"
            />
          }
        >
          {/* Header */}

          <DashboardHeader user={user} navigation={navigation} />

          {/* Stats */}

          <StatsScroll
            activeListings={stats.activeListings}
            pendingListings={stats.pendingListings}
            closedDeals={stats.closedDeals}
            newLeads={stats.newLeads}
          />

          {/* Profile */}

          <ProfileStats user={user} navigation={navigation} />

          {/* Quick Actions */}

          <QuickActions navigation={navigation} agentId={agentId} />

          {/* Leads */}

          <LeadsPreview navigation={navigation} agentId={agentId} />

          {/* Properties */}

          <PropertiesPreview navigation={navigation} agentId={agentId} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F4F7FC',
  },

  content: {
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  errorText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 15,
  },
});

// import React, { useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import DashboardHeader from "../components/agent/DashboardHeader";
// import StatsScroll from "../components/agent/StatsScroll";
// import ProfileStats from "../components/profile/ProfileStats";
// import QuickActions from "../components/agent/QuickActions";
// import LeadsPreview from "../components/agent/LeadsPreview";
// import PropertiesPreview from "../components/agent/PropertiesPreview";

// import { useGetMeQuery } from "../../services/authApi";
// import {
//   useGetAgentPropertiesQuery,
//   useGetAgentLeadsQuery,
// } from "../../services/agentApi";

// export default function AgentDashboardScreen({ navigation }) {
//   /* ---------------- Current User ---------------- */

//   const {
//     data: meData,
//     isLoading: userLoading,
//     refetch: refetchUser,
//   } = useGetMeQuery();

//   const user = meData?.user;

//   const agentId = user?.agentProfileId;

//   /* ---------------- Properties ---------------- */

//   const {
//     data: propertiesData,
//     isFetching: propertiesLoading,
//     refetch: refetchProperties,
//   } = useGetAgentPropertiesQuery(agentId, {
//     skip: !agentId,
//   });

//   /* ---------------- Leads ---------------- */

//   const {
//     data: leadsData,
//     isFetching: leadsLoading,
//     refetch: refetchLeads,
//   } = useGetAgentLeadsQuery(agentId, {
//     skip: !agentId,
//   });

//   /* ---------------- Loading ---------------- */

//   if (userLoading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator
//           size="large"
//           color="#5B3DF5"
//         />

//         <Text style={styles.loadingText}>
//           Loading dashboard...
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   if (!user) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <Text style={styles.errorTitle}>
//           Not Logged In
//         </Text>

//         <Text style={styles.errorSubtitle}>
//           Please login to continue.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   if (!agentId) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <Text style={styles.errorTitle}>
//           Invalid Agent
//         </Text>

//         <Text style={styles.errorSubtitle}>
//           Agent profile not found.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   /* ---------------- Data ---------------- */

//   const properties =
//     propertiesData?.properties || [];

//   const leads =
//     leadsData?.leads || [];

//   /* ---------------- Stats ---------------- */

//   const stats = useMemo(() => {
//     const activeListings = properties.filter(
//       p =>
//         p.approvalStatus === "approved" &&
//         p.listingStatus === "available"
//     ).length;

//     const pendingListings =
//       properties.filter(
//         p => p.approvalStatus === "pending"
//       ).length;

//     const closedDeals =
//       properties.filter(
//         p =>
//           p.listingStatus === "sold" ||
//           p.listingStatus === "rented"
//       ).length;

//     const newLeads =
//       leads.filter(
//         l => l.status === "new"
//       ).length;

//     return {
//       activeListings,
//       pendingListings,
//       closedDeals,
//       newLeads,
//     };
//   }, [properties, leads]);

//   /* ---------------- Refresh ---------------- */

//   const onRefresh = () => {
//     refetchUser();
//     refetchProperties();
//     refetchLeads();
//   };

//   return (
//     <SafeAreaView
//       style={styles.container}
//       edges={["left", "right"]}
//     >
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={
//               propertiesLoading ||
//               leadsLoading
//             }
//             onRefresh={onRefresh}
//             colors={["#5B3DF5"]}
//           />
//         }
//       >
//         {/* Header */}

//         <DashboardHeader
//           user={user}
//           navigation={navigation}
//         />

//         {/* Stats */}

//         <StatsScroll
//           activeListings={
//             stats.activeListings
//           }
//           pendingListings={
//             stats.pendingListings
//           }
//           closedDeals={
//             stats.closedDeals
//           }
//           newLeads={
//             stats.newLeads
//           }
//         />

//         {/* Profile */}

//         <ProfileStats />

//         {/* Quick Actions */}

//         <QuickActions
//           navigation={navigation}
//           agentId={agentId}
//         />

//         {/* Recent Leads */}

//         <LeadsPreview
//           navigation={navigation}
//           agentId={agentId}
//         />

//         {/* Properties */}

//         <PropertiesPreview
//           navigation={navigation}
//           agentId={agentId}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F7FC",
//   },

//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#F4F7FC",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 24,
//   },

//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: "#64748B",
//     fontWeight: "600",
//   },

//   errorTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   errorSubtitle: {
//     marginTop: 8,
//     fontSize: 15,
//     color: "#64748B",
//     textAlign: "center",
//   },
// });
