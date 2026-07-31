import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  useGetPropertyByIdQuery,
  useGetSimilarPropertiesQuery,
} from '../../services/propertyApi';

import HeroCarousel from './components/HeroCarousel';
import PropertyOverview from './components/PropertyOverview';
import PropertyAmenities from './components/PropertyAmenities';
import LocationCard from './components/LocationCard';
import PropertyAgent from './components/PropertyAgent';
import SimilarProperties from './components/SimilarProperties';
import ContactOwnerForm from './components/ContactOwnerForm';

export default function PropertyDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;


  const {
    data: property,
    isLoading,
    error,
  } = useGetPropertyByIdQuery(id);


  const { data: similarData } = useGetSimilarPropertiesQuery(
    {
      city: property?.city,
      exclude: property?._id,
    },
    {
      skip: !property,
    },
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />

        <Text style={styles.loading}>Loading Property...</Text>
      </View>
    );
  }

  if (error || !property) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={70} color="#EF4444" />

        <Text style={styles.errorTitle}>Failed to load property</Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="light-content"
  />
    <View style={styles.container}>
      <HeroCarousel property={property} images={property.images} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}

        {/* OVERVIEW */}

        <PropertyOverview property={property} />

        {/* DESCRIPTION */}

        {!!property.description && (
          <View style={styles.section}>
            <Text style={styles.heading}>About Property</Text>

            <Text style={styles.description}>{property.description}</Text>
          </View>
        )}

        {/* AMENITIES */}

        <PropertyAmenities amenities={property.amenities} />

        {/* LOCATION */}

        {/* <PropertyLocation
                    location={{
                        address: property.address,
                        city: property.city,
                        state: property.state,
                        lat: property.location?.lat,
                        lng: property.location?.lng,
                    }}
                /> */}

        <LocationCard
          location={{
            address: property.address,
            city: property.city,
            state: property.state,
            lat: property.location?.lat ?? property.lat,
            lng: property.location?.lng ?? property.lng,
          }}
        />

        {/* AGENT */}

        <PropertyAgent
          property={property}
          onEnquiry={() =>
            navigation.navigate('Enquiry', {
              propertyId: property._id,
            })
          }
        />

        <ContactOwnerForm propertyId={property._id} />

        {/* SIMILAR */}

        <SimilarProperties properties={similarData?.properties || []} />

        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>

      {/* STICKY ACTION BAR */}
      {/* 
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor:
                                "#111827",
                        },
                    ]}
                >
                    <Ionicons
                        name="call"
                        size={22}
                        color="#fff"
                    />

                    <Text
                        style={
                            styles.actionText
                        }
                    >
                        Call
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor:
                                "#22C55E",
                        },
                    ]}
                >
                    <Ionicons
                        name="logo-whatsapp"
                        size={22}
                        color="#fff"
                    />

                    <Text
                        style={
                            styles.actionText
                        }
                    >
                        WhatsApp
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        {
                            backgroundColor:
                                "#4F46E5",
                        },
                    ]}
                >
                    <Ionicons
                        name="mail"
                        size={22}
                        color="#fff"
                    />

                    <Text
                        style={
                            styles.actionText
                        }
                    >
                        Enquiry
                    </Text>
                </TouchableOpacity>
            </View> */}
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 25,
  },

  loading: {
    marginTop: 15,
    color: '#64748B',
  },

  errorTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  retryButton: {
    marginTop: 22,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },

  retryText: {
    color: '#fff',
    fontWeight: '700',
  },

  section: {
    paddingHorizontal: 18,
    marginTop: 30,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    lineHeight: 26,
    color: '#475569',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    paddingHorizontal: 15,
    paddingVertical: 14,

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  actionButton: {
    flex: 1,

    marginHorizontal: 4,

    height: 50,

    borderRadius: 15,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    marginLeft: 7,
    fontWeight: '700',
    fontSize: 15,
  },
});
