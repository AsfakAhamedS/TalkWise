import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons' 
import style from '../style'

const API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export default function LessonPage() {
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('')
  const [level, setLevel] = useState('')
  const [lessondata, setLessondata] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
   const [theme, setTheme] = useState('')

    useEffect(() => {
        const getTheme = async () => {
            const mode = await AsyncStorage.getItem('Mode')
            setTheme(mode)
        }
        getTheme()
    }, [])
    const darkmode = theme === 'Dark'

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const email = await AsyncStorage.getItem('Email')
            if (email) {
            setUserEmail(email)
            fetchUserAvatar(email)
            } else {
            setError('User not logged in')
            setLoading(false)
            }
        } catch (err) {
            console.error("Error:", err)
            setError('Failed to load user data')
            setLoading(false)
        }
        }
        
        fetchUserData()
    }, [])

    function fetchUserAvatar(email){
        axios.post(`${API_URL}get-user-avatar`, { 
            type: 'getuserdata', 
            useremail: email 
        })
        .then((res) => {
            if (res.status === 200) {
                const userLevel = res?.data?.level
                AsyncStorage.setItem('Section', userLevel)
                .then(() => {console.log("Saved")})
                .catch((err) => {console.log("Error",err)})
                setLevel(userLevel)
                fetchLessons(userLevel)
            }
        })
        .catch((err) => {        
            console.error("Avatar fetch error:", error.response?.data || error.message)
            setError('Failed to load user profile')
            setLoading(false)
        })
    }

    function fetchLessons(sectionLevel){
        setLoading(true)
        axios.post(`${API_URL}get-lesson`, { 
            section: sectionLevel 
        })
        .then((res) => {
            if (res.status === 200) {
                setLessondata(res?.data?.levels || [])
            }
        })
        .catch((err) => {
            console.error("Lesson fetch error:", err.res?.data || error.message)
            setError('Failed to load lessons')
        })
        .finally(() => {setLoading(false)})
    }

    const navigateToLesson = (item) => {
        navigation.navigate('chat', { 
        level: item.level, 
        topic: item.title 
        })
    }

    if (loading) {
        return (
        <View style={style.centerContainer}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={style.loadingText}>Loading lessons...</Text>
        </View>
        )
    }


  return (
    <View style={style.lesson_container}>
         <StatusBar 
            barStyle={darkmode ? 'light-content' : 'dark-content'} 
            backgroundColor={darkmode ? '#1A1A1A' : '#F9FAFB'}/>
        <View style={style.lesson_header}>
            <TouchableOpacity 
                style={[style.lesson_backbutton, darkmode && {backgroundColor: '#333333'}]} 
                onPress={() => navigation.goBack()}>
                <Ionicons 
                    name="arrow-back" 
                    size={20} 
                    color={darkmode ? '#FFFFFF' : '#111827'} />
            </TouchableOpacity>
            <View style={style.lesson_headertitlecontainer}>
                <Text style={[style.lesson_headertitle, darkmode && {color: '#FFFFFF'}]}>
                    {level} Level
                </Text>
            </View>
        </View>
        <FlatList
            data={lessondata}
            keyExtractor={(item) => item.level.toString()}
            renderItem={({ item }) => (
                <View style={style.lesson_card}>
                <View style={style.lesson_header}>
                    <Text style={style.lesson_level}>Level {item.level}</Text>
                    <Text style={style.lesson_title}>{item.title}</Text>
                </View>
                <Text style={style.lesson_description}>{item.description}</Text>
                <TouchableOpacity 
                    style={style.lesson_startbutton}
                    onPress={() => navigateToLesson(item)}>
                    <Text style={style.lesson_buttontext}>Start Lesson</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={style.listContainer}
            ListEmptyComponent={
            <View style={style.lesson_emptycontainer}>
                <Ionicons name="book-outline" size={64} color="#BDBDBD" />
                <Text style={style.lesson_emptytext}>No lessons available</Text>
            </View>
            }
        />
    </View>
  )
}
