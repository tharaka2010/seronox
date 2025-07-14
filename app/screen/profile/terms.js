import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TermsAndConditionsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to our application. By using our app, you agree to be bound by these Terms and Conditions. Please read them carefully.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of the App</Text>
        <Text style={styles.paragraph}>
          You agree to use this app only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the app.
        </Text>

        <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content included in the app, such as text, graphics, logos, and images, is our property or the property of our content suppliers and is protected by international copyright laws.
        </Text>

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          The information provided in this app is for educational purposes only and is not a substitute for professional medical advice. We are not liable for any decisions made based on the information provided.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to make changes to these Terms and Conditions at any time. Your continued use of the app will be deemed as acceptance of any new terms.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, paddingTop: 40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backButton: { position: 'absolute', left: 16, top: 38 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, marginTop: 16 },
  paragraph: { fontSize: 16, lineHeight: 26, color: '#334155', marginBottom: 16 },
});

export default TermsAndConditionsScreen;
