import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import LinearGradient from "react-native-linear-gradient";
import PropertyCard from "./PropertyCard";
import { useGetPropertiesQuery } from "../../../services/propertyApi"
import { useNavigation } from "@react-navigation/native";


export default function CarouselSection({
  title,
  sortType = "latest",
  minPrice,
  gradient = ["#F8FAFC", "#FFFFFF"],
}) {
  const {
    data,
    isLoading,
    error,
  } = useGetPropertiesQuery({
    page: 1,
    limit: 10,
    sort: sortType,
    minPrice,
  });

  const navigation = useNavigation();
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Failed to load properties.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity
          style={styles.viewAll}
          onPress={() =>
            navigation.navigate("Properties")}
        >
          <Text style={styles.viewAllText}>
            View All
          </Text>

          {/* <Ionicons
            name="chevron-forward"
            size={18}
            color="#111827"
          /> */}
        </TouchableOpacity>
      </View>

      {/* LIST */}

      <FlatList
        horizontal
        data={data?.properties || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() =>
              navigation.navigate("PropertyDetails", {
                id: item._id,
              })
            }
          />
        )}
        nestedScrollEnabled
        removeClippedSubviews={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 22,
    // marginLeft: 12,
    paddingLeft: 10,
    // borderTopLeftRadius: 24,
    // borderBottomLeftRadius: 24,
    paddingVertical: 18,
    overflow: "hidden",
  },

  header: {
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginRight: 2,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
});