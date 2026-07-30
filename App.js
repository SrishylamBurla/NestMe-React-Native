import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { showNotification } from './src/utils/showNotification';
import { store } from './src/store/store';
import PremiumSplash from './src/screens/Splash/PremiumSplash';
import RootNavigator from './src/navigation/RootNavigator';
import { navigate } from './src/navigation/NavigationService';
import { PermissionsAndroid, Platform } from 'react-native';
import { notificationApi } from './src/services/notificationApi';
import { GOOGLE_CLIENT_ID } from '@env';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  async function requestNotificationPermission() {
    store.dispatch(
      notificationApi.util.invalidateTags(['Notifications', 'Notification']),
    );
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }
  // Google Sign-In & Splash
  useEffect(() => {
    requestNotificationPermission();

    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: false,
    });
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Firebase Notifications
  useEffect(() => {
    // Foreground notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {

      store.dispatch(
        notificationApi.util.invalidateTags(['Notifications', 'Notification']),
      );

      await showNotification(
        remoteMessage.notification?.title ?? 'NestMe',
        remoteMessage.notification?.body ?? '',
      );
    });

    // User tapped notification while app in background
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        store.dispatch(
          notificationApi.util.invalidateTags([
            'Notifications',
            'Notification',
          ]),
        );
        const { screen, propertyId } = remoteMessage.data || {};

        if (screen === 'PropertyDetails' && propertyId) {
          navigate('PropertyDetails', {
            id: propertyId,
          });
        }
      },
    );

    // User opened app from killed state
    async function checkInitialNotification() {
      const remoteMessage = await messaging().getInitialNotification();

      if (remoteMessage) {
  
        store.dispatch(notificationApi.util.invalidateTags(['Notifications']));
        const { screen, propertyId } = remoteMessage.data || {};

        if (screen === 'PropertyDetails' && propertyId) {
          navigate('PropertyDetails', {
            id: propertyId,
          });
        }
      }
    }

    checkInitialNotification();

    return () => {
      unsubscribe();
      unsubscribeOpened();
    };
  }, []);

  if (showSplash) {
    return <PremiumSplash />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <RootNavigator />
          <Toast />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
