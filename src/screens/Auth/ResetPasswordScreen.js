import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useResetPasswordMutation } from '../../services/authApi';

export default function ResetPasswordScreen({ navigation, route }) {
  const { token } = route.params;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleReset = async () => {
    if (password !== confirm) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }

    try {
      await resetPassword({
        token,
        password,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Password updated',
      });

      navigation.replace('Login');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err?.data?.message || 'Reset failed',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        secureTextEntry
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 54,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#5B3DF5',
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
