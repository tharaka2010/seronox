//home
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

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
    content: "If you have any questions about these terms, please contact us at support@serenox.com.",
  },
];

const TermsScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleNext = () => {
    setErrorMessage('');
    
    if (!isChecked) {
      setErrorMessage('Please confirm you agree with the policies and conditions');
      return;
    }
    
    router.push('mainLanding');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Decorative Background Elements */}
        <View style={styles.decorativeShapes}>
          <View style={[styles.roundShape, styles.shape1]} />
          <View style={[styles.roundShape, styles.shape2]} />
          <View style={[styles.roundShape, styles.shape3]} />
          <View style={[styles.roundShape, styles.shape4]} />
          <View style={[styles.roundShape, styles.shape5]} />
          <View style={[styles.roundShape, styles.shape6]} />
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.formContainer}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.logoContainer}>
                <MaterialIcons name="description" size={40} color="#5a67d8" />
              </View>
              <Text style={styles.title}>Terms & Conditions</Text>
              <Text style={styles.subtitle}>
                Welcome to Serenox
              </Text>
            </View>

            {/* Scrollable Terms Content */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsTitle}>Terms and Conditions</Text>
              <Text style={styles.termsSubtitle}>
                Please read the following terms and conditions carefully before proceeding:
              </Text>

              <ScrollView 
                style={styles.termsScrollView}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.termsScrollContent}
              >
                {TERMS_DATA.map((term) => (
                  <View key={term.id} style={styles.termItem}>
                    <Text style={styles.termTitle}>
                      {term.id}. {term.title}
                    </Text>
                    <Text style={styles.termContent}>
                      {term.content}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Agreement Section */}
            <View style={styles.agreementSection}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? '#5a67d8' : undefined}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxText}>
                  I agree with all policies and conditions
                </Text>
              </View>

              {errorMessage ? (
                <View style={styles.errorMessageContainer}>
                  <MaterialIcons name="error" size={16} color="#dc3545" />
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                onPress={handleNext}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  decorativeShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  roundShape: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  shape1: {
    width: 100,
    height: 100,
    backgroundColor: '#5a67d8',
    top: '10%',
    right: '5%',
  },
  shape2: {
    width: 80,
    height: 80,
    backgroundColor: '#ffd700',
    top: '20%',
    left: '10%',
  },
  shape3: {
    width: 60,
    height: 60,
    backgroundColor: '#ff6b6b',
    top: '65%',
    right: '20%',
  },
  shape4: {
    width: 40,
    height: 40,
    backgroundColor: '#4ecdc4',
    top: '75%',
    left: '15%',
  },
  shape5: {
    width: 30,
    height: 30,
    backgroundColor: '#45b7d1',
    top: '35%',
    right: '8%',
  },
  shape6: {
    width: 50,
    height: 50,
    backgroundColor: '#f39c12',
    top: '50%',
    left: '5%',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 400,
    zIndex: 2,
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    color: "#1a1a1a",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: "#6c757d",
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  termsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  termsTitle: {
    color: "#5a67d8",
    fontSize: 20,
    fontWeight: "700",
    textAlign: 'center',
    marginBottom: 8,
  },
  termsSubtitle: {
    color: "#6c757d",
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  termsScrollView: {
    flex: 1,
  },
  termsScrollContent: {
    paddingBottom: 10,
  },
  termItem: {
    marginBottom: 16,
  },
  termTitle: {
    color: "#5a67d8",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  termContent: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
  },
  agreementSection: {
    width: '100%',
    gap: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  checkboxText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#5a67d8",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#5a67d8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});