import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

export default function LocationCard({ location }) {
  const openGoogleMaps = () => {
  if (
    location.lat != null &&
    location.lng != null
  ) {
    Linking.openURL(
      `https://www.google.com/maps?q=${location.lat},${location.lng}`
    );
  } else {
    const query = encodeURIComponent(
      `${location.address}, ${location.city}, ${location.state}`
    );

    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${query}`
    );
  }
};

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Location
      </Text>

      <View style={styles.row}>
        <Ionicons
          name="location"
          size={22}
          color="#4F46E5"
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.address}>
            {location.address}
          </Text>

          <Text style={styles.city}>
            {location.city}, {location.state}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={openGoogleMaps}
      >
        <Ionicons
          name="navigate"
          color="#fff"
          size={20}
        />

        <Text style={styles.buttonText}>
          Open in Google Maps
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    marginHorizontal: 18,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  address: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 10,
  },

  city: {
    marginTop: 4,
    marginLeft: 10,
    color: "#6B7280",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    height: 50,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 16,
  },
});