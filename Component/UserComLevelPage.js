import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import style from '../style'
import Toast from 'react-native-toast-message'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserComLevelPage() {
    const navigation = useNavigation()
    const [comlevel, setComlevel] = useState(null)
    const level = [
        "Beginner","Intermediate","Advanced"
    ]

    useEffect(() => {
        if (comlevel !== null) {
            handleNext()
        }
    }, [comlevel]) 

    async function handleNext() {
        console.log("url ===>",url)
        const email = await AsyncStorage.getItem('Email')
        // const email = 'asfak@gmail.com'
        console.log(email)
        axios.post(url + 'get-user-details', { type:'comlevel', useremail:email,  usercomlevel: comlevel })
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => navigation.navigate('lesson'), 500)
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
                <Text style={[style.userdp_subhead,{fontWeight:300}]}>On a scale of 1 - 3</Text>
                <Text style={[style.userdp_subhead,{marginBottom:20}]}>How's your English?</Text>
                <View>
                    <TouchableOpacity 
                        style={[style.age_btn, comlevel === "Beginner" ? { backgroundColor: '#ECECEC' } : {}]}
                        onPress={() => setComlevel("Beginner")}
                    >
                        <Text style={style.age_btn_text}>1 - Beginner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[style.age_btn, comlevel === "Intermediate" ? { backgroundColor: '#ECECEC' } : {}]}
                        onPress={() => setComlevel("Intermediate")}
                    >
                        <Text style={style.age_btn_text}>2 - Intermediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[style.age_btn, comlevel === "Advanced" ? { backgroundColor: '#ECECEC' } : {}]}
                        onPress={() => setComlevel("Advanced")}
                    >
                        <Text style={style.age_btn_text}>3 - Advanced</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}