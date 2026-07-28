import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

export default function StepFive({ form }) {
  const image =
    form.images?.[0]?.uri ||
    "https://via.placeholder.com/800x500";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        Preview Property
      </Text>

      <Text style={styles.subtitle}>
        Review everything before publishing
      </Text>

      {/* HERO IMAGE */}

      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      {/* PRICE */}

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ₹{" "}
          {form.priceValue
            ? Number(
                form.priceValue
              ).toLocaleString()
            : "0"}
        </Text>

        <View style={styles.typeChip}>
          <Text style={styles.typeText}>
            {form.listingType}
          </Text>
        </View>
      </View>

      {/* TITLE */}

      <Text style={styles.propertyTitle}>
        {form.title || "Property Title"}
      </Text>

      {/* LOCATION */}

      <View style={styles.locationRow}>
        <Ionicons
          name="location-outline"
          size={18}
          color="#64748B"
        />

        <Text style={styles.location}>
          {form.city || "City"}
          {form.state
            ? `, ${form.state}`
            : ""}
        </Text>
      </View>

      {/* PROPERTY INFO */}

      <View style={styles.infoRow}>
        <View style={styles.info}>
          <Ionicons
            name="bed-outline"
            size={20}
            color="#4F46E5"
          />

          <Text style={styles.infoText}>
            {form.beds || 0} Beds
          </Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="water-outline"
            size={20}
            color="#4F46E5"
          />

          <Text style={styles.infoText}>
            {form.baths || 0} Baths
          </Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="resize-outline"
            size={20}
            color="#4F46E5"
          />

          <Text style={styles.infoText}>
            {form.areaSqFt || 0} ft²
          </Text>
        </View>
      </View>

      {/* DETAILS */}

      <View style={styles.card}>
        <Text style={styles.heading}>
          Property Details
        </Text>

        <Detail
          label="Property Type"
          value={form.propertyType}
        />

        <Detail
          label="Listing Type"
          value={form.listingType}
        />

        <Detail
          label="Furnishing"
          value={form.furnishing}
        />

        <Detail
          label="Facing"
          value={form.facing}
        />

        <Detail
          label="Price / SqFt"
          value={form.pricePerSqFt}
        />
      </View>

      {/* DESCRIPTION */}

      <View style={styles.card}>
        <Text style={styles.heading}>
          Description
        </Text>

        <Text style={styles.description}>
          {form.description ||
            "No description added."}
        </Text>
      </View>

      {/* ADDRESS */}

      <View style={styles.card}>
        <Text style={styles.heading}>
          Address
        </Text>

        <Text style={styles.description}>
          {form.address}
        </Text>

        <Text style={styles.locationText}>
          {form.city}, {form.state}
        </Text>
      </View>

      {/* AMENITIES */}

      <View style={styles.card}>
        <Text style={styles.heading}>
          Amenities
        </Text>

        <View style={styles.amenities}>
          {form.amenities.length ===
          0 ? (
            <Text
              style={styles.empty}
            >
              No amenities selected
            </Text>
          ) : (
            form.amenities.map(
              (item) => (
                <View
                  key={item}
                  style={
                    styles.amenityChip
                  }
                >
                  <Text
                    style={
                      styles.amenityText
                    }
                  >
                    {item}
                  </Text>
                </View>
              )
            )
          )}
        </View>
      </View>

      {/* IMAGES */}

      <View style={styles.card}>
        <Text style={styles.heading}>
          Images
        </Text>

        <Text style={styles.imageCount}>
          {form.images.length} Images
          Selected
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text style={styles.detailValue}>
        {value || "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    color: "#64748B",
    marginBottom: 22,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 22,
  },

  priceRow: {
    marginTop: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  typeChip: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
  },

  typeText: {
    color: "#fff",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  propertyTitle: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  location: {
    marginLeft: 5,
    color: "#64748B",
    fontSize: 15,
  },

  infoRow: {
    marginTop: 22,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    alignItems: "center",
    flex: 1,
  },

  infoText: {
    marginTop: 6,
    fontWeight: "600",
    color: "#334155",
  },

  card: {
    marginTop: 24,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  detailLabel: {
    color: "#64748B",
  },

  detailValue: {
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    color: "#475569",
    lineHeight: 24,
  },

  locationText: {
    marginTop: 8,
    color: "#64748B",
  },

  amenities: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  amenityChip: {
    backgroundColor: "#EEF2FF",

    marginRight: 8,
    marginBottom: 8,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,
  },

  amenityText: {
    color: "#4F46E5",
    fontWeight: "600",
  },

  empty: {
    color: "#94A3B8",
  },

  imageCount: {
    color: "#4F46E5",
    fontWeight: "700",
  },
});