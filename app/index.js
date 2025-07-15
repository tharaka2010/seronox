import { StatusBar } from "expo-status-bar";
import React, { memo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
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
  try {
    const { width, height } = Dimensions.get("window");
    return { width, height };
  } catch (error) {
    console.warn("Failed to get screen dimensions:", error);
    return { width: 375, height: 812 }; // Default iPhone dimensions
  }
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

// Logo image
const SPLASH_LOGO = require("../assets/SplashLogo.png");

// Responsive configuration
const CONFIG = {
  AUTOPLAY_TIMEOUT: 3,
  GRADIENT_COLORS: ["#ffb3f5", "#ff66f0", "#4a0f4a"], // Added lighter pink at top
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
  const [dimensions, setDimensions] = useState(() => {
    const screenDimensions = getScreenDimensions();
    return screenDimensions || { width: 375, height: 812 }; // Default fallback
  });
  const [deviceType, setDeviceType] = useState(() => {
    const screenDimensions = getScreenDimensions();
    if (screenDimensions) {
      return getDeviceType(screenDimensions.width, screenDimensions.height);
    }
    return "phone"; // Default fallback
  });
  const [orientation, setOrientation] = useState(() => {
    const screenDimensions = getScreenDimensions();
    if (screenDimensions) {
      return getOrientation(screenDimensions.width, screenDimensions.height);
    }
    return "portrait"; // Default fallback
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      if (window && window.width && window.height) {
        setDimensions(window);
        setDeviceType(getDeviceType(window.width, window.height));
        setOrientation(getOrientation(window.width, window.height));
      }
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

  const { width, height } = dimensions || { width: 375, height: 812 };
  const isTablet = deviceType === "tablet";
  const isLandscape = orientation === "landscape";
  const isSmallScreen = width < CONFIG.BREAKPOINTS.SMALL;

  // Scale factors based on device type
  const scaleFactor = isTablet ? 1.3 : isSmallScreen ? 0.9 : 1;
  const paddingScale = isTablet ? 1.5 : 1;

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: CONFIG.GRADIENT_COLORS[2], // Use darkest color as fallback
    }}>
      <LinearGradient colors={CONFIG.GRADIENT_COLORS} style={{ flex: 1 }}>
        <StatusBar style="light" />

        {orientation === "landscape" ? (
          <LandscapeLayout
            dimensions={dimensions}
            deviceType={deviceType}
            onGetStarted={handleGetStarted}
            scaleFactor={scaleFactor}
            paddingScale={paddingScale}
          />
        ) : (
          <PortraitLayout
            dimensions={dimensions}
            deviceType={deviceType}
            onGetStarted={handleGetStarted}
            scaleFactor={scaleFactor}
            paddingScale={paddingScale}
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
  ({ dimensions, deviceType, onGetStarted, scaleFactor, paddingScale }) => {
    const { width, height } = dimensions;
    const isTablet = deviceType === "tablet";
    const isLandscape = false;

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: Math.max(20, width * 0.05) * paddingScale,
          paddingVertical: 40,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Header 
          dimensions={dimensions}
          deviceType={deviceType}
          scaleFactor={scaleFactor}
          isLandscape={isLandscape}
        />
        <ImageCarousel
          dimensions={dimensions}
          deviceType={deviceType}
          scaleFactor={scaleFactor}
          paddingScale={paddingScale}
          isLandscape={isLandscape}
        />
        <ActionButton
          onPress={onGetStarted}
          dimensions={dimensions}
          scaleFactor={scaleFactor}
          isLandscape={isLandscape}
        />
      </ScrollView>
    );
  }
);

const LandscapeLayout = memo(
  ({ dimensions, deviceType, onGetStarted, scaleFactor, paddingScale }) => {
    const { width, height } = dimensions;
    const isLandscape = true;

    return (
      <View style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Math.max(20, width * 0.05),
        paddingVertical: 20,
      }}>
        <View style={{
          flex: 1,
          justifyContent: "center",
          paddingRight: 20,
        }}>
          <Header 
            dimensions={dimensions}
            deviceType={deviceType}
            scaleFactor={scaleFactor}
            isLandscape={isLandscape}
          />
          <ActionButton
            onPress={onGetStarted}
            dimensions={dimensions}
            scaleFactor={scaleFactor}
            isLandscape={isLandscape}
          />
        </View>
        <View style={{
          flex: 1,
          justifyContent: "center",
        }}>
          <ImageCarousel
            dimensions={dimensions}
            deviceType={deviceType}
            scaleFactor={scaleFactor}
            paddingScale={paddingScale}
            isLandscape={isLandscape}
          />
        </View>
      </View>
    );
  }
);

// =============================================================================
// CHILD COMPONENTS
// =============================================================================

const Header = memo(({ dimensions, deviceType, scaleFactor, isLandscape }) => {
  const { width, height } = dimensions;
  const isTablet = deviceType === "tablet";

  return (
    <View style={{
      alignItems: "center",
      marginTop: isLandscape ? 0 : Platform.OS === "ios" ? 40 : 20,
      paddingHorizontal: 10,
    }}>

      
      <Image
        source={SPLASH_LOGO}
        style={{
          width: Math.max(200, Math.min(100, width * 0.50)) * scaleFactor,
          height: Math.max(210, Math.min(100, width * 0.50)) * scaleFactor,
          marginBottom: 0,
        }}
        accessibilityLabel="Serenox app logo"
        resizeMode="contain"
        onError={(error) => {
          console.warn("Failed to load splash logo:", error);
        }}
      />
    </View>
  );
});

const ImageCarousel = memo(
  ({ dimensions, deviceType, scaleFactor, paddingScale, isLandscape }) => {
    const { width, height } = dimensions;
    const isTablet = deviceType === "tablet";

    return (
      <View style={{
        flex: isLandscape ? 1 : 0,
        marginVertical: isLandscape ? 0 : 10,
      }}>
        <Swiper
          autoplay
          loop
          autoplayTimeout={CONFIG.AUTOPLAY_TIMEOUT}
          showsPagination={false}
          style={{
            height: isLandscape
              ? Math.min(height * 0.85, 500) // Increased from height * 1 and 400
              : Math.max(height * 0.45, 320), // Increased from height * 0.35 and 250
          }}
          accessibilityLabel="Image carousel showcasing app features"
        >
          {IMAGES.map((image, index) => (
            <ImageSlide
              key={index}
              image={image}
              index={index}
              dimensions={dimensions}
              deviceType={deviceType}
              paddingScale={paddingScale}
              isLandscape={isLandscape}
            />
          ))}
        </Swiper>
      </View>
    );
  }
);

const ImageSlide = memo(({ image, index, dimensions, deviceType, paddingScale, isLandscape }) => {
  const { width, height } = dimensions;
  const isTablet = deviceType === "tablet";

  return (
    <View style={{
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isTablet ? 40 : 20,
    }}>
      <Image
        source={image}
        style={{
          width: isLandscape
            ? Math.min(width * 0.4, 350)
            : Math.min(width - 40 * paddingScale, 400),
          height: isLandscape
            ? Math.min(height * 0.7, 380) // Increased from height * 0.6 and 300
            : Math.max(height * 0.4, 280), // Increased from height * 0.3 and 200
          borderRadius: isTablet ? 20 : 15,
        }}
        accessibilityLabel={`Feature showcase image ${index + 1}`}
        onError={(error) => {
          console.warn(`Failed to load image ${index + 1}:`, error);
        }}
        resizeMode="cover" // Change to "contain" if you want to see full image without cropping
      />
    </View>
  );
});

const ActionButton = memo(({ onPress, dimensions, scaleFactor, isLandscape }) => {
  const { width, height } = dimensions;

  return (
    <View style={{
      alignItems: "center",
      marginTop: isLandscape ? 20 : Math.max(30, height * 0.04),
      marginBottom: isLandscape ? 0 : 20,
    }}>
      <TouchableOpacity
        style={{
          backgroundColor: CONFIG.PRIMARY_COLOR,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          paddingVertical: Math.max(12, 16 * scaleFactor),
          paddingHorizontal: Math.max(32, 40 * scaleFactor),
          borderRadius: Math.max(25, 30 * scaleFactor),
          minWidth: Math.max(140, 160 * scaleFactor),
        }}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Get started with Serenox"
        accessibilityHint="Navigates to the signin screen"
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.5,
            fontSize: Math.max(16, 18 * scaleFactor),
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
});