import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Header({
  title,
  subtitle,
}) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />

      <View
        style={[
          styles.container,
          {
            paddingTop:
              StatusBar.currentHeight || 0,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {!!subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 18,
    paddingBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F1F5F9",

    marginRight: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748B",
  },
});