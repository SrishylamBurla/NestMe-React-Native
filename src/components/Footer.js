import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';


export default function Footer() {
  const navigation = useNavigation();
  const openUrl = async url => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open the link.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };
  return (
    <>
      <LinearGradient colors={['#051033', '#0a273f', '#210716']}>
        
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.brandRow}>
            <Image
              source={require('../assets/icons/splashlogo.png')}
              style={styles.logo}
            />

            <Text style={styles.brand}>
              nestme
              <Text style={styles.domain}>.in</Text>
            </Text>
          </View>

          <Text style={styles.description}>
            Discover verified properties across India. Buy, Rent or Lease with
            confidence.
          </Text>

          {/* Links */}
          <View style={styles.linksContainer}>
            {/* Quick Links */}

            <View style={styles.linkColumn}>
              <Text style={styles.heading}>Quick Links</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Properties', {
                    listingType: 'sale',
                  })
                }
              >
                <Text style={styles.link}>Buy Property</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Properties', {
                    listingType: 'rent',
                  })
                }
              >
                <Text style={styles.link}>Rent Property</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('AddProperty')}
              >
                <Text style={styles.link}>Post Property</Text>
              </TouchableOpacity>
            </View>

            {/* Company */}

            <View style={styles.linkColumn}>
              <Text style={styles.heading}>Company</Text>

              <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                <Text style={styles.link}>About Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}
              >
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social */}

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.social, { backgroundColor: '#E1306C' }]}
              onPress={() => openUrl('https://www.instagram.com/nestme.in/')}
            >
              <Ionicons name="logo-instagram" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.social, { backgroundColor: '#0A66C2' }]}
              onPress={() => openUrl('https://www.linkedin.com/company/')}
            >
              <Ionicons name="logo-linkedin" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.social, { backgroundColor: '#25D366' }]}
              onPress={() => openUrl('https://wa.me/91XXXXXXXXXX')}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.divider} /> */}

          <Text style={styles.copyright}>© 2026 NestMe Technologies</Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 160,
    position: 'relative',
    overflow: 'hidden',
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  brand: {
    marginTop: 8,
    fontSize: 50,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  domain: {
    color: '#F8FAFC',
  },

  description: {
    marginTop: 14,
    color: '#7c8ea8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },

  links: {
    marginTop: 30,
    alignItems: 'center',
  },

  link: {
    fontSize: 16,
    color: '#aebed4',
    marginVertical: 7,
    fontWeight: '600',
  },

  socialRow: {
    flexDirection: 'row',
    marginTop: 28,
  },

  social: {
    width: 38,
    height: 38,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  divider: {
    marginTop: 30,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  copyright: {
    marginTop: 16,
    color: '#bac2cd',
    fontSize: 13,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    marginRight: 12,
  },

  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
  },

  domain: {
    color: '#F8FAFC',
  },

  linksContainer: {
    marginTop: 34,
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  linkColumn: {
    alignItems: 'flex-start',
  },

  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  link: {
    color: '#AEBED4',
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '500',
  },
});
