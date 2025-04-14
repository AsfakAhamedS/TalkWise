import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserComLevelPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const [comlevel, setComlevel] = useState(null)
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState('')
    const courseId = route.params?.courseId || '1'
    
    // Course details based on ID
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

    // useEffect(() => {
    //     if (comlevel !== null) {
    //         handleNext()
    //     }
    // }, [comlevel])
    
    async function handleNext() {
        setLoading(true)
        console.log("url ===>", url)
        const email = await AsyncStorage.getItem('Email')
        console.log(email)
        
        axios.post(url + 'get-user-details', { 
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
        <View style={[styles.container, theme === 'Dark' ? {backgroundColor: '#1A1A1A'} : {}]}>
            <StatusBar 
                barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'} 
                backgroundColor={theme === 'Dark' ? '#1A1A1A' : '#F9FAFB'}
            />
            
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={[styles.backButton, theme === 'Dark' ? {backgroundColor: '#333333'} : {}]} 
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons 
                        name="arrow-back" 
                        size={20} 
                        color={theme === 'Dark' ? '#FFFFFF' : '#111827'} 
                    />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, theme === 'Dark' ? {color: '#FFFFFF'} : {}]}>
                        {currentCourse.title} Course
                    </Text>
                </View>
            </View>
            
            {/* Main Content */}
            <View style={styles.content}>
                <View
                    style={[styles.levelBanner, {backgroundColor: currentCourse.color}]}
                >
                    <MaterialCommunityIcons 
                        name="chart-timeline-variant"
                        size={40}
                        color="#FFFFFF"
                    />
                    <Text style={styles.bannerText}>Choose Your Level</Text>
                </View>
                
                <Text style={[styles.question, theme === 'Dark' ? {color: '#FFFFFF'} : {}]}>
                    How would you rate your {currentCourse.title} proficiency?
                </Text>
                
                <View style={styles.levelSelection}>
                    <TouchableOpacity 
                        style={[
                            styles.levelOption,
                            comlevel === "Beginner" ? styles.selectedLevel : {},
                            theme === 'Dark' ? {backgroundColor: '#262626', borderColor: comlevel === "Beginner" ? currentCourse.color : '#404040'} : {}
                        ]}
                        onPress={() => setComlevel("Beginner")}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            styles.levelIndicator, 
                            theme === 'Dark' ? {backgroundColor: '#333333'} : {},
                            comlevel === "Beginner" ? {backgroundColor: currentCourse.color} : {}
                        ]}>
                            <Text style={[
                                styles.levelNumber,
                                comlevel === "Beginner" ? {color: '#FFFFFF'} : {},
                                theme === 'Dark' && comlevel !== "Beginner" ? {color: '#FFFFFF'} : {}
                            ]}>1</Text>
                        </View>
                        <View style={styles.levelTextContainer}>
                            <Text style={[
                                styles.levelTitle,
                                theme === 'Dark' ? {color: '#FFFFFF'} : {},
                                comlevel === "Beginner" ? {color: currentCourse.color} : {}
                            ]}>
                                Beginner
                            </Text>
                            <Text style={[
                                styles.levelDescription,
                                theme === 'Dark' ? {color: '#A3A3A3'} : {}
                            ]}>
                                Basic vocabulary and simple conversations
                            </Text>
                        </View>
                        {comlevel === "Beginner" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.levelOption,
                            comlevel === "Intermediate" ? styles.selectedLevel : {},
                            theme === 'Dark' ? {backgroundColor: '#262626', borderColor: comlevel === "Intermediate" ? currentCourse.color : '#404040'} : {}
                        ]}
                        onPress={() => setComlevel("Intermediate")}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            styles.levelIndicator, 
                            theme === 'Dark' ? {backgroundColor: '#333333'} : {},
                            comlevel === "Intermediate" ? {backgroundColor: currentCourse.color} : {}
                        ]}>
                            <Text style={[
                                styles.levelNumber,
                                comlevel === "Intermediate" ? {color: '#FFFFFF'} : {},
                                theme === 'Dark' && comlevel !== "Intermediate" ? {color: '#FFFFFF'} : {}
                            ]}>2</Text>
                        </View>
                        <View style={styles.levelTextContainer}>
                            <Text style={[
                                styles.levelTitle,
                                theme === 'Dark' ? {color: '#FFFFFF'} : {},
                                comlevel === "Intermediate" ? {color: currentCourse.color} : {}
                            ]}>
                                Intermediate
                            </Text>
                            <Text style={[
                                styles.levelDescription,
                                theme === 'Dark' ? {color: '#A3A3A3'} : {}
                            ]}>
                                Comfortable with everyday conversations
                            </Text>
                        </View>
                        {comlevel === "Intermediate" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.levelOption,
                            comlevel === "Advanced" ? styles.selectedLevel : {},
                            theme === 'Dark' ? {backgroundColor: '#262626', borderColor: comlevel === "Advanced" ? currentCourse.color : '#404040'} : {}
                        ]}
                        onPress={() => setComlevel("Advanced")}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            styles.levelIndicator, 
                            theme === 'Dark' ? {backgroundColor: '#333333'} : {},
                            comlevel === "Advanced" ? {backgroundColor: currentCourse.color} : {}
                        ]}>
                            <Text style={[
                                styles.levelNumber,
                                comlevel === "Advanced" ? {color: '#FFFFFF'} : {},
                                theme === 'Dark' && comlevel !== "Advanced" ? {color: '#FFFFFF'} : {}
                            ]}>3</Text>
                        </View>
                        <View style={styles.levelTextContainer}>
                            <Text style={[
                                styles.levelTitle,
                                theme === 'Dark' ? {color: '#FFFFFF'} : {},
                                comlevel === "Advanced" ? {color: currentCourse.color} : {}
                            ]}>
                                Advanced
                            </Text>
                            <Text style={[
                                styles.levelDescription,
                                theme === 'Dark' ? {color: '#A3A3A3'} : {}
                            ]}>
                                Fluent discussions on complex topics
                            </Text>
                        </View>
                        {comlevel === "Advanced" && (
                            <Ionicons name="checkmark-circle" size={24} color={currentCourse.color} style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !comlevel ? styles.disabledButton : {},
                        {backgroundColor: currentCourse.color}
                    ]}
                    onPress={() => comlevel && handleNext()}
                    disabled={!comlevel || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <>
                            <Text style={styles.nextButtonText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{marginLeft: 6}} />
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingVertical:20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    levelBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 12,
        marginBottom: 24,
        backgroundColor: '#4F46E5',
    },
    bannerText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 12,
    },
    question: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 24,
        textAlign: 'center',
    },
    levelSelection: {
        marginBottom: 30,
    },
    levelOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedLevel: {
        borderColor: '#4F46E5',
        borderWidth: 2,
    },
    levelIndicator: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    levelNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4B5563',
    },
    levelTextContainer: {
        flex: 1,
    },
    levelTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    levelDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    checkIcon: {
        marginLeft: 8,
    },
    nextButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F46E5',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 'auto',
        marginBottom: 20,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.6,
    }
});