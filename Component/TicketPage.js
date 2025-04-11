import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'

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

  const fetchTickets = async () => {
    console.log("email ===>",userEmail)
    try {
      const response = await axios.post(url+'ticket-status', { useremail: userEmail })
      if (response.status === 200) {
        // console.log(response?.data)
        setTickets(response?.data)
      }
      if(tickets){
        console.log("===>",tickets)
      }
    } catch (error) {
      console.log('Error fetching tickets:', err?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.heading, { color: isDark ? '#fff' : '#000' }]}>Your Support Tickets</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
          data={tickets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={{ marginBottom: 15, borderRadius: 10, elevation:2}}
                onPress={() => setOpen(open === item.ticketId ? null :  item.ticketId)}>
                <View style={[styles.ticketCard, { backgroundColor: isDark ? '#1f1f1f' : '#f2f2f2' }]}>
                    <Text style={[styles.ticketText, { color: isDark ? '#fff' : '#000' }]}><Text style={{ fontWeight: 'bold'}}>Ticket ID: </Text>{item.ticketId}</Text>
                    <Text style={[styles.ticketText, { color: isDark ? '#fff' : '#000' }]}><Text style={{ fontWeight: 'bold'}}>Issue: </Text>{item.subject}</Text>
                    <Text style={{ color: item.status === 'Open' ? 'orange' : 'green', fontWeight: 'bold' }}>
                        Status: {item.status}
                    </Text>
                    {open === item.ticketId ? 
                        <>
                            <View>
                                <Text style={{marginTop:5}}><Text style={[styles.ticketText,{fontWeight: 'bold'}]}>Open Date: </Text>{item.createdAt}</Text>
                                <Text style={{marginTop:5}}><Text style={[styles.ticketText,{fontWeight: 'bold'}]}>Issue: </Text>{item.message}</Text>
                                <Text style={{marginTop:5}}><Text style={[styles.ticketText,{fontWeight: 'bold'}]}>Respone: </Text>{item.response || 'N/A'}</Text>
                                <Text style={{marginTop:5}}><Text style={[styles.ticketText,{fontWeight: 'bold'}]}>Close Date: </Text>{item.closedAt || 'N/A'}</Text>
                            </View>
                        </>
                    : null}
                </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ color: isDark ? '#aaa' : '#555' }}>No tickets found</Text>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketCard: {
    padding: 16,
    borderRadius: 10,
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 6,
  },
})