import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

export default function PropertyOverview({ property }) {
  return (
    <View style={styles.container}>
      {/* STATUS */}

      <View style={styles.badges}>
        <View style={styles.saleBadge}>
          <Text style={styles.saleText}>
            {property.listingType === "sale"
              ? "For Sale"
              : property.listingType === "rent"
              ? "For Rent"
              : "For Lease"}
          </Text>
        </View>

        <View style={styles.verifyBadge}>
          <Ionicons
            name="checkmark-circle"
            color="#4F46E5"
            size={16}
          />

          <Text style={styles.verifyText}>
            Verified
          </Text>
        </View>
      </View>

      {/* TITLE */}

      <Text style={styles.title}>
        {property.title}
      </Text>

      {/* LOCATION */}

      <View style={styles.locationRow}>
        <Ionicons
          name="location"
          size={18}
          color="#64748B"
        />

        <Text style={styles.location}>
          {property.city}, {property.state}
        </Text>
      </View>

      {/* PRICE */}

      <View style={styles.priceCard}>
        <Text style={styles.priceLabel}>
          Starting Price
        </Text>

        <Text style={styles.price}>
          ₹{" "}
          {property.priceValue
            ? property.priceValue.toLocaleString()
            : property.priceLabel}
        </Text>

        <View style={styles.availableRow}>
          <View style={styles.dot} />

          <Text style={styles.availableText}>
            Available Now
          </Text>
        </View>
      </View>

      {/* STATS */}

      <View style={styles.stats}>
        <StatCard
          icon="bed-outline"
          value={property.beds || 0}
          label="Bedrooms"
        />

        <StatCard
          icon="water-outline"
          value={property.baths || 0}
          label="Bathrooms"
        />

        <StatCard
          icon="resize-outline"
          value={property.areaSqFt || 0}
          label="Sq.ft"
        />

        <StatCard
          icon="business-outline"
          value={property.propertyType || "Property"}
          label="Type"
        />
      </View>
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.iconCircle}>
        <Ionicons
          name={icon}
          size={22}
          color="#4F46E5"
        />
      </View>

      <Text
        numberOfLines={1}
        style={styles.statValue}
      >
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    paddingHorizontal: 18,
  },

  badges: {
    flexDirection: "row",
    marginBottom: 14,
  },

  saleBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 10,
  },

  saleText: {
    color: "#15803D",
    fontWeight: "700",
  },

  verifyBadge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EEF2FF",

    paddingHorizontal: 14,
    paddingVertical: 7,

    borderRadius: 20,
  },

  verifyText: {
    marginLeft: 5,
    color: "#4F46E5",
    fontWeight: "700",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  location: {
    marginLeft: 6,
    fontSize: 16,
    color: "#64748B",
  },

  priceCard: {
    marginTop: 24,

    backgroundColor: "#111827",

    borderRadius: 22,

    padding: 20,
  },

  priceLabel: {
    color: "#94A3B8",
    fontSize: 13,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 10,
  },

  availableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },

  availableText: {
    color: "#86EFAC",
    fontWeight: "600",
  },

  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    marginTop: 22,
  },

  statCard: {
    width: "48%",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    elevation: 3,
  },

  iconCircle: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#EEF2FF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  statLabel: {
    marginTop: 4,
    color: "#64748B",
  },
});