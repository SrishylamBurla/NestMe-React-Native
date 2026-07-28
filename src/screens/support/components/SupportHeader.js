import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

const SupportHeader = ({
  title = "Support",
  subtitle = "Usually replies within 10 minutes",
  showBack = false,
  onBackPress,
}) => {
  return (
    <>
      <StatusBar
        backgroundColor="#5B3DF5"
        barStyle="light-content"
      />

      <View style={styles.container}>
        <View style={styles.topRow}>
          {showBack ? (
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={onBackPress}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          </View>

          <View style={styles.placeholder} />
        </View>
      </View>
    </>
  );
};

export default SupportHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5B3DF5",

    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight + 12
        : 55,

    paddingBottom: 24,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.15)",

    justifyContent: "center",
    alignItems: "center",
  },

  placeholder: {
    width: 42,
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,

    color: "rgba(255,255,255,0.85)",

    fontSize: 13,
    fontWeight: "500",
  },
});