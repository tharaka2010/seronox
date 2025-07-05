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
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function App() {
  const router = useRouter();

  return (
    
      <View className="flex-1 bg-[#FF9500]">
        <LinearGradient
          colors={["#FF9500", "#FF6B6B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 justify-center items-center"
        >
          <Image
            source={require("../assets/signup.png")}
            className="w-[400px] h-[400px]"
          />
          <Text className="text-white text-3xl font-bold mt-8 pt-10">
          Empower Your Knowledge{"\n"}with Comprehensive Sex Education!
          </Text>
          <Text className="text-gray-300 text-lg mt-4 pl-10 justify-center pr-10">
          Join our community to access reliable, accurate, and inclusive information about sexual health. Say goodbye to myths and misinformation, and start your journey towards informed and healthy choices.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg shadow-lg mt-8"
            onPress={() => router.push('/login')}
      >
            <Text className="text-white font-medium text-lg">Sign In</Text>
          </TouchableOpacity>

          <Text className="text-gray-300 text-lg mt-4 pr-3  mt-10">
            Don't have an account? &nbsp;&nbsp;
            <TouchableOpacity onPress={() => router.push('/registration')}>
              <Text className="text-blue-500 font-bold ">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </LinearGradient>
      </View>
    
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
