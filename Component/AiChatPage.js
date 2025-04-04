import React, { useState, useEffect, use } from 'react'
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Audio } from 'expo-av'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from '../style'
import { TextInput } from 'react-native-gesture-handler'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function AiChatPage() {
    const [input, setInput] = useState('')
    const [question, setQuestion] = useState('')
    const [ai, setAi] = useState('')
    const [user, setUser] = useState('')
    const [count,setCount] = useState(0)

    
    async function handleSubmit(){
        await axios.post(url+"lesson", {section:"Beginner", level:1, user:input})
        .then(response => {
            if(response.status==200){
                setQuestion(response?.data?.Question)
                setUser(response?.data?.User)
                setAi(response?.data?.Ai)
                console.log(question)
                setInput('')
        }})
        .catch(error => {
            console.log("error ==> ",error.response?.data || "error")
        }) 
    }
    
    return(
        <>
            <View style={{flex:4, flexDirection:'column',gap:20,paddingHorizontal:20}}>
                <Text style={style.pageTitle}>Chat</Text>
                <Text>Ai : {question}</Text>
                <Text>User: {user}</Text>
                <Text>Ai: {ai}</Text>
            </View>
            <View style={{flex:1}}>
                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholder="Enter your password"
                        value={input}
                        onChangeText={(txt) => {setInput(txt)}}
                    />
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={{textAlign:'center'}}>Sumbit</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}