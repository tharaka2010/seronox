import { StatusBar } from "expo-status-bar";
import React, { memo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

// =============================================================================
// CONSTANTS & HELPERS
// =============================================================================

const getScreenDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

const getDeviceType = (width, height) => {
  const aspectRatio = height / width;
  const minDimension = Math.min(width, height);

  if (minDimension >= 768) {
    return "tablet";
  } else if (aspectRatio > 2.1) {
    return "phone_long";
  } else {
    return "phone";
  }
};

const getOrientation = (width, height) => {
  return width > height ? "landscape" : "portrait";
};

// Image assets configuration
const IMAGES = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/3.png"),
  require("../assets/13.png"),
  require("../assets/12.png"),
  require("../assets/11.png"),
  require("../assets/14.png"),
];

// Responsive configuration
const CONFIG = {
  AUTOPLAY_TIMEOUT: 3,
  GRADIENT_COLORS: ["#ff00ec", "#1f0024"],
  PRIMARY_COLOR: "#ff00ec",
  ROUTES: {
    SIGNIN: "/signinscreen",
  },
  BREAKPOINTS: {
    SMALL: 320,
    MEDIUM: 768,
    LARGE: 1024,
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function WelcomeScreen() {
  const router = useRouter();
  const [dimensions, setDimensions] = useState(getScreenDimensions());
  const [deviceType, setDeviceType] = useState(
    getDeviceType(dimensions.width, dimensions.height)
  );
  const [orientation, setOrientation] = useState(
    getOrientation(dimensions.width, dimensions.height)
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
      setDeviceType(getDeviceType(window.width, window.height));
      setOrientation(getOrientation(window.width, window.height));
    });

    return () => subscription?.remove();
  }, []);

  const handleGetStarted = () => {
    try {
      // Navigate to signinscreen using the correct absolute path
      router.push("/loginAuth/signinscreen");
    } catch (error) {
      console.error("Navigation error:", error);

      // Try alternative paths as fallback (these might still fail if the primary path is wrong)
      try {
        router.push("./loginAuth/signinscreen"); // Relative path attempt
      } catch (fallbackError) {
        console.error("Fallback navigation also failed:", fallbackError);
        // Last resort - try replace
        router.replace("/loginAuth/signinscreen");
      }
    }
  };

  const responsiveStyles = getResponsiveStyles(
    dimensions,
    deviceType,
    orientation
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={CONFIG.GRADIENT_COLORS} style={styles.container}>
        <StatusBar style="light" />

        {orientation === "landscape" ? (
          <LandscapeLayout
            dimensions={dimensions}
            deviceType={deviceType}
            responsiveStyles={responsiveStyles}
            onGetStarted={handleGetStarted}
          />
        ) : (
          <PortraitLayout
            dimensions={dimensions}
            deviceType={deviceType}
            responsiveStyles={responsiveStyles}
            onGetStarted={handleGetStarted}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

// =============================================================================
// LAYOUT COMPONENTS
// =============================================================================

const PortraitLayout = memo(
  ({ dimensions, deviceType, responsiveStyles, onGetStarted }) => (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        responsiveStyles.scrollContainer,
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Header responsiveStyles={responsiveStyles} />
      <ImageCarousel
        dimensions={dimensions}
        deviceType={deviceType}
        responsiveStyles={responsiveStyles}
      />
      <ActionButton
        onPress={onGetStarted}
        responsiveStyles={responsiveStyles}
      />
    </ScrollView>
  )
);

const LandscapeLayout = memo(
  ({ dimensions, deviceType, responsiveStyles, onGetStarted }) => (
    <View
      style={[styles.landscapeContainer, responsiveStyles.landscapeContainer]}
    >
      <View style={styles.landscapeLeft}>
        <Header responsiveStyles={responsiveStyles} />
        <ActionButton
          onPress={onGetStarted}
          responsiveStyles={responsiveStyles}
        />
      </View>
      <View style={styles.landscapeRight}>
        <ImageCarousel
          dimensions={dimensions}
          deviceType={deviceType}
          responsiveStyles={responsiveStyles}
          isLandscape={true}
        />
      </View>
    </View>
  )
);

// =============================================================================
// CHILD COMPONENTS
// =============================================================================

const Header = memo(({ responsiveStyles }) => (
  <View style={[styles.headerContainer, responsiveStyles.headerContainer]}>
    <Text
      style={[styles.headerTitle, responsiveStyles.headerTitle]}
      accessibilityRole="header"
      accessibilityLabel="Welcome to Serenox app"
      numberOfLines={2}
      adjustsFontSizeToFit
    >
      Welcome to Serenox
    </Text>
  </View>
));

const ImageCarousel = memo(
  ({ dimensions, deviceType, responsiveStyles, isLandscape = false }) => (
    <View style={[styles.carouselWrapper, responsiveStyles.carouselWrapper]}>
      <Swiper
        autoplay
        loop
        autoplayTimeout={CONFIG.AUTOPLAY_TIMEOUT}
        dotStyle={[styles.inactiveDot, responsiveStyles.inactiveDot]}
        activeDotStyle={[styles.activeDot, responsiveStyles.activeDot]}
        style={[styles.swiperContainer, responsiveStyles.swiperContainer]}
        accessibilityLabel="Image carousel showcasing app features"
        paginationStyle={responsiveStyles.paginationStyle}
      >
        {IMAGES.map((image, index) => (
          <ImageSlide
            key={index}
            image={image}
            index={index}
            responsiveStyles={responsiveStyles}
            isLandscape={isLandscape}
          />
        ))}
      </Swiper>
    </View>
  )
);

const ImageSlide = memo(({ image, index, responsiveStyles, isLandscape }) => (
  <View style={[styles.slideContainer, responsiveStyles.slideContainer]}>
    <Image
      source={image}
      style={[styles.slideImage, responsiveStyles.slideImage]}
      accessibilityLabel={`Feature showcase image ${index + 1}`}
      onError={(error) => {
        console.warn(`Failed to load image ${index + 1}:`, error);
      }}
      resizeMode="cover"
    />
  </View>
));

const ActionButton = memo(({ onPress, responsiveStyles }) => (
  <View style={[styles.actionContainer, responsiveStyles.actionContainer]}>
    <TouchableOpacity
      style={[styles.actionButton, responsiveStyles.actionButton]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Get started with Serenox"
      accessibilityHint="Navigates to the signin screen"
      activeOpacity={0.8}
    >
      <Text
        style={[styles.actionButtonText, responsiveStyles.actionButtonText]}
      >
        Get Started
      </Text>
    </TouchableOpacity>
  </View>
));

// =============================================================================
// RESPONSIVE STYLES FUNCTION
// =============================================================================

const getResponsiveStyles = (dimensions, deviceType, orientation) => {
  const { width, height } = dimensions;
  const isTablet = deviceType === "tablet";
  const isLandscape = orientation === "landscape";
  const isSmallScreen = width < CONFIG.BREAKPOINTS.SMALL;

  // Scale factors based on device type
  const scaleFactor = isTablet ? 1.3 : isSmallScreen ? 0.9 : 1;
  const paddingScale = isTablet ? 1.5 : 1;

  return StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: isLandscape ? "center" : "space-between",
      paddingHorizontal: Math.max(20, width * 0.05) * paddingScale,
      paddingVertical: isLandscape ? 20 : 40,
    },

    landscapeContainer: {
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: Math.max(20, width * 0.05),
      paddingVertical: 20,
    },

    headerContainer: {
      alignItems: "center",
      marginTop: isLandscape ? 0 : Platform.OS === "ios" ? 20 : 10,
      marginBottom: isLandscape ? 20 : Math.max(30, height * 0.04),
      paddingHorizontal: 20,
    },

    headerTitle: {
      fontSize: Math.max(24, Math.min(36, width * 0.08)) * scaleFactor,
      lineHeight: Math.max(28, Math.min(44, width * 0.1)) * scaleFactor,
    },

    carouselWrapper: {
      flex: isLandscape ? 1 : 0,
      marginVertical: isLandscape ? 0 : 20,
    },

    swiperContainer: {
      height: isLandscape
        ? Math.min(height * 0.7, 400)
        : Math.max(height * 0.25, 200),
    },

    slideContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isTablet ? 40 : 20,
    },

    slideImage: {
      width: isLandscape
        ? Math.min(width * 0.4, 350)
        : Math.min(width - 40 * paddingScale, 400),
      height: isLandscape
        ? Math.min(height * 0.6, 300)
        : Math.max(height * 0.2, 150),
      borderRadius: isTablet ? 20 : 15,
    },

    inactiveDot: {
      width: isTablet ? 10 : 8,
      height: isTablet ? 10 : 8,
      borderRadius: isTablet ? 5 : 4,
      marginHorizontal: isTablet ? 4 : 3,
    },

    activeDot: {
      width: isTablet ? 10 : 8,
      height: isTablet ? 10 : 8,
      borderRadius: isTablet ? 5 : 4,
      marginHorizontal: isTablet ? 4 : 3,
    },

    paginationStyle: {
      bottom: isLandscape ? 10 : 20,
    },

    actionContainer: {
      alignItems: "center",
      marginTop: isLandscape ? 20 : Math.max(30, height * 0.04),
      marginBottom: isLandscape ? 0 : 20,
    },

    actionButton: {
      paddingVertical: Math.max(12, 16 * scaleFactor),
      paddingHorizontal: Math.max(32, 40 * scaleFactor),
      borderRadius: Math.max(25, 30 * scaleFactor),
      minWidth: Math.max(140, 160 * scaleFactor),
    },

    actionButtonText: {
      fontSize: Math.max(16, 18 * scaleFactor),
    },
  });
};

// =============================================================================
// BASE STYLES
// =============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CONFIG.GRADIENT_COLORS[1],
  },

  container: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  landscapeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  landscapeLeft: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 20,
  },

  landscapeRight: {
    flex: 1,
    justifyContent: "center",
  },

  headerContainer: {
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  carouselWrapper: {
    flex: 1,
  },

  swiperContainer: {
    // Dynamic height set in responsive styles
  },

  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  slideImage: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    // Dynamic dimensions set in responsive styles
  },

  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  activeDot: {
    backgroundColor: CONFIG.PRIMARY_COLOR,
  },

  actionContainer: {
    alignItems: "center",
  },

  actionButton: {
    backgroundColor: CONFIG.PRIMARY_COLOR,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
