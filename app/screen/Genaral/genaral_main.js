import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";


export default function Genaral_main() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">

      <View className="bg-blue-500 p-4 flex-row items-center ">
        <Text className="text-white text-lg font-bold">General Knowledge</Text>
        <TouchableOpacity
          className="ml-auto"
          onPress={() => router.push("/notification-settings")}
        >
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        {/* Top Section */}
        <View className="h-[200px] flex-row items-center justify-center relative  mt-[50px]">
          {/* Placeholder Image */}
          <Image
            source={require("../../../assets/mainLanding/General/general cover.png")}
            className="absolute w-[500px] h-[300px]  shadow-md rounded-b-3xl"
            resizeMode="cover"
          />
          
        </View>

        <View className="  mt-20">
          <TouchableOpacity
            className="  rounded-lg h-[150px] m-[20px]"
            onPress={() => router.push("./genaral_1")}
          >
            <Image
              source={require("../../../assets/mainLanding/General/General1.png")}
              className=" w-full h-full  shadow-md ml-.5 "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>


        <View className=" ">
          <TouchableOpacity
            className="  rounded-lg h-[150px] m-[20px]"
            onPress={() => router.push("./genaral_main/genaral_1")}
          >
            <Image
              source={require("../../../assets/mainLanding/General/General2.png")}
              className=" w-full h-full  shadow-md ml-.5 "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View className=" ">
          <TouchableOpacity
            className="  rounded-lg h-[150px] m-[20px]"
            onPress={() => router.push("./genaral_main/genaral_1")}
          >
            <Image
              source={require("../../../assets/mainLanding/General/General3.png")}
              className=" w-full h-full  shadow-md ml-.5 "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View className=" ">
          <TouchableOpacity
            className="  rounded-lg h-[150px] m-[20px]"
            onPress={() => router.push("./genaral_main/genaral_1")}
          >
            <Image
              source={require("../../../assets/mainLanding/General/General4.png")}
              className=" w-full h-full  shadow-md ml-.5 "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View className=" pb-5">
          <TouchableOpacity
            className="  rounded-lg h-[150px] m-[20px]"
            onPress={() => router.push("./genaral_main/genaral_1")}
          >
            <Image
              source={require("../../../assets/mainLanding/General/General5.png")}
              className=" w-full h-full  shadow-md ml-.5 "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        
        
      </ScrollView>

      
      
    </View>
  );
}
