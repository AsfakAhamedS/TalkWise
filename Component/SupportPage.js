import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import style from '../style';

const url = process.env.EXPO_PUBLIC_API_URL || '';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('Email');
        setUserEmail(email || '');
        
        const response = await axios.get(`${url}support/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        Toast.show(style.error({
          text1: "Failed to load data",
          text2: "Please check your connection",
        }));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = async () => {
    if (!subject || !userEmail || !message) {
      Toast.show(style.error({
        text1: "Submission Failed",
        text2: "All fields are required",
      }));
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${url}support-ticket`, {
        subject: subject,
        useremail: userEmail,
        message: message
      });
      
      Toast.show(style.success({
        text1: "Ticket Submitted Successfully",
        text2: response?.data?.message || "We'll get back to you soon.",
      }));
      
      setSubject('');
      setMessage('');
    } catch (error) {
      console.log("Submission error:", error);
      Toast.show(style.error({
        text1: "Submission Failed",
        text2: "Please try again later",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#252525" />
        <Text style={styles.loadingText}>Loading support resources...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Customer Support</Text>
            <Text style={styles.subtitle}>We're here to help with any questions or issues</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <TouchableOpacity 
                    style={styles.faqHeader} 
                    onPress={() => toggleFaq(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.question}>{faq.question}</Text>
                    <Ionicons 
                      name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                      size={22} 
                      color="#555"
                    />
                  </TouchableOpacity>
                  {expandedFaq === index && (
                    <Text style={styles.answer}>{faq.answer}</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noFaqs}>No FAQs available at the moment.</Text>
            )}
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Submit a Support Ticket</Text>
            <Text style={styles.formDescription}>
              Can't find what you're looking for? Submit a ticket and our team will get back to you as soon as possible.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Your email address"
                value={userEmail}
                onChangeText={setUserEmail}
                style={[styles.input, styles.disabledInput]}
                editable={false}
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                placeholder="Brief description of your issue"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                placeholder="Please provide details about your issue..."
                value={message}
                onChangeText={setMessage}
                multiline
                style={styles.messageInput}
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity 
              onPress={handleSubmit} 
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Submit Ticket</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Other Ways to Reach Us</Text>
            <Text style={styles.contactItem}>
              <Ionicons name="mail-outline" size={16} color="#555" /> support@yourcompany.com
            </Text>
            <Text style={styles.contactItem}>
              <Ionicons name="call-outline" size={16} color="#555" /> +1 (800) 123-4567
            </Text>
            <Text style={styles.contactItem}>
              <Ionicons name="time-outline" size={16} color="#555" /> Mon-Fri: 9am - 5pm EST
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    fontSize: 15,
    color: '#555',
    padding: 16,
    paddingTop: 0,
    lineHeight: 22,
  },
  noFaqs: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  formSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  formDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  messageInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 150,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#252525',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfo: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  contactItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});