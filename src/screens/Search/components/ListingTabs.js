import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const TABS = [
  {
    label: "Buy",
    value: "sale",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Lease",
    value: "lease",
  },
];

const ListingTabs = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = value === tab.value;

        return (
          <TouchableOpacity
            key={tab.value}
            activeOpacity={0.85}
            style={[
              styles.tab,
              active && styles.activeTab,
            ]}
            onPress={() => onChange(tab.value)}
          >
            <Text
              style={[
                styles.tabText,
                active && styles.activeText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ListingTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 30,
    padding: 4,
  },

  tab: {
    flex: 1,
    height: 40,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#5B3DF5",

    shadowColor: "#4F46E5",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});