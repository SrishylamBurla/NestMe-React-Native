import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
// import {
//   useGetSavedPropertiesQuery,
//   useToggleSavePropertyMutation,
// } from "../../../services/savedApi";

export default function PropertyCard({
  property,
  onPress,
}) {

  return (
    <Pressable
      style={styles.card}
      android_ripple={{ color: "#eee" }}
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

        {/* Heart */}

        {/* <Pressable
          style={styles.heartButton}
          onPress={handleToggleSave}
        >
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={24}
            color={isSaved ? "#FF2D55" : "#FFFFFF"}
          />
        </Pressable> */}

        <View style={styles.priceTag}>
          <Text style={styles.price}>
            ₹ {property.priceLabel?.toLocaleString()}
          </Text>
        </View>

        <View style={styles.typeTag}>
          <Text style={styles.typeText}>
            {property.listingType === "sale"
              ? "For Sale"
              : property.listingType === "rent"
                ? "For Rent"
                : "For Lease"}
          </Text>
        </View>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
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

      {/* FOOTER */}

      <View style={styles.footer}>
        <View style={styles.info}>
          <Ionicons
            name="bed-outline"
            size={16}
            color="#777"
          />

          <Text>{property.beds}</Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="water-outline"
            size={16}
            color="#777"
          />

          <Text>{property.baths}</Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="resize-outline"
            size={16}
            color="#777"
          />

          <Text>{property.areaSqFt} ft²</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 285,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 16,
    elevation: 5,
  },

  // heartButton: {
  //   position: "absolute",
  //   top: 14,
  //   right: 14,

  //   width: 38,
  //   height: 38,
  //   borderRadius: 19,

  //   backgroundColor: "rgba(0,0,0,0.35)",

  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  imageContainer: {
    height: 190,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  priceTag: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#111",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  price: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  typeTag: {
    position: "absolute",
    top: 14,
    right: 14,

    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  typeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  content: {
    padding: 16,
  },

  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#222",
  },

  location: {
    marginTop: 6,
    color: "#777",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});