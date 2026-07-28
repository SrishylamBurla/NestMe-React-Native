import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useUpdateLeadStatusMutation } from '../../services/leadApi';
import StatusBadge from '../../components/leads/StatusBadge';

export default function LeadDetailsScreen({ route, navigation }) {
  const { lead, role = 'user' } = route.params;

  const [status, setStatus] = useState(lead.status);

  const [updateLeadStatus, { isLoading }] = useUpdateLeadStatusMutation();
console.log("Lead:", lead);
  const buyer = lead.user;
  const property = lead.property;
  const agent = lead.agent?.user;

  console.log("Property: ", property)
   console.log("Agent: ", agent)

  const updateStatus = async newStatus => {
    try {
      await updateLeadStatus({
        leadId: lead._id,
        status: newStatus,
      }).unwrap();

      setStatus(newStatus);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Lead status updated successfully.',
        position: 'top',
        visibilityTime: 2500,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: err?.data?.message || 'Unable to update lead.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const makeCall = () => {
    if (!lead.phone) return;
    Linking.openURL(`tel:${lead.phone}`);
  };

  const sendEmail = () => {
    if (!buyer?.email) return;
    Linking.openURL(`mailto:${buyer.email}`);
  };

  const openWhatsapp = () => {
    if (!lead.phone) return;

    const phone = lead.phone.replace(/\D/g, '');

    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.title}>Lead Details</Text>

          <View style={{ width: 26 }} />
        </View>

        {/* Buyer */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Buyer</Text>

          <Text style={styles.name}>{buyer?.name}</Text>

          <Text style={styles.info}>{buyer?.email}</Text>

          <Text style={styles.info}>{lead.phone || 'No phone'}</Text>
        </View>

        {/* Property */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Property</Text>

          <Text style={styles.name}>{property?.title}</Text>

          <Text style={styles.info}>₹ {property?.priceValue}</Text>

          <Text style={styles.info}>{property?.city}</Text>
        </View>

        {/* Admin Only */}

        {role === 'admin' && agent && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Agent</Text>

            <Text style={styles.name}>{agent.name}</Text>

            <Text style={styles.info}>{agent.email}</Text>
          </View>
        )}

        {/* Message */}

        {!!lead.message && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Message</Text>

            <Text style={styles.message}>{lead.message}</Text>
          </View>
        )}

        {/* Status */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>

          <StatusBadge status={status} />

          <View style={styles.statusButtons}>
            {['new', 'contacted', 'closed'].map(item => (
              <TouchableOpacity
                key={item}
                disabled={isLoading || status === item}
                onPress={() => updateStatus(item)}
                style={[
                  styles.statusButton,
                  status === item && styles.activeStatus,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    status === item && {
                      color: '#fff',
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions */}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={makeCall}>
            <Ionicons name="call" color="#fff" size={20} />

            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={openWhatsapp}>
            <Ionicons name="logo-whatsapp" color="#fff" size={20} />

            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={sendEmail}>
            <Ionicons name="mail" color="#fff" size={20} />

            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 12,
    color: '#111827',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  info: {
    marginTop: 8,
    color: '#1d222e',
    fontSize: 15,
  },

  message: {
    color: '#374151',
    lineHeight: 24,
    fontSize: 15,
  },

  statusButtons: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
  },

  statusButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  activeStatus: {
    backgroundColor: '#2563EB',
  },

  statusText: {
    color: '#374151',
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '700',
  },
});
