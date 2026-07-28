import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";


export default function AgentHero({ agent }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="#111827"
        />
      </TouchableOpacity>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {agent?.user?.name?.charAt(0)}
        </Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {agent.user?.name}
          </Text>

          {agent.verified && (
            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#2563EB"
            />
          )}
        </View>

        <Text style={styles.subtitle}>
          {agent.designation} • {agent.city}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            ⭐ {agent.rating}
          </Text>

          <Text style={styles.rating}>
            {agent.experienceYears}+ yrs experience
          </Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>
            Contact
          </Text>

          <Text style={styles.phone}>
            {agent.phone}
          </Text>

          <Text style={styles.email}>
            {agent.user?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E7EB",
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 26,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 18,

    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 6,

    zIndex: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(54,226,123,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#111827",
  },

  info: {
    width: "100%",
    marginTop: 18,
    alignItems: "center",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    marginRight: 6,
  },

  subtitle: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 15,
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  rating: {
    marginHorizontal: 10,
    color: "#4B5563",
  },

  contactCard: {
    marginTop: 18,
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 18,
  },

  contactTitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 8,
  },

  phone: {
    fontWeight: "700",
    fontSize: 17,
  },

  email: {
    marginTop: 4,
    color: "#6B7280",
  },
});