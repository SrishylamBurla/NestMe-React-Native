import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ProfileStats({
  user,
  navigation,
}) {
  const completion = useMemo(() => {
    if (!user) return 0;

    const checks = [
      !!user?.profileImage,
      !!user?.name,
      !!user?.email,
      !!user?.phone,
      !!user?.bio,
      !!user?.agentProfile?.experience,
      !!user?.agentProfile?.specialization,
      !!user?.agentProfile?.company,
      !!user?.agentProfile?.address,
      !!user?.agentProfile?.licenseNumber,
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round(
      (completed / checks.length) * 100
    );
  }, [user]);

  const progressColor =
    completion >= 80
      ? "#10B981"
      : completion >= 50
      ? "#F59E0B"
      : "#EF4444";

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.left}>

          <Ionicons
            name="person-circle"
            size={26}
            color="#5B3DF5"
          />

          <Text style={styles.title}>
            Profile Completion
          </Text>

        </View>

        <Text
          style={[
            styles.percent,
            { color: progressColor },
          ]}
        >
          {completion}%
        </Text>

      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${completion}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      <Text style={styles.description}>
        Complete your profile to build trust
        and improve visibility to buyers.
      </Text>

      <View style={styles.infoRow}>

        <View style={styles.infoItem}>
          <Ionicons
            name={
              user?.isVerified
                ? "shield-checkmark"
                : "shield-outline"
            }
            size={18}
            color={
              user?.isVerified
                ? "#10B981"
                : "#F59E0B"
            }
          />

          <Text style={styles.infoText}>
            {user?.isVerified
              ? "Verified Agent"
              : "Verification Pending"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(
              "EditProfile"
            )
          }
        >
          <Text style={styles.buttonText}>
            Complete Profile
          </Text>

          <Ionicons
            name="arrow-forward"
            size={16}
            color="#FFF"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  percent: {
    fontSize: 22,
    fontWeight: "700",
  },

  progressBackground: {
    marginTop: 18,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  description: {
    marginTop: 14,
    color: "#64748B",
    lineHeight: 20,
    fontSize: 14,
  },

  infoRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B3DF5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    marginRight: 6,
  },
});