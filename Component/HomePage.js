import React, { useEffect, useState, useCallback } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image, FlatList, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect, useRoute  } from '@react-navigation/native'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function HomePage(){
    const navigation = useNavigation()
    const [useremail, setUseremail] = useState('')
    const [usercredits, setUsercredits] = useState(20) 
    const [theme, setTheme] = useState('')
    const courses = [
        {
            id: '1',
            title: 'English',
            description: 'Master English communication skills through real-world conversations, quizzes, and AI-guided practice. Perfect for all levels — Beginner to Advanced!',
            image: require('../assets/course/EnglishCourse.png'),
        },
        {
            id: '2',
            title: 'Chinese',
            description: 'Learn Mandarin Chinese through daily conversations, pronunciation practice, and AI-powered speaking feedback — from beginner phrases to advanced fluency!',
            image: require('../assets/course/ChineseCouse.png'),
        },
        {
            id: '3',
            title: 'Japanese',
            description: 'Master Japanese through real-world conversations, polite expressions, and speaking practice — perfect for both travel and daily life in Japan!',
            image: require('../assets/course/JapaneseCourse.jpg'),
        },
    ]
   
    useEffect(() => {
        const checkFromLogin = async () => {
        try {
            const fromLogin = await AsyncStorage.getItem('FromLogin')

            if (fromLogin === 'true') {
            console.log('Redirecting to main screen...')
            
            await AsyncStorage.removeItem('FromLogin')

            navigation.reset({
                index: 0,
                routes: [{ name: 'main' }],
            })
            } else {
            console.log('Not from login. Staying on HomePage.')
            }
        } catch (error) {
            console.log('Error checking FromLogin:', error)
        }
        }
        checkFromLogin()
    }, [])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const mode = await AsyncStorage.getItem('Mode')
                setTheme(mode)
            })()
        }, [])
    )

    useEffect(() => {
        (async () => {
            console.log("loading")
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail( uemail)
        })()
    }, [])

    useFocusEffect(
        useCallback(() => {
            if (useremail) {
                console.log("avatar trigged")
                subscription()
            }
        }, [useremail])
    )
    
    function subscription() {
        axios.post(url + "user-subscription", { useremail: useremail })
        .then(response => {
            if(response.status == 200){
                console.log(response?.data?.message)
                setUsercredits(response?.data?.credit)
            }
            console.log("subs ===>",usercredits)
        })
        .catch(error => {
            console.log("Sub error ==> ", error.response?.data || "error")
        })
    }
    return(
        <View style={[style.homepage_body, theme === 'Dark' ? {backgroundColor:'#252525'} : {}]}>
            <View style={{flexDirection:'row'}}>
                <View style={style.home_header}>
                    <Image 
                    source={require('../assets/talkwisepng/Asset 2.png')} 
                    style={{ width: 40, height: 40, marginRight: 7 }} 
                    resizeMode="contain"
                    />
                    <Image source={require('../assets/talkwisepng/Asset 3.png')} 
                    style={{ width: 100, height: 100 }} 
                    resizeMode="contain"
                    />
                </View>
                <View style={[style.home_credit,theme === 'Dark' ? {backgroundColor:'#2E2E2E'} : {}]}>
                    <Text style={[style.home_credit_text,theme === 'Dark' ? {borderColor:'#2E2E2E',color:'#FAFAFA'} : {}]}>{usercredits}</Text>
                </View>
            </View>
            <FlatList
                data={courses}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={[style.home_card, theme === 'Dark' ? { backgroundColor: '#2E2E2E' } : {}]}>
                        <Image source={item.image} style={style.home_card_image} />
                        <Text style={[style.home_card_title, theme === 'Dark' ? { color: '#FAFAFA' } : {}]}>
                            {item.title}
                        </Text>
                        <Text style={[style.home_card_description, theme === 'Dark' ? { color: '#FAFAFA' } : {}]}>
                            {item.description}
                        </Text>
                        <TouchableOpacity
                            style={[style.card_button, theme === 'Dark' ? { backgroundColor: '#559D63' } : {}]}
                            onPress={() => navigation.navigate('userlevel')}
                            accessibilityLabel={`Start ${item.title} lesson`}
                            accessibilityRole="button"
                        >
                            <Text style={[style.card_button_text, theme === 'Dark' ? { color: '#FAFAFA' } : {}]}>
                                Start Lesson
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}