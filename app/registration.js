import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const RegistrationScreen = () => {
  const router = useRouter();

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedlanguage, setSelectelanguage] = useState("");

  return (
    <View className="flex-1 bg-[#FF9500]">
      <LinearGradient
        colors={["#FF9500", "#FF6B6B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center"
      >
        <Text className="text-white text-4xl font-bold">Registration Now!</Text>
        <Text className="text-gray-300 text-lg mt-4">Create your Account</Text>

        <View className="w-full max-w-md mt-8">
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#b3b3b3"
            className="bg-white px-4 py-3 rounded-lg mb-4"
          />
          <TextInput
            placeholder="Age"
            placeholderTextColor="#b3b3b3"
            className="bg-white px-4 py-3 rounded-lg mb-4"
          />

          <View className="bg-white px-1  rounded-lg mb-4">
            {/* Dropdown for Gender Selection */}
            <Picker
              selectedValue={selectedGender}
              onValueChange={(itemValue) => setSelectedGender(itemValue)}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 1,
                paddingVertical: 1,
                borderRadius: 8,
                borderColor: "#b3b3b3",
                borderWidth: 1,
                placeholderTextColor: "#b3b3b3",
              }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <View className="bg-white px-1  rounded-lg mb-4">
            {/* Dropdown for Gender Selection */}
            <Picker
              selectedValue={selectedlanguage}
              onValueChange={(itemValue) => setSelectelanguage(itemValue)}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 1,
                paddingVertical: 1,
                borderRadius: 8,
                borderColor: "#b3b3b3",
                borderWidth: 1,
                placeholderTextColor: "#b3b3b3",
              }}
            >
              <Picker.Item label="Select Language" value="" />
              <Picker.Item label="English" value="male" />
              <Picker.Item label="සිංහල" value="female" />
            </Picker>
          </View>

          <TextInput
            placeholder="Password"
            placeholderTextColor="#b3b3b3"
            className="bg-white px-4 py-3 rounded-lg mb-4"
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#b3b3b3"
            className="bg-white px-4 py-3 rounded-lg mb-4"
            secureTextEntry
          />
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg shadow-lg"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-medium text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default RegistrationScreen;
