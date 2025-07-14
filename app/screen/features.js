
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import BottomNav from '../../components/BottomNav';

export default function Features() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView
          source={{ uri: 'https://lottie.host/8f0c5f29-1f6c-4900-9077-118b4ab24b6e/3y6Y9XyG8g.json' }}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.title}>Coming Soon!</Text>
        <Text style={styles.subtitle}>
          Get ready to explore one of our exciting new features — launching soon! Stay tuned and stay with us for the experience.
        </Text>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
