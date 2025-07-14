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
      <Feather name="moon" size={60} color="#cbd5e1" />
      <Text style={styles.emptyText}>All caught up!</Text>
      <Text style={styles.emptySubtext}>You have no new notifications.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#3B82F6" />
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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 16, paddingVertical: 12 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#e0e7ff',
    borderRadius: 999,
    padding: 8,
    marginRight: 12,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
