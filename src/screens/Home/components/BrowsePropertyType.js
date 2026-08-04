import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const PROPERTY_TYPES = [
  {
    label: 'Apartment',
    type: 'apartment',
    image: require('../../../assets/icons/residential.png'),
  },
  {
    label: 'Villa',
    type: 'villa',
    image: require('../../../assets/icons/villa2.png'),
  },
  {
    label: 'Plot',
    type: 'plot',
    image: require('../../../assets/icons/plotting.png'),
  },
  {
    label: 'Commercial',
    type: 'commercial',
    image: require('../../../assets/icons/buildings.png'),
  },
];

export default function BrowsePropertyTypes() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Browse by Property Type</Text>

      <View style={styles.grid}>
        {PROPERTY_TYPES.map(item => (
          <TouchableOpacity
            key={item.type}
            activeOpacity={0.85}
            style={styles.item}
            onPress={() =>
              navigation.navigate('Properties', {
                propertyType: item.type,
              })
            }
          >
            <View style={styles.circle}>
              <Image source={item.image} style={styles.image} />
            </View>

            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2FF',
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    zIndex: 2,
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 28,
  },

  grid: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // heading: {
  //   fontSize: 23,
  //   textAlign: 'center',
  //   fontWeight: '800',
  //   color: '#1E293B',
  //   marginBottom: 28,
  // },

  // grid: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },

  item: {
    alignItems: 'center',
    width: '23%',
  },

  circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  label: {
    marginTop: 10,
    textAlign: 'center',
    color: '#334155',
    fontWeight: '700',
    fontSize: 13,
  },
});
