import React from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";

import VerticalPropertyCard from "../../../components/VerticalPropertyCard";

export default function UserProperties({
  properties,
}) {
  if (!properties.length) {
    return (
      <View
        style={{
          padding: 30,
          alignItems: "center",
        }}
      >
        <Text>
          No properties listed yet.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item._id}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <VerticalPropertyCard
          property={item}
        />
      )}
      contentContainerStyle={{
        padding: 18,
      }}
    />
  );
}