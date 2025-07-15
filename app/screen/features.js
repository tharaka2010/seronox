import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import LottieView from 'lottie-react-native';
import BottomNav from '../../components/BottomNav';

const { width, height } = Dimensions.get('window');

export default function Features() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

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

    // Floating animation for Lottie container
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation for backdrop
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Wave animation for gradient layers
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handleNotifyMe = () => {
    // Add haptic feedback or notification logic here
    console.log('Notify me pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      
      {/* Enhanced Background with animated gradient layers */}
      <View style={styles.gradientBackground}>
        <View style={styles.gradientLayer1} />
        <Animated.View 
          style={[
            styles.gradientLayer2, 
            {
              opacity: waveAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0.9],
              }),
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.gradientLayer3, 
            {
              opacity: waveAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.7],
              }),
            }
          ]} 
        />
        
        {/* Additional gradient overlay for depth */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Enhanced floating particles with different sizes and animations */}
      <View style={styles.particlesContainer}>
        {[...Array(12)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                opacity: Math.random() * 0.8 + 0.2,
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20 - (i * 2)],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* Decorative geometric shapes */}
      <View style={styles.decorativeShapes}>
        <Animated.View 
          style={[
            styles.geometricShape,
            styles.shape1,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]} 
        />
        <Animated.View 
          style={[
            styles.geometricShape,
            styles.shape2,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['360deg', '0deg'],
                  }),
                },
              ],
            },
          ]} 
        />
        <Animated.View 
          style={[
            styles.geometricShape,
            styles.shape3,
            {
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [0.95, 1.05],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]} 
        />
      </View>

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
        {/* Enhanced Lottie Animation with multiple backdrop layers */}
        <Animated.View 
          style={[
            styles.lottieContainer,
            {
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Multiple backdrop layers for depth */}
          <Animated.View 
            style={[
              styles.lottieBackdrop,
              styles.backdrop1,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]} 
          />
          <Animated.View 
            style={[
              styles.lottieBackdrop,
              styles.backdrop2,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['360deg', '0deg'],
                    }),
                  },
                ],
              },
            ]} 
          />
          <View style={[styles.lottieBackdrop, styles.backdrop3]} />
          
          <LottieView
            source={{
              uri: 'https://lottie.host/8f0c5f29-1f6c-4900-9077-118b4ab24b6e/3y6Y9XyG8g.json',
            }}
            autoPlay
            loop
            style={styles.lottie}
          />
        </Animated.View>

        {/* Enhanced title with multiple shimmer layers */}
        <Animated.View style={styles.titleContainer}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              styles.shimmer1,
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
          <Animated.View
            style={[
              styles.shimmerOverlay,
              styles.shimmer2,
              {
                transform: [
                  {
                    translateX: shimmerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-width * 0.5, width * 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={styles.title}>Coming Soon!</Text>
          <View style={styles.titleGlow} />
        </Animated.View>

        {/* Enhanced subtitle with glassmorphism container */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.subtitleGlass}>
            <Text style={styles.subtitle}>
              Get ready to explore one of our exciting new features — launching soon! 
              Stay tuned and stay with us for the experience.
            </Text>
          </View>
        </Animated.View>

        {/* Enhanced feature tags with staggered animations */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          
        </Animated.View>

        {/* Enhanced notify button with gradient and glow effect */}
      </Animated.View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  gradientLayer3: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.6,
    height: height * 0.4,
    backgroundColor: '#74B9FF',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
  },
  decorativeShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  geometricShape: {
    position: 'absolute',
    borderRadius: 8,
  },
  shape1: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: '15%',
    right: '10%',
    borderRadius: 30,
  },
  shape2: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: '75%',
    left: '15%',
    borderRadius: 8,
  },
  shape3: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: '35%',
    left: '8%',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  lottieContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  lottieBackdrop: {
    position: 'absolute',
    borderRadius: 140,
    top: -15,
    left: -15,
    zIndex: 0,
  },
  backdrop1: {
    width: 280,
    height: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backdrop2: {
    width: 260,
    height: 260,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -5,
    left: -5,
    borderRadius: 130,
  },
  backdrop3: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: 5,
    left: 5,
    borderRadius: 120,
  },
  lottie: {
    width: 250,
    height: 250,
    zIndex: 1,
  },
  titleContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    transform: [{ skewX: '-20deg' }],
  },
  shimmer1: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  shimmer2: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  titleGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    zIndex: -1,
  },
  subtitleContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  subtitleGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 12,
  },
  featureTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 4,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 20,
    position: 'relative',
  },
  notifyButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    backgroundColor: '#FF6B6B',
    position: 'relative',
  },
  buttonGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    borderRadius: 35,
    zIndex: 0,
  },
  buttonGradient: {
    paddingHorizontal: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 30,
    zIndex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
});