import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import {
  useGetSavedPropertiesQuery,
  useToggleSavePropertyMutation,
} from "../../../services/savedApi";

export default function CompactPropertyCard({
  property,
  onPress,
}) {
  const { data } = useGetSavedPropertiesQuery();

  const [toggleSaveProperty, { isLoading }] =
    useToggleSavePropertyMutation();

  const isSaved =
    data?.saved?.some(
      (item) => item.property._id === property._id
    ) || false;

  const handleSave = async (e) => {
    e?.stopPropagation?.();

    try {
      await toggleSaveProperty(property._id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* IMAGE */}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              property.images?.[0]?.url ||
              "https://via.placeholder.com/400",
          }}
          style={styles.image}
        />

        {/* HEART */}

        <TouchableOpacity
          style={styles.heart}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
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
              size={20}
              color={
                isSaved
                  ? "#EF4444"
                  : "#111827"
              }
            />
          )}
        </TouchableOpacity>

        {/* TYPE */}

        <View style={styles.type}>
          <Text style={styles.typeText}>
            {property.listingType === "sale"
              ? "Sale"
              : property.listingType === "rent"
              ? "Rent"
              : "Lease"}
          </Text>
        </View>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.price}
        >
          ₹{" "}
          {property.priceValue
            ? property.priceValue.toLocaleString()
            : property.priceLabel}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color="#64748B"
          />

          <Text
            numberOfLines={1}
            style={styles.location}
          >
            {property.city}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons
              name="bed-outline"
              size={15}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.beds || 0}
            </Text>
          </View>

          <View style={styles.meta}>
            <Ionicons
              name="water-outline"
              size={15}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.baths || 0}
            </Text>
          </View>

          <View style={styles.meta}>
            <Ionicons
              name="resize-outline"
              size={15}
              color="#475569"
            />

            <Text style={styles.metaText}>
              {property.areaSqFt}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 255,

    backgroundColor: "#fff",

    borderRadius: 22,

    overflow: "hidden",

    marginRight: 18,

    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  imageContainer: {
    height: 170,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  heart: {
    position: "absolute",

    top: 14,
    right: 14,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor:
      "rgba(255,255,255,.95)",

    justifyContent: "center",
    alignItems: "center",
  },

  type: {
    position: "absolute",

    bottom: 12,
    left: 12,

    backgroundColor: "#10B981",

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 15,
  },

  typeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },

  content: {
    padding: 14,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  title: {
    marginTop: 6,

    fontSize: 17,

    fontWeight: "700",

    color: "#111827",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },

  location: {
    marginLeft: 4,

    color: "#64748B",

    flex: 1,
  },

  footer: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 14,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    marginLeft: 4,

    color: "#475569",

    fontWeight: "600",

    fontSize: 12,
  },
});