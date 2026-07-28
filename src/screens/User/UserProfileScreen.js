import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import {
  useGetUserByIdQuery,
  useGetUserPropertiesQuery,
} from "../../services/userApi";

import UserHero from "./components/UserHero";
import UserStats from "./components/UserStats";
import UserAbout from "./components/UserAbout";
import UserProperties from "./components/UserProperties";

export default function UserProfileScreen() {
  const route = useRoute();

  const { userId } = route.params;

  const {
    data: user,
    isLoading,
  } = useGetUserByIdQuery(userId);

  const {
    data: propertiesData,
  } = useGetUserPropertiesQuery(userId);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          User not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <UserHero user={user} />

      <UserStats
        properties={
          propertiesData?.properties ||
          []
        }
      />

      <UserAbout user={user} />

      <UserProperties
        properties={
          propertiesData?.properties ||
          []
        }
      />
    </ScrollView>
  );
}