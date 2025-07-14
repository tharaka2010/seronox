import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handlePasswordReset = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error.message);
      let userMessage = 'An unexpected error occurred.';
      if (error.code === 'auth/invalid-email') {
        userMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/user-not-found') {
        userMessage = 'No user found with this email.';
      }
      setErrorMessage(userMessage);
    }
  };

  const navigateToSignIn = () => {
    router.replace('/loginAuth/signinscreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a password reset link.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="mail" size={20} color="#9d9d9d" style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}

          <TouchableOpacity onPress={handlePasswordReset} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Send Reset Email</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignIn}>
            <Text style={styles.backToLoginLink}>Back to Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#5F5F5F',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    color: '#5F5F5F',
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 50,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -5,
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -5,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#456FE8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginLink: {
    color: '#456FE8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
});
