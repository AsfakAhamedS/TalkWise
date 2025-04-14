import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const url = process.env.EXPO_PUBLIC_API_URL || '';

export default function TicketPage() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('Email');
      setUserEmail(email);
    })();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchTickets();
    }
  }, [userEmail]);

  const fetchTickets = async () => {
    try {
      const response = await axios.post(url + 'ticket-status', { useremail: userEmail });
      if (response.status === 200) {
        setTickets(response?.data || []);
      }
    } catch (error) {
      console.log('Error fetching tickets:', error?.response?.data?.error || error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTickets();
  }, [userEmail]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open':
        return '#FF9800';
      case 'in progress':
        return '#2196F3';
      case 'closed':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const renderTicketItem = ({ item }) => {
    const isExpanded = open === item.ticketId;
    const statusColor = getStatusColor(item.status);
    
    return (
      <TouchableOpacity 
        style={styles.ticketCardContainer}
        activeOpacity={0.7}
        onPress={() => setOpen(isExpanded ? null : item.ticketId)}
      >
        <View style={[
          styles.ticketCard, 
          { backgroundColor: isDark ? '#1f1f1f' : '#fff' },
          isExpanded && styles.expandedCard
        ]}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketTitleContainer}>
              <Text style={[styles.ticketId, { color: isDark ? '#bbb' : '#666' }]}>#{item.ticketId}</Text>
              <Text 
                style={[styles.ticketSubject, { color: isDark ? '#fff' : '#000' }]} 
                numberOfLines={isExpanded ? undefined : 1}
              >
                {item.subject}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
              </View>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={22} 
                color={isDark ? "#ccc" : "#666"} 
              />
            </View>
          </View>

          {isExpanded && (
            <View style={styles.ticketDetails}>
              <View style={styles.detailDivider} />
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: isDark ? '#aaa' : '#666' }]}>Created:</Text>
                <Text style={[styles.detailValue, { color: isDark ? '#fff' : '#000' }]}>
                  {formatDate(item.createdAt)}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: isDark ? '#aaa' : '#666' }]}>Description:</Text>
                <Text style={[styles.detailValue, { color: isDark ? '#fff' : '#000' }]}>
                  {item.message}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: isDark ? '#aaa' : '#666' }]}>Response:</Text>
                <View style={[styles.responseBubble, { backgroundColor: isDark ? '#2d2d2d' : '#f5f5f5' }]}>
                  <Text style={[styles.responseText, { color: isDark ? '#fff' : '#000' }]}>
                    {item.response || 'No response yet. Our team will get back to you soon.'}
                  </Text>
                </View>
              </View>
              
              {item.status.toLowerCase() === 'closed' && (
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: isDark ? '#aaa' : '#666' }]}>Closed:</Text>
                  <Text style={[styles.detailValue, { color: isDark ? '#fff' : '#000' }]}>
                    {formatDate(item.closedAt)}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/free-data-not-found-1965034-1662569.png' }} 
        style={styles.emptyImage} 
      />
      <Text style={[styles.emptyText, { color: isDark ? '#aaa' : '#555' }]}>
        No tickets found
      </Text>
      <Text style={[styles.emptySubtext, { color: isDark ? '#888' : '#777' }]}>
        Any support requests you submit will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? '#121212' : '#f7f7f7' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f7f7f7' }]}>
        <View style={styles.header}>
          <Text style={[styles.heading, { color: isDark ? '#fff' : '#000' }]}>Support Tickets</Text>
          <Text style={[styles.subheading, { color: isDark ? '#aaa' : '#666' }]}>
            Track the status of your inquiries
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={isDark ? "#ffffff" : "#000000"} />
            <Text style={[styles.loadingText, { color: isDark ? '#aaa' : '#666' }]}>
              Loading your tickets...
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={tickets}
            keyExtractor={(item, index) => item.ticketId || index.toString()}
            renderItem={renderTicketItem}
            ListEmptyComponent={renderEmptyComponent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={isDark ? "#ffffff" : "#000000"}
                colors={[isDark ? "#ffffff" : "#000000"]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  ticketCardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ticketCard: {
    padding: 16,
    borderRadius: 12,
  },
  expandedCard: {
    shadowOpacity: 0.2,
    shadowRadius: 5.84,
    elevation: 7,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketTitleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  ticketId: {
    fontSize: 14,
    marginBottom: 4,
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  headerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  ticketDetails: {
    marginTop: 10,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    marginTop: 6,
    opacity: 0.5,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  responseBubble: {
    padding: 12,
    borderRadius: 8,
  },
  responseText: {
    fontSize: 15,
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});