import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={["#A855F7", "#8B5CF6", "#6D28D9"]} // Purple gradient shades
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-blue-500 p-6 justify-center items-center rounded-3xl">
          <Image
            source={require("../../assets/profile.jpg")}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-white text-xl font-bold">Pathum Nissanka</Text>
          <Text className="text-white text-base">Joined 1 year ago</Text>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 font-bold text-base">Profile</Text>
          <TouchableOpacity onPress={() => router.push("/edit-profile")}>
            <Feather name="edit" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-100 rounded-lg p-4 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Username</Text>
            <Text className="text-gray-800 font-bold">davidrobinson</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Email Address</Text>
            <Text className="text-gray-800 font-bold">david@example.com</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Mobile Number</Text>
            <Text className="text-gray-800 font-bold">0764599999</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-gray-100 rounded-lg p-4 flex-row justify-between items-center mb-4"
          onPress={() => router.push("/notifications")}
        >
          <Text className="text-gray-800 font-bold">Notifications</Text>
          <Feather name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-lg p-4 flex-row justify-between items-center mb-4"
          onPress={() => router.push("/settings")}
        >
          <Text className="text-gray-800 font-bold">Settings</Text>
          <Feather name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-lg p-4 flex-row justify-between items-center mb-4"
          onPress={() => router.push("/settings")}
        >
          <Text className="text-gray-800 font-bold">Language</Text>
          <Text className="text-gray-800 font-bold ">සිංහල</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-lg p-4 flex-row justify-between items-center"
          onPress={() => router.push("/settings")}
        >
          <Text className="text-gray-800 font-bold">About Us</Text>
          <Feather
            name="award"
            size={18}
            color="gray"
            className="mr-[320px] "
          />
          <Feather name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>

        <View className="flex-row ">
          <Text className="text-gray-800 font-bold pt-5 pl-2">
            Made in 🇱🇰 with ❤️
          </Text>
        </View>
      </View>

      <BottomNav />
    </View>
  );
}
