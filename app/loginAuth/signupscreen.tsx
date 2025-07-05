// Signupscreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Import your initialized auth object

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(''); // New state for Age
  const [gender, setGender] = useState(''); // New state for Gender
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setErrorMessage(''); // Clear previous errors

    // --- Start of validation for all fields ---
    if (!email || !password || !age || !gender) {
      setErrorMessage('All fields (Email, Password, Age, Gender) are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }

    // Basic age validation
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) { // Assuming a reasonable age range
      setErrorMessage('Please enter a valid age (1-120).');
      return;
    }
    // --- End of validation for all fields ---

    try {
      // Create user with Email and Password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // At this point, the user is created in Firebase Authentication.
      // Age and Gender are NOT stored in Firebase Authentication itself.
      // They are only held in the local state of this component for now.

      console.log('User created:', user.uid);
      console.log('User Email:', email);
      console.log('User Age (local state):', ageNum); // Log age from local state
      console.log('User Gender (local state):', gender); // Log gender from local state

      Alert.alert("Success", "Account created successfully! Please log in.");
      router.replace('/loginAuth/signinscreen');
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      let userMessage = "An unexpected error occurred during registration.";
      if (error.code === 'auth/email-already-in-use') {
        userMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        userMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        userMessage = 'The password is too weak.';
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to get started.
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

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#9d9d9d" style={styles.icon} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* New Age Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="cake" size={20} color="#9d9d9d" style={styles.icon} />
              <TextInput
                placeholder="Age"
                style={styles.textInput}
                keyboardType="numeric" // Only allow numbers
                value={age}
                onChangeText={setAge}
                maxLength={3} // Max 3 digits for age
              />
            </View>

            {/* New Gender Input - You might want a Picker/Dropdown for better UX */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="wc" size={20} color="#9d9d9d" style={styles.icon} />
              <TextInput
                placeholder="Gender (e.g., Male, Female, Other)"
                style={styles.textInput}
                autoCapitalize="words"
                value={gender}
                onChangeText={setGender}
              />
            </View>

            {errorMessage ? (
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : null}

            <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={navigateToSignIn}>
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    color: "#5F5F5F",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 30,
  },
  subtitle: {
    color: "#5F5F5F",
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    width: "100%",
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
  errorMessageContainer: {
    marginTop: -5,
    marginBottom: 10,
    alignItems: 'center',
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: 'center',
  },
  signUpButton: {
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
    marginTop: 5,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: "#5F5F5F",
    fontSize: 14,
  },
  loginLink: {
    color: "#456FE8",
    fontWeight: "700",
  },
});