import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function FeaturesScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef([...Array(6)].map(() => new Animated.Value(0))).current;
  const [particlePositions] = useState(
    [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
  );

  useEffect(() => {
    // Staggered entrance animations
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Continuous pulse animation for the button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Shimmer animation for the title
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Particle animations
    const animations = particleAnims.map((anim) => {
        return Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 3000 + Math.random() * 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 3000 + Math.random() * 2000,
                    useNativeDriver: true,
                }),
            ])
        );
    });
    Animated.stagger(500, animations).start();
  }, []);

  const handleLogin = async () => {
    setErrorMessage('');
    setIsLoading(true);
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      setIsLoading(false);
      return;
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user has accepted the terms
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().termsAccepted) {
        // User has accepted terms, go to main landing
        router.replace('/screen/mainLanding');
      } else {
        // User has not accepted terms, go to terms screen
        router.replace('/screen/profile/terms');
      }
      
      await registerForPushNotificationsAsync(user);
    } catch (error) {
      console.error("Login error:", error.message);
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
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push('/loginAuth/signupscreen');
  };

  const navigateToForgotPassword = () => {
    router.push('/loginAuth/forgotPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      
      {/* Background with gradient effect using Views */}
      <View style={styles.gradientBackground}>
        <View style={styles.gradientLayer1} />
        <View style={styles.gradientLayer2} />
        <View style={styles.gradientLayer3} />
      </View>

      {/* Floating particles background */}
      <View style={styles.particlesContainer}>
        {[...Array(6)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                left: particlePositions[i].left,
                top: particlePositions[i].top,
                opacity: particleAnims[i].interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                }),
                transform: [
                    {
                        translateY: particleAnims[i].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -30],
                        }),
                    },
                    {
                        scale: particleAnims[i].interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [1, 1.5, 1],
                        }),
                    }
                ],
              },
            ]}
          />
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            {/* Lottie Animation with backdrop */}
            <View style={styles.lottieContainer}>
              <View style={styles.lottieBackdrop} />
              <LottieView
                source={{
                  uri: 'https://lottie.host/8f0c5f29-1f6c-4900-9077-118b4ab24b6e/3y6Y9XyG8g.json',
                }}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>

            {/* Animated title with shimmer effect */}
            <Animated.View style={styles.titleContainer}>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  {
                    transform: [
                      {
                        translateX: shimmerAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-width, width],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Text style={styles.title}>Welcome Back</Text>
            </Animated.View>

            {/* Subtitle with fade in */}
            <Animated.View
              style={[
                styles.subtitleContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.subtitle}>
                Sign in to your account to continue your journey
              </Text>
            </Animated.View>

            {/* Form Section */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="mail"
                  size={20}
                  color="rgba(255, 255, 255, 0.8)"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
                  color="rgba(255, 255, 255, 0.8)"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  secureTextEntry={!showPassword}
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                </TouchableOpacity>
              </View>

              {errorMessage ? (
                <Animated.View
                  style={[
                    styles.errorMessageContainer,
                    {
                      opacity: fadeAnim,
                    },
                  ]}
                >
                  <MaterialIcons name="error" size={16} color="#FF6B6B" />
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </Animated.View>
              ) : null}

              <Animated.View
                style={[
                  styles.buttonContainer,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity
                onPress={navigateToForgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                onPress={navigateToSignUp}
                style={styles.signUpContainer}
              >
                <Text style={styles.signUpText}>
                  Don't have an account?{' '}
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6C5CE7',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  gradientLayer1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
    backgroundColor: '#6C5CE7',
  },
  gradientLayer2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.3,
    height: height * 0.4,
    backgroundColor: '#A29BFE',
    opacity: 0.8,
  },
  gradientLayer3: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.6,
    height: height * 0.4,
    backgroundColor: '#74B9FF',
    opacity: 0.6,
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
    minHeight: height * 0.9,
  },
  lottieContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  lottieBackdrop: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -10,
    left: -10,
    zIndex: 0,
  },
  lottie: {
    width: 180,
    height: 180,
    zIndex: 1,
  },
  titleContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 10,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 100,
    transform: [{ skewX: '-20deg' }],
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitleContainer: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    height: 54,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  icon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: -4,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  errorMessage: {
    color: "#FF6B6B",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  signInButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  signUpText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  signUpLink: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});