import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BottomActionBar = ({
  resultCount = 0,
  onReset,
  onShowResults,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.resetButton}
        onPress={onReset}
      >
        <Text style={styles.resetText}>
          Reset
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.resultButton}
        onPress={onShowResults}
      >
        <Text style={styles.resultText}>
          Show {resultCount} {resultCount === 1 ? "Property" : "Properties"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  resetButton: {
    width: 110,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  resetText: {
    color: "#334155",
    fontWeight: "700",
    fontSize: 15,
  },

  resultButton: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },

  resultText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});