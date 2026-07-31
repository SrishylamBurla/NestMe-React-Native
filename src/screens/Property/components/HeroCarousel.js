import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';

import {
  useGetSavedPropertiesQuery,
  useToggleSavePropertyMutation,
} from '../../../services/savedApi';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Carousel from 'react-native-reanimated-carousel';
import { NEXT_PUBLIC_APP_URL } from '@env';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HeroCarousel({ property, images = [] }) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const { data } = useGetSavedPropertiesQuery();

  const [toggleSaveProperty, { isLoading: saving }] =
    useToggleSavePropertyMutation();

  const isSaved =
    data?.saved?.some(item => item.property._id === property?._id) || false;

  const handleSave = async () => {
    try {
      await toggleSaveProperty(property._id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: property.title,
        message: `Check out this property on NestMe

${property.title}

${NEXT_PUBLIC_APP_URL}/properties/${property._id}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const slides = images.length
    ? images
    : [
        {
          url: 'https://via.placeholder.com/600x400',
        },
      ];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topBar,
          {
            top: insets.top + 12,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={22}
                color={isSaved ? '#EF4444' : '#fff'}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Carousel
        width={width}
        height={320}
        autoPlay={slides.length > 1}
        autoPlayInterval={5000}
        loop={slides.length > 1}
        data={slides}
        scrollAnimationDuration={700}
        onSnapToItem={i => setIndex(i)}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
      />

      {/* Dark Overlay */}

      <View style={styles.overlay} />

      {/* Count */}

      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {index + 1} / {slides.length}
        </Text>
      </View>

      {/* Swipe Hint */}

      <View style={styles.hint}>
        <Text style={styles.hintText}>Swipe to view more photos</Text>
      </View>

      {/* Pagination */}

      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    backgroundColor: '#000',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  counter: {
    position: 'absolute',
    bottom: 18,
    right: 18,

    backgroundColor: 'rgba(0,0,0,0.45)',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,
  },

  counterText: {
    color: '#fff',
    fontWeight: '700',
  },

  hint: {
    position: 'absolute',

    bottom: 52,

    alignSelf: 'center',

    backgroundColor: 'rgba(0,0,0,0.45)',

    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 20,
  },

  hintText: {
    color: '#fff',
    fontSize: 12,
  },

  pagination: {
    position: 'absolute',

    bottom: 20,

    alignSelf: 'center',

    flexDirection: 'row',
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: 'rgba(255,255,255,.4)',

    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: '#fff',
  },
  topBar: {
    position: 'absolute',
    left: 18,
    right: 18,

    zIndex: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightButtons: {
    flexDirection: 'row',
  },

  circleButton: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: 'rgba(0,0,0,0.45)',

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 10,
  },
});
