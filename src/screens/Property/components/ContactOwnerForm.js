import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import PrimaryButton from '../../../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import { useCreateLeadMutation } from '../../../services/leadApi';

export default function ContactOwnerForm({ propertyId }) {
  const [createLead, { isLoading }] = useCreateLeadMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const submitHandler = async () => {
    if (!propertyId) {
      Toast.show({
        type: 'error',
        text1: 'Property Not Found',
        text2: 'Property reference is missing.',
      });
      return;
    }

    try {
      await createLead({
        propertyId,
        ...form,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Enquiry Sent',
        text2: 'Your message has been sent successfully.',
      });

      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      if (err?.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Login Required',
          text2: 'Please log in to contact the property owner.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to Send',
          text2:
            err?.data?.message ||
            'Unable to send your enquiry. Please try again.',
        });
      }
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Contact Property Owner</Text>

      <TextInput
        placeholder="Your Name"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={form.name}
        onChangeText={text =>
          setForm({
            ...form,
            name: text,
          })
        }
      />

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={text =>
          setForm({
            ...form,
            email: text,
          })
        }
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={text =>
          setForm({
            ...form,
            phone: text,
          })
        }
      />

      <TextInput
        multiline
        numberOfLines={5}
        placeholder="Write your message..."
        placeholderTextColor="#94A3B8"
        style={styles.message}
        value={form.message}
        onChangeText={text =>
          setForm({
            ...form,
            message: text,
          })
        }
      />

      <PrimaryButton
        title={isLoading ? 'Sending...' : 'Send Message'}
        onPress={submitHandler}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    marginTop: 18,
    borderRadius: 22,
    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#fff',
    color: '#111827',
  },

  message: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#111827',
  },
});
