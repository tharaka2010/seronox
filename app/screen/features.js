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

export default function Features() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}
