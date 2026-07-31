import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../../theme/fonts';

const PURPOSES = [
  { label: 'Buy', value: 'sale' },
  { label: 'Rent', value: 'rent' },
  { label: 'Lease', value: 'lease' },
];

export default function HeroSection() {
  const [selected, setSelected] = useState('sale');
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#33C9B5', '#050505', '#26A9E1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text
        style={[
          styles.title,
          {
            fontFamily: Fonts.Manrope.extrabold,
          },
        ]}
      >
        Find Your Perfect Property
      </Text>
      {/* <Text style={{
    fontFamily: Fonts.Manrope.extrabold,
    fontSize: 28,
  }}>Find Your Perfect Property</Text> */}

      <Text style={styles.subtitle}>
        Buy, Rent or Lease verified homes across India
      </Text>

      {/* Search */}

      <SearchBar onPress={() => navigation.navigate('Search')} />

      {/* Chips */}

      <View style={styles.chipsRow}>
        {PURPOSES.map(item => (
          <TouchableOpacity
            key={item.value}
            onPress={() => {
              setSelected(item.value);

              navigation.navigate('Search', {
                listingType: item.value,
              });
            }}
            style={[styles.chip, selected === item.value && styles.activeChip]}
          >
            <Text
              style={[
                styles.chipText,
                selected === item.value && styles.activeChipText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 160,
    paddingBottom: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },

  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    elevation: 4,
  },

  searchInput: {
    fontSize: 16,
    color: '#111',
  },

  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 6,
  },

  activeChip: {
    backgroundColor: '#111827',
  },

  chipText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 14,
  },

  activeChipText: {
    color: '#fff',
  },
});
