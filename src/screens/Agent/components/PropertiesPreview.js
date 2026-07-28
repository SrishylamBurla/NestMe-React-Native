import React from "react";
import {
  View,
  Text,
 StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useGetAgentPropertiesQuery } from "../../../services/agentApi"

function PropertyCard({
  property,
  navigation,
}) {
  const image =
    property?.images?.[0]?.url;

  const status =
    property?.approvalStatus === "pending"
      ? {
          label: "Pending",
          color: "#F59E0B",
          bg: "#FEF3C7",
        }
      : property?.approvalStatus ===
        "rejected"
      ? {
          label: "Rejected",
          color: "#DC2626",
          bg: "#FEE2E2",
        }
      : property?.listingStatus ===
        "sold"
      ? {
          label: "Sold",
          color: "#374151",
          bg: "#E5E7EB",
        }
      : property?.listingStatus ===
        "rented"
      ? {
          label: "Rented",
          color: "#374151",
          bg: "#E5E7EB",
        }
      : {
          label: "Available",
          color: "#059669",
          bg: "#D1FAE5",
        };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation.navigate(
          "AgentPropertyDetails",
          {
            propertyId: property._id,
          }
        )
      }
    >
      <Image
        source={{
          uri:
            image ||
            "https://placehold.co/600x400",
        }}
        style={styles.image}
      />

      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              status.bg,
          },
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            {
              color:
                status.color,
            },
          ]}
        >
          {status.label}
        </Text>
      </View>

      <View style={styles.content}>

        <Text
          style={styles.price}
          numberOfLines={1}
        >
          ₹
          {property?.priceValue?.toLocaleString()}
        </Text>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {property?.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={14}
            color="#64748B"
          />

          <Text
            numberOfLines={1}
            style={styles.location}
          >
            {property?.city},{" "}
            {property?.state}
          </Text>
        </View>

      </View>

    </TouchableOpacity>
  );
}

export default function PropertiesPreview({
  navigation,
  agentId,
}) {
  const {
    data,
    isLoading,
  } = useGetAgentPropertiesQuery(
    agentId,
    {
      skip: !agentId,
    }
  );

  const properties =
    data?.properties?.slice(0, 5) ||
    [];

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Your Properties
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "MyProperties"
            )
          }
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      {isLoading && (
        <Text style={styles.loading}>
          Loading properties...
        </Text>
      )}

      {!isLoading &&
        properties.length ===
          0 && (
          <View
            style={
              styles.emptyContainer
            }
          >
            <Ionicons
              name="home-outline"
              size={46}
              color="#CBD5E1"
            />

            <Text
              style={
                styles.emptyTitle
              }
            >
              No Listings Yet
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Add your first
              property to start
              receiving leads.
            </Text>
          </View>
        )}

      {!isLoading &&
        properties.length >
          0 && (
          <FlatList
            horizontal
            data={properties}
            style={{paddingBottom: 10}}
            keyExtractor={item =>
              item._id
            }
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingRight: 16,
            }}
            renderItem={({
              item,
            }) => (
              <PropertyCard
                property={
                  item
                }
                navigation={
                  navigation
                }
              />
            )}
          />
        )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 10,
      paddingLeft: 16,
    },

    header: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 14,
      paddingRight: 16,
    },

    heading: {
      fontSize: 20,
      fontWeight: "700",
      color: "#111827",
    },

    viewAll: {
      color: "#5B3DF5",
      fontWeight: "600",
    },

    loading: {
      color: "#64748B",
    },

    card: {
      width: 280,
      backgroundColor:
        "#FFF",
      borderRadius: 20,
      overflow: "hidden",
      marginRight: 16,

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 4,
    },

    image: {
      width: "100%",
      height: 170,
    },

    badge: {
      position: "absolute",
      top: 14,
      right: 14,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },

    badgeText: {
      fontWeight: "700",
      fontSize: 11,
    },

    content: {
      padding: 16,
    },

    price: {
      fontSize: 22,
      fontWeight: "700",
      color: "#111827",
    },

    title: {
      marginTop: 6,
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      minHeight: 42,
    },

    locationRow: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    location: {
      marginLeft: 4,
      color: "#64748B",
      flex: 1,
      fontSize: 13,
    },

    emptyContainer: {
      backgroundColor:
        "#FFF",
      borderRadius: 20,
      padding: 40,
      justifyContent:
        "center",
      alignItems: "center",
      marginRight: 16,

      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },

    emptyTitle: {
      marginTop: 14,
      fontSize: 18,
      fontWeight: "700",
      color: "#111827",
    },

    emptyText: {
      marginTop: 8,
      textAlign: "center",
      color: "#64748B",
      lineHeight: 22,
    },
  });