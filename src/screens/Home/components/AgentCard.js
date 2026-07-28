import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
export default function AgentCard({
  user,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        You are a Verified Agent
      </Text>

      <Text style={styles.desc}>
        Manage listings, leads and performance from your dashboard.
      </Text>

      <View style={styles.item}>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#fff"
        />
        <Text style={styles.itemText}>
          Unlimited property listings
        </Text>
      </View>

      <View style={styles.item}>
        <Ionicons
          name="people"
          size={20}
          color="#fff"
        />
        <Text style={styles.itemText}>
          Receive verified leads
        </Text>
      </View>

      <View style={styles.item}>
        <Ionicons
          name="analytics"
          size={20}
          color="#fff"
        />
        <Text style={styles.itemText}>
          Track performance
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          Agent Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(5, 150, 105, 0.3)', 
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  desc: {
    color: "#E5E7EB",
    marginVertical: 12,
    lineHeight: 22,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  itemText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#059669",
    fontWeight: "700",
    fontSize: 16,
  },
});