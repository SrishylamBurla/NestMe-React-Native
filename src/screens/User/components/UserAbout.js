import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

export default function UserAbout({
  user,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        About Owner
      </Text>

      <Text style={styles.bio}>
        {user.bio ||
          "This property owner prefers direct communication regarding listings."}
      </Text>

      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={22}
          color="#4F46E5"
        />

        <Text style={styles.rowText}>
          Member since{" "}
          {new Date(
            user.createdAt
          ).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="checkmark-circle"
          size={22}
          color="#4F46E5"
        />

        <Text style={styles.rowText}>
          Verified User
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginTop: 18,

    backgroundColor: "#fff",

    borderRadius: 22,

    padding: 22,

    elevation: 3,
  },

  heading: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 18,
  },

  bio: {
    color: "#6B7280",
    lineHeight: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 22,
  },

  rowText: {
    marginLeft: 10,
    color: "#374151",
  },
});