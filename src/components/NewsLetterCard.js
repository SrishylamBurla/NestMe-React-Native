import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';

import { useSubscribeMutation } from '../services/subscribeApi';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');

  const [subscribe, { isLoading }] = useSubscribeMutation();
  
  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Toast.show({
        type: 'error',
        text1: 'Missing Email',
        text2: 'Please enter your email.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      await subscribe({
        email: trimmedEmail,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Subscribed Successfully 🎉',
        text2: "You'll now receive the latest properties and offers.",
      });

      setEmail('');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Subscription Failed',
        text2: err?.data?.message || err?.error || 'Please try again later.',
      });
    }
  };

  return (
    <LinearGradient colors={['#051033', '#0A273F']} style={styles.card}>
      <View style={styles.icon}>
        <Ionicons name="mail-open-outline" size={34} color="#fff" />
      </View>

      <Text style={styles.title}>Stay Updated</Text>

      <Text style={styles.subtitle}>
        Get newly added properties, price drops and exclusive offers directly to
        your inbox.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isLoading && {
            opacity: 0.7,
          },
        ]}
        onPress={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Subscribe</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    alignItems: 'center',
  },

  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 18,
  },

  subtitle: {
    color: 'rgba(255,255,255,.9)',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15,
  },

  inputContainer: {
    width: '100%',
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  input: {
    height: 52,
    paddingHorizontal: 18,
    color: '#111827',
    fontSize: 16,
  },

  button: {
    marginTop: 18,
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
