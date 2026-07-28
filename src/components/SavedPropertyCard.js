import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRemoveSavedPropertyMutation } from "../services/savedApi";

export default function SavedPropertyCard({
  property,
  onPress,
}) {
  const [removeSavedProperty, { isLoading }] =
    useRemoveSavedPropertyMutation();

  const [optimisticRemove, setOptimisticRemove] =
    useState(false);

  if (!property) {
    return (
      <View style={styles.errorCard}>
        <Text style={styles.errorText}>
          This property is no longer available.
        </Text>
      </View>
    );
  }

  const handleRemove = async () => {
    try {
      setOptimisticRemove(true);
      await removeSavedProperty(property._id).unwrap();
    } catch (err) {
      setOptimisticRemove(false);
    }
  };

  if (optimisticRemove) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      {/* IMAGE */}

      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              property.images?.[0]?.url ||
              "https://via.placeholder.com/400",
          }}
          style={styles.image}
        />

        <View style={styles.typeTag}>
          <Text style={styles.typeText}>
            {property.listingType === "rent"
              ? "Rent"
              : property.listingType === "lease"
              ? "Lease"
              : "Sale"}
          </Text>
        </View>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.price}>
              ₹ {property.priceLabel?.toLocaleString()}

              {property.listingType === "rent" && (
                <Text style={styles.perMonth}>
                  {" "}
                  /mo
                </Text>
              )}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.title}
            >
              {property.title}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.location}
            >
              {property.city}, {property.state}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleRemove}
            disabled={isLoading}
          >
            <Ionicons
              name={
                isLoading
                  ? "hourglass-outline"
                  : "heart"
              }
              size={26}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>

        {/* META */}

        <View style={styles.meta}>
          {!!property.beds && (
            <View style={styles.metaItem}>
              <Ionicons
                name="bed-outline"
                size={16}
                color="#64748B"
              />

              <Text>{property.beds}</Text>
            </View>
          )}

          {!!property.baths && (
            <View style={styles.metaItem}>
              <Ionicons
                name="water-outline"
                size={16}
                color="#64748B"
              />

              <Text>{property.baths}</Text>
            </View>
          )}

          {!!property.areaSqFt && (
            <View style={styles.metaItem}>
              <Ionicons
                name="resize-outline"
                size={16}
                color="#64748B"
              />

              <Text>
                {property.areaSqFt} ft²
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 14,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  typeTag: {
    position: "absolute",
    bottom: 8,
    left: 8,

    backgroundColor: "rgba(255,255,255,0.95)",

    borderRadius: 12,

    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  typeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",
  },

  price: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111827",
  },

  perMonth: {
    fontSize: 12,
    color: "#64748B",
  },

  title: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  location: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },

  meta: {
    flexDirection: "row",
    marginTop: 14,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
    gap: 4,
  },

  errorCard: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
  },

  errorText: {
    color: "#DC2626",
    fontWeight: "600",
  },
});