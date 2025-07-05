// home.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

// =============================================================================
// CONSTANTS & HELPERS
// =============================================================================

const getScreenDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

const getDeviceType = (width) => {
  if (width >= 768) return 'tablet';
  if (width >= 414) return 'large_phone';
  return 'phone';
};

const CONFIG = {
  CHECKBOX_COLOR: "#6200ee",
  CONTACT_EMAIL: "support@serenox.com",
  ROUTES: {
    LOGIN: "/screen/mainLanding", // This is the route for the "Next" button
    NEXT_PAGE: "/nextPage", // Kept for completeness if used elsewhere
  },
  COLORS: {
    PRIMARY: "#6200ee",
    SECONDARY: "#FF6B6B", // This color will now be the solid background
    WHITE: "#FFFFFF",
    GRAY: "#666666",
    LIGHT_GRAY: "#F5F5F5",
    ERROR: "#FF4444",
  },
};

const TERMS_DATA = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content: "By accessing or using our Serenox app, you agree to abide by these terms and conditions. Your continued use of the application constitutes acceptance of all policies outlined herein.",
  },
  {
    id: 2,
    title: "Responsible Usage",
    content: "You must use the app responsibly and in compliance with all applicable laws and regulations. This includes respecting educational content and using features as intended.",
  },
  {
    id: 3,
    title: "User Conduct",
    content: "• Do not use the app for any illegal or unauthorized purposes\n• Respect the privacy and rights of other users\n• Maintain appropriate behavior in all interactions\n• Report any misuse or inappropriate content",
  },
  {
    id: 4,
    title: "Data and Privacy",
    content: "• Your personal information will be handled according to our Privacy Policy\n• You agree not to misuse or share other users' data\n• We implement security measures to protect your information\n• You have control over your data and privacy settings",
  },
  {
    id: 5,
    title: "Prohibited Activities",
    content: "The following activities are strictly prohibited:\n• Unauthorized distribution of app content\n• Attempting to harm or hack the app\n• Misrepresentation of your identity\n• Sharing inappropriate or harmful content\n• Circumventing security measures",
  },
  {
    id: 6,
    title: "Content Disclaimer",
    content: "The information provided in the app is for educational purposes only. We do not guarantee its accuracy or completeness. Always consult with healthcare professionals for medical advice.",
  },
  {
    id: 7,
    title: "Changes to Terms",
    content: "We reserve the right to update or modify these terms at any time. Continued use of the app indicates your acceptance of the updated terms. Users will be notified of significant changes.",
  },
  {
    id: 8,
    title: "Termination",
    content: "Failure to comply with these terms may result in the termination of your account or access to the app. We reserve the right to suspend or terminate access for violations.",
  },
  {
    id: 9,
    title: "Contact Us",
    content: `If you have any questions about these terms, please contact us at ${CONFIG.CONTACT_EMAIL}.`,
    hasEmail: true,
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState(getScreenDimensions());
  const [deviceType, setDeviceType] = useState(getDeviceType(dimensions.width));
  const router = useRouter();

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
      setDeviceType(getDeviceType(window.width));
    });

    return () => subscription?.remove();
  }, []);

  const handleNext = () => {
    if (!isChecked) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      setError(false);
      try {
        router.push(CONFIG.ROUTES.LOGIN); // This navigates to /mainLanding
      } catch (navigationError) {
        console.error('Navigation error:', navigationError);
        router.replace(CONFIG.ROUTES.LOGIN); // Fallback navigation
      }
    }
  };

  const responsiveStyles = getResponsiveStyles(dimensions, deviceType);

  return (
    // SafeAreaView now explicitly sets the background color for the whole screen
    <SafeAreaView style={[styles.safeArea, { backgroundColor: CONFIG.COLORS.SECONDARY }]}>
      <View
        style={[styles.container, responsiveStyles.container]}
      >
        {/* Header */}
        <Header responsiveStyles={responsiveStyles} />

        {/* Scrollable Content */}
        <ScrollView
          style={[styles.scrollView, responsiveStyles.scrollView]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={responsiveStyles.scrollContent}
        >
          {/* Terms Content */}
          <TermsContent responsiveStyles={responsiveStyles} />

          {/* Agreement Section */}
          <AgreementSection
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            error={error}
            responsiveStyles={responsiveStyles}
          />
          {/* Added a small buffer at the end of the scroll view to prevent content from touching the bottom */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Action Button */}
        <ActionButton onPress={handleNext} responsiveStyles={responsiveStyles} />
      </View>
    </SafeAreaView>
  );
}

// =============================================================================
// CHILD COMPONENTS
// =============================================================================

const Header = ({ responsiveStyles }) => (
  <View style={[styles.header, responsiveStyles.header]}>
    <Text style={[styles.headerTitle, responsiveStyles.headerTitle]}>
      Terms & Conditions
    </Text>
    <Text style={[styles.headerSubtitle, responsiveStyles.headerSubtitle]}>
      Welcome to Serenox
    </Text>
  </View>
);

const TermsContent = ({ responsiveStyles }) => (
  <View style={[styles.termsContainer, responsiveStyles.termsContainer]}>
    <View style={[styles.termsContent, responsiveStyles.termsContent]}>
      {/* Content Header */}
      <ContentHeader responsiveStyles={responsiveStyles} />

      {/* Terms List */}
      <TermsList responsiveStyles={responsiveStyles} />
    </View>
  </View>
);

const ContentHeader = ({ responsiveStyles }) => (
  <View style={[styles.contentHeader, responsiveStyles.contentHeader]}>
    <Text style={[styles.contentTitle, responsiveStyles.contentTitle]}>
      Terms and Conditions
    </Text>
    <Text style={[styles.contentSubtitle, responsiveStyles.contentSubtitle]}>
      Please read the following terms and conditions carefully before proceeding:
    </Text>
  </View>
);

const TermsList = ({ responsiveStyles }) => (
  <View style={[styles.termsList, responsiveStyles.termsList]}>
    {TERMS_DATA.map((term) => (
      <TermItem key={term.id} term={term} responsiveStyles={responsiveStyles} />
    ))}
  </View>
);

const TermItem = ({ term, responsiveStyles }) => (
  <View style={[styles.termItem, responsiveStyles.termItem]}>
    <Text style={[styles.termTitle, responsiveStyles.termTitle]}>
      {term.id}. {term.title}
    </Text>
    <Text style={[styles.termContent, responsiveStyles.termContent]}>
      {term.hasEmail ? (
        <TextWithEmail content={term.content} responsiveStyles={responsiveStyles} />
      ) : (
        term.content
      )}
    </Text>
  </View>
);

const TextWithEmail = ({ content, responsiveStyles }) => {
  const parts = content.split(CONFIG.CONTACT_EMAIL);

  return (
    <>
      {parts[0]}
      <Text style={[styles.emailLink, responsiveStyles.emailLink]}>
        {CONFIG.CONTACT_EMAIL}
      </Text>
      {parts[1] || ''}
    </>
  );
};

const AgreementSection = ({ isChecked, setIsChecked, error, responsiveStyles }) => (
  <View style={[styles.agreementSection, responsiveStyles.agreementSection]}>
    {/* Checkbox Container */}
    <View style={[styles.checkboxContainer, responsiveStyles.checkboxContainer]}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? CONFIG.CHECKBOX_COLOR : undefined}
        style={[styles.checkbox, responsiveStyles.checkbox]}
      />
      <Text style={[styles.checkboxText, responsiveStyles.checkboxText]}>
        I agree with all policies and conditions
      </Text>
    </View>

    {/* Error Message */}
    {error && <ErrorMessage responsiveStyles={responsiveStyles} />}
  </View>
);

const ErrorMessage = ({ responsiveStyles }) => (
  <Text style={[styles.errorMessage, responsiveStyles.errorMessage]}>
    Please confirm you agree with the policies and conditions
  </Text>
);

