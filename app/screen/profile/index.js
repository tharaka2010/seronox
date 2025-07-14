import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import BottomNav from '../../../components/BottomNav';

const ProfileScreen = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Custom Back Button Handler ---
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // When on the Profile tab, the back button should go to the main landing page.
        router.replace('/screen/mainLanding');
        return true; // Prevents default back button behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [router])
  );

  const fetchUserData = useCallback(async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
    setLoading(false);
  }, [user, db]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace('/');
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#3B82F6" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="#3B82F6" />
          </View>
          <Text style={styles.userName}>{userData?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{userData?.email}</Text>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem icon="info" text="About Us" onPress={() => router.push('/screen/profile/about')} />
          <MenuItem icon="help-circle" text="Help & Support" onPress={() => router.push('/screen/profile/help')} />
          <MenuItem icon="file-text" text="Terms & Conditions" onPress={() => router.push('/screen/profile/terms')} />
          <MenuItem icon="log-out" text="Sign Out" onPress={handleSignOut} color="#EF4444" />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const MenuItem = ({ icon, text, value, onPress, color = '#1e293b' }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Feather name={icon} size={20} color={color} />
    </View>
    <Text style={[styles.menuText, { color }]}>{text}</Text>
    {value && <Text style={styles.menuValue}>{value}</Text>}
    <Feather name="chevron-right" size={20} color="#94a3b8" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#f1f5f9' },
  header: { padding: 16, paddingTop: 40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileCard: { backgroundColor: 'white', margin: 16, borderRadius: 12, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 3 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e7ff', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  userEmail: { fontSize: 16, color: '#64748b', marginTop: 4 },
  menuContainer: { backgroundColor: 'white', marginHorizontal: 16, borderRadius: 12, marginTop: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  menuIcon: { width: 30, alignItems: 'center' },
  menuText: { flex: 1, fontSize: 16, marginLeft: 12 },
  menuValue: { fontSize: 16, color: '#64748b', marginRight: 8 },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  languageText: {
    flex: 1,
    fontSize: 18,
    color: '#334155',
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#475569',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProfileScreen;
