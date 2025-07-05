import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Docappiment() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white mt-10">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/doc2.png")}
              className="w-[200px] h-[200px] rounded-full mr-4"
            />
            <View>
              <Text className="text-xl font-bold">Dr. Emma Jones</Text>
              <Text className="text-gray-500">Cardiologist</Text>
            </View>
          </View>
          <View className="flex flex-row items-center mt-3">
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <TouchableOpacity className="bg-teal-500 py-2 px-4 rounded-full ml-auto">
              <Text className="text-white font-medium">Make appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-gray-100 rounded-lg p-4">
          <Text className="text-gray-700 font-medium mb-2">Date</Text>
          <View className="flex flex-row justify-between">
            <TouchableOpacity className="bg-white py-2 px-4 rounded-lg shadow">
              <Text className="text-teal-500 font-medium">Today</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white py-2 px-4 rounded-lg shadow">
              <Text className="text-gray-700 font-medium">Thursday</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white py-2 px-4 rounded-lg shadow">
              <Text className="text-gray-700 font-medium">Friday</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white py-2 px-4 rounded-lg shadow">
              <Text className="text-gray-700 font-medium">Saturday</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white py-2 px-4 rounded-lg shadow">
              <Text className="text-gray-700 font-medium">Sunday</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-gray-100 rounded-lg p-4 mt-6">
          <Text className="text-gray-700 font-medium mb-2">Time</Text>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-teal-500 font-medium">AM</Text>
            <Text className="text-gray-700 font-medium">8:30 - 9:30</Text>
            <Text className="text-gray-700 font-medium">10:00 - 11:00</Text>
          </View>
        </View>

        <View className="bg-teal-500 rounded-lg p-4 mt-6">
          <Text className="text-white font-medium mb-2">Description</Text>
          <Text className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}