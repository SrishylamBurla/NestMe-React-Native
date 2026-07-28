import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const features = [
  {
    icon: 'home',
    title: 'Verified Property Listings',
    description:
      'Browse apartments, villas, plots, commercial properties and rentals from trusted owners and agents.',
  },
  {
    icon: 'people',
    title: 'Trusted Agents',
    description:
      'Connect with verified real estate professionals for expert guidance.',
  },
  {
    icon: 'notifications',
    title: 'Real-Time Notifications',
    description:
      'Receive updates for property approvals, leads, support replies and account activity.',
  },
  {
    icon: 'shield-checkmark',
    title: 'Secure Platform',
    description:
      'Your information is protected using secure authentication and verified workflows.',
  },
];

export default function AboutUsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Ionicons name="business" size={70} color="#4F46E5" />

          <Text style={styles.title}>About NestMe</Text>

          <Text style={styles.subtitle}>
            Your trusted destination for buying, renting and selling properties
            with confidence.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Our Mission</Text>

          <Text style={styles.body}>
            NestMe is committed to simplifying the real estate journey by
            connecting buyers, sellers, tenants and agents on one transparent,
            secure and user-friendly platform.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>What We Offer</Text>

        {features.map((item, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={26} color="#4F46E5" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>{item.title}</Text>

              <Text style={styles.featureText}>{item.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.heading}>Why Choose NestMe?</Text>

          <Text style={styles.list}>
            ✓ Verified Listings{'\n'}✓ Trusted Agents{'\n'}✓ Smart Property
            Search{'\n'}✓ Instant Notifications{'\n'}✓ Secure User Accounts
            {'\n'}✓ Premium User Experience{'\n'}✓ Dedicated Customer Support
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Contact</Text>

          <Text style={styles.body}>
            🌐 www.nestme.in{'\n\n'}
            📧 customersupport@nestme.in{'\n\n'}
            Version 1.0
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 15,
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 22,
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111827',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  body: {
    color: '#64748B',
    lineHeight: 24,
    fontSize: 15,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  featureText: {
    color: '#64748B',
    marginTop: 6,
    lineHeight: 22,
  },
  list: {
    color: '#475569',
    lineHeight: 28,
    fontSize: 15,
  },
});
