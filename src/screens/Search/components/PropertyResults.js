import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import SearchPropertyCard from "./SearchPropertyCard"
import { useNavigation } from "@react-navigation/native";

const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Ionicons
      name="search-outline"
      size={70}
      color="#CBD5E1"
    />

    <Text style={styles.emptyTitle}>
      No Properties Found
    </Text>

    <Text style={styles.emptySubtitle}>
      Try changing your search or filters.
    </Text>
  </View>
);

const PropertyResults = ({
  properties = [],
  loading = false,
  refreshing = false,
  onRefresh,
  onEndReached,
  ListHeaderComponent,
}) => {



  const navigation = useNavigation();

  const handlePropertyPress = (property) => {
    navigation.navigate("PropertyDetails", {
      id: property._id
    });
  };
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <SearchPropertyCard
          property={item}
          onPress={handlePropertyPress}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[
        styles.contentContainer,
        properties.length === 0 && styles.emptyContainer,
      ]}
      ListEmptyComponent={<EmptyComponent />}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      removeClippedSubviews
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={7}
      scrollEnabled={properties.length > 0}
    />
  );
};

export default PropertyResults;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 120,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#0d1220",
  },

  emptySubtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#182232",
    textAlign: "center",
    lineHeight: 22,
  },
});