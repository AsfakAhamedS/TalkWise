import React, { useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import style from '../style'
import Toast from 'react-native-toast-message'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserNamePage() {
    const navigation = useNavigation()
    const [name, setName] = useState('')

    async function handleNext() {
        console.log("url ===>",url)
        AsyncStorage.setItem('Name', name)
        .then(() => console.log("Name stored"))
        .catch(err => console.error("Name error:", err))
        const email = await AsyncStorage.getItem('Email')
        // const email = 'asfak@gmail.com'
        console.log(email)
        axios.post(url + 'get-user-details', { type:'name', useremail:email, username:name })
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => navigation.navigate('userage'), 500)
            }
        })
        .catch(error => {
            Toast.show(style.error({
                text1: 'Update Failed',
                text2: error.response?.data?.error,
            }))
            // console.error("Login Error:", error)
        })
    }

    return(
        <View style={[style.body, {paddingHorizontal:20}]}>
            <View style={style.userdp_heading}>
                <Text style={[style.userdp_subhead,{fontWeight:300}]}>So nice to meet you.</Text>
                <Text style={[style.userdp_subhead,{marginBottom:20,  color:'#4F6CFF'}]}>What's your name?</Text>
                <View style={style.input_container}>
                    <Feather name="user" size={22} style={style.icon} />
                    <TextInput
                        style={[style.input,{fontSize:18}]}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}/>
                </View>
            </View>
            <View style={[style.login_btn_to,{marginBottom:80}]}>
                <TouchableOpacity 
                    style={style.login_btn} 
                    activeOpacity={0.4} 
                    onPress={handleNext}> 
                    <Text style={[style.login_btn_text,{padding:3}]}>Next</Text>
                </TouchableOpacity>
            </View>
            <Toast/>
        </View>
    )
}