import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Toast from "react-native-toast-message";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

import { useDeletePropertyMutation } from '../../../services/propertyApi';

export default function OwnerPropertyCard({ property, isAgent = false }) {
  const navigation = useNavigation();

  const [deleteProperty] = useDeletePropertyMutation();

  const [previewVisible, setPreviewVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [showBlocked, setShowBlocked] = useState(false);

  if (!property) return null;

  /* ==========================
      STATUS
  ========================== */

  const statusColor =
    property.approvalStatus === 'approved'
      ? '#22C55E'
      : property.approvalStatus === 'pending'
      ? '#F59E0B'
      : '#EF4444';

  /* ==========================
      CARD CLICK
  ========================== */

  const handleCardPress = () => {
    if (property.approvalStatus !== 'approved') {
      setShowBlocked(true);

      setTimeout(() => {
        setShowBlocked(false);
      }, 1400);

      return;
    }

    navigation.navigate('PropertyDetails', {
      id: property._id,
    });
  };

  /* ==========================
      EDIT
  ========================== */

  const handleEdit = () => {
    navigation.navigate('EditProperty', {
      propertyId: property._id,
    });
  };

  /* ==========================
      DELETE
  ========================== */

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteProperty(property._id).unwrap();

      setDeleteVisible(false);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2:
          err?.data?.message || err?.message || 'Failed to delete property.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* ==========================
            CARD
      ========================== */}

      <TouchableOpacity
        activeOpacity={0.92}
        onPress={handleCardPress}
        style={styles.card}
      >
        {/* BLOCKED */}

        {showBlocked && (
          <View style={styles.blockedOverlay}>
            <Text style={styles.blockedText}>
              {property.approvalStatus === 'pending'
                ? 'Under Review ⏳'
                : 'Rejected ❌'}
            </Text>
          </View>
        )}

        {/* IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                property.images?.[0]?.url || 'https://via.placeholder.com/800',
            }}
            style={styles.image}
          />

          {/* STATUS */}

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusColor,
              },
            ]}
          >
            <Text style={styles.statusText}>{property.approvalStatus}</Text>
          </View>

          {/* PRICE */}

          <View style={styles.priceChip}>
            <Text style={styles.price}>
              ₹ {property.priceValue?.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* CONTENT */}

        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {property.title}
          </Text>

          <Text numberOfLines={1} style={styles.location}>
            {property.city}, {property.state}
          </Text>

          {/* REJECTED */}

          {property.approvalStatus === 'rejected' &&
            property.rejectionReason && (
              <View style={styles.rejectBox}>
                <Text style={styles.rejectTitle}>Admin Feedback</Text>

                <Text style={styles.rejectReason}>
                  {property.rejectionReason}
                </Text>
              </View>
            )}

          {/* META */}

          <View style={styles.metaRow}>
            <View style={styles.meta}>
              <Ionicons name="bed-outline" size={18} color="#475569" />

              <Text style={styles.metaText}>{property.beds}</Text>
            </View>

            <View style={styles.meta}>
              <Ionicons name="water-outline" size={18} color="#475569" />

              <Text style={styles.metaText}>{property.baths}</Text>
            </View>

            <View style={styles.meta}>
              <Ionicons name="resize-outline" size={18} color="#475569" />

              <Text style={styles.metaText}>{property.areaSqFt} ft²</Text>
            </View>
          </View>

          {/* AGENT STATS */}

          {isAgent && (
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="eye-outline" size={18} color="#2563EB" />

                <Text style={styles.statValue}>{property.viewsCount || 0}</Text>

                <Text style={styles.statLabel}>Views</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="people-outline" size={18} color="#7C3AED" />

                <Text style={styles.statValue}>{property.leadsCount || 0}</Text>

                <Text style={styles.statLabel}>Leads</Text>
              </View>
            </View>
          )}

          {/* ACTIONS */}

          <View style={styles.actionRow}>
            {isAgent && (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Ionicons name="create-outline" size={18} color="#fff" />

                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => setPreviewVisible(true)}
            >
              <Ionicons name="eye-outline" size={18} color="#fff" />

              <Text style={styles.actionText}>Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setDeleteVisible(true)}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />

              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* ==========================
            PREVIEW MODAL
      ========================== */}

      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPreviewVisible(false)}
        >
          <Pressable style={styles.previewModal}>
            <Image
              source={{
                uri: property.images?.[0]?.url,
              }}
              style={styles.previewImage}
            />

            <View
              style={{
                padding: 18,
              }}
            >
              <Text style={styles.previewTitle}>{property.title}</Text>

              <Text style={styles.previewPrice}>
                ₹ {property.priceValue?.toLocaleString()}
              </Text>

              <Text style={styles.previewLocation}>
                {property.city}, {property.state}
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPreviewVisible(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ==========================
            DELETE MODAL
      ========================== */}

      <Modal transparent animationType="fade" visible={deleteVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDeleteVisible(false)}
        >
          <Pressable style={styles.deleteModal}>
            <Text style={styles.deleteTitle}>Delete Property?</Text>

            <Text style={styles.deleteMessage}>
              This action cannot be undone.
            </Text>

            <View style={styles.deleteButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmDelete}
                onPress={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                    }}
                  >
                    Delete
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 22,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  /* ================= IMAGE ================= */

  imageContainer: {
    height: 220,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  blockedOverlay: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 100,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,.92)',
  },

  blockedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },

  statusBadge: {
    position: 'absolute',

    top: 16,
    right: 16,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'capitalize',
    fontSize: 12,
  },

  priceChip: {
    position: 'absolute',

    bottom: 16,
    left: 16,

    backgroundColor: '#111827',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  price: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },

  /* ================= CONTENT ================= */

  content: {
    padding: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  location: {
    marginTop: 6,
    fontSize: 15,
    color: '#64748B',
  },

  /* ================= REJECT ================= */

  rejectBox: {
    marginTop: 16,

    backgroundColor: '#FEF2F2',

    borderWidth: 1,
    borderColor: '#FCA5A5',

    borderRadius: 14,

    padding: 14,
  },

  rejectTitle: {
    color: '#DC2626',
    fontWeight: '700',
    marginBottom: 4,
  },

  rejectReason: {
    color: '#991B1B',
    lineHeight: 20,
  },

  /* ================= META ================= */

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: '#E5E7EB',

    paddingVertical: 14,
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },

  /* ================= STATS ================= */

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 18,
  },

  statCard: {
    flex: 1,

    marginHorizontal: 4,

    backgroundColor: '#F8FAFC',

    borderRadius: 16,

    alignItems: 'center',

    paddingVertical: 14,

    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  statValue: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },

  /* ================= ACTIONS ================= */

  actionRow: {
    flexDirection: 'row',
    marginTop: 22,
  },

  editButton: {
    flex: 1,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#4F46E5',

    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  previewButton: {
    flex: 1,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#111827',

    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  deleteButton: {
    flex: 1,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#EF4444',

    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 6,
  },

  /* ================= MODALS ================= */

  modalOverlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,.55)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
  },

  previewModal: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    overflow: 'hidden',
  },

  previewImage: {
    width: '100%',
    height: 240,
  },

  previewTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  previewPrice: {
    marginTop: 12,
    fontSize: 22,
    color: '#4F46E5',
    fontWeight: '700',
  },

  previewLocation: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 15,
  },

  closeButton: {
    marginTop: 24,

    height: 48,

    borderRadius: 14,

    backgroundColor: '#111827',

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  /* ================= DELETE ================= */

  deleteModal: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 24,
  },

  deleteTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  deleteMessage: {
    marginTop: 10,
    color: '#64748B',
    lineHeight: 22,
  },

  deleteButtons: {
    flexDirection: 'row',
    marginTop: 28,
  },

  cancelButton: {
    flex: 1,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#F1F5F9',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  confirmDelete: {
    flex: 1,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#DC2626',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
