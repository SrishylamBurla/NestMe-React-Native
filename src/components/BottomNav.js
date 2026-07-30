import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useGetMeQuery } from "../services/authApi";


export default function BottomNav({
  active = "home",
}) {
  const navigation = useNavigation();

  const { data } = useGetMeQuery();

  const role = data?.user?.role || "user";

  const navConfig = {
    user: [
      {
        key: "home",
        icon: "home-outline",
        screen: "Home",
      },
      {
        key: "properties",
        icon: "business-outline",
        screen: "MyProperties",
      },
      {
        key: "add",
        icon: "add",
        screen: "AddProperty",
        primary: true,
      },
      {
        key: "leads",
        icon: "people-outline",
        screen: "UserLeads",
      },
      {
        key: "profile",
        icon: "person-outline",
        screen: "Profile",
      },
    ],

    agent: [
      {
        key: "home",
        icon: "home-outline",
        screen: "Home",
      },
      {
        key: "properties",
        icon: "business-outline",
        screen: "MyProperties",
      },
      {
        key: "add",
        icon: "add",
        screen: "AddProperty",
        primary: true,
      },
      {
        key: "leads",
        icon: "people-outline",
        screen: "AgentLeads",
      },
      {
        key: "profile",
        icon: "person-outline",
        screen: "Profile",
      },
    ],

    admin: [
      {
        key: "dashboard",
        icon: "grid-outline",
        screen: "AdminSupportHome",
      },
      {
        key: "properties",
        icon: "business-outline",
        screen: "MyProperties",
      },
      {
        key: "leads",
        icon: "people-outline",
        screen: "AdminLeads",
      },
      {
        key: "profile",
        icon: "person-outline",
        screen: "Profile",
      },
    ],
  };

  const items = navConfig[role] || navConfig.user;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {items.map((item) => {
          const isActive = active === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.8}
              style={[
                styles.button,
                item.primary &&
                styles.primaryButton,
                isActive &&
                !item.primary &&
                styles.activeButton,
              ]}
              onPress={() =>
                navigation.navigate(item.screen)
              }
            >
              <Ionicons
                name={item.icon}
                size={item.primary ? 30 : 24}
                color={
                  item.primary
                    ? "#fff"
                    : isActive
                      ? "#111827"
                      : "#6B7280"
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 999,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 38,

    paddingHorizontal: 20,
    paddingVertical: 10,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 12,
  },

  button: {
    width: 46,
    height: 46,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 23,
  },

  activeButton: {
    backgroundColor: "#F3F4F6",
  },

  primaryButton: {
    width: 60,
    height: 60,

    borderRadius: 30,

    marginTop: -32,

    backgroundColor: "#07061c",

    shadowColor: "#4F46E5",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 12,
  },
});