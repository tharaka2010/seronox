import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import { useRouter } from 'expo-router';

export default function NotificationView() {
  const router = useRouter();

  const notifications = [
    {
      id: '1',
      title: 'Upcoming Event',
      message: 'New community event this Saturday at 7 PM',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'App Update Available',
      message: 'Version 2.0 is now available for download',
      time: '1 day ago',
    },
    // Add more notifications here
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-500 p-4 flex-row items-center">
        <Text className="text-white text-lg font-bold">Notifications</Text>
        <TouchableOpacity
          className="ml-auto"
          onPress={() => router.push('/notification-settings')}
        >
          <Feather name="align-justify" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-gray-100 rounded-lg p-4 flex-row items-center mb-4"
            onPress={() => router.push('/notification-detail', { notification: item })}
          >
            <View className="bg-blue-500 rounded-full p-2 mr-4">
              <Feather name="bell" size={18} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-bold">{item.title}</Text>
              <Text className="text-gray-600">{item.message}</Text>
            </View>
            <Text className="text-gray-500 text-sm">{item.time}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      />

      <BottomNav />
    </View>
  );
}