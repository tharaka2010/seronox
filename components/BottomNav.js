import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons, Feather, AntDesign } from "@expo/vector-icons";

const BottomNav = () => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center bg-white py-3 border-t border-gray-300 shadow-md">
      {/* Home */}
      <TouchableOpacity
        onPress={() => router.push("./mainLanding")}
        className="items-center flex-1"
      >
        <AntDesign name="home" size={24} color="black" />
        <Text className="text-xs mt-1">Home</Text>
      </TouchableOpacity>

      {/* Features */}
      <TouchableOpacity
        onPress={() => router.push("./features")}
        className="items-center flex-1"
      >
        <Ionicons name="star-outline" size={24} color="black" />
        <Text className="text-xs mt-1">Features</Text>
      </TouchableOpacity>

      {/* News */}
      <TouchableOpacity
        onPress={() => router.push("./news")}
        className="items-center flex-1"
      >
        <FontAwesome5 name="newspaper" size={24} color="black" />
        <Text className="text-xs mt-1">News</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
        onPress={() => router.push("./notification")}
        className="items-center flex-1"
      >
        <Feather name="bell" size={24} color="black" />
        <Text className="text-xs mt-1">Notifications</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        onPress={() => router.push("./profile")}
        className="items-center flex-1"
      >
        <Ionicons name="person-outline" size={24} color="black" />
        <Text className="text-xs mt-1">Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
