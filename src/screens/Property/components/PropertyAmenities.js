import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

const AMENITY_ICONS = {
  wifi: require("../../../assets/amenities/wifi-signal.png"),
  parking: require("../../../assets/amenities/parking-car.png"),
  gym: require("../../../assets/amenities/dumbbell.png"),
  pool: require("../../../assets/amenities/swimming.png"),
  lift: require("../../../assets/amenities/elevator.png"),
  power_backup: require("../../../assets/amenities/inverter.png"),
  security: require("../../../assets/amenities/security-camera.png"),
  garden: require("../../../assets/amenities/flowers.png"),
  ac: require("../../../assets/amenities/air-conditioner.png"),
  furnished: require("../../../assets/amenities/living-room.png"),
};

const DEFAULT_ICON = require("../../../assets/amenities/default.png");

export default function PropertyAmenities({
  amenities = [],
}) {
  if (!amenities.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Amenities
      </Text>

      <View style={styles.grid}>
        {amenities.map((item) => (
          <View
            key={item}
            style={styles.card}
          >
            <Image
              source={
                AMENITY_ICONS[item] ||
                DEFAULT_ICON
              }
              style={styles.icon}
            />

            <Text style={styles.label}>
              {item.replace(/_/g, " ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 28,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "30%",

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    alignItems: "center",

    paddingVertical: 18,

    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  icon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },

  label: {
    marginTop: 10,

    fontSize: 12,

    textAlign: "center",

    color: "#475569",

    textTransform: "capitalize",
  },
});