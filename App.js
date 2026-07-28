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

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  async function requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      console.log('Notification permission:', granted);
    }
  }
  // Google Sign-In & Splash
  useEffect(() => {
    requestNotificationPermission();
    GoogleSignin.configure({
      webClientId:
        '649361346808-ivtqedvt2ss5fldilbvjb25imcvruk2o.apps.googleusercontent.com',
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
      console.log('📩 Foreground:', remoteMessage);

      store.dispatch(notificationApi.util.invalidateTags(['Notifications']));

      await showNotification(
        remoteMessage.notification?.title ?? 'NestMe',
        remoteMessage.notification?.body ?? '',
      );
    });

    // User tapped notification while app in background
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('📲 Opened from Background:', remoteMessage);

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
        console.log('🚀 Opened from Quit State:', remoteMessage);

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
