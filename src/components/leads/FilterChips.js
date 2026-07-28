import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const FILTERS = [
  "all",
  "new",
  "contacted",
  "closed",
];

export default function FilterChips({
  selected,
  onSelect,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((item) => {
        const active = selected === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.85}
            onPress={() => onSelect(item)}
            style={[
              styles.chip,
              active && styles.activeChip,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {item.charAt(0).toUpperCase() +
                item.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingRight: 20,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
    marginBottom: 20
  },

  activeChip: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  text: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 14,
  },

  activeText: {
    color: "#FFFFFF",
  },
});