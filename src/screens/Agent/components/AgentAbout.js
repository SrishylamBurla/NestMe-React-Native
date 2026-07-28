import React from "react";
import {
  View,
  Text,
 StyleSheet,
} from "react-native";

export default function AgentAbout({
  agent,
}) {
  const specs =
    agent.specializations ||
    ["Apartments", "Villas"];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        About Agent
      </Text>

      <Text style={styles.bio}>
        {agent.bio ||
          "Experienced real estate professional specializing in residential and commercial properties. Known for transparent dealings and strong local expertise."}
      </Text>

      <View style={styles.tags}>
        {specs.map((item) => (
          <View
            key={item}
            style={styles.tag}
          >
            <Text style={styles.tagText}>
              {item}
            </Text>
          </View>
        ))}
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
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  bio: {
    color: "#6B7280",
    lineHeight: 24,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },

  tag: {
    backgroundColor: "rgba(54,226,123,0.2)",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },

  tagText: {
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 12,
  },
});