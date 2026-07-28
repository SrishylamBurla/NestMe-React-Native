import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import { useGetSavedPropertiesQuery } from "../../services/savedApi";
import SavedPropertyCard from "../../components/SavedPropertyCard"
import Header from "../../components/Header"

export default function SavedPropertiesScreen() {
  const navigation = useNavigation();

  const { data, isLoading, error } = useGetSavedPropertiesQuery();

  const savedProperties = data?.saved || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

        <Text style={styles.loadingText}>
          Loading saved properties...
        </Text>
      </View>
    );
  }

  if (error) {
  return (
    <View style={styles.emptyContainer}>
      <Text>
        Failed to load saved properties.
      </Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#F8FAFC"
        barStyle="dark-content"
      />

      <Header
        title="Saved Properties"
        subtitle="Your favourite listings"
      />
{/* 
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            Saved Properties
          </Text>

          <Text style={styles.subtitle}>
            Your favourite listings
          </Text>
        </View>
      </View> */}

      {/* Empty */}

      {savedProperties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="heart"
            size={70}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            No saved properties yet
          </Text>

          <Text style={styles.emptySubtitle}>
            Tap the ❤️ icon to save a property
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedProperties}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SavedPropertyCard
              property={item.property}
              onPress={() =>
                navigation.navigate(
                  "PropertyDetails",
                  {
                    id: item.property._id,
                  }
                )
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 10,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 14,
    color: "#64748B",
    fontSize: 15,
  },

  // header: {
  //   flexDirection: "row",
  //   alignItems: "center",

  //   paddingHorizontal: 18,
  //   paddingTop: StatusBar.currentHeight || 0,
  //   paddingBottom: 14,

  //   backgroundColor: "#FFFFFF",

  //   borderBottomWidth: 1,
  //   borderBottomColor: "#E5E7EB",
  // },

  // backButton: {
  //   width: 42,
  //   height: 42,
  //   borderRadius: 21,

  //   backgroundColor: "#F1F5F9",

  //   justifyContent: "center",
  //   alignItems: "center",

  //   marginRight: 14,
  // },

  // title: {
  //   fontSize: 22,
  //   fontWeight: "700",
  //   color: "#0F172A",
  // },

  // subtitle: {
  //   marginTop: 2,
  //   color: "#64748B",
  //   fontSize: 13,
  // },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 21,
    fontWeight: "700",
    color: "#334155",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
  },
});