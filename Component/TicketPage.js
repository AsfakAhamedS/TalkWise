import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, SafeAreaView, StatusBar, Image} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function TicketPage() {
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [open, setOpen] = useState(null)

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('Email')
      setUserEmail(email)
    })()
  }, [])

  useEffect(() => {
    if (userEmail) {
      fetchTickets()
    }
  }, [userEmail])

  function fetchTickets(){
    axios.post(url + 'ticket-status', { useremail: userEmail })
    .then((res) => {
      if (res.status === 200) {
        setTickets(res?.data)
      }
    })
    .catch((err) => {
      console.log('Error fetching tickets:', error?.response?.data?.error || error)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open':
        return '#006400'
      case 'in progress':
        return '#2196F3'
      case 'closed':
        return '#4CAF50'
      default:
        return '#9E9E9E'
    }
  }

  return (
    <SafeAreaView style={[style.ticket_safearea, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[style.ticket_container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <View style={style.ticket_headertop}>
          <Text style={[style.ticket_headingtop, { color: isDark ? '#fff' : '#000' }]}>Support Tickets</Text>
          <Text style={[style.ticket_subheadingtop, { color: isDark ? '#aaa' : '#666' }]}>
            Track the status of your inquiries
          </Text>
        </View>

        {loading ? (
          <View style={style.ticket_loadingcontainer}>
            <ActivityIndicator size="large" color={isDark ? "#ffffff" : "#000000"} />
            <Text style={[style.ticket_loadingtext, { color: isDark ? '#aaa' : '#666' }]}>
              Loading your tickets...
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={style.ticket_listcontainer}
            data={tickets}
            keyExtractor={(item, index) => item.ticketId || index.toString()}
            renderItem={({ item }) => {
              const isExpanded = open === item.ticketId
              const statusColor = getStatusColor(item.status)
              return (
                <TouchableOpacity 
                  style={style.ticket_cardcontainer}
                  activeOpacity={0.7}
                  onPress={() => setOpen(isExpanded ? null : item.ticketId)}>
                  <View style={[
                    style.ticket_Card, 
                    { backgroundColor: isDark ? '#1f1f1f' : '#f7f7f7' },
                    isExpanded && style.ticket_expandedcard]}>
                    <View style={style.ticket_header}>
                      <View style={style.ticket_title_container}>
                        <Text style={[style.ticket_id, { color: isDark ? '#bbb' : '#666' }]}>#{item.ticketId}</Text>
                        <Text 
                          style={[style.ticket_subject, { color: isDark ? '#fff' : '#000' }]} 
                          numberOfLines={isExpanded ? undefined : 1}
                        >
                          {item.subject}
                        </Text>
                      </View>
                      <View style={style.ticket_headerright}>
                        <View style={[style.ticket_statusbadge, { backgroundColor: `${statusColor}20` }]}>
                          <View style={[style.ticket_statusdot, { backgroundColor: statusColor }]} />
                          <Text style={[style.ticket_statustext, { color: statusColor }]}>{item.status}</Text>
                        </View>
                        <Ionicons 
                          name={isExpanded ? "chevron-up" : "chevron-down"} 
                          size={22} 
                          color={isDark ? "#ccc" : "#666"} 
                        />
                      </View>
                    </View>
                    {isExpanded && (
                      <View style={style.ticket_details}>
                        <View style={style.ticket_detaildivider} /> 
                        <View style={style.ticket_detailitem}>
                          <Text style={[style.ticket_detaillabel, { color: isDark ? '#aaa' : '#666' }]}>Created:</Text>
                          <Text style={[style.ticket_detailvalue, { color: isDark ? '#fff' : '#000' }]}>
                            {formatDate(item.createdAt)}
                          </Text>
                        </View>
                          
                        <View style={style.ticket_detailitem}>
                          <Text style={[style.ticket_detaillabel, { color: isDark ? '#aaa' : '#666' }]}>Description:</Text>
                          <Text style={[style.ticket_detailvalue, { 
                            color: isDark ? '#fff' : '#000', 
                            backgroundColor: isDark ? '#2d2d2d' : '#fff',
                            padding: 12,
                            borderRadius: 8,}]}>
                            {item.message}
                          </Text>
                        </View>
                          
                        <View style={style.ticket_detailitem}>
                          <Text style={[style.ticket_detaillabel, { color: isDark ? '#aaa' : '#666' }]}>Response:</Text>
                          <View style={[style.ticket_responsebubble, { backgroundColor: isDark ? '#2d2d2d' : '#fff' }]}>
                            <Text style={[style.ticket_responsetext, { color: isDark ? '#fff' : '#000' }]}>
                              {item.response || 'No response yet. Our team will get back to you soon.'}
                            </Text>
                          </View>
                        </View>
                          
                        {item.status.toLowerCase() === 'closed' && (
                          <View style={style.ticket_detailitem}>
                            <Text style={[style.ticket_detaillabel, { color: isDark ? '#aaa' : '#666' }]}>Closed:</Text>
                            <Text style={[style.ticket_detailvalue, { color: isDark ? '#fff' : '#000' }]}>
                              {formatDate(item.closedAt)}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )
            }}
            ListEmptyComponent={
              <View style={style.emptycontainer}>
                <Text style={[style.emptytext, { color: isDark ? '#aaa' : '#555' }]}>
                  No tickets found
                </Text>
              </View>}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

