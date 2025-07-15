import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  StatusBar,
  SafeAreaView,
  BackHandler,
  Dimensions,
  Text,
  Animated
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import BottomNav from '../../components/BottomNav';

const COLORS = {
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#F7FAFC",
  TEAL_BUTTON: "#2BC4B0",
  GRAY_TEXT: "#2D3748",
};

const TypingText = ({ text, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index.current));
        index.current++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [text]);

  return <Text style={style}>{displayedText}</Text>;
};

export default function FeaturesScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/screen/mainLanding');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [router])
  );

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView style={responsiveStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={responsiveStyles.container}>
        {/* Decorative Background Shapes */}
        <View style={responsiveStyles.decorativeShapes}>
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape1]} />
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape2]} />
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape3]} />
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape4]} />
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape5]} />
          <View style={[responsiveStyles.roundShape, responsiveStyles.shape6]} />
        </View>
        <View style={responsiveStyles.content}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
            <Text style={responsiveStyles.comingSoonText}>Coming Soon...</Text>
            <TypingText 
              text="We're working hard to bring you new features. Stay tuned!"
              style={responsiveStyles.descriptionText}
            />
          </Animated.View>
        </View>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const getResponsiveStyles = () => {
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;
  const scaleFactor = isTablet ? 1.2 : 1;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.LIGHT_GRAY,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    comingSoonText: {
      fontSize: 32 * scaleFactor,
      fontWeight: 'bold',
      color: COLORS.GRAY_TEXT,
      textAlign: 'center',
      marginTop: 20,
    },
    descriptionText: {
      fontSize: 18 * scaleFactor,
      color: COLORS.GRAY_TEXT,
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    decorativeShapes: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
    roundShape: {
      position: 'absolute',
      borderRadius: 1000,
      opacity: 0.08,
    },
    shape1: {
      width: 90,
      height: 90,
      backgroundColor: COLORS.TEAL_BUTTON,
      top: '8%',
      right: '8%',
    },
    shape2: {
      width: 70,
      height: 70,
      backgroundColor: '#f093fb',
      top: '25%',
      left: '5%',
    },
    shape3: {
      width: 50,
      height: 50,
      backgroundColor: '#4facfe',
      top: '45%',
      right: '10%',
    },
    shape4: {
      width: 35,
      height: 35,
      backgroundColor: '#43e97b',
      top: '65%',
      left: '12%',
    },
    shape5: {
      width: 25,
      height: 25,
      backgroundColor: '#667eea',
      top: '38%',
      right: '15%',
    },
    shape6: {
      width: 40,
      height: 40,
      backgroundColor: '#f5576c',
      top: '80%',
      left: '8%',
    },
  });
};