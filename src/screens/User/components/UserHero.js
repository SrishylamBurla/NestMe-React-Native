import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function UserHero({ user }) {

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
          {user?.name?.charAt(0)?.toUpperCase()}
        </Text>
      </View>

      <View style={{ marginLeft: 24 }}>
        <Text style={styles.name}>
          {user?.name}
        </Text>

        <Text style={styles.role}>
          Property Owner
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",

    padding: 24,
    paddingTop: 60,

    flexDirection: "row",
    alignItems: "center",

    elevation: 2,
  },

  backButton: {
  position: "absolute",
  top: 35,
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
    width: 72,
    height: 72,

    borderRadius: 36,

    backgroundColor: "#4F46E5",
    marginLeft: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  role: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 15,
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
});