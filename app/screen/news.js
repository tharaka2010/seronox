import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Animated,
  RefreshControl,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { useRouter, useFocusEffect } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const { width, height } = Dimensions.get("window");

const NewsCard = ({ item, index }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/screen/news/${item.id}`)}
        activeOpacity={0.9}
      >
        {/* Image Container with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.thumbnailUrl }} 
            style={styles.cardImage}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size="small" color="#5a67d8" />
            </View>
          )}
          <View style={styles.imageOverlay} />
          <View style={styles.typeTag}>
            <Text style={styles.typeTagText}>{item.type || 'News'}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardSnippet} numberOfLines={3}>
            {item.snippet}
          </Text>
          
          {/* Bottom Row */}
          <View style={styles.cardBottom}>
            <View style={styles.timeContainer}>
              <MaterialIcons name="schedule" size={14} color="#9d9d9d" />
              <Text style={styles.timeText}>
                {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'Today'}
              </Text>
            </View>
            <View style={styles.readMoreContainer}>
              <Text style={styles.readMoreText}>Read More</Text>
              <Feather name="arrow-right" size={16} color="#5a67d8" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FilterButton = ({ title, isActive, onPress }) => (
  <TouchableOpacity
    style={[
      styles.filterButton,
      isActive && styles.filterButtonActive
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[
      styles.filterButtonText,
      isActive && styles.filterButtonTextActive
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const EmptyState = ({ filter }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <MaterialIcons name="article" size={80} color="#e9ecef" />
    </View>
    <Text style={styles.emptyTitle}>No {filter} Found</Text>
    <Text style={styles.emptySubtext}>
      Check back later for the latest updates and stories.
    </Text>
  </View>
);

const LoadingState = ({ filter }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
    
    {/* Decorative Background */}
    <View style={styles.decorativeShapes}>
      <View style={[styles.roundShape, styles.shape1]} />
      <View style={[styles.roundShape, styles.shape2]} />
      <View style={[styles.roundShape, styles.shape3]} />
      <View style={[styles.roundShape, styles.shape4]} />
    </View>

    {/* Header */}
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <MaterialIcons name="newspaper" size={28} color="#5a67d8" />
        <Text style={styles.headerTitle}>News & Articles</Text>
      </View>
      <Text style={styles.headerSubtitle}>Stay updated with the latest</Text>
    </View>

    {/* Filter Buttons */}
    <View style={styles.filterContainer}>
      <FilterButton title="All" isActive={filter === 'All'} onPress={() => {}} />
      <FilterButton title="News" isActive={filter === 'News'} onPress={() => {}} />
      <FilterButton title="Article" isActive={filter === 'Article'} onPress={() => {}} />
    </View>

    {/* Loading Indicator */}
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#5a67d8" />
      <Text style={styles.loadingText}>Loading {filter.toLowerCase()}...</Text>
    </View>
  </SafeAreaView>
);

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');
  const scrollY = new Animated.Value(0);

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

  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const newsCollection = collection(db, 'newsAndArticles');
      let q;
      if (filter === 'All') {
        q = query(newsCollection, orderBy("createdAt", "desc"));
      } else {
        q = query(newsCollection, where("type", "==", filter));
      }
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsList);
    } catch (error) {
      console.error("Error fetching news: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filter]);

  const onRefresh = () => {
    fetchNews(true);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  if (loading) {
    return <LoadingState filter={filter} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Decorative Background */}
      <View style={styles.decorativeShapes}>
        <View style={[styles.roundShape, styles.shape1]} />
        <View style={[styles.roundShape, styles.shape2]} />
        <View style={[styles.roundShape, styles.shape3]} />
        <View style={[styles.roundShape, styles.shape4]} />
      </View>

      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <View style={styles.headerContent}>
          <MaterialIcons name="newspaper" size={28} color="#5a67d8" />
          <Text style={styles.headerTitle}>News & Articles</Text>
        </View>
        <Text style={styles.headerSubtitle}>Stay updated with the latest</Text>
      </Animated.View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FilterButton 
          title="All" 
          isActive={filter === 'All'} 
          onPress={() => setFilter('All')} 
        />
        <FilterButton 
          title="News" 
          isActive={filter === 'News'} 
          onPress={() => setFilter('News')} 
        />
        <FilterButton 
          title="Article" 
          isActive={filter === 'Article'} 
          onPress={() => setFilter('Article')} 
        />
      </View>

      {/* News List */}
      <FlatList
        data={news}
        renderItem={({ item, index }) => <NewsCard item={item} index={index} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5a67d8']}
            tintColor="#5a67d8"
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListEmptyComponent={() => <EmptyState filter={filter} />}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    opacity: 0.08,
  },
  shape1: {
    width: 120,
    height: 120,
    backgroundColor: '#5a67d8',
    top: '8%',
    right: '10%',
  },
  shape2: {
    width: 80,
    height: 80,
    backgroundColor: '#ffd700',
    top: '15%',
    left: '5%',
  },
  shape3: {
    width: 60,
    height: 60,
    backgroundColor: '#ff6b6b',
    top: '60%',
    right: '15%',
  },
  shape4: {
    width: 40,
    height: 40,
    backgroundColor: '#4ecdc4',
    top: '70%',
    left: '10%',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 236, 239, 0.5)',
    zIndex: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: '#1a1a1a',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 236, 239, 0.5)',
    zIndex: 2,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#5a67d8',
    borderColor: '#5a67d8',
    shadowColor: "#5a67d8",
    shadowOpacity: 0.3,
  },
  filterButtonText: {
    color: '#6c757d',
    fontWeight: '600',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: width * 0.45,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(90, 103, 216, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardSnippet: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#9d9d9d',
    marginLeft: 4,
    fontWeight: '500',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5a67d8',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 16,
    fontWeight: '500',
  },
});