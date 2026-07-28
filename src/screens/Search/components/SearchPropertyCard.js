import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { ActivityIndicator } from "react-native";
import {
  useGetSavedPropertiesQuery,
  useToggleSavePropertyMutation,
} from "../../../services/savedApi"

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 32;
const IMAGE_HEIGHT = 230;

export default function PropertyCard({
  property,
  onPress,
}) {
  const flatListRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0);

  const images =
    property?.images?.length > 0
      ? property.images
      : [
        {
          url: "https://placehold.co/800x600?text=No+Image",
        },
      ];

  const { data } = useGetSavedPropertiesQuery();

  const [toggleSaveProperty, { isLoading: saving }] =
    useToggleSavePropertyMutation();

  const isSaved =
    data?.saved?.some(
      (item) => item.property._id === property._id
    ) || false;

  const handleSave = async () => {
    try {
      await toggleSaveProperty(property._id).unwrap();
    } catch (err) {
      console.log("Save Property Error:", err);
    }
  };


  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImage(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderImage = ({ item }) => (
    <View style={styles.imageWrapper}>
      <Image
        source={{
          uri: item.url || item,
        }}
        style={styles.image}
      />

      {/* Verified Badge */}

      {property?.isVerified && (
        <View style={styles.verifiedBadge}>
          <Ionicons
            name="checkmark-circle"
            size={14}
            color="#fff"
          />

          <Text style={styles.badgeText}>
            Verified
          </Text>
        </View>
      )}

      {/* Featured Badge */}

      {property?.isFeatured && (
        <View style={styles.featuredBadge}>
          <Ionicons
            name="star"
            size={14}
            color="#fff"
          />

          <Text style={styles.badgeText}>
            Featured
          </Text>
        </View>
      )}

      {/* Wishlist */}

      <TouchableOpacity
        style={styles.wishlistButton}
        activeOpacity={0.85}
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
            name={isSaved ? "heart" : "heart-outline"}
            size={22}
            color={isSaved ? "#EF4444" : "#111827"}
          />
        )}
      </TouchableOpacity>

      {/* Image Counter */}

      <View style={styles.imageCounter}>
        <Ionicons
          name="images-outline"
          size={14}
          color="#fff"
        />

        <Text style={styles.counterText}>
          {activeImage + 1}/{images.length}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={styles.card}
    >
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        disableIntervalMomentum
        bounces={false}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEventThrottle={16}
      />

      {/* Pagination */}

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeImage === index &&
              styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* ---------- PART 2 STARTS HERE ---------- */}

      {/* Content */}
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onPress?.(property)}
      >
        <View style={styles.content}>

          {/* Price */}

          <Text style={styles.price}>
            {property?.priceLabel ||
              property?.price ||
              "₹ 0"}
          </Text>

          {/* Title */}

          <Text
            numberOfLines={2}
            style={styles.title}
          >
            {property?.title || "Untitled Property"}
          </Text>

          {/* Property Details */}

          <View style={styles.detailsRow}>

            <View style={styles.detailItem}>
              <Ionicons
                name="bed-outline"
                size={18}
                color="#6B7280"
              />

              <Text style={styles.detailText}>
                {property?.beds || 0} BHK
              </Text>
            </View>

            <View style={styles.dotDivider} />

            <View style={styles.detailItem}>
              <Ionicons
                name="resize-outline"
                size={18}
                color="#6B7280"
              />

              <Text style={styles.detailText}>
                {property?.areaSqFt || 0} sqft
              </Text>
            </View>

            <View style={styles.dotDivider} />

            <View style={styles.detailItem}>
              <Ionicons
                name="business-outline"
                size={18}
                color="#6B7280"
              />

              <Text style={styles.detailText}>
                {property?.status || "Ready"}
              </Text>
            </View>

          </View>

          {/* Address */}

          <View style={styles.locationRow}>

            <Ionicons
              name="location-outline"
              size={18}
              color="#7C3AED"
            />

            <Text
              numberOfLines={1}
              style={styles.location}
            >
              {[property?.city, property?.state]
                .filter(Boolean)
                .join(", ") ||
                property?.address ||
                "Location unavailable"}
            </Text>

          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  imageWrapper: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
  },

  price: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
    lineHeight: 24,
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 14,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },

  dotDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 12,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  location: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#6B7280",
  },
  verifiedBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  featuredBadge: {
    position: "absolute",
    top: 16,
    left: 116,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },

  wishlistButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  imageCounter: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },

  counterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  pagination: {
    position: "absolute",
    bottom: IMAGE_HEIGHT + 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "rgba(255,255,255,0.45)",
    marginHorizontal: 3,
  },

  activeDot: {
    width: 22,
    backgroundColor: "#FFFFFF",
  },

});