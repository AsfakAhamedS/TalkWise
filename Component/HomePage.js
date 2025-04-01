import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function HomePage(){
    const navigation = useNavigation()
    const [useremail, setUseremail] = useState('' || 'Mani@gmail.com')
    const [level, setLevel] = useState('')

    useEffect(() => {
        (async () => {
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail( uemail)
        })()
    }, [])
    useEffect(() => {
        if (useremail) {
            console.log("avatar trigged")
            avatar()
        }
    }, [useremail])
    
    function avatar() {
        axios.post(url + "get-user-avatar", { useremail: useremail })
            .then(response => {
                if (response.status == 200) {
                    setLevel(response?.data?.level)
                }
            })
            .catch(error => {
                console.log("error ==> ", error.response?.data || "error")
            })
    }
    return(
        <View style={style.homepage_body}>
            <View style={style.home_card}>
                <Image
                    source={require('../assets/course/course_logo.jpg')}
                    style={style.home_card_image}
                />
                <Text style={style.home_card_title}>English - {level} level</Text>
                <Text style={style.home_card_description}>
                    {level === 'Beginner'  ? 
                    (`The Beginner level is designed to help you master the basics of the English language. You will learn simple greetings, introductions, and basic conversational skills.`)
                    : level === 'Intermediate' ? 
                    (`The Intermediate level focuses on enhancing your English communication skills. You will learn more complex grammar, improve your vocabulary, and practice real-world conversations.`)
                    : level === 'Advanced' ?
                    (`The Advanced level is designed for learners aiming to master the English language. Focus on high-level grammar, academic writing, professional communication, and critical thinking skills.`)
                    : null}
                </Text>
                <TouchableOpacity 
                    style={style.card_button}
                    onPress={() => navigation.navigate('lesson')}>
                    <Text style={style.card_button_text}>Start Lesson</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}