const ActionButton = ({ onPress, responsiveStyles }) => (
  <View style={[styles.actionContainer, responsiveStyles.actionContainer]}>
    <TouchableOpacity
      style={[styles.actionButton, responsiveStyles.actionButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.actionButtonText, responsiveStyles.actionButtonText]}>
        Next
      </Text>
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

  const scaleFactor = isTablet ? 1.4 : isLargePhone ? 1.1 : 1;
  // Increase base padding for better overall spacing
  const baseHorizontalPadding = Math.max(20, width * 0.05);
  const baseVerticalPadding = Math.max(20, height * 0.025);


  return StyleSheet.create({
    container: {
      flex: 1, // Ensure container takes full height within SafeAreaView
      paddingHorizontal: baseHorizontalPadding, // Apply consistent horizontal padding
      paddingTop: Platform.OS === 'ios' ? 0 : 20, // Add top padding for Android within the View (SafeAreaView handles iOS)
    },

    header: {
      paddingBottom: 20,
      paddingTop: 0, // SafeAreaView handles top padding, no extra here
    },

    headerTitle: {
      fontSize: Math.max(24, Math.min(32, width * 0.075)) * scaleFactor,
      lineHeight: Math.max(28, Math.min(38, width * 0.085)) * scaleFactor,
    },

    headerSubtitle: {
      fontSize: Math.max(14, Math.min(18, width * 0.04)) * scaleFactor,
      marginTop: 5,
    },

    scrollView: {
      flex: 1,
    },

    scrollContent: {
      paddingBottom: baseVerticalPadding, // Padding at the bottom of the scroll content
    },

    termsContainer: {
      marginBottom: 20,
    },

    termsContent: {
      // Adjusted padding for the white card content
      paddingHorizontal: baseHorizontalPadding * 0.8, // Slightly less internal padding
      paddingVertical: baseVerticalPadding,
      flex: 1, // Allow content to expand within the scroll view
    },

    contentHeader: {
      marginBottom: Math.max(20, height * 0.025),
    },

    contentTitle: {
      fontSize: Math.max(20, Math.min(28, width * 0.065)) * scaleFactor,
      lineHeight: Math.max(24, Math.min(34, width * 0.075)) * scaleFactor,
    },

    contentSubtitle: {
      fontSize: Math.max(14, Math.min(16, width * 0.04)) * scaleFactor,
      lineHeight: Math.max(18, Math.min(22, width * 0.05)) * scaleFactor,
    },

    termsList: {
      gap: Math.max(16, height * 0.02),
    },

    termItem: {
      marginBottom: Math.max(16, height * 0.02),
    },

    termTitle: {
      fontSize: Math.max(16, Math.min(18, width * 0.045)) * scaleFactor,
      lineHeight: Math.max(20, Math.min(24, width * 0.055)) * scaleFactor,
      marginBottom: 8,
    },

    termContent: {
      color: CONFIG.COLORS.GRAY,
      lineHeight: 20,
    },

    emailLink: {
      fontSize: Math.max(14, Math.min(16, width * 0.04)) * scaleFactor,
    },

    agreementSection: {
      marginTop: Math.max(20, height * 0.025),
    },

    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: CONFIG.COLORS.WHITE,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      paddingHorizontal: baseHorizontalPadding * 0.8, // Match termsContent padding
      paddingVertical: Math.max(16, height * 0.02),
    },

    checkbox: {
      width: Math.max(20, 24 * scaleFactor),
      height: Math.max(20, 24 * scaleFactor),
    },

    checkboxText: {
      color: CONFIG.COLORS.GRAY,
      fontWeight: '600',
      marginLeft: Math.max(12, width * 0.03),
      flex: 1,
    },

    errorMessage: {
      fontSize: Math.max(14, Math.min(16, width * 0.04)) * scaleFactor,
      marginTop: 12,
      textAlign: 'center',
    },

    actionContainer: {
      alignItems: 'center',
      paddingVertical: Math.max(16, height * 0.02),
    },

    actionButton: {
      backgroundColor: CONFIG.COLORS.SECONDARY,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      alignItems: 'center',
      paddingVertical: Math.max(14, 16 * scaleFactor),
      paddingHorizontal: Math.max(32, 40 * scaleFactor),
      borderRadius: Math.max(25, 30 * scaleFactor),
      minWidth: Math.max(120, 140 * scaleFactor),
    },

    actionButtonText: {
      color: CONFIG.COLORS.WHITE,
      fontWeight: 'bold',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
  });
};

// =============================================================================
// BASE STYLES
// =============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // The background color for SafeAreaView is now set dynamically in the component's return
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent', // This view acts as a content container, its background is transparent
  },

  header: {
    alignItems: 'center',
  },

  headerTitle: {
    color: CONFIG.COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },

  scrollView: {
    flex: 1,
  },

  termsContainer: {
    backgroundColor: CONFIG.COLORS.WHITE,
    borderRadius: 12,
    opacity: 0.95,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  termsContent: {
    flex: 1,
  },

  contentHeader: {
    alignItems: 'center',
  },

  contentTitle: {
    color: CONFIG.COLORS.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  contentSubtitle: {
    color: CONFIG.COLORS.GRAY,
    textAlign: 'center',
    fontWeight: '500',
  },

  termsList: {},

  termItem: {},

  termTitle: {
    color: CONFIG.COLORS.PRIMARY,
    fontWeight: '600',
  },

  termContent: {
    color: CONFIG.COLORS.GRAY,
    lineHeight: 20,
  },

  emailLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },

  agreementSection: {},

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CONFIG.COLORS.WHITE,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  checkbox: {},

  checkboxText: {
    color: CONFIG.COLORS.GRAY,
    fontWeight: '600',
  },

  errorMessage: {
    color: CONFIG.COLORS.WHITE,
    backgroundColor: 'rgba(255, 68, 68, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },

  actionContainer: {
    alignItems: 'center',
  },

  actionButton: {
    backgroundColor: CONFIG.COLORS.SECONDARY,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
  },

  actionButtonText: {
    color: CONFIG.COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});