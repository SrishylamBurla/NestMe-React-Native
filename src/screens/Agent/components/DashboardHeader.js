import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Platform } from "react-native";

export default function DashboardHeader({
  user,
  navigation,
}) {
  const currentHour = new Date().getHours();

  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 17) {
    greeting = "Good Afternoon";
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "A";

  return (
    <>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor="#6f5ad5"
      /> */}

      <View style={styles.container}>

        {/* Top Row */}

        <View style={styles.topRow}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color="#FFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() =>
              navigation.navigate("Notifications")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>

        </View>

        {/* User */}

        <View style={styles.profileRow}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initials}
            </Text>
          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.greeting}>
              {greeting} 👋
            </Text>

            <Text style={styles.name}>
              {user?.name}
            </Text>

            <Text style={styles.subtitle}>
              Professional Real Estate Agent
            </Text>

          </View>

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: "#5B3DF5",
  paddingHorizontal: 20,

  paddingTop:
    Platform.OS === "android"
      ? StatusBar.currentHeight + 0
      : 60,

  paddingBottom: 28,
  marginBottom: 24,

  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5B3DF5",
  },

  greeting: {
    color: "#E9E5FF",
    fontSize: 15,
    fontWeight: "500",
  },

  name: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#D8D3FF",
  },
});