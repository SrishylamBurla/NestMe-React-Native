import React, { useMemo, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from './components/SearchHeader';
import SearchInput from './components/SearchInput';
import ListingTabs from './components/ListingTabs';
import PropertyResults from './components/PropertyResults';
import FilterButton from './components/FilterButton';
// import BottomActionBar from "./components/BottomActionBar";
import FilterBottomSheet from './components/FilterBottomSheet';
import { useRoute } from '@react-navigation/native';

import { useGetPropertiesQuery } from '../../services/propertyApi';

export default function SearchScreen() {
  const sheetRef = useRef(null);

  const route = useRoute();
  const initialListingType = route.params?.listingType || 'sale';

  const [filters, setFilters] = useState({
    q: '',
    listingType: initialListingType,
    propertyType: '',
    beds: [],
    maxPrice: 50000000,
  });

  const { data, isLoading, isFetching, refetch } =
    useGetPropertiesQuery(filters);

  const properties = data?.properties || [];

  const activeFilters = useMemo(() => {
    let count = 0;

    if (filters.propertyType) count++;

    if (filters.beds.length) count++;

    if (filters.maxPrice !== 50000000) count++;

    return count;
  }, [filters]);

  const handleReset = () => {
    setFilters({
      q: '',
      listingType: 'sale',
      propertyType: '',
      beds: [],
      maxPrice: 50000000,
    });

    sheetRef.current?.close();
  };
  useFocusEffect(
    useCallback(() => {
      if (route.params?.listingType) {
        setFilters(prev => ({
          ...prev,
          listingType: route.params.listingType,
        }));
      }
    }, [route.params?.listingType]),
  );

  return (
    <>
    <StatusBar
      translucent={false}
      backgroundColor="#111827"
      barStyle="light-content"
    />

    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
    <View style={styles.container}>
    
      <SearchHeader resultCount={properties.length} />

      <SearchInput
        value={filters.q}
        onSearch={text =>
          setFilters(prev => ({
            ...prev,
            q: text,
          }))
        }
      />

      <View style={styles.filterRow}>
        <View style={styles.tabsContainer}>
          <ListingTabs
            value={filters.listingType}
            onChange={listingType =>
              setFilters(prev => ({
                ...prev,
                listingType,
              }))
            }
          />
        </View>

        <FilterButton
          activeFilters={activeFilters}
          onPress={() => sheetRef.current?.expand()}
        />
      </View>

      <View style={{ flex: 1 }}>
        <PropertyResults
          properties={properties}
          loading={isLoading}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      </View>
      {/* <BottomActionBar
        resultCount={properties.length}
        onReset={handleReset}
        onShowResults={() =>
          sheetRef.current?.close()
        }
      /> */}

      <FilterBottomSheet
        sheetRef={sheetRef}
        filters={filters}
        setFilters={setFilters}
        onApply={() => sheetRef.current?.close()}
        onReset={handleReset}
      />
      </View>
    </SafeAreaView>
    
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    // backgroundColor: '#F4F7FC',
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  tabsContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#111827", // Status bar area
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F7FC", // Screen content
    paddingBottom: 10,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  tabsContainer: {
    flex: 1,
  },
});
