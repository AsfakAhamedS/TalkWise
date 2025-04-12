import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import style from '../style'
import Toast from 'react-native-toast-message'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserNativeLanPage() {
    const navigation = useNavigation()
    const [nativelan, setNativelan] = useState(null)
    const level = [
        'Arabic',
        'Chinese',
        'English',
        'French',
        'German',
        'Hindi',
        'Japanese',
        'Kannada',
        'Korean',
        'Malayalam',
        'Portuguese',
        'Russian',
        'Spanish',
        'Tamil',
        'Telugu',
        'Urdu'
      ] 

    useEffect(() => {
        console.log("lan ===>",nativelan)
        if (nativelan !== null) {
            handleNext()
        }
    }, [nativelan]) 

    async function handleNext() {
        console.log(nativelan)
        console.log("url ===>",url)
        const email = await AsyncStorage.getItem('Email')
        // const email = 'asfak@gmail.com'
        console.log(email)
        axios.post(url + 'get-user-details', { type:'nativelan', useremail:email,  userlanguage: nativelan })
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => navigation.navigate('plan'), 1000)
            }
        })
        .catch(error => {
            Toast.show(style.error({
                text1: 'Update Failed',
                text2: error?.data?.message,
            }))
        })
    }

    return(
        <View style={style.body}>
            <View style={style.userdp_heading}>
                <Text style={[style.userdp_subhead,{fontWeight:300}]}>What's your</Text>
                <Text style={[style.userdp_subhead,{marginBottom:20}]}>native language?</Text>
                <View style={{marginBottom:40}}>
                <TouchableOpacity>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={level}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={[style.age_btn, {elevation:3}, nativelan === item ? { backgroundColor: '#ECECEC' } : {}]}
                                onPress={() => setNativelan(item)}
                            >
                                    <Text style={style.age_btn_text}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text>No tickets found</Text>}
                    />
                </TouchableOpacity>
                </View>
            </View>
            <Toast/>
        </View>
    )
}