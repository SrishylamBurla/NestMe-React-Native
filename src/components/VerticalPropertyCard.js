import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";

import {
  useGetSavedPropertiesQuery,
  useToggleSavePropertyMutation,
} from "../services/savedApi";

export default function VerticalPropertyCard({
  property,
}) {
  const navigation = useNavigation();
  const { data } = useGetSavedPropertiesQuery();

  const [toggleSaveProperty, { isLoading: saving }] =
    useToggleSavePropertyMutation();

    console.log("Property ID:", property._id);
  const goToDetails = () => {
    navigation.navigate("PropertyDetails", {
      id: property._id,
    });

  };

  const isSaved =
    data?.saved?.some(
      (item) => item.property._id === property._id
    ) || false;

  const handleSave = async (e) => {
    e?.stopPropagation?.();

    try {
      await toggleSaveProperty(property._id).unwrap();
    } catch (err) {
      console.log("Save Property Error:", err);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={goToDetails}
    >
      {/* ================= IMAGE ================= */}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              property.images?.[0]?.url ||
              "https://via.placeholder.com/600x400",
          }}
          style={styles.image}
        />

        {/* PRICE */}

        <View style={styles.priceChip}>
          <Text style={styles.price}>
            ₹{" "}
            {property.priceValue
              ? property.priceValue.toLocaleString()
              : property.priceLabel}
          </Text>
        </View>

        {/* SAVE */}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.favoriteButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator
              size="small"
              color="#EF4444"
            />
          ) : (
            <Ionicons
              name={
                isSaved
                  ? "heart"
                  : "heart-outline"
              }
              size={26}
              color={
                isSaved
                  ? "#EF4444"
                  : "#111827"
              }
            />
          )}
        </TouchableOpacity>

        {/* LISTING TYPE */}

        <View style={styles.listingChip}>
          <Text style={styles.listingText}>
            {property.listingType === "sale"
              ? "For Sale"
              : property.listingType === "rent"
                ? "For Rent"
                : "For Lease"}
          </Text>
        </View>
      </View>

      {/* ================= CONTENT ================= */}

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#64748B"
          />

          <Text
            numberOfLines={1}
            style={styles.location}
          >
            {property.city}, {property.state}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* FOOTER */}

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons
              name="bed-outline"
              size={18}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.beds || 0}
            </Text>
          </View>

          <View style={styles.meta}>
            <Ionicons
              name="water-outline"
              size={18}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.baths || 0}
            </Text>
          </View>

          <View style={styles.meta}>
            <Ionicons
              name="resize-outline"
              size={18}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.areaSqFt || 0} ft²
            </Text>
          </View>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={goToDetails}
          >
            <Text style={styles.detailsText}>
              View Details
            </Text>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    overflow: "hidden",

    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  imageContainer: {
    height: 235,
    backgroundColor: "#F3F4F6",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  priceChip: {
    position: "absolute",

    top: 18,
    left: 18,

    backgroundColor: "#111827",

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 24,
  },

  price: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
  },

  favoriteButton: {
    position: "absolute",

    top: 18,
    right: 18,

    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "rgba(255,255,255,0.96)",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 8,
  },

  listingChip: {
    position: "absolute",

    bottom: 18,
    right: 18,

    backgroundColor: "#10B981",

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 20,
  },

  listingText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  content: {
    padding: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },

  location: {
    flex: 1,

    marginLeft: 6,

    color: "#64748B",

    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 18,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",

    marginRight: 18,
  },

  metaText: {
    marginLeft: 5,

    color: "#334155",

    fontSize: 14,

    fontWeight: "600",
  },

  detailsButton: {
    marginLeft: "auto",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#111827",

    height: 42,

    paddingHorizontal: 16,

    borderRadius: 14,
  },

  detailsText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginRight: 5,
  },
});