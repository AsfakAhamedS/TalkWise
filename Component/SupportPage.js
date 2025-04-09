import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function SupportPage() {
    const [username, setUsername] = useState('')
    const [useremail, setUseremail] = useState('')
    const [message, setMessage] = useState('')
    const [faqs, setFaqs] = useState([])

  useEffect(() => {
    axios.get(`${url}support/faqs`)
      .then(res => setFaqs(res.data))
      .catch(err => console.log("===>".err))
  }, [])

  const handleSubmit = async () => {
    const emailRegux = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!username || !useremail || !message){
        Toast.show(style.error({
            text1: "Updated Failed",
            text2: "All fields required",
        }))
        return
    }
    if(!emailRegux.test(useremail)){
        Toast.show(style.error({
            text1: 'Invalid email',
            text2: 'Enter a valid email',
        }))
        return
    }
    axios.post(`${url}support-ticket`, { username:username,useremail:useremail, message:message})
        .then((response) => {
            Toast.show(style.success({
                text1: "Successfully ticket rised",
                text2: response?.data?.message,
            }))
            setUsername('')
            setUseremail('')
            setMessage('')
        })
      .catch(err => console.log(err))
  }

  return (
   <>
     <ScrollView style={styles.container}>
        <Text style={styles.heading}>FAQs</Text>
        {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
            </View>
        ))}
    </ScrollView>
    <View style={[styles.container,{marginBottom:30}]}>
        <Text style={styles.heading}>Need Help?</Text>
        <TextInput 
            placeholder='Enter your name'
            value={username}
            onChangeText={setUsername}
            style={styles.userinput}
        />
        <TextInput 
            placeholder='Enter your email'
            value={useremail}
            onChangeText={setUseremail}
            style={styles.userinput}
        />
        <TextInput
            placeholder="Describe your issue..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit Ticket</Text>
        </TouchableOpacity>
    </View>
    <Toast/>
   </>
  )
}

const styles = StyleSheet.create({
container: { 
    padding: 20 
},
heading: { fontSize: 22, 
    fontWeight: 'bold', 
    marginVertical: 10 
},
faqItem: { marginBottom: 10 

},
question: { 
    fontSize:18,
    fontWeight: '600' 
},
answer: {
    fontSize:16, 
    marginBottom: 5 
},
userinput:{
    backgroundColor: '#FAFAFA', 
    padding:15,
    borderRadius: 8,
    marginBottom:10,
    minHeight: 50 
},
input: { 
    backgroundColor: '#FAFAFA', 
    padding: 15, 
    borderRadius: 8, 
    minHeight: 100 
},
button: { 
    backgroundColor: '#252525', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 15 
},
  buttonText: { 
    color: '#fff', 
    textAlign: 'center' 
},
    
})