import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import { auth } from '../../firebase'; // Import your initialized auth object
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous errors
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    try {
      // Implement Firebase login here
      await signInWithEmailAndPassword(auth, email, password);
      
      router.replace('/home'); // Use replace to prevent going back to login screen
    } catch (error: any) {
      console.error("Login error:", error.message);
      // Handle Firebase specific errors more gracefully if needed
      let userMessage = "An unexpected error occurred during login.";
      if (error.code === 'auth/invalid-email') {
        userMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/user-disabled') {
        userMessage = 'This user has been disabled.';
      } else if (error.code === 'auth/user-not-found') {
        userMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        userMessage = 'Wrong password.';
      } else if (error.code === 'auth/too-many-requests') {
        userMessage = 'Too many failed login attempts. Please try again later.';
      }
      setErrorMessage(userMessage);
    }
  };

  const navigateToSignUp = () => {
    router.push('/loginAuth/signupscreen');
  };

  const navigateToForgotPassword = () => {
    router.push('/loginAuth/forgotPassword');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
      </View>
      <View>
        <Text style={styles.titleLogin}>
          Please login to continue.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.bottomLinksContainer}>
          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgotPasswordLink}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.registerText}>
              Don’t have an account? <Text style={styles.registerLink}
              onPress={navigateToSignUp}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#5F5F5F",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },
  titleLogin: {
    color: "#5F5F5F",
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
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
  bottomLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -5,
    marginBottom: 15,
  },
  forgotPasswordLink: {
    color: "#456FE8",
    fontSize: 14,
    fontWeight: "600",
  },
  registerText: {
    color: "#5F5F5F",
    fontSize: 14,
  },
  registerLink: {
    color: "#456FE8",
    fontWeight: "700",
  },
  loginButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessageContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: 'center',
  },
});