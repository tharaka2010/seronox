import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import "../global.css";

export default function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [error, setError] = useState(false); // Error state
  const router = useRouter();

  const handleNext = () => {
    if (!isChecked) {
      setError(true);
    } else {
      setError(false);
      router.push("/NextPage");
    }
  };

  return (
    <LinearGradient
      colors={["#FF9500", "#FF6B6B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center"
    >
      {/* Title */}
      <ScrollView>
        <Text className="text-white text-3xl font-bold text-center mb-8 pt-10">
          Terms & Conditions
        </Text>

        {/* Dashed Lines */}
        <View className="bg-white p-4 rounded-lg mb-5 h-[750px] opacity-85  ">
          <View className="flex-1 p-5bg-white p-4 rounded-lg mb-5 ">
            {/* Title */}
            <Text className="text-3xl font-bold text-center text-purple-700 mb-4">
              Terms and Conditions
            </Text>

            {/* Intro Text */}
            <Text className="text-base text-gray-700 mb-4 text-center ">
              Welcome to Our Application. Please read the following terms and
              conditions carefully before proceeding:
            </Text>

            {/* Terms Section */}
            <View className="space-y-4">
              {/* Term 1 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  1. Acceptance of Terms
                </Text>
                <Text className="text-gray-600">
                  By accessing or using our app, you agree to abide by these
                  terms and conditions.
                </Text>
              </View>

              {/* Term 2 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  2. Responsible Usage
                </Text>
                <Text className="text-gray-600">
                  You must use the app responsibly and in compliance with all
                  applicable laws and regulations.
                </Text>
              </View>

              {/* Term 3 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  3. User Conduct
                </Text>
                <Text className="text-gray-600">
                  - Do not use the app for any illegal or unauthorized purposes.
                  {"\n"}- Respect the privacy and rights of other users.
                </Text>
              </View>

              {/* Term 4 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  4. Data and Privacy
                </Text>
                <Text className="text-gray-600">
                  - Your personal information will be handled according to our
                  Privacy Policy.{"\n"}- You agree not to misuse or share other
                  users' data.
                </Text>
              </View>

              {/* Term 5 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  5. Prohibited Activities
                </Text>
                <Text className="text-gray-600">
                  The following activities are strictly prohibited:{"\n"}-
                  Unauthorized distribution of app content.{"\n"}- Attempting to
                  harm or hack the app.{"\n"}- Misrepresentation of your
                  identity.
                </Text>
              </View>

              {/* Term 6 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  6. Content Disclaimer
                </Text>
                <Text className="text-gray-600">
                  The information provided in the app is for **educational
                  purposes only**. We do not guarantee its accuracy or
                  completeness.
                </Text>
              </View>

              {/* Term 7 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  7. Changes to Terms
                </Text>
                <Text className="text-gray-600">
                  We reserve the right to update or modify these terms at any
                  time. Continued use of the app indicates your acceptance of
                  the updated terms.
                </Text>
              </View>

              {/* Term 8 */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  8. Termination
                </Text>
                <Text className="text-gray-600">
                  Failure to comply with these terms may result in the
                  termination of your account or access to the app.
                </Text>
              </View>

              {/* Contact */}
              <View>
                <Text className="font-semibold text-lg text-purple-600">
                  9. Contact Us
                </Text>
                <Text className="text-gray-600">
                  If you have any questions about these terms, please contact us
                  at{" "}
                  <Text className="text-blue-600 underline">
                    support@example.com
                  </Text>
                  .
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Checkbox Section */}
        <View className="flex-row items-center bg-white p-3 rounded-lg mb-4 space-x-3 border border-gray-300  pl-[25px]">
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#6200ee" : undefined}
          />
          <Text className="text- text-base font-semibold  pl-6 pr-6 ">
            I agree with all policies and conditions
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <Text className="text-white  text-center mb-4 text-lg mt-4">
            Sorry! Please confirm you agree with the policies and conditions
          </Text>
        )}

        {/* Next Button */}
      </ScrollView>

      <TouchableOpacity
        className="bg-pink-500 py-3 px-8 rounded-3xl self-center mb-10 mt-[40px]"
        onPress={() => {
          if (isChecked) {
            router.push("/signin"); // Navigate to Sign In page if checkbox is selected
          } else {
            setError(true); // Show error if checkbox is not selected
          }
        }}
      >
        <Text className="text-white text-lg font-bold">Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
