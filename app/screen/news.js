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

export default function News() {
  const router = useRouter();

  const newsItems = [
    {
      title: "Animals get boost from Southampton tree vandals",
      image: require("../../assets/news2.jpg"),
      time: "15 minutes ago",
    },
    {
      title: "The odd philosophy Icelanders live by",
      image: require("../../assets/news1.png"),
      time: "1 hour ago",
    },
    // Add more news items here
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-500 p-4 flex-row items-center ">
        <Text className="text-white text-lg font-bold">News</Text>
        <TouchableOpacity
          className="ml-auto"
          onPress={() => router.push("/notification-settings")}
        >
          <Feather name="message-square" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1">
        <Text className="text-7xl font-semibold px-10 mt-10 pb-4">
          Latest News
        </Text>
        <Text className="text-6xl font-semibold px-10 mt-1 pb-4">
          and Article
        </Text>
        {newsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-4 py-3 border-b border-gray-200"
            onPress={() => router.push("/news-detail")}
          >
            <Image
              source={item.image}
              className="w-[190px] h-[120px] rounded-md mr-4"
            />
            <View className="flex-1">
              <Text className="font-bold text-gray-800 text-base">
                {item.title}
              </Text>
              <View className="flex-row items-center">
                <Feather name="clock" size={14} color="gray" />
                <Text className="text-gray-500 text-sm ml-2">{item.time}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}
