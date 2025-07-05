import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Image paths
const images = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/3.png"),
  require("../assets/13.png"),
  require("../assets/12.png"),
  require("../assets/11.png"),
  require("../assets/14.png"),
];

export default function App() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#ff00ec", "#1f0024"]} style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome to Serenox{"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/* Swiper Image Slider */}
      <Swiper
        autoplay
        loop
        autoplayTimeout={3} // 3 seconds per slide
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        style={styles.swiper}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  swiper: {
    height: height * 0.4,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: height * 0.3,
    borderRadius: 15,
    resizeMode: "cover",
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#ff00ec",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  button: {
    backgroundColor: "#ff00ec",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
