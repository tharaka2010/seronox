import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { submitFeedback } from "../utils/feedback"; // Corrected import path

// =============================================================================
// CONSTANTS & HELPERS
// =============================================================================

const getScreenDimensions = () => Dimensions.get("window");

const getDeviceType = (width) => {
  if (width >= 768) return 'tablet';
  if (width >= 414) return 'large_phone';
  return 'phone';
};

const CATEGORIES = [
  {
    id: 'general',
    title: 'General Knowledge',
    image: require("../../assets/mainLanding/Homegeneral.png"),
    route: '/screen/Genaral/genaral_main',
  },
  {
    id: 'female',
    title: 'Female',
    image: require("../../assets/mainLanding/homefemale.png"),
    route: '/screen/Female/female_main',
  },
  {
    id: 'child',
    title: 'Child',
    image: require("../../assets/mainLanding/homechild.png"),
    route: '/screen/Child/child_main',
  },
  {
    id: 'male',
    title: 'Male',
    image: require("../../assets/mainLanding/homemale.png"),
    route: '/screen/Male/male_main',
  },
];

const COLORS = {
  WHITE: "#FFFFFF",
  PINK_OVERLAY: "rgba(255, 192, 203, 0.3)", // Light pink with opacity
  GRAY_TEXT: "#4A5568", // text-gray-800
  BORDER_GRAY: "#D1D5DB", // border-gray-300
  TEAL_BUTTON: "#2BC4B0", // bg-teal-500
  PURPLE_ACCENT: "#D8BFD8", // bg-purple-200 (light purple)
  DARK_GRAY_SECONDARY: "#6B7280", // text-gray-700
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Mainpage() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState("");
  const [dimensions, setDimensions] = useState(getScreenDimensions());
  const [deviceType, setDeviceType] = useState(getDeviceType(dimensions.width));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
      setDeviceType(getDeviceType(window.width));
    });
    return () => subscription?.remove();
  }, []);

  const responsiveStyles = getResponsiveStyles(dimensions, deviceType);

  const handleCategoryPress = (route) => {
    // Only navigate if a route is defined for the category
    if (route) {
      router.push(route);
    } else {
      console.warn("Navigation route not defined for this category.");
      // Optionally provide feedback to the user, e.g., a toast message
    }
  };

  const handleSendSuggestion = async () => {
    if (!suggestion.trim()) {
      Alert.alert("Empty Feedback", "Please type a message before sending.");
      return;
    }
    try {
      await submitFeedback(suggestion);
      Alert.alert("Success", "Your feedback has been sent successfully!");
      setSuggestion(""); // Clear the input after sending
    } catch (error) {
      Alert.alert("Error", "Could not send feedback. Please try again later.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={responsiveStyles.safeArea}>
      <View style={responsiveStyles.container}>
        <ScrollView
          style={responsiveStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={responsiveStyles.scrollContent}
        >
          {/* Top Section */}
          <TopBanner responsiveStyles={responsiveStyles} />

          {/* Categories Section */}
          <CategoriesSection
            responsiveStyles={responsiveStyles}
            onCategoryPress={handleCategoryPress}
          />

          {/* Doctor Advice Section */}
          <DoctorAdviceSection
            responsiveStyles={responsiveStyles}
            onPress={() => router.push('./docterchanal')}
          />

          {/* Footer Section - Suggestions */}
          <SuggestionSection
            responsiveStyles={responsiveStyles}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
            onSend={handleSendSuggestion}
          />
          {/* Add some bottom padding to the scroll view content to prevent the last item from being cut off by the bottom nav */}
          <View style={{ height: responsiveStyles.bottomBuffer.height }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

// =============================================================================
// CHILD COMPONENTS
// =============================================================================

const TopBanner = ({ responsiveStyles }) => (
  <View style={responsiveStyles.topBanner}>
    <Image
      source={require("../../assets/Safe.png")}
      style={responsiveStyles.topBannerImage}
      resizeMode="cover"
    />
    <View style={responsiveStyles.topBannerOverlay} />
  </View>
);

const CategoriesSection = ({ responsiveStyles, onCategoryPress }) => (
  <View style={responsiveStyles.categoriesSection}>
    <Text style={responsiveStyles.sectionTitle}>Categories</Text>
    <View style={responsiveStyles.categoriesGrid}>
      {CATEGORIES.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          responsiveStyles={responsiveStyles}
          onPress={() => onCategoryPress(category.route)}
        />
      ))}
    </View>
  </View>
);

const CategoryItem = ({ category, responsiveStyles, onPress }) => (
  <View style={responsiveStyles.categoryItemWrapper}>
    <TouchableOpacity
      style={responsiveStyles.categoryImageTouchable}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={category.image}
        style={responsiveStyles.categoryImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
    <Text style={responsiveStyles.categoryTitle}>{category.title}</Text>
  </View>
);

const DoctorAdviceSection = ({ responsiveStyles, onPress }) => (
  <View style={responsiveStyles.doctorAdviceSection}>
    <Text style={responsiveStyles.sectionTitle}>
      If you need, get advice from a Doctor
    </Text>
    <TouchableOpacity
      style={responsiveStyles.doctorAdviceCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={require("../../assets/mainLanding/doctorchanel.png")}
        style={responsiveStyles.doctorAdviceImage}
        resizeMode="contain"
      />
      <Text style={responsiveStyles.doctorAdviceText}>
        To contact a doctor as needed and receive treatment.{" "}
      </Text>
    </TouchableOpacity>
  </View>
);

const SuggestionSection = ({ responsiveStyles, suggestion, setSuggestion, onSend }) => (
  <View style={responsiveStyles.suggestionSection}>
    <Text style={responsiveStyles.suggestionTitle}>
      You can add your comments and problems. We will reply to them.
    </Text>
    <TextInput
      placeholder="Type your suggestions here..."
      value={suggestion}
      onChangeText={setSuggestion}
      multiline
      numberOfLines={4}
      style={responsiveStyles.suggestionInput}
      textAlignVertical="top" // Aligns text at the top of the input box
    />
    <TouchableOpacity
      style={responsiveStyles.sendButton}
      onPress={onSend}
      activeOpacity={0.7}
    >
      <Text style={responsiveStyles.sendButtonText}>Send</Text>
      <Feather name="send" size={responsiveStyles.sendButtonIcon.fontSize} color={responsiveStyles.sendButtonIcon.color} />
    </TouchableOpacity>
  </View>
);

// =============================================================================
// RESPONSIVE STYLES FUNCTION
// =============================================================================

const getResponsiveStyles = (dimensions, deviceType) => {
  const { width, height } = dimensions;
  const isTablet = deviceType === 'tablet';
  const isLargePhone = deviceType === 'large_phone';

  // Base scaling factor
  const scaleFactor = isTablet ? 1.2 : isLargePhone ? 1.05 : 1;

  // Define responsive padding and margins
  const horizontalPadding = width * (isTablet ? 0.05 : 0.04);
  const verticalMargin = height * (isTablet ? 0.03 : 0.02);
  const sectionTitlePaddingTop = height * (isTablet ? 0.05 : 0.03);
  const sectionTitlePaddingBottom = height * (isTablet ? 0.025 : 0.015);


  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: Platform.OS === 'ios' ? 0 : 20, // Adjust for BottomNav if it overlaps
    },
    bottomBuffer: {
        height: 80, // Space for the BottomNav
    },

    // Top Banner
    topBanner: {
      height: Math.max(180, height * 0.28) * scaleFactor, // Responsive height
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    topBannerImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderBottomLeftRadius: 30, // Adjust radius for smoother curve
      borderBottomRightRadius: 30,
      overflow: 'hidden', // Ensure radius applies
      shadowColor: '#000', // Add shadow
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    topBannerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.PINK_OVERLAY,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },

    // Categories Section
    categoriesSection: {
      paddingHorizontal: horizontalPadding,
      marginTop: sectionTitlePaddingTop,
    },
    sectionTitle: {
      fontSize: Math.max(18, 22 * scaleFactor),
      fontWeight: '600', // Semi-bold
      marginBottom: sectionTitlePaddingBottom,
      color: COLORS.GRAY_TEXT,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 8, // slight margin
    },
    categoryItemWrapper: {
      width: isTablet ? '48%' : '47%', // Slightly less than 50% for spacing
      marginBottom: verticalMargin,
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 12, // Rounded corners for consistency
      backgroundColor: COLORS.WHITE, // Explicit background
      shadowColor: '#000', // Subtle shadow for card effect
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    categoryImageTouchable: {
      width: '100%',
      height: Math.max(100, 120 * scaleFactor), // Responsive image height
      justifyContent: 'center',
      alignItems: 'center',
      // paddingTop: 5, // Keep a small top padding if image has internal padding
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12, // Apply radius
      // borderBottomLeftRadius: 0, // No border radius at bottom if text is below
      // borderBottomRightRadius: 0,
    },
    categoryTitle: {
      textAlign: 'center',
      fontSize: Math.max(16, 18 * scaleFactor),
      fontWeight: '500', // Medium
      marginVertical: 10, // Adjust vertical margin
      color: COLORS.GRAY_TEXT,
    },

    // Doctor Advice Section
    doctorAdviceSection: {
      marginTop: verticalMargin,
      paddingHorizontal: horizontalPadding,
      marginBottom: verticalMargin, // Add bottom margin for spacing
    },
    doctorAdviceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.PURPLE_ACCENT,
      borderRadius: 12, // More pronounced rounded corners
      padding: Math.max(12, 16 * scaleFactor), // Responsive padding
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 4,
      overflow: 'hidden', // Ensure content respects border radius
    },
    doctorAdviceImage: {
      height: Math.max(100, 120 * scaleFactor),
      width: '45%', // Responsive width
      marginRight: Math.max(10, 15 * scaleFactor),
      // Ensure image is contained without stretching
      aspectRatio: 1.5, // Adjust this based on your image's aspect ratio if needed
    },
    doctorAdviceText: {
      color: COLORS.GRAY_TEXT,
      flex: 1, // Allow text to take remaining space
      fontSize: Math.max(14, 16 * scaleFactor),
      lineHeight: Math.max(20, 22 * scaleFactor),
    },

    // Suggestion Section
    suggestionSection: {
      padding: horizontalPadding, // Consistent padding
      backgroundColor: COLORS.WHITE,
      borderRadius: 12, // Rounded corners
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      marginBottom: verticalMargin, // Add margin to separate from bottom nav
    },
    suggestionTitle: {
      fontSize: Math.max(14, 16 * scaleFactor),
      color: COLORS.GRAY_TEXT,
      marginBottom: Math.max(12, 16 * scaleFactor),
    },
    suggestionInput: {
      borderWidth: 1,
      borderColor: COLORS.BORDER_GRAY,
      borderRadius: 8,
      padding: Math.max(10, 12 * scaleFactor),
      color: COLORS.DARK_GRAY_SECONDARY,
      minHeight: Math.max(120, 150 * scaleFactor), // Responsive min-height
      fontSize: Math.max(14, 16 * scaleFactor),
    },
    sendButton: {
      marginTop: Math.max(16, 20 * scaleFactor),
      backgroundColor: COLORS.TEAL_BUTTON,
      borderRadius: 10, // Slightly more rounded
      paddingVertical: Math.max(12, 14 * scaleFactor),
      paddingHorizontal: Math.max(20, 24 * scaleFactor),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    sendButtonText: {
      color: COLORS.WHITE,
      fontWeight: '600', // Semi-bold
      marginRight: Math.max(8, 10 * scaleFactor),
      fontSize: Math.max(16, 18 * scaleFactor),
    },
    sendButtonIcon: {
        fontSize: Math.max(18, 20 * scaleFactor),
        color: COLORS.WHITE,
    }
  });
};