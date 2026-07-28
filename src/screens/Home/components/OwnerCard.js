import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function OwnerCard({
  isLoggedIn,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        For Property Owners
      </Text>

      <Text style={styles.desc}>
        Perfect for individuals listing their own property.
      </Text>

      <Text style={styles.item}>
        ✓ Post one property for free
      </Text>

      <Text style={styles.item}>
        ✓ Reach verified buyers
      </Text>

      <Text style={styles.item}>
        ✓ Receive enquiries
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          {isLoggedIn
            ? "Post Your Property"
            : "Login to Post"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },

  desc: {
    color: "#CBD5E1",
    marginVertical: 10,
  },

  item: {
    color: "#fff",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#fff",
    marginTop: 22,
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#111827",
    fontWeight: "700",
  },
});