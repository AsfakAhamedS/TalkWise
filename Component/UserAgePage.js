import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import style from '../style'
import Toast from 'react-native-toast-message'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserAgePage() {
    const navigation = useNavigation()
    const [age, setAge] = useState(null)
    const [username, setUsername] = useState('')
    const agegroups = [
        "Under 12", "12 - 15", "16 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "65 or Older"
    ]

    useEffect(() => {
        (async () => {
            const storedName = await AsyncStorage.getItem('Name')
            setUsername(storedName || "Guest");
        })()
    }, [])

    useEffect(() => {
        if (age) {
            handleNext()
        }
    }, [age]) 

    async function handleNext() {
        console.log("url ===>",url)
        const email = await AsyncStorage.getItem('Email')
        // const email = 'asfak@gmail.com'
        console.log(email)
        axios.post(url + 'get-user-details', { type:'age', useremail:email, userage:age })
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => navigation.navigate('userpic'), 1000)
            }
        })
        .catch(error => {
            Toast.show(style.error({
                text1: 'Update Failed',
                text2: error.response?.data?.error,
            }))
        })
    }

    return(
        <View style={style.body}>
            <View style={style.userdp_heading}>
                <Text style={[style.userdp_subhead,{fontWeight:300}]}>Hi {username}</Text>
                <Text style={[style.userdp_subhead,{marginBottom:20}]}>How old are you?</Text>
                <View>
                    {agegroups.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[style.age_btn, age === item ? { backgroundColor: '#ECECEC' } : {}]}
                            onPress={() => setAge(item)}
                        >
                            <Text style={style.age_btn_text}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
}