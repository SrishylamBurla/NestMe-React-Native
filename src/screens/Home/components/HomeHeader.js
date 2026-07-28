import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useGetMeQuery } from '../../../services/authApi';
import { useGetNotificationsQuery } from '../../../services/notificationApi';
import { useGetSavedPropertiesQuery } from '../../../services/savedApi';

export default function HomeHeader() {
  const navigation = useNavigation();

  const { data, isLoading } = useGetMeQuery();

  const user = data?.user;
  const isLoggedIn = !!user;

  // Notifications
  const { data: notificationData } = useGetNotificationsQuery(undefined, {
    skip: !isLoggedIn,
  });

  // Saved Properties
  const { data: savedData } = useGetSavedPropertiesQuery(undefined, {
    skip: !isLoggedIn,
  });

  const notifications = notificationData || [];

  const unreadCount = notifications.filter(item => !item.isRead).length;

  const savedCount = savedData?.saved?.length || 0;

  if (isLoading) {
    return (
      <View
        style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}
      />
    );
  }

  return (
    <View>
      <StatusBar barStyle="light-content" />

      <View
        style={[
          styles.container,
          {
            paddingTop: StatusBar.currentHeight || 0,
          },
        ]}
      >
        {/* Left */}

        <View style={styles.left}>
          <Image
            source={require('../../../assets/icons/splashlogo.png')}
            style={styles.logo}
          />

          {isLoggedIn && (
            <>
              <View style={styles.redBar} />

              <View>
                <Text style={styles.welcome}>Welcome</Text>

                <Text numberOfLines={1} style={styles.username}>
                  {user?.name?.split(' ')[0]}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Right */}

        {!isLoggedIn ? (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.right}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('SavedProperties')}
            >
              <Ionicons name="heart-outline" size={28} color="#fff" />

              {savedCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {savedCount > 10 ? '10+' : savedCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={28} color="#fff" />

              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // safeArea: {
  //   backgroundColor: "#050A",
  // },

  // container: {
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   zIndex: 2,
  //   paddingHorizontal: 18,
  //   paddingBottom: 10,
  //   zIndex: 100,
  //   minHeight: 64,
  // },

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,

    backgroundColor: 'rgba(0,0,0,0.5)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 29,
    resizeMode: 'contain',
  },

  redBar: {
    width: 4,
    height: 42,
    backgroundColor: '#ff1744',
    borderRadius: 2,
    marginHorizontal: 14,
  },

  welcome: {
    color: '#A0AEC0',
    fontSize: 10,
    fontWeight: '500',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 2,
    maxWidth: 180,
  },

  loginButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
