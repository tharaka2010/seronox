import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { FontAwesome5, Ionicons, Feather, AntDesign } from "@expo/vector-icons";

// =============================================================================
// CONSTANTS & HELPERS
// =============================================================================

const getScreenDimensions = () => Dimensions.get("window");

const getDeviceType = (width) => {
  if (width >= 768) return 'tablet';
  if (width >= 414) return 'large_phone';
  return 'phone';
};

const NAV_ITEMS = [
  { name: "Home", icon: AntDesign, iconName: "home", route: "/screen/mainLanding" },
  { name: "News", icon: FontAwesome5, iconName: "newspaper", route: "/screen/news" },
  { name: "Notifications", icon: Feather, iconName: "bell", route: "/screen/notification" },
  { name: "Profile", icon: Ionicons, iconName: "person-outline", route: "/screen/profile" },
];

const COLORS = {
  WHITE: "#FFFFFF",
  GRAY_BORDER: "#D1D5DB", // border-gray-300
  TEXT_COLOR: "#000000",
  ACTIVE_COLOR: "#6200ee", // A primary color for active tab, adjust as needed
  INACTIVE_COLOR: "#888888",
  SHADOW_COLOR: "#000000",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================


const BottomNav = () => {
  const router = useRouter();
  const segments = useSegments();
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

  const isActive = (route) => {
    const currentPath = `/${segments.join('/')}`;
    return currentPath.startsWith(route);
  };

  return (
    <View style={responsiveStyles.navContainer}>
      {NAV_ITEMS.map((item) => {
        const IconComponent = item.icon;
        const active = isActive(item.route);
        const iconColor = active ? COLORS.ACTIVE_COLOR : COLORS.INACTIVE_COLOR;
        const textColor = active ? COLORS.ACTIVE_COLOR : COLORS.TEXT_COLOR;


        
        return (
          <TouchableOpacity
            key={item.name}
            onPress={() => router.replace(item.route)}
            style={responsiveStyles.navItem}
            activeOpacity={0.7}
          >
            <IconComponent name={item.iconName} size={responsiveStyles.icon.fontSize} color={iconColor} />
            <Text style={[responsiveStyles.navText, { color: textColor }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// =============================================================================
// RESPONSIVE STYLES FUNCTION
// =============================================================================

const getResponsiveStyles = (dimensions, deviceType) => {
  const { width } = dimensions;
  const isTablet = deviceType === 'tablet';
  const isLargePhone = deviceType === 'large_phone';

  const scaleFactor = isTablet ? 1.2 : isLargePhone ? 1.05 : 1;
  const baseIconSize = 24;
  const baseTextSize = 10;
  const basePaddingVertical = 12; // py-3 in Tailwind

  return StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around', // Changed from space-between to space-around for even spacing
      alignItems: 'center',
      backgroundColor: COLORS.WHITE,
      paddingVertical: basePaddingVertical * scaleFactor,
      borderTopWidth: StyleSheet.hairlineWidth, // Use hairline width for subtle border
      borderColor: COLORS.GRAY_BORDER,
      shadowColor: COLORS.SHADOW_COLOR,
      shadowOffset: { width: 0, height: -3 }, // Shadow above the nav bar
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 10, // For Android shadow
      // On iOS, paddingBottom needs to account for the safe area inset
      paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Extra padding for iPhone X and newer models to clear the home indicator
    },
    navItem: {
      flex: 1, // Distribute space equally among items
      alignItems: 'center',
      paddingVertical: 5, // Small internal padding for touchable area
    },
    icon: {
      fontSize: baseIconSize * scaleFactor,
    },
    navText: {
      fontSize: baseTextSize * scaleFactor,
      marginTop: 4, // mt-1 (approx. 4px)
      fontWeight: '500', // Typically text in nav is medium or regular
    },
  });
};

export default BottomNav;