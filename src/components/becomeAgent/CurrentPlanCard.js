import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import { useCancelSubscriptionMutation } from "../../services/subscribeApi";
import DetailRow from "./DetailRow";

export default function CurrentPlanCard({
  subscription,
  daysRemaining,
  onDashboard,
  onUpgrade,
  onRefresh,
  onUserRefresh,
  navigation,
}) {
  const [cancelSubscription, { isLoading }] = useCancelSubscriptionMutation();

const handleCancel = () => {
  Alert.alert(
    "Cancel Subscription",
    "Are you sure you want to cancel your subscription?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            await cancelSubscription().unwrap();

            if (onRefresh) {
              await onRefresh();
            }

            if (onUserRefresh) {
              await onUserRefresh();
            }

            Toast.show({
              type: "success",
              text1: "Subscription Cancelled",
              text2: "Your account has been downgraded to a normal user.",
            });
          } catch (err) {
            Toast.show({
              type: "error",
              text1: "Cancellation Failed",
              text2:
                err?.data?.message ||
                "Failed to cancel subscription.",
            });
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        style={styles.header}
      >
        <Text style={styles.planLabel}>
          CURRENT PLAN
        </Text>

        <Text style={styles.planName}>
          {subscription?.plan || "Basic"}
        </Text>

        <Text style={styles.price}>
          ₹{subscription?.price}/month
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <DetailRow
          label="Status"
          value="Active"
        />

        <DetailRow
          label="Expiry Date"
          value={
            subscription?.endDate
              ? new Date(
                  subscription.endDate
                ).toLocaleDateString()
              : "--"
          }
        />

        <DetailRow
          label="Days Remaining"
          value={`${daysRemaining ?? 0} Days`}
        />

        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={onDashboard}
        >
          <Text style={styles.dashboardText}>
            Go To Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={onUpgrade}
        >
          <Text style={styles.upgradeText}>
            Upgrade Plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          disabled={isLoading}
          onPress={handleCancel}
        >
          <Text style={styles.cancelText}>
            {isLoading
              ? "Cancelling..."
              : "Cancel Subscription"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  header: {
    paddingVertical: 30,
    alignItems: "center",
  },

  planLabel: {
    color: "#E2E8F0",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
  },

  planName: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
    textTransform: "capitalize",
  },

  price: {
    color: "#E2E8F0",
    fontSize: 17,
    marginTop: 6,
  },

  content: {
    padding: 22,
  },

  dashboardBtn: {
    backgroundColor: "#16A34A",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  dashboardText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  upgradeBtn: {
    backgroundColor: "#1E293B",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },

  upgradeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  cancelBtn: {
    backgroundColor: "#DC2626",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 6,
  },

  cancelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});