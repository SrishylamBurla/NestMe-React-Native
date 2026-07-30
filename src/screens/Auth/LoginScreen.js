import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { useSaveFcmTokenMutation } from '../../services/authApi';
import firebase from '@react-native-firebase/app';
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from '../../services/authApi';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveFcmToken] = useSaveFcmTokenMutation();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: googleLoading }] = useGoogleLoginMutation();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter your email and password.',
      });
      return;
    }

    try {
      const response = await login({
        email: email.trim().toLowerCase(),
        password,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Login Successful 🎉',
        text2: `Welcome back, ${response.user?.name || 'User'}!`,
      });


      try {

        const permission = await messaging().requestPermission();

        const fcmToken = await messaging().getToken();

        const result = await saveFcmToken({ fcmToken }).unwrap();
      } catch (err) {
        console.log('❌ FCM FLOW ERROR:', err);
      }

      setTimeout(() => {
        navigation.replace('Home');
      }, 800);
    } catch (err) {
      console.log('❌ LOGIN ERROR:', JSON.stringify(err, null, 2));

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: err?.data?.message || err?.error || 'Invalid email or password.',
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const result = await GoogleSignin.signIn();

      if (result.type !== 'success') return;

      const idToken = result.data.idToken;
    
      const user = await googleLogin({
        idToken,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Google Login Successful 🎉',
        text2: `Welcome back, ${user?.name || 'User'}!`,
      });

      setTimeout(() => {
        navigation.replace('Home');
      }, 800);
    } catch (err) {
      console.log('GOOGLE LOGIN ERROR:', err);

      Toast.show({
        type: 'error',
        text1: 'Google Login Failed',
        text2: err?.data?.message || 'Unable to sign in with Google.',
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      quote="Sign in to continue your property journey."
    >
      <View style={styles.form}>
        <AuthInput
          label="Email Address"
          icon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <AuthInput
          label="Password"
          icon="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <AuthButton
          title={isLoading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
        />

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={googleLoading}
        >
          <Text style={styles.googleText}>
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 5,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -8,
  },

  forgotText: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '600',
  },

  bottom: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomText: {
    color: '#94A3B8',
    fontSize: 15,
  },

  register: {
    marginLeft: 6,
    color: '#60A5FA',
    fontWeight: '700',
    fontSize: 15,
  },

  googleButton: {
    marginTop: 15,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  googleText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
});
