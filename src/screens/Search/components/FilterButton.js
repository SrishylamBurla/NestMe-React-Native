import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

const FilterButton = ({
  activeFilters = 0,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <Ionicons
        name="options-outline"
        size={20}
        color="#4F46E5"
      />
{/* 
      <Text style={styles.text}>
        Filters
      </Text> */}

      {activeFilters > 0 && (
        <Text style={styles.count}>
          ({activeFilters})
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginHorizontal: 0,
    marginBottom: 5,
    paddingHorizontal: 18,
    height: 40,
    backgroundColor: "#EEF2FF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },

  text: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#4F46E5",
  },

  count: {
    marginLeft: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#4F46E5",
  },
});