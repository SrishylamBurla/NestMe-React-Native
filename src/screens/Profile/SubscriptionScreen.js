import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
    useGetAgentSubscriptionQuery,
} from "../../services/subscribeApi";

import { useGetMeQuery } from "../../services/authApi";

import CurrentPlanCard from "../../components/becomeAgent/CurrentPlanCard";
import PricingCard from "../../components/becomeAgent/PricingCard";

export default function SubscriptionScreen() {
    const navigation = useNavigation();

    const {
        data,
        refetch: refetchSubscription,
    } = useGetAgentSubscriptionQuery();

    const {
        refetch: refetchUser,
    } = useGetMeQuery();

    const subscription = data?.subscription;

    const daysRemaining = subscription?.endDate
        ? Math.max(
            0,
            Math.ceil(
                (new Date(subscription.endDate) - new Date()) /
                (1000 * 60 * 60 * 24)
            )
        )
        : 0;

    const handleDashboard = () => {
        navigation.navigate("AgentDashboard");
    };

    const handleUpgrade = () => {
        navigation.navigate("Checkout");
    };

    return (
        <SafeAreaView style={styles.container}>
            {subscription?.status === "active" ? (
                <CurrentPlanCard
                    subscription={subscription}
                    daysRemaining={daysRemaining}
                    onDashboard={handleDashboard}
                    onUpgrade={handleUpgrade}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
        padding: 20,
    },
});