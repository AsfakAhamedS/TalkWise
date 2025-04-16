import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Platform } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function SupportPage() {
  const [subject, setSubject] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [message, setMessage] = useState('')
  const [faqs, setFaqs] = useState([])
  const [expandedfaq, setExpandedfaq] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function fetchData(){
      AsyncStorage.getItem('Email')
        .then((email) => {
          setUserEmail(email || '')
          return axios.get(`${url}support-faqs`)
        })
        .then((response) => {
          setFaqs(response.data)
        })
        .catch((error) => {
          console.log("Error fetching data:", error)
          Toast.show(style.error({
            text1: "Failed to load data",
            text2: "Please check your connection",
          }))
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchData()
  }, [])
  
  const toggleFaq = (index) => {
    setExpandedfaq(expandedfaq === index ? null : index)
  }

  function handleSubmit(){
    if (!subject || !userEmail || !message) {
      Toast.show(style.error({
        text1: "Submission Failed",
        text2: "All fields are required",
      }))
      return
    }
    setSubmitting(true)

    axios.post(`${url}support-ticket`, {
      subject: subject,
      useremail: userEmail,
      message: message
    })
    .then((res) => {
      Toast.show(style.success({
        text1: "Ticket Submitted Successfully",
        text2: res?.data?.message || "We'll get back to you soon.",
      }))
      setSubject('')
      setMessage('')
    })
    .catch((err) => {
      console.log("Submission error:", err)
      Toast.show(style.error({
        text1: "Submission Failed",
        text2: "Please try again later",
      }))
    })
    .finally(() => {
      setSubmitting(false)
    })
  }

  if (loading) {
    return (
      <View style={style.support_loadingcontainer}>
        <ActivityIndicator size="large" color="#252525" />
        <Text style={style.support_loadingtext}>Loading support resources...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={style.support_safeArea}>
      <ScrollView style={style.support_container} showsVerticalScrollIndicator={false}>
        <View style={style.support_header}>
          <Text style={style.support_title}>Customer Support</Text>
          <Text style={style.support_subtitle}>We're here to help with any questions or issues</Text>
        </View>

        <View style={style.support_section}>
          <Text style={style.support_section_title}>Frequently Asked Questions</Text>
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <View key={index} style={style.support_faqitem}>
                <TouchableOpacity 
                  style={style.support_faqheader} 
                  onPress={() => toggleFaq(index)}
                  activeOpacity={0.7}>
                  <Text style={style.support_question}>{faq.question}</Text>
                  <Ionicons 
                    name={expandedfaq === index ? "chevron-up" : "chevron-down"} 
                    size={22} 
                    color="#555"/>
                </TouchableOpacity>
                {expandedfaq === index && (
                  <Text style={style.support_answer}>{faq.answer}</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={style.support_nofaqs}>No FAQs available at the moment.</Text>
          )}
        </View>
        <View style={style.support_formsection}>
          <Text style={style.support_section_title}>Support Ticket</Text>
            
          <View style={style.support_inputgroup}>
            <Text style={style.support_label}>Email</Text>
            <TextInput
              placeholder="Your email address"
              value={userEmail}
              onChangeText={setUserEmail}
              style={[style.support_input, style.support_disabledinput]}
              editable={false}
              placeholderTextColor="#999"
            />
          </View>
            
          <View style={style.support_inputgroup}>
            <Text style={style.support_label}>Subject</Text>
            <TextInput
              placeholder="Description of your issue"
              value={subject}
              onChangeText={setSubject}
              style={style.support_input}
              placeholderTextColor="#999"
            />
          </View>
            
          <View style={style.support_inputgroup}>
            <Text style={style.support_label}>Message</Text>
            <TextInput
              placeholder="Please provide details about your issue..."
              value={message}
              onChangeText={setMessage}
              multiline
              style={style.support_messageinput}
              placeholderTextColor="#999"
              textAlignVertical="top"
            />
          </View>
            
          <TouchableOpacity 
            onPress={handleSubmit} 
            style={style.support_button}
            disabled={submitting} >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={style.support_buttontext}>Submit Ticket</Text>
            )}
          </TouchableOpacity>
        </View>
          
        <View style={style.support_contactinfo}>
          <Text style={style.support_contacttitle}>Reach Us</Text>
          <Text style={style.support_contactitem}>
            <Ionicons name="mail-outline" size={16} color="#555" /> support@talkwise.com
          </Text>
          <Text style={style.support_contactitem}>
            <Ionicons name="call-outline" size={16} color="#555" /> +91 1234567890
          </Text>
          <Text style={style.support_contactitem}>
            <Ionicons name="time-outline" size={16} color="#555" /> Mon-Fri: 9am - 5pm
          </Text>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  )
}

