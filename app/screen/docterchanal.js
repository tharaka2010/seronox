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

export default function Docterchanal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">

        <ScrollView className="flex-1">

        <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/doc1.jpg")}
              className="w-[200px] h-[200px] rounded-full mr-4"
            />
            <View>
              <Text className="text-xl font-bold">Dr. James Cooper</Text>
              <Text className="text-gray-500">Dermatologist</Text>
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

        <View className="mb-6 mt-10">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/doc2.png")}
              className="w-[200px] h-[200px] rounded-full mr-4"
            />
            <View>
              <Text className="text-xl font-bold">Dr. John Herman</Text>
              <Text className="text-gray-500">Dermatologist</Text>
            </View>
          </View>
          <View className="flex flex-row items-center mt-3">
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <Feather name="star" size={16} color="#FFC107" className="mr-1" />
            <TouchableOpacity className="bg-teal-500 py-2 px-4 rounded-full ml-auto"
            onPress={() => router.push('./docappiment')}>
              
              <Text className="text-white font-medium">Make appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6 mt-10">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/doc3.jpg")}
              className="w-[200px] h-[200px] rounded-full mr-4"
            />
            <View>
              <Text className="text-xl font-bold">Dr. Elle Fanning</Text>
              <Text className="text-gray-500">Dermatologist</Text>
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
      </ScrollView>

     
      
    </View>


        </ScrollView>


        
      

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}
