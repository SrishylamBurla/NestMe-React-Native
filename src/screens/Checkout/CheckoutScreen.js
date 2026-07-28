import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as RNLocalize from "react-native-localize";

import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetAgentSubscriptionQuery,
} from "../../services/subscribeApi";

import { useGetMeQuery } from "../../services/authApi";
import { startRazorpayPayment } from "../../services/paymentService";

import PlanCard from "./components/PlanCard";
import GatewaySelector from "./components/GatewaySelector";
import PaymentButton from "./components/PaymentButton";
import SecureFooter from "./components/SecureFooter";

export default function CheckoutScreen() {
  const navigation = useNavigation();

  const {
    data: me,
    refetch: refetchUser,
  } = useGetMeQuery();

  const user = me?.user;

  const [createOrder] =
    useCreateOrderMutation();

  const [verifyPayment] =
    useVerifyPaymentMutation();

  const {
    refetch: refetchSubscription,
  } = useGetAgentSubscriptionQuery();

  const country =
    RNLocalize.getCountry();

  const defaultGateway =
    country === "IN"
      ? "razorpay"
      : "stripe";

  const [gateway, setGateway] =
    useState(defaultGateway);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const plan = "basic";

  const price = 999;
  
const handlePayment = async () => {

  if (paymentLoading) return;

  setPaymentLoading(true);

  try {

    if (gateway === "razorpay") {

      await startRazorpayPayment({
        plan: "basic",
        user,
        createOrder,
        verifyPayment,
        refetchSubscription,
        refetchUser,
        navigation,
      });

    }
  } catch (err) {
    console.log("Payment Error:", err);
  } finally {
    console.log("Loading false");
    setPaymentLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#fff"
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle}>
          Checkout
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Secure Checkout
        </Text>

        <Text style={styles.subtitle}>
          Complete your subscription
          in seconds.
        </Text>

        <PlanCard
          plan="Basic"
          price={price}
        />

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{price}
          </Text>
        </View>

        <GatewaySelector
          gateway={gateway}
          setGateway={setGateway}
        />

        <PaymentButton
          gateway={gateway}
          loading={paymentLoading}
          onPress={handlePayment}
        />

        <SecureFooter
          gateway={gateway}
        />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    paddingBottom: 40,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 25,
    paddingHorizontal: 30,
    lineHeight: 22,
  },

  totalCard: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#CBD5E1",
    fontSize: 16,
  },

  totalPrice: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
});