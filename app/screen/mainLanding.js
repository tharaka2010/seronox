import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Mainpage() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState("");

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        {/* Top Section */}




        <View className="h-[250px] flex-row items-center justify-center relative">

          
          {/* Placeholder Image */}
          <Image
            source={require("../../assets/Safe.png")}
            className="absolute w-full h-full rounded-b-3xl shadow-md"
            resizeMode="cover"
 

          />

          <View className="absolute top-0 left-0 right-0 bottom-0 bg-pink-200 opacity-30" />
          
        </View>

        {/* Categories Section */}
        <Text className="text-lg font-semibold px-10 mt-10 pb-4">
          Categories 
        </Text>
        <View className="flex-row flex-wrap justify-around mt-2 px-4">
          {/* General Knowledge */}
          <View className="w-[48%] -100  overflow-hidden mb-3 h-[150px]">
            <TouchableOpacity onPress={() => router.push('./Genaral/genaral_main')}>
              <Image
                source={require("../../assets/mainLanding/Homegeneral.png")}
                className="h-[120px] w-full pt-5 "
                resizeMode="cover"
              />
            </TouchableOpacity >

            <Text className="text-center font-medium my-2 text-xl">
              General Knowledge
            </Text>
          </View>

          {/* Female */}
          <TouchableOpacity className="w-[48%]  overflow-hidden mb-3 h-[150px]">
            <Image
              source={require("../../assets/mainLanding/homefemale.png")}
              className="h-[120px] w-full rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-center font-medium my-2 text-xl">Female</Text>
          </TouchableOpacity>

          {/* Child */}
          <TouchableOpacity className="w-[48%]  overflow-hidden mb-3 h-[150px]">
            <Image
              source={require("../../assets/mainLanding/homechild.png")}
              className="h-[120px] w-full"
              resizeMode="cover"
            />
            <Text className="text-center font-medium my-2 text-xl">Child</Text>
          </TouchableOpacity>

          {/* Male */}
          <TouchableOpacity className="w-[48%]  overflow-hidden mb-3 h-[150px]"
          onPress={() => router.push('./Male/male_main')}>
            <Image
              source={require("../../assets/mainLanding/homemale.png")}
              className="h-[120px] w-full"
              resizeMode="cover"
            />
            <Text className="text-center font-medium my-2 text-xl">Male</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor Advice Section */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-semibold mb-2">
            If you need, get advice from a Doctor
          </Text>
          <TouchableOpacity className="flex-row items-center bg-purple-200 rounded-lg p-4 shadow-md"
          onPress={() => router.push('./docterchanal')}
          >
            <Image
              source={require("../../assets/mainLanding/doctorchanel.png")}
              className="h-[120px] w-[220px] mr-3"
              resizeMode="contain"
            />
            <Text className="text-gray-800 flex-1">
              To contact a doctor as needed and receive treatment.{" "}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View className="p-4 bg-white rounded-lg shadow-md">
          {/* Title Text */}
          <Text className="text-base text-gray-800 mb-3">
            You can add your comments and problems. We will reply to them.
          </Text>

          {/* Input Field */}
          <TextInput
            placeholder="Type your suggestions here..."
            value={suggestion}
            onChangeText={setSuggestion}
            multiline
            numberOfLines={4}
            className="border border-gray-300 rounded-lg p-3 text-gray-700 h-[150px]"
            style={{ textAlignVertical: "top" }} // Aligns text at the top of the input box
          />

          {/* Send Button */}
          <TouchableOpacity className="mt-4 bg-teal-500 rounded-lg p-3 flex-row justify-center items-center">
            <Text className="text-white font-medium mr-2">Send</Text>
            <Feather name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}
