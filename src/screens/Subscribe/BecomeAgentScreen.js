import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useGetAgentSubscriptionQuery } from "../../services/subscribeApi";
import { useGetMeQuery } from "../../services/authApi";

import PricingCard from "../../components/becomeAgent/PricingCard";
import CurrentPlanCard from "../../components/becomeAgent/CurrentPlanCard";

export default function BecomeAgentScreen() {
  const navigation = useNavigation();

  const {
    data,
    isLoading,
    refetch: refetchSubscription,
  } = useGetAgentSubscriptionQuery();

  const {
    refetch: refetchUser,
  } = useGetMeQuery();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  const subscription = data?.subscription;

  const isActive =
    subscription?.status === "active" &&
    subscription?.endDate &&
    new Date(subscription.endDate) > new Date();

  const daysRemaining = subscription?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(subscription.endDate) - new Date()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <Ionicons
                name="chevron-back"
                size={26}
                color="#fff"
                onPress={() => navigation.goBack()}
              />
      
              <Text style={styles.headerTitle}>Subscribe</Text>
      
              <View style={{ width: 26 }} />
            </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Grow Your Real Estate Business
        </Text>

        <Text style={styles.brand}>
          with NestMe Agent
        </Text>

        <Text style={styles.subtitle}>
          Join thousands of agents closing deals faster.
        </Text>

        {isActive ? (
          <CurrentPlanCard
            subscription={subscription}
            daysRemaining={daysRemaining}
            onDashboard={() =>
              navigation.navigate("AgentDashboard")
            }
            onUpgrade={() =>
              navigation.navigate("Checkout")
            }
            onRefresh={refetchSubscription}
            onUserRefresh={refetchUser}
            navigation={navigation}
          />
        ) : (
          <PricingCard
            onSubscribe={() =>
              navigation.navigate("Checkout")
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },


  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginTop: 25,
  },

  brand: {
    fontSize: 34,
    fontWeight: "800",
    color: "#6366F1",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
    marginBottom: 35,
  },

});