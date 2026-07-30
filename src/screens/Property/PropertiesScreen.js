import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import Header from '../../components/Header';
import FilterBar from './components/FilterBar';
import VerticalPropertyCard from '../../components/VerticalPropertyCard';
import { useRoute } from '@react-navigation/native';
import { useGetPropertiesQuery } from '../../services/propertyApi';

export default function PropertiesScreen() {
  const route = useRoute();

  const { propertyType = '' } = route.params || {};

  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    q: '',
    city: '',
    sort: 'latest',
    listingType: '',
    propertyType,
    beds: '',
    maxPrice: '',
  });

  const PROPERTY_LABELS = {
    apartment: 'Apartments',
    villa: 'Villas',
    plot: 'Plots',
    commercial: 'Commercials',
  };

  const { data, isLoading, error } = useGetPropertiesQuery(filters);

  // const properties = data?.properties || [];

  const filteredProperties = data?.properties || [];

  const { data: allData } = useGetPropertiesQuery({
    page: 1,
    limit: 12,
    q: '',
    city: '',
    sort: 'latest',
    listingType: '',
    propertyType: '',
    beds: '',
    maxPrice: '',
  });

  const showDefault = propertyType && filteredProperties.length === 0;

  const properties = showDefault
    ? allData?.properties || []
    : filteredProperties;

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>Failed to load properties.</Text>
      </View>
    );
  }
  // useEffect(() => {
  //   if (propertyType) {
  //     setFilters(prev => ({
  //       ...prev,
  //       page: 1,
  //       propertyType,
  //     }));
  //   }
  // }, [propertyType]);
  return (
    <View style={styles.container}>
      <Header
        title={PROPERTY_LABELS[propertyType] || 'Explore Properties'}
        subtitle={`${properties.length} properties found`}
      />

      <FilterBar filters={filters} setFilters={setFilters} />
      <FlatList
        data={properties}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <VerticalPropertyCard property={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: 120,
        }}
        ListHeaderComponent={
          showDefault ? (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                No {PROPERTY_LABELS[propertyType]} found. Showing all available
                properties.
              </Text>
            </View>
          ) : null
        }
        // ListEmptyComponent={
        //   <View style={styles.emptyContainer}>
        //     <Text style={styles.emptyTitle}>No properties found</Text>
        //     <Text style={styles.emptySubtitle}>Try changing your filters.</Text>
        //   </View>
        // }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 60,
},

emptyTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#1E293B",
  marginBottom: 8,
},

emptySubtitle: {
  fontSize: 15,
  color: "#64748B",
  textAlign: "center",
  paddingHorizontal: 24,
  lineHeight: 22,
},

infoBox: {
  backgroundColor: "#EEF2FF",
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#C7D2FE",
},

infoText: {
  fontSize: 14,
  color: "#4338CA",
  textAlign: "center",
  fontWeight: "600",
},
});
