import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { useGetMeQuery } from "../../../services/authApi";

import OwnerCard from "./OwnerCard";
import BecomeAgentCard from "./BecomeAgentCard";
import AgentCard from "./AgentCard";
import LoginPromptCard from "./LoginPromptCard";

export default function ListingOptionsSection() {
  const navigation = useNavigation();

  const { data } = useGetMeQuery();

  const user = data?.user;

  const isLoggedIn = !!user;
  const isAgent = user?.role === "agent";

  const handleOwner = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
      return;
    }

    navigation.navigate("AddProperty");
  };

  const handleBecomeAgent = () => {
    navigation.navigate("Subscribe");
  };

  const handleDashboard = () => {
    navigation.navigate("AgentDashboard");
  };

  return (
    <LinearGradient
      colors={["#25d4cb", "#020617", "#0e776e"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>
        List Your Property on NestMe
      </Text>

      <Text style={styles.subtitle}>
        Sell or rent faster with verified buyers,
        smart tools and maximum visibility.
      </Text>

      <OwnerCard
        isLoggedIn={isLoggedIn}
        onPress={handleOwner}
      />

      {!isLoggedIn && (
        <LoginPromptCard
          onPress={() =>
            navigation.navigate("Login")
          }
        />
      )}

      {isLoggedIn && !isAgent && (
        <BecomeAgentCard
          onPress={handleBecomeAgent}
        />
      )}

      {isLoggedIn && isAgent && (
        <AgentCard
          user={user}
          onPress={handleDashboard}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 22,
  },
});