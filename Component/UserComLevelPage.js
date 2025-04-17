import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import style from '../style'

const API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserComLevelPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const [comlevel, setComlevel] = useState(null)
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState('')
    const courseId = route.params?.courseId || '1'
    
    const courseDetails = {
        '1': {
            title: 'English',
            icon: 'language-english',
            color: '#4F46E5',
        },
        '2': {
            title: 'Chinese',
            icon: 'symbol-chinese',
            color: '#4F46E5',
        },
        '3': {
            title: 'Japanese',
            icon: 'language-japanese',
            color: '#4F46E5',
        }
    }
    
    const currentCourse = courseDetails[courseId] || courseDetails['1']
    
    useEffect(() => {
        const getTheme = async () => {
            const mode = await AsyncStorage.getItem('Mode')
            setTheme(mode)
        }
        getTheme()
    }, [])
    const darkmode = theme === 'Dark'

    // useEffect(() => {
    //     if (comlevel !== null) {
    //         handleNext()
    //     }
    // }, [comlevel])
    
    async function handleNext() {
        setLoading(true)
        console.log("API_URL ===>", API_URL)
        const email = await AsyncStorage.getItem('Email')
        console.log(email)
        
        axios.post(`${API_URL}get-user-details`, { 
            type: 'comlevel', 
            useremail: email, 
            usercomlevel: comlevel,
            course: currentCourse.title
        })
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate('lesson')
                }, 500)
            }
        })
        .catch(error => {
            setLoading(false)
            Toast.show(style.error({
                text1: 'Update Failed',
                text2: error.response?.data?.error,
            }))
        })
    }
    
    return(
        <View style={[style.comlevel_container, darkmode && {backgroundColor: '#1A1A1A'}]}>
            <StatusBar 
                barStyle={darkmode ? 'light-content' : 'dark-content'} 
                backgroundColor={darkmode ? '#1A1A1A' : '#F9FAFB'}/>
            <View style={style.comlevel_header}>
                <TouchableOpacity 
                    style={[style.comlevel_backbutton, darkmode && {backgroundColor: '#333333'}]} 
                    onPress={() => navigation.goBack()}>
                    <Ionicons 
                        name="arrow-back" 
                        size={20} 
                        color={darkmode ? '#FFFFFF' : '#111827'} />
                </TouchableOpacity>
                <View style={style.comlevel_headertitlecontainer}>
                    <Text style={[style.comlevel_headertitle, darkmode && {color: '#FFFFFF'}]}>
                        {currentCourse.title} Course
                    </Text>
                </View>
            </View>
            
            <View style={style.comlevel_content}>
                
                <Text style={[style.comlevel_question, darkmode && {color: '#FFFFFF'}]}>
                    How would you rate your {currentCourse.title} proficiency?
                </Text>
                
                <View style={style.levelselection}>
                    <TouchableOpacity 
                        style={[
                            style.leveloption,
                            comlevel === "Beginner" ? style.selectedlevel : {},
                            darkmode && {backgroundColor: '#262626', borderColor: comlevel === "Beginner" ? currentCourse.color : '#404040'} ]}
                        onPress={() => setComlevel("Beginner")}
                        activeOpacity={0.7}>
                        <View style={[
                            style.levelindicator, 
                            darkmode && {backgroundColor: '#333333'},
                            comlevel === "Beginner" ? {backgroundColor: currentCourse.color} : {}]}>
                            <Text style={[
                                style.levelnumber,
                                comlevel === "Beginner" ? {color: '#FFFFFF'} : {},
                                darkmode && comlevel !== "Beginner" ? {color: '#FFFFFF'} : {}]}>1</Text>
                        </View>
                        <View style={style.leveltextcontainer}>
                            <Text style={[
                                style.leveltitle,
                                darkmode && {color: '#FFFFFF'},
                                comlevel === "Beginner" ? {color: currentCourse.color} : {}
                            ]}>
                                Beginner
                            </Text>
                            <Text style={[
                                style.leveldescription,
                                darkmode && {color: '#A3A3A3'}]}>
                                Basic vocabulary and simple conversations
                            </Text>
                        </View>
                        {comlevel === "Beginner" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={style.checkicon} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            style.leveloption,
                            comlevel === "Intermediate" ? style.selectedlevel : {},
                            darkmode && {backgroundColor: '#262626', borderColor: comlevel === "Intermediate" ? currentCourse.color : '#404040'}
                        ]}
                        onPress={() => setComlevel("Intermediate")}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            style.levelindicator, 
                            darkmode && {backgroundColor: '#333333'} ,
                            comlevel === "Intermediate" ? {backgroundColor: currentCourse.color} : {}
                        ]}>
                            <Text style={[
                                style.levelnumber,
                                comlevel === "Intermediate" ? {color: '#FFFFFF'} : {},
                                darkmode && comlevel !== "Intermediate" ? {color: '#FFFFFF'} : {}
                            ]}>2</Text>
                        </View>
                        <View style={style.leveltextcontainer}>
                            <Text style={[
                                style.leveltitle,
                                darkmode && {color: '#FFFFFF'},
                                comlevel === "Intermediate" ? {color: currentCourse.color} : {}]}>
                                Intermediate
                            </Text>
                            <Text style={[
                                style.leveldescription,
                                darkmode && {color: '#A3A3A3'}]}>
                                Comfortable with everyday conversations
                            </Text>
                        </View>
                        {comlevel === "Intermediate" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={style.checkicon} />
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            style.leveloption,
                            comlevel === "Advanced" ? style.selectedLevel : {},
                            darkmode && {backgroundColor: '#262626', borderColor: comlevel === "Advanced" ? currentCourse.color : '#404040'}]}
                        onPress={() => setComlevel("Advanced")}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            style.levelindicator, 
                            darkmode && {backgroundColor: '#333333'},
                            comlevel === "Advanced" ? {backgroundColor: currentCourse.color} : {}
                        ]}>
                            <Text style={[
                                style.levelnumber,
                                comlevel === "Advanced" ? {color: '#FFFFFF'} : {},
                                darkmode && comlevel !== "Advanced" ? {color: '#FFFFFF'} : {}
                            ]}>3</Text>
                        </View>
                        <View style={style.leveltextcontainer}>
                            <Text style={[
                                style.leveltitle,
                                darkmode && {color: '#FFFFFF'},
                                comlevel === "Advanced" ? {color: currentCourse.color} : {}]}>
                                Advanced
                            </Text>
                            <Text style={[
                                style.leveldescription,
                                darkmode && {color: '#A3A3A3'}]}>
                                Fluent discussions on complex topics
                            </Text>
                        </View>
                        {comlevel === "Advanced" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={style.checkicon} />
                        )}
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                    style={[
                        style.comnextbutton,
                        !comlevel ? style.comdisabledbutton : {},
                        {backgroundColor: currentCourse.color}]}
                    onPress={() => comlevel && handleNext()}
                    disabled={!comlevel || loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <>
                            <Text style={style.comnextbuttontext}>Continue</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{marginLeft: 6}} />
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}
