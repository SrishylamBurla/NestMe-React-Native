import React from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import {
  useGetAgentByIdQuery,
  useGetAgentPropertiesQuery,
} from "../../services/agentApi";

import AgentHero from "./components/AgentHero";
import AgentStats from "./components/AgentStats";
import AgentAbout from "./components/AgentAbout";
import AgentProperties from "./components/AgentProperties";

export default function AgentProfileScreen() {
  const route = useRoute();

  const { agentId } = route.params;

  const {
    data: agent,
    isLoading,
    error,
  } = useGetAgentByIdQuery(agentId);

  const {
    data: propertiesData,
    isLoading: propertiesLoading,
  } = useGetAgentPropertiesQuery(agentId, {
    skip: !agentId,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

        <Text style={styles.loadingText}>
          Loading agent profile...
        </Text>
      </View>
    );
  }

  if (error || !agent) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Agent not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <AgentHero agent={agent} />

      <AgentStats agent={agent} />

      <AgentAbout agent={agent} />

      {propertiesLoading ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          color="#4F46E5"
        />
      ) : (
        <AgentProperties
          properties={
            propertiesData?.properties || []
          }
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F3",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F4F3",
  },

  loadingText: {
    marginTop: 14,
    color: "#64748B",
    fontSize: 15,
  },

  errorText: {
    fontSize: 18,
    color: "#EF4444",
    fontWeight: "600",
  },
});