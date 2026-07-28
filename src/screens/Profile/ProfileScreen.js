import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import {
  useGetMeQuery,
  useLogoutMutation,
} from "../../services/authApi";

import {
  useGetSavedPropertiesQuery,
} from "../../services/savedApi";

import {
  useGetNotificationsQuery,
} from "../../services/notificationApi";

import BottomNav from "../../components/BottomNav";

export default function ProfileScreen() {
  const navigation = useNavigation();

  /* ==========================
        USER
  ========================== */

  const { data, isLoading } =
    useGetMeQuery();

  const user = data?.user;

  const isAgent = user?.role === "agent"

  const isLoggedIn = !!user;

  /* ==========================
        COUNTS
  ========================== */

  const { data: savedData } =
    useGetSavedPropertiesQuery(undefined, {
      skip: !isLoggedIn,
    });

  const {
    data: notificationData = [],
  } = useGetNotificationsQuery(undefined, {
    skip: !isLoggedIn,
  });

  const savedCount =
    savedData?.saved?.length || 0;

  const unreadCount = Array.isArray(
    notificationData
  )
    ? notificationData.filter(
      (n) => !n.isRead
    ).length
    : 0;

  const propertiesCount =
    user?.propertiesPosted || 0;

  /* ==========================
        LOGOUT
  ========================== */

  const [logout] =
    useLogoutMutation();

  const [showLogout, setShowLogout] =
    useState(false);

  const handleLogout =
    async () => {
      try {
        await logout().unwrap();

        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Login",
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };

  /* ==========================
        AVATAR
  ========================== */

  const avatar = useMemo(() => {
    if (user?.avatar)
      return {
        uri: user.avatar,
      };

    return {
      uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
      )}&background=4F46E5&color=fff&size=256`,
    };
  }, [user]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor="#0F172A"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          >
            {/* ================= HEADER ================= */}

            <View style={styles.header}>
              <TouchableOpacity
                style={
                  styles.backButton
                }
                onPress={() =>
                  navigation.goBack()
                }
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>

              <Text
                style={
                  styles.headerTitle
                }
              >
                My Profile
              </Text>

              <TouchableOpacity
                style={
                  styles.editButton
                }
                onPress={() =>
                  navigation.navigate(
                    "EditProfile"
                  )
                }
              >
                <Ionicons
                  name="create-outline"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* ================= PROFILE CARD ================= */}

            <View
              style={
                styles.profileCard
              }
            >
              <Image
                source={avatar}
                style={
                  styles.avatar
                }
              />

              <Text
                style={
                  styles.name
                }
              >
                {user?.name}
              </Text>

              {!!user?.email && (
                <Text
                  style={
                    styles.email
                  }
                >
                  {user.email}
                </Text>
              )}

              {!!user?.phone && (
                <Text
                  style={
                    styles.phone
                  }
                >
                  +91 {user.phone}
                </Text>
              )}

              <View
                style={
                  styles.roleBadge
                }
              >
                <Ionicons
                  name="shield-checkmark"
                  size={15}
                  color="#fff"
                />

                <Text
                  style={
                    styles.roleText
                  }
                >
                  {user?.role
                    ?.charAt(0)
                    .toUpperCase() +
                    user?.role?.slice(
                      1
                    )}
                </Text>
              </View>
            </View>

            {/* ================= QUICK STATS ================= */}

            {/* Continue in Part 2 */}
            {/* ================= LOGOUT MODAL ================= */}

            <Modal
              visible={showLogout}
              transparent
              animationType="fade"
            >
              <View
                style={
                  styles.modalOverlay
                }
              >
                <View
                  style={
                    styles.logoutModal
                  }
                >
                  <Ionicons
                    name="log-out-outline"
                    size={56}
                    color="#EF4444"
                  />

                  <Text
                    style={
                      styles.logoutTitle
                    }
                  >
                    Logout?
                  </Text>

                  <Text
                    style={
                      styles.logoutMessage
                    }
                  >
                    You'll need to login
                    again to access your
                    account.
                  </Text>

                  <View
                    style={
                      styles.logoutButtons
                    }
                  >
                    <TouchableOpacity
                      style={
                        styles.cancelButton
                      }
                      onPress={() =>
                        setShowLogout(
                          false
                        )
                      }
                    >
                      <Text
                        style={
                          styles.cancelText
                        }
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        styles.logoutButton
                      }
                      onPress={
                        handleLogout
                      }
                    >
                      <Text
                        style={
                          styles.logoutButtonText
                        }
                      >
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* ================= QUICK STATS ================= */}

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons
                  name="business-outline"
                  size={26}
                  color="#4F46E5"
                />

                <Text style={styles.statValue}>
                  {propertiesCount}
                </Text>

                <Text style={styles.statLabel}>
                  Properties
                </Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons
                  name="heart-outline"
                  size={26}
                  color="#EF4444"
                />

                <Text style={styles.statValue}>
                  {savedCount}
                </Text>

                <Text style={styles.statLabel}>
                  Saved
                </Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons
                  name="notifications-outline"
                  size={26}
                  color="#F59E0B"
                />

                <Text style={styles.statValue}>
                  {unreadCount}
                </Text>

                <Text style={styles.statLabel}>
                  Alerts
                </Text>
              </View>
            </View>

            {/* ================= MENU ================= */}

            <View style={styles.menuContainer}>

              {isAgent && 
              <MenuItem
                icon="grid-outline"
                title="Agent Dashboard"
                subtitle="Manage your Account"
                onPress={() =>
                  navigation.navigate("AgentDashboard")
                }
              />}

              <MenuItem
                icon="business-outline"
                title="My Properties"
                subtitle="Manage your listings"
                onPress={() =>
                  navigation.navigate("MyProperties")
                }
              />

              <MenuItem
                icon="heart-outline"
                title="Saved Properties"
                subtitle="Your favourites"
                badge={savedCount}
                onPress={() =>
                  navigation.navigate("SavedProperties")
                }
              />

              <MenuItem
                icon="notifications-outline"
                title="Notifications"
                subtitle="Recent activity"
                badge={unreadCount}
                onPress={() =>
                  navigation.navigate("Notifications")
                }
              />

              <MenuItem
                icon="card-outline"
                title="Subscription"
                subtitle="Manage your agent membership"
                onPress={() =>
                  navigation.navigate("Subscribe")
                }
              />

              <MenuItem
                icon="create-outline"
                title="Edit Profile"
                subtitle="Update your information"
                onPress={() =>
                  navigation.navigate("EditProfile")
                }
              />

              {user?.loginProvider === "google" && !user?.password ? (
                <MenuItem
                  icon="key-outline"
                  title="Create Password"
                  subtitle="Use email & password in addition to Google"
                  onPress={() =>
                    navigation.navigate("SetPassword")
                  }
                />
              ) : (
                <MenuItem
                  icon="lock-closed-outline"
                  title="Change Password"
                  subtitle="Secure your account"
                  onPress={() =>
                    navigation.navigate("ChangePassword")
                  }
                />
              )}

              <MenuItem
                icon="help-circle-outline"
                title="Help & Support"
                subtitle="Need assistance?"
                onPress={() =>
                  navigation.navigate("SupportHome")
                }
              />

              <MenuItem
                icon="information-circle-outline"
                title="About NestMe"
                subtitle="Version 1.0.0"
                onPress={() =>
                  navigation.navigate("AboutUs")
                }
              />

              <MenuItem
                icon="log-out-outline"
                title="Logout"
                subtitle="Sign out of your account"
                danger
                onPress={() =>
                  setShowLogout(true)
                }
              />
            </View>

            {/* ================= FOOTER ================= */}

            <View style={styles.footer}>
              <Text style={styles.footerLogo}>
                NestMe
              </Text>

              <Text style={styles.footerVersion}>
                Version 1.0.0
              </Text>

              <Text style={styles.footerCopyright}>
                © 2026 NestMe. All rights reserved.
              </Text>
            </View>

          </ScrollView>




          <BottomNav active="profile" />

        </View>
      </SafeAreaView>
    </>
  );
}


function MenuItem({
  icon,
  title,
  subtitle,
  badge,
  danger,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.menuItem}
      onPress={onPress}
    >
      <View
        style={[
          styles.menuIcon,
          danger &&
          styles.menuIconDanger,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={
            danger
              ? "#EF4444"
              : "#4F46E5"
          }
        />
      </View>

      <View style={styles.menuContent}>
        <Text
          style={[
            styles.menuTitle,
            danger &&
            styles.dangerText,
          ]}
        >
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      {badge > 0 && (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>
            {badge > 99
              ? "99+"
              : badge}
          </Text>
        </View>
      )}

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#94A3B8"
      />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#0F172A",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  editButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",
  },

  /* ================= PROFILE CARD ================= */

  profileCard: {
    marginHorizontal: 18,
    marginTop: -10,

    borderRadius: 28,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    paddingVertical: 28,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  avatar: {
    width: 110,
    height: 110,

    borderRadius: 55,

    borderWidth: 4,
    borderColor: "#EEF2FF",
  },

  name: {
    marginTop: 18,

    fontSize: 24,
    fontWeight: "700",

    color: "#111827",
  },

  email: {
    marginTop: 6,

    fontSize: 15,

    color: "#64748B",
  },

  phone: {
    marginTop: 4,

    fontSize: 15,

    color: "#64748B",
  },

  roleBadge: {
    marginTop: 18,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#4F46E5",

    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 30,
  },

  roleText: {
    marginLeft: 8,

    color: "#FFFFFF",

    fontWeight: "700",
    fontSize: 14,
  },

  /* ================= STATS ================= */

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 18,
    marginTop: 22,
  },

  statCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    marginHorizontal: 5,

    alignItems: "center",

    paddingVertical: 20,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  statValue: {
    marginTop: 10,

    fontSize: 22,

    fontWeight: "700",

    color: "#111827",
  },

  statLabel: {
    marginTop: 5,

    color: "#64748B",

    fontSize: 13,
  },

  /* ================= MENU ================= */

  menuContainer: {
    marginTop: 28,
    marginHorizontal: 18,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    overflow: "hidden",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#EEF2FF",

    justifyContent: "center",
    alignItems: "center",
  },

  menuIconDanger: {
    backgroundColor: "#FEE2E2",
  },

  menuContent: {
    flex: 1,

    marginLeft: 16,
  },

  menuTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#111827",
  },

  menuSubtitle: {
    marginTop: 4,

    color: "#64748B",

    fontSize: 13,
  },

  dangerText: {
    color: "#DC2626",
  },

  menuBadge: {
    minWidth: 24,
    height: 24,

    borderRadius: 12,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    paddingHorizontal: 6,
  },

  menuBadgeText: {
    color: "#FFFFFF",

    fontSize: 12,

    fontWeight: "700",
  },

  /* ================= FOOTER ================= */

  footer: {
    alignItems: "center",

    marginTop: 40,
    marginBottom: 20,
  },

  footerLogo: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111827",
  },

  footerVersion: {
    marginTop: 8,

    color: "#64748B",
  },

  footerCopyright: {
    marginTop: 6,

    color: "#94A3B8",

    fontSize: 12,
  },

  /* ================= LOGOUT ================= */

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.45)",

    justifyContent: "center",

    paddingHorizontal: 28,
  },

  logoutModal: {
    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    padding: 28,

    alignItems: "center",
  },

  logoutTitle: {
    marginTop: 16,

    fontSize: 24,

    fontWeight: "700",

    color: "#111827",
  },

  logoutMessage: {
    marginTop: 12,

    textAlign: "center",

    lineHeight: 22,

    color: "#64748B",
  },

  logoutButtons: {
    flexDirection: "row",

    marginTop: 28,
  },

  cancelButton: {
    flex: 1,

    height: 50,

    borderRadius: 14,

    backgroundColor: "#E5E7EB",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  cancelText: {
    color: "#111827",

    fontWeight: "700",

    fontSize: 15,
  },

  logoutButton: {
    flex: 1,

    height: 50,

    borderRadius: 14,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",
  },

  logoutButtonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },
});