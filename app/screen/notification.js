//notification.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, RefreshControl, BackHandler } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import { getFirestore, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// --- Helper function to format time ---
const formatTimeAgo = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return 'Just now';
  const now = new Date();
  const seconds = Math.floor((now - timestamp.toDate()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
};

// --- Notification Card Component ---
const NotificationCard = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/notification/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Feather name="bell" size={20} color="#3B82F6" />
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.time}>{formatTimeAgo(item.createdAt)}</Text>
      </View>
      <Text style={styles.cardBody} numberOfLines={2}>
        {item.message || item.body}
      </Text>
      <View style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>See more</Text>
        <Feather name="arrow-right" size={14} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Notification Screen ---
export default function NotificationView() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  // --- Custom Back Button Handler ---
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/screen/mainLanding');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [router])
  );

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setRefreshing(true);
    const db = getFirestore();
    const allNotifications = [];
    try {
      const generalQuery = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const generalSnapshot = await getDocs(generalQuery);
      generalSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          allNotifications.push({ id: doc.id, ...data });
        }
      });

      const userNotificationsQuery = query(collection(db, `users/${user.uid}/notifications`), orderBy('createdAt', 'desc'));
      const userNotificationsSnapshot = await getDocs(userNotificationsQuery);
      userNotificationsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          allNotifications.push({ id: doc.id, ...data });
        }
      });

      allNotifications.sort((a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));
      setNotifications(allNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = () => {
    fetchNotifications();
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Feather name="moon" size={60} color="#cbd5e1" />
      </View>
      <Text style={styles.emptyText}>All caught up!</Text>
      <Text style={styles.emptySubtext}>You have no new notifications.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Decorative Background Elements */}
      <View style={styles.decorativeShapes}>
        <View style={[styles.roundShape, styles.shape1]} />
        <View style={[styles.roundShape, styles.shape2]} />
        <View style={[styles.roundShape, styles.shape3]} />
        <View style={[styles.roundShape, styles.shape4]} />
        <View style={[styles.roundShape, styles.shape5]} />
        <View style={[styles.roundShape, styles.shape6]} />
        <View style={[styles.roundShape, styles.shape7]} />
        <View style={[styles.roundShape, styles.shape8]} />
      </View>

      {/* Header with Glass Effect */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.bellIconContainer}>
            <Feather name="bell" size={20} color="#3B82F6" />
          </View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>{notifications.length}</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={styles.loader} size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3B82F6']} />}
        />
      )}

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  
  // Decorative Shapes
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
    opacity: 0.08,
  },
  shape1: {
    width: 120,
    height: 120,
    backgroundColor: '#3B82F6',
    top: '8%',
    right: '2%',
  },
  shape2: {
    width: 90,
    height: 90,
    backgroundColor: '#10b981',
    top: '15%',
    left: '5%',
  },
  shape3: {
    width: 70,
    height: 70,
    backgroundColor: '#f59e0b',
    top: '60%',
    right: '15%',
  },
  shape4: {
    width: 50,
    height: 50,
    backgroundColor: '#ef4444',
    top: '75%',
    left: '10%',
  },
  shape5: {
    width: 40,
    height: 40,
    backgroundColor: '#8b5cf6',
    top: '30%',
    right: '12%',
  },
  shape6: {
    width: 60,
    height: 60,
    backgroundColor: '#06b6d4',
    top: '45%',
    left: '8%',
  },
  shape7: {
    width: 35,
    height: 35,
    backgroundColor: '#f97316',
    top: '85%',
    right: '25%',
  },
  shape8: {
    width: 80,
    height: 80,
    backgroundColor: '#ec4899',
    top: '25%',
    left: '70%',
  },

  // Header Styles
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIconContainer: {
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  notificationBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 12,
    minWidth: 24,
    alignItems: 'center',
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  // Loading Styles
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  loader: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },

  // List Styles
  listContent: { 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    zIndex: 5,
  },
  
  // Card Styles with Enhanced Design
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  cardBody: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
    fontWeight: '500',
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginRight: 4,
  },

  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    zIndex: 5,
  },
  emptyIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});