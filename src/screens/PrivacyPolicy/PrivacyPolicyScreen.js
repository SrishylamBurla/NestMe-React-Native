import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect account details, property information, device information, notification tokens and usage data to provide our services.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your information helps us manage your account, display listings, connect buyers and sellers, send notifications, provide support and improve our services.',
  },
  {
    title: 'Push Notifications',
    body: 'NestMe may send notifications about property approvals, lead updates, support replies, account activity and important announcements. You can disable notifications through your device settings.',
  },
  {
    title: 'Data Security',
    body: 'We implement industry-standard security measures to protect your personal information from unauthorised access, disclosure or misuse.',
  },
  {
    title: 'Data Sharing',
    body: 'NestMe does not sell your personal information. Data is shared only when necessary to operate the platform, comply with legal obligations or prevent fraud.',
  },
  {
    title: 'Third-Party Services',
    body: 'NestMe uses trusted third-party services including authentication, cloud storage, payment providers, push notifications and email delivery services.',
  },
  {
    title: 'Your Rights',
    body: 'You can update your profile, edit your listings, manage your account and contact support regarding your personal information.',
  },
  {
    title: 'Contact Us',
    body: 'Website\nwww.nestme.in\n\nEmail\nsupport@nestme.in',
  },
];

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.updated}>Last Updated: July 2026</Text>

        <Text style={styles.intro}>
          At NestMe, protecting your privacy is one of our highest priorities.
          This Privacy Policy explains how we collect, use and protect your
          information while using our application and website.
        </Text>

        {sections.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.heading}>{item.title}</Text>

            <Text style={styles.body}>{item.body}</Text>
          </View>
        ))}

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
  topBar: {
  width: "100%",
  alignItems: "flex-start",
  marginBottom: 20,
},

backButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,

  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 2,
  },
},
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  updated: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 20,
  },
  intro: {
    color: '#475569',
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },
  body: {
    color: '#64748B',
    lineHeight: 24,
    fontSize: 15,
  },
});
