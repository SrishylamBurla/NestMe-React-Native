import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

const EmptyTickets = ({ onCreate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={52}
          color="#5B3DF5"
        />
      </View>

      <Text style={styles.title}>
        No Support Tickets
      </Text>

      <Text style={styles.description}>
        Need help with a property, payment,
        verification, or any other issue?
        Create a support ticket and our team
        will get back to you as soon as possible.
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={onCreate}
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color="#FFFFFF"
        />

        <Text style={styles.buttonText}>
          Create Your First Ticket
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyTickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 28,

    paddingTop: 80,
  },

  iconContainer: {
    width: 100,
    height: 100,

    borderRadius: 50,

    backgroundColor: "#EEF2FF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",

    color: "#111827",

    marginBottom: 12,
  },

  description: {
    fontSize: 15,

    color: "#64748B",

    textAlign: "center",

    lineHeight: 24,

    marginBottom: 30,
  },

  button: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#5B3DF5",

    paddingHorizontal: 24,
    paddingVertical: 14,

    borderRadius: 16,

    shadowColor: "#5B3DF5",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "700",
    

    marginLeft: 10,
  },
});