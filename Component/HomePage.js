import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import LinearGradient from 'expo-linear-gradient'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function HomePage(){
    const navigation = useNavigation()
    const [useremail, setUseremail] = useState('')
    const [usercredits, setUsercredits] = useState(20)
    const [streakDays, setStreakDays] = useState(7) 
    const [quizPoints, setQuizPoints] = useState(350)
    const [theme, setTheme] = useState('')
    const courses = [
        {
            id: '1',
            title: 'English',
            description: 'Master English communication skills through real-world conversations, quizzes, and AI-guided practice.',
            image: require('../assets/course/EnglishCourse.png'),
            level: 'Beginner to Advanced',
            lessons: 42
        },
        {
            id: '2',
            title: 'Chinese',
            description: 'Learn Mandarin Chinese through daily conversations, pronunciation practice, and AI-powered speaking feedback.',
            image: require('../assets/course/ChineseCouse.png'),
            level: 'Beginner to Advanced',
            lessons: 38
        },
        {
            id: '3',
            title: 'Japanese',
            description: 'Master Japanese through real-world conversations, polite expressions, and speaking practice.',
            image: require('../assets/course/JapaneseCourse.jpg'),
            level: 'Beginner to Intermediate',
            lessons: 35
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
            setUseremail(uemail)
            fetchUserStats(uemail)
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

    function fetchUserStats(email) {
        // In a real app, this would be an API call to fetch user stats
        console.log("Fetching stats for:", email)
    }

    return(
        <View style={[style.homepage_body, theme === 'Dark' ? {backgroundColor:'#1A1A1A'} : {backgroundColor: '#F9FAFB'}]}>
            <StatusBar 
                barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'} 
                backgroundColor={theme === 'Dark' ? '#1A1A1A' : '#F9FAFB'}
            />

            <View style={style.home_header_container}>
                <View style={style.logo_container}>
                    <Image 
                        source={require('../assets/talkwisepng/Asset 2.png')} 
                        style={style.logo_icon} 
                        resizeMode="contain"
                    />
                    <Image 
                        source={require('../assets/talkwisepng/Asset 3.png')} 
                        style={style.logo_text} 
                        resizeMode="contain"
                    />
                </View>
                
                <View style={style.stats_row}>
                    <View style={[style.stat_card, theme === 'Dark' ? {backgroundColor:'#333333'} : {}]}>
                        <MaterialCommunityIcons name="diamond" size={16} color="#3B82F6" />
                        <Text style={[style.stat_value, theme === 'Dark' ? {color:'#FFFFFF'} : {}]}>{usercredits}</Text>
                        <Text style={[style.stat_label, theme === 'Dark' ? {color:'#A3A3A3'} : {}]}>Credits</Text>
                    </View>
                    
                    <View style={[style.stat_card, theme === 'Dark' ? {backgroundColor:'#333333'} : {}]}>
                        <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
                        <Text style={[style.stat_value, theme === 'Dark' ? {color:'#FFFFFF'} : {}]}>{streakDays}</Text>
                        <Text style={[style.stat_label, theme === 'Dark' ? {color:'#A3A3A3'} : {}]}>Day Streak</Text>
                    </View>
                    
                    <View style={[style.stat_card, theme === 'Dark' ? {backgroundColor:'#333333'} : {}]}>
                        <FontAwesome5 name="award" size={16} color="#FACC15" />
                        <Text style={[style.stat_value, theme === 'Dark' ? {color:'#FFFFFF'} : {}]}>{quizPoints}</Text>
                        <Text style={[style.stat_label, theme === 'Dark' ? {color:'#A3A3A3'} : {}]}>Points</Text>
                    </View>
                </View>
            </View>
            
            <View style={[style.welcome_banner, theme === 'Dark' ? {backgroundColor:'#262626'} : {}]}>
                <View style={style.welcome_content}>
                    <Text style={[style.welcome_title, theme === 'Dark' ? {color:'#FFFFFF'} : {}]}>
                        Welcome Back!
                    </Text>
                    <Text style={[style.welcome_subtitle, theme === 'Dark' ? {color:'#D1D5DB'} : {}]}>
                        Continue your language journey
                    </Text>
                </View>
                <Image 
                    source={require('../assets/talkwisepng/Asset 2.png')} 
                    style={style.welcome_image}
                    resizeMode="contain" 
                />
            </View>
            
            <Text style={[style.section_title, theme === 'Dark' ? {color:'#FFFFFF'} : {}]}>Available Courses</Text>
            
            <FlatList
                data={courses}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.course_list}
                renderItem={({ item }) => (
                    <View style={[style.course_card, theme === 'Dark' ? { backgroundColor: '#262626' } : {}]}>
                        <Image source={item.image} style={style.course_image} />
                        
                        <View style={style.course_content}>
                            <View style={style.course_header}>
                                <Text style={[style.course_title, theme === 'Dark' ? { color: '#FFFFFF' } : {}]}>
                                    {item.title}
                                </Text>
                                <View style={[style.level_badge, theme === 'Dark' ? {backgroundColor: '#3B82F6', borderColor: '#3B82F6'} : {}]}>
                                    <Text style={[style.level_text, theme === 'Dark' ? {color: '#FFFFFF'} : {}]}>
                                        {item.level}
                                    </Text>
                                </View>
                            </View>
                            
                            <Text style={[style.course_description, theme === 'Dark' ? { color: '#D1D5DB' } : {}]}>
                                {item.description}
                            </Text>
                            
                            <View style={style.course_footer}>
                                <View style={style.lessons_container}>
                                    <Ionicons 
                                        name="book-outline" 
                                        size={14} 
                                        color={theme === 'Dark' ? '#A3A3A3' : '#6B7280'} 
                                    />
                                    <Text style={[style.lessons_text, theme === 'Dark' ? {color: '#A3A3A3'} : {}]}>
                                        {item.lessons} Lessons
                                    </Text>
                                </View>
                                
                                <TouchableOpacity
                                    style={[style.start_button, theme === 'Dark' ? { backgroundColor: '#3B82F6' } : {}]}
                                    onPress={() => navigation.navigate('userlevel', { courseId: item.id })}
                                    accessibilityLabel={`Start ${item.title} lesson`}
                                    accessibilityRole="button"
                                >
                                    <Text style={style.start_button_text}>
                                        Start
                                    </Text>
                                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{marginLeft: 4}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}