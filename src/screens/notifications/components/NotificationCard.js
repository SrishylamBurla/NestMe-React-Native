import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useGetMeQuery } from "../../../services/authApi";
import { useMarkReadMutation } from "../../../services/notificationApi";

export default function NotificationCard({
  notification,
}) {
  const navigation = useNavigation();
  const { data } = useGetMeQuery();

  const user = data?.user;
  const role = user?.role;

  const [loading, setLoading] =
    useState(false);

  const [markRead] =
    useMarkReadMutation();


  const handlePress = async () => {
    try {
      setLoading(true);
      if (!notification.isRead) {
        await markRead(notification._id).unwrap();
      }

      switch (notification.type) {
        case "property-created":
        case "property-approved":
        case "property-pending":
        case "property-rejected":
          if (notification.entityId) {
            navigation.navigate("PropertyDetails", {
              id: notification.entityId,
            });
          } else {
            navigation.navigate("MyProperties");
          }
          break;

        case "lead-received":
          if (notification.entityId) {
            switch (role) {
              case "admin":
                navigation.navigate("AdminLeads", {
                  leadId: notification.entityId,
                });
                break;

              case "agent":
                navigation.navigate("AgentLeads", {
                  leadId: notification.entityId,
                });
                break;

              default:
                navigation.navigate("UserLeads", {
                  leadId: notification.entityId,
                });
            }
          } else {
            switch (role) {
              case "admin":
                navigation.navigate("AdminLeads");
                break;

              case "agent":
                navigation.navigate("AgentLeads");
                break;

              default:
                navigation.navigate("UserLeads");
            }
          }
          break;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getIcon = () => {
    switch (notification.type) {
      case "lead-received":
        return {
          icon: "people",
          color: "#2563EB",
          bg: "#DBEAFE",
        };

      case "property-created":
      case "property-pending":
        return {
          icon: "time",
          color: "#F59E0B",
          bg: "#FEF3C7",
        };

      case "property-approved":
        return {
          icon: "checkmark-circle",
          color: "#16A34A",
          bg: "#DCFCE7",
        };

      case "property-rejected":
        return {
          icon: "close-circle",
          color: "#DC2626",
          bg: "#FEE2E2",
        };

      default:
        return {
          icon: "notifications",
          color: "#4F46E5",
          bg: "#EEF2FF",
        };
    }
  };

  const icon = getIcon();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        !notification.isRead &&
        styles.unread,
      ]}
      onPress={handlePress}
    >
      <View
        style={[
          styles.iconBox,
          {
            backgroundColor:
              icon.bg,
          },
        ]}
      >
        <Ionicons
          name={icon.icon}
          size={22}
          color={icon.color}
        />
      </View>

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {notification.title}
        </Text>

        <Text
          numberOfLines={2}
          style={styles.message}
        >
          {notification.message}
        </Text>

        <Text style={styles.time}>
          {new Date(
            notification.createdAt
          ).toLocaleString()}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          color="#4F46E5"
        />
      ) : (
        <>
          {!notification.isRead && (
            <View style={styles.dot} />
          )}

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9CA3AF"
          />
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF",

    marginHorizontal: 16,
    marginBottom: 12,

    padding: 16,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#F1F5F9",

    elevation: 3,
  },

  unread: {
    borderLeftWidth: 4,
    borderLeftColor: "#4F46E5",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  message: {
    marginTop: 4,
    color: "#6B7280",
    lineHeight: 21,
    fontSize: 14,
  },

  time: {
    marginTop: 8,
    color: "#9CA3AF",
    fontSize: 12,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#4F46E5",
    marginRight: 10,
  },
});