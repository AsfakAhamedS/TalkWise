import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'
import axios from 'axios'
import { Buffer } from 'buffer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Ionicons } from '@expo/vector-icons'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserChat() {
    const navigation = useNavigation()
    const route = useRoute()
    const {level, topic} = route.params || {} 
    const [username,setUsername] = useState('')
    const [recording, setRecording] = useState(null)
    const [recordedUri, setRecordedUri] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [sound, setSound] = useState(null)
    const [useremail, setUseremail] = useState('')
    const [conversationStep, setConversationStep] = useState(1)
    const [section, setSection] = useState('')
    const [syetemprompt, setSystempromt] = useState('')
    const [userText, setUserText] = useState('')
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const flatListRef = useRef(null)
    
    console.log(level)
    useEffect(() => {
        (async () => {
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail(uemail)
        })()
    }, [])
    
    useEffect(() => {
        if (useremail) {
            console.log("avatar trigged")
            avatar()
        }
    }, [useremail])

    function avatar() {
        axios.post(url + "get-user-avatar", { type:'getuserdata', useremail: useremail })
        .then(response => {
            if (response.status == 200) {
                setSection(response?.data?.level)
                setUsername(response?.data?.name)
            }
        })
        .catch(error => {
            console.log("error ==> ", error.response?.data || "error")
        })
    }

    const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).slice(2, 7)

    useEffect(() => {
        if (!section || !conversationStep) return
    
        const fetchNextQuestion = async () => {
            try {
                const response = await axios.post(`${url}nextStep`, {
                    email: useremail,
                    section: section,
                    level: level,
                    step: conversationStep
                })
    
                if (response.status === 200) {
                    const { aiPrompt, status } = response.data
    
                    const newMessage = {
                        id: generateUniqueId(),
                        text: aiPrompt.ai_prompt || aiPrompt,
                        type: 'bot',
                        sender: 'AI',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
    
                    // Only add if last message isn't the same (avoid duplicates).
                    setMessages(prev => {
                        const last = prev[prev.length - 1]
                        if (!last || last.text !== newMessage.text) {
                            return [...prev, newMessage]
                        }
                        return prev
                    })
    
                    updateServerWithMessage(newMessage)
    
                    if (status === "completed") {
                        setTimeout(() => {
                            navigation.navigate("quiz", { levels: level })
                        }, 3000)
                    }
                }
    
            } catch (error) {
                console.error('Error fetching next question:', error)
            }
        }
    
        fetchNextQuestion()
    
    }, [section, conversationStep])
    
    

    // Function to send a single message to the server
    const updateServerWithMessage = async (message) => {
        if (!useremail) return
        
        try {
            await axios.post(`${url}update-progress`, {
                userEmail: useremail,
                userName: username,
                section: section || 'general',
                level: level || 'beginner',
                topic: topic || 'conversation',
                step: conversationStep || 1,
                messages: [message] // Send just the new message
            })
        } catch (error) {
            console.error('Error updating message on server:', error.response?.status || error.message)
        }
    }

    async function handleUserResponse(userInput) {
        if (!userInput.trim()) return
        setLoading(true)
        try {
            const response = await axios.post(`${url}lesson`, {
                question: syetemprompt.ai_prompt,
                expectedans: syetemprompt.expected_responses,
                correctans: syetemprompt.correct_response,
                wrongans: syetemprompt.fallback_response,
                user: userInput, 
            })
            if (response.status === 200) {
                const { aiPrompt, aiResponse } = response.data
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                
                // Create new message objects with unique IDs
                const userMessage = {
                    id: generateUniqueId(),
                    text: aiPrompt,
                    type: 'user',
                    sender: 'You',
                    time: currentTime,
                }
                
                const botMessage = {
                    id: generateUniqueId(),
                    text: aiResponse,
                    type: 'bot',
                    sender: 'AI',
                    time: currentTime,
                }
                
                // Update messages state directly
                setMessages(prevMessages => [...prevMessages, userMessage, botMessage])
                
                // Send each message to server separately
                await updateServerWithMessage(userMessage)
                await updateServerWithMessage(botMessage)
                
                setConversationStep(conversationStep + 1)
                setUserText('')
            }
        } catch (error) {
            console.error('Error handling user response:', error)
        } finally {
            setLoading(false)
        }
    }

    async function startRecording() {
        try {
            const { status } = await Audio.requestPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access microphone is required!')
                return
            }
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            setRecording(recording)
        } catch (err) {
            console.error('Failed to start recording:', err)
        }
    }

    async function stopRecording() {
        if (!recording) return
        await recording.stopAndUnloadAsync()
        const uri = recording.getURI()
        setRecording(null)
        setRecordedUri(uri)
        uploadRecording(uri)
    }

    async function playAudio(uri) {
        if (sound) {
          await sound.unloadAsync()
          setSound(null)
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri })
        setSound(newSound)
        await newSound.playAsync()
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            newSound.unloadAsync()
            setCurrentlyPlayingId(null)
            setIsPlaying(false)
          }
        })
    }
      
    async function uploadRecording(uri) {
        setLoading(true)
        const formData = new FormData()
        formData.append('audioFile', {
            uri,
            type: 'audio/m4a',
            name: 'voice_message.m4a',
        })
        const userEmail = await AsyncStorage.getItem('Email')

        try {
            const response = await axios.post(`${url}chat`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: { userEmail },
            })
            if (response.status === 200) {
                const { transcription } = response.data
                try {
                    const response = await axios.post(`${url}lesson`, {
                        question: syetemprompt.ai_prompt,
                        expectedans: syetemprompt.expected_responses,
                        correctans: syetemprompt.correct_response,
                        wrongans: syetemprompt.fallback_response,
                        user: transcription,
                    })
                    if (response.status === 200) {
                        const { aiPrompt, aiResponse } = response.data
                        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        
                        // Create new message objects with unique IDs
                        const userMessage = {
                            id: generateUniqueId(),
                            uri,
                            text: aiPrompt,
                            type: 'user',
                            sender: 'You',
                            time: currentTime,
                        }
                        
                        const botMessage = {
                            id: generateUniqueId(),
                            text: aiResponse,
                            type: 'bot',
                            sender: 'AI',
                            time: currentTime,
                        }
                        
                        // Update messages state directly
                        setMessages(prevMessages => [...prevMessages, userMessage, botMessage])
                        
                        // Send each message to server separately
                        await updateServerWithMessage(userMessage)
                        await updateServerWithMessage(botMessage)
                        
                        setConversationStep(conversationStep + 1)
                    }
                } catch (error) {
                    console.error('Error handling user response:', error)
                } finally {
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error('Upload error:', error)
            
            const errorMessage = {
                id: generateUniqueId(),
                text: 'Error occurred, please try again.',
                type: 'bot',
                sender: 'AI',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            
            setMessages(prevMessages => [...prevMessages, errorMessage])
            
        } finally {
            setRecordedUri(null)
            setLoading(false)
        }
    }

   
useEffect(() => {
    const fetchChatHistory = async () => {
        if (!useremail) return

        try {
            const response = await axios.post(`${url}update-progress`, {
                userEmail: useremail
            })

            const chatHistory = response.data.chatHistory || []
            const lastStep = response.data.lastStep || 1
            
            // Set the section from server response
            if (response.data.lastSection) {
                setSection(response.data.lastSection)
            }

            if (chatHistory.length > 0) {
                const uniqueMessages = chatHistory.map(msg => ({
                    ...msg,
                    id: msg.id || generateUniqueId()
                }))

                setMessages(uniqueMessages)

                // Check if the last message was from AI or user to determine next step
                const lastMessage = chatHistory[chatHistory.length - 1]
                
                if (lastMessage.sender === 'You') {
                    // If user replied last, set conversation step to continue with AI's next question
                    setConversationStep(lastStep + 1)
                } else {
                    // If AI spoke last, keep same step as user still needs to respond
                    setConversationStep(lastStep)
                }
            } else {
                // No history, start fresh
                setConversationStep(1)
            }

        } catch (error) {
            console.error('Error fetching chat history:', error)
        }
    }

    fetchChatHistory()
}, [useremail])
    
    
    
    
    async function fetchAndPlayAudio(text, messageId) {
        let soundObject
    
        try {
            if (sound) {
                await sound.unloadAsync()
                setSound(null)
                setCurrentlyPlayingId(null)
                setIsPlaying(false)
            }
    
            const response = await axios.post(`${url}txt-speech`, { text }, {
                responseType: 'arraybuffer',
            })
    
            const audioData = response.data
            const base64Audio = `data:audio/mpeg;base64,${Buffer.from(audioData, 'binary').toString('base64')}`
    
            soundObject = new Audio.Sound()
            await soundObject.loadAsync({ uri: base64Audio })
            setSound(soundObject)
            setCurrentlyPlayingId(messageId)  
            setIsPlaying(true)
            console.log("Playing audio...")
            await soundObject.playAsync()
    
            soundObject.setOnPlaybackStatusUpdate(async (status) => {
                if (status.didJustFinish) {
                    console.log("Audio finished, unloading...")
                    await soundObject.unloadAsync()
                    setCurrentlyPlayingId(null)
                    setIsPlaying(false)
                }
            })
        } catch (error) {
            console.error("Error playing audio:", error)
            if (soundObject) {
                await soundObject.unloadAsync()
            }
            setCurrentlyPlayingId(null)
            setIsPlaying(false)
        }
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons 
                        name="arrow-back" 
                        size={20} 
                        color= '#111827' 
                    />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>
                        Chat
                    </Text>
                </View>
            </View>
            <FlatList
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 6, alignSelf: item.type === 'user' ? 'flex-end' : 'flex-start' }}>
                        <Text style={styles.senderName}>{item.sender}</Text>
                        <View style={[styles.messageCard, item.type === 'user' ? styles.userMessage : styles.botMessage]}>
                            {item.uri ? (
                                <>
                                <View style={styles.audioMessage}>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            if (currentlyPlayingId === item.id && isPlaying) {
                                            await sound?.pauseAsync()
                                            setIsPlaying(false)
                                            } else {
                                            setCurrentlyPlayingId(item.id)

                                            if (sound) {
                                                await sound.unloadAsync()
                                                setSound(null)
                                            }

                                            try {
                                                const { sound: newSound } = await Audio.Sound.createAsync({ uri: item.uri })
                                                setSound(newSound)

                                                await newSound.playAsync()
                                                setIsPlaying(true)

                                                newSound.setOnPlaybackStatusUpdate((status) => {
                                                if (status.didJustFinish) {
                                                    newSound.unloadAsync()
                                                    setIsPlaying(false)
                                                    setCurrentlyPlayingId(null)
                                                }
                                                })
                                            } catch (error) {
                                                console.log('Audio playback error:', error)
                                                setIsPlaying(false)
                                                setCurrentlyPlayingId(null)
                                            }
                                            }
                                        }}
                                        style={styles.playButton}
                                        >
                                        {currentlyPlayingId === item.id && isPlaying ? (
                                            <AntDesign name="pause" color="#fff" size={18} />
                                        ) : (
                                            <Feather name="play" size={18} color="#fff" style={{ position: 'relative', left: 2 }} />
                                        )}
                                    </TouchableOpacity>

                                    <Text style={styles.recordedText}>Recorded Voice</Text>
                                </View>

                                <Text style={[styles.messageText,{marginTop:20}]}>{item.text}</Text>
                                </>
                            ) : (
                                <Text style={styles.messageText}>{item.text}</Text>
                            )}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop:10 }}>
                                {item.type === "bot" && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (currentlyPlayingId === item.id && isPlaying) {
                                            sound?.pauseAsync()
                                            setIsPlaying(false)
                                            } else {
                                            fetchAndPlayAudio(item.text, item.id)
                                            }
                                        }}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            width: 20,
                                            height: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 8,
                                        }}
                                        >
                                        {currentlyPlayingId === item.id && isPlaying ? (
                                            <Foundation name="pause" color="#000" size={14} />
                                        ) : (
                                            <Fontisto name="play" color="#000" size={8} style={{ position: 'relative', left: 1 }} />
                                        )}
                                    </TouchableOpacity>
                                )}

                                <Text style={styles.timestamp}>{item.time}</Text>
                            </View>
                        </View>
                    </View>
                )}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
            <View style={styles.inputWrapper}>
                <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.micButton}>
                    <Feather name={recording ? 'square' : 'mic'} size={20} color="#fff" />
                </TouchableOpacity>

                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    placeholderTextColor="#aaa"
                    value={userText}
                    onChangeText={setUserText}
                    editable={!loading}
                />

                <TouchableOpacity onPress={() => handleUserResponse(userText)} disabled={loading} style={styles.sendButton}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <MaterialIcons name="send" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical:25,
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
    messageCard: {
        paddingVertical:12,
        paddingHorizontal:20,
        marginVertical: 6,
        borderRadius: 12,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#dff9fb',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#f1f2f6',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        lineHeight:24,
        color: '#2d3436',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 10,
        width: '100%',
        gap: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2d3436',
    },
    micButton: {
        backgroundColor: '#4F46E5',
        padding: 10,
        borderRadius: 25,
    },
    senderName: {
        fontSize: 12,
        color: '#636e72',
        marginBottom: 2,
        paddingLeft: 5,
    },
    timestamp: {
        fontSize: 11,
        color: '#b2bec3',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    sendButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 25,
    },
    senderLabel: {
        fontSize: 12,
        color: '#636e72',
        marginBottom: 4,
    },
    audioMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    playButton: {
        backgroundColor: '#0984e3',
        padding: 8,
        borderRadius: 20,
    },
    recordedText: {
        fontSize: 15,
        color: '#2d3436',
        flexShrink: 1,
    },
})