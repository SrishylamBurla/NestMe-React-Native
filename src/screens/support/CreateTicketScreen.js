import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Ionicons from '@react-native-vector-icons/ionicons';

import SupportHeader from './components/SupportHeader';

import { useCreateSupportTicketMutation } from '../../services/supportApi';

const CATEGORIES = [
  {
    key: 'property',
    title: 'Property',
    icon: 'home-outline',
  },
  {
    key: 'payment',
    title: 'Payment',
    icon: 'card-outline',
  },
  {
    key: 'verification',
    title: 'Verification',
    icon: 'shield-checkmark-outline',
  },
  {
    key: 'technical',
    title: 'Technical',
    icon: 'construct-outline',
  },
  {
    key: 'account',
    title: 'Account',
    icon: 'person-outline',
  },
  {
    key: 'other',
    title: 'Other',
    icon: 'help-circle-outline',
  },
];

const PRIORITIES = [
  {
    key: 'low',
    color: '#10B981',
  },
  {
    key: 'medium',
    color: '#F59E0B',
  },
  {
    key: 'high',
    color: '#EF4444',
  },
];

const CreateTicketScreen = ({ navigation }) => {
  const [subject, setSubject] = useState('');

  const [category, setCategory] = useState('property');

  const [priority, setPriority] = useState('medium');

  const [message, setMessage] = useState('');

  const [createTicket, { isLoading }] = useCreateSupportTicketMutation();

  const submitHandler = async () => {
    if (!subject.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Issue Title Required',
        text2: 'Please enter an issue title.',
      });
      return;
    }

    if (!message.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Description Required',
        text2: 'Please describe your issue.',
      });
      return;
    }

    try {
      const res = await createTicket({
        subject,
        category,
        priority,
        message,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Ticket Created',
        text2: 'Redirecting you to the support chat...',
      });

      navigation.replace('SupportChat', {
        ticketId: res.ticket._id,
      });
    } catch (err) {
      console.error('Create Ticket Error:', err);

      Toast.show({
        type: 'error',
        text1: 'Failed to Create Ticket',
        text2: err?.data?.message || 'Internal Server Error',
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <SafeAreaView style={styles.container} edges={['top']}>
        <SupportHeader
          title="Create Ticket"
          subtitle="Tell us how we can help"
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.sectionTitle}>Issue Title</Text>

          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder="Briefly describe your issue"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
          <Text style={styles.sectionTitle}>Category</Text>

          <View style={styles.categoryGrid}>
            {CATEGORIES.map(item => {
              const selected = category === item.key;

              return (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.85}
                  onPress={() => setCategory(item.key)}
                  style={[
                    styles.categoryCard,
                    selected && styles.selectedCategory,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={26}
                    color={selected ? '#FFFFFF' : '#5B3DF5'}
                  />

                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.selectedCategoryText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Priority</Text>

          <View style={styles.priorityRow}>
            {PRIORITIES.map(item => {
              const active = priority === item.key;

              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setPriority(item.key)}
                  style={[
                    styles.priorityCard,
                    active && styles.prioritySelected,
                  ]}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      {
                        backgroundColor: item.color,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.priorityText,
                      active && styles.prioritySelectedText,
                    ]}
                  >
                    {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Describe your issue</Text>

          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
            placeholder="Explain your issue in detail..."
            placeholderTextColor="#94A3B8"
            textAlignVertical="top"
            style={styles.messageBox}
          />

          <Text style={styles.counter}>{message.length}/1000</Text>

          <Text style={styles.sectionTitle}>Attachments</Text>

          <View style={styles.attachRow}>
            <TouchableOpacity style={styles.attachCard}>
              <Ionicons name="images-outline" size={24} color="#5B3DF5" />

              <Text style={styles.attachText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attachCard}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#5B3DF5"
              />

              <Text style={styles.attachText}>Document</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={isLoading}
            onPress={submitHandler}
            style={styles.button}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="send" size={18} color="#FFF" />

                <Text style={styles.buttonText}>Create Ticket</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginTop: 22,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 20,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  selectedCategory: {
    backgroundColor: '#5B3DF5',
    borderColor: '#5B3DF5',
  },

  categoryText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  selectedCategoryText: {
    color: '#FFFFFF',
  },

  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priorityCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  prioritySelected: {
    borderColor: '#5B3DF5',
    backgroundColor: '#EEF2FF',
  },

  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 20,
    marginBottom: 8,
  },

  priorityText: {
    color: '#475569',
    fontWeight: '600',
  },

  prioritySelectedText: {
    color: '#5B3DF5',
  },

  messageBox: {
    minHeight: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#111827',
    fontSize: 15,
  },

  counter: {
    alignSelf: 'flex-end',
    marginTop: 8,
    color: '#94A3B8',
    fontSize: 12,
  },

  attachRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  attachCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 24,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  attachText: {
    marginTop: 10,
    color: '#334155',
    fontWeight: '600',
  },

  button: {
    marginTop: 36,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#5B3DF5',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#5B3DF5',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});
