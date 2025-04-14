import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons' 
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function LessonPage() {
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('')
  const [level, setLevel] = useState('')
  const [lessonData, setLessonData] = useState([])
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
            console.error("Error retrieving email:", err)
            setError('Failed to load user data')
            setLoading(false)
        }
        }
        
        fetchUserData()
    }, [])

    const fetchUserAvatar = async (email) => {
        try {
        const response = await axios.post(`${url}get-user-avatar`, { 
            type: 'getuserdata', 
            useremail: email 
        })
        
        if (response.status === 200) {
            const userLevel = response?.data?.level
            await AsyncStorage.setItem('Section', userLevel)
            setLevel(userLevel)
            fetchLessons(userLevel)
        }
        } catch (error) {
        console.error("Avatar fetch error:", error.response?.data || error.message)
        setError('Failed to load user profile')
        setLoading(false)
        }
    }

    const fetchLessons = async (sectionLevel) => {
        try {
        setLoading(true)
        const response = await axios.post(`${url}get-lesson`, { 
            section: sectionLevel 
        })
        
        if (response.status === 200) {
            setLessonData(response?.data?.levels || [])
        }
        } catch (error) {
        console.error("Lesson fetch error:", error.response?.data || error.message)
        setError('Failed to load lessons')
        } finally {
        setLoading(false)
        }
    }

    const navigateToLesson = (item) => {
        navigation.navigate('chat', { 
        level: item.level, 
        topic: item.title 
        })
    }

    if (loading) {
        return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={styles.loadingText}>Loading lessons...</Text>
        </View>
        )
    }

    if (error) {
        return (
        <View style={styles.centerContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchUserAvatar(userEmail)}
            >
            <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
        </View>
        )
    }

  return (
    <View style={styles.container}>
         <StatusBar 
            barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'} 
            backgroundColor={theme === 'Dark' ? '#1A1A1A' : '#F9FAFB'}
        />
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
                    {level} Level
                </Text>
            </View>
        </View>
        <FlatList
            data={lessonData}
            keyExtractor={(item) => item.level.toString()}
            renderItem={({ item }) => (
                <View style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                    <Text style={styles.lessonLevel}>Level {item.level}</Text>
                    <Text style={styles.lessonTitle}>{item.title}</Text>
                </View>
                <Text style={styles.lessonDescription}>{item.description}</Text>
                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => navigateToLesson(item)}
                >
                    <Text style={styles.buttonText}>Start Lesson</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Ionicons name="book-outline" size={64} color="#BDBDBD" />
                <Text style={styles.emptyText}>No lessons available</Text>
            </View>
            }
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingVertical:20
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    listContainer: {
        padding: 16,
    },
    lessonCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    lessonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    lessonLevel: {
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3B82F6',
        marginRight: 8,
    },
    lessonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        flex: 1,
    },
    lessonDescription: {
        fontSize: 15,
        color: '#757575',
        marginBottom: 16,
        lineHeight: 22,
    },
    startButton: {
        backgroundColor: '#4F46E5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginRight: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#757575',
    },
    errorText: {
        marginTop: 16,
        fontSize: 16,
        color: '#F44336',
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#F44336',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})