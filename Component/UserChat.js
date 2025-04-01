import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../style';

const url = process.env.EXPO_PUBLIC_API_URL || '';

export default function UserChat() {
    const navigation = useNavigation();
    const route = useRoute();
    const [recording, setRecording] = useState(null);
    const [recordedUri, setRecordedUri] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sound, setSound] = useState(null);
    const [conversationStep, setConversationStep] = useState(1); // Track current conversation step
    const [lessonTitle, setLessonTitle] = useState('');
    const [messageQueue, setMessageQueue] = useState([]); // Queue for messages

    // Extract 'lessonTitle' from route params
    useEffect(() => {
        if (route.params?.lessonTitle) {
            setLessonTitle(route.params.lessonTitle);
            navigation.setOptions({
                title: route.params.lessonTitle,
            });
        }
    }, [route.params?.lessonTitle]);

    // Fetch the first conversation step when the component loads
    useEffect(() => {
        async function fetchFirstConversationStep() {
            try {
                const response = await axios.get(`${url}nextStep`, {
                    params: { lessonTitle, currentStep: conversationStep },
                });
                if (response.status === 200) {
                    const { aiPrompt } = response.data;
                    setMessageQueue([
                        { id: 1, text: aiPrompt, type: 'bot' },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching first conversation step:', error);
            }
        }

        if (lessonTitle) {
            fetchFirstConversationStep();
        }
    }, [lessonTitle, conversationStep]);

    // Handle user response (sending recorded message)
    async function handleUserResponse(userInput) {
        try {
            const response = await axios.post(`${url}lesson`, {
                section: 'Beginner', // You can replace this based on the lesson section
                level: 1, // Adjust level dynamically
                userInput,
            });

            if (response.status === 200) {
                const { aiPrompt, aiResponse } = response.data;

                // Add both user and AI messages to the message queue
                setMessageQueue((prevMessages) => [
                    ...prevMessages,
                    { id: prevMessages.length + 1, text: userInput, type: 'user' },
                    { id: prevMessages.length + 2, text: aiResponse, type: 'bot' },
                ]);
                setConversationStep(conversationStep + 1); // Move to next conversation step
            }
        } catch (error) {
            console.error('Error handling user response:', error);
        }
    }

    // Start Recording
    async function startRecording() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access microphone is required!');
                return;
            }
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    }

    // Stop Recording and Store URI
    async function stopRecording() {
        if (!recording) return;
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setRecordedUri(uri);

        // Add message to message queue
        setMessageQueue([
            ...messageQueue,
            { id: messageQueue.length + 1, text: 'Recorded message', uri, type: 'user' },
        ]);
    }

    // Play Recorded Audio
    async function playAudio(uri) {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
    }

    // Upload Recorded Message to Server
    async function uploadRecording() {
        if (!recordedUri) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('audioFile', {
            uri: recordedUri,
            type: 'audio/m4a',
            name: 'voice_message.m4a',
        });

        const userEmail = await AsyncStorage.getItem('Email');

        try {
            const response = await axios.post(`${url}chat`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: { userEmail },
            });

            if (response.status === 200) {
                const { transcription, aiResponse } = response.data;

                // Add the AI response to the message queue
                setMessageQueue([
                    ...messageQueue,
                    { id: messageQueue.length + 1, text: transcription, type: 'user' },
                    { id: messageQueue.length + 2, text: aiResponse, type: 'bot' },
                ]);

                setRecordedUri(null); // ✅ Clear recorded file after sending
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessageQueue([
                ...messageQueue,
                { id: messageQueue.length + 1, text: 'Error occurred, please try again.', type: 'bot' },
            ]);
        } finally {
            setLoading(false);
        }
    }

    // Update messages from message queue to messages state
    useEffect(() => {
        if (messageQueue.length > 0) {
            setMessages(messageQueue);
        }
    }, [messageQueue]);

    return (
        <View style={style.home_body}>
            <Text style={style.pageTitle}>Chat</Text>

            {/* Display Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[style.messageCard, item.type === 'user' ? style.userMessage : style.botMessage]}>
                        <Text style={style.messageText}>{item.text}</Text>
                        {item.uri && (
                            <TouchableOpacity style={style.playButton} onPress={() => playAudio(item.uri)}>
                                <Text style={style.buttonText}>▶ Play</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            {/* Record, Play, and Send Controls */}
            <View style={style.chatControls}>
                <TouchableOpacity style={style.recordButton} onPress={recording ? stopRecording : startRecording}>
                    <Text style={style.buttonText}>{recording ? 'Stop' : 'Record'}</Text>
                </TouchableOpacity>

                {recordedUri && (
                    <>
                        <TouchableOpacity style={style.playButton} onPress={() => playAudio(recordedUri)}>
                            <Text style={style.buttonText}>▶ Play</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.sendButton} onPress={uploadRecording}>
                            <Text style={style.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </>
                )}

                {loading && <ActivityIndicator size="large" color="#3498db" />}
            </View>

            {/* Conversation Step Button (for demo purposes) */}
            <TouchableOpacity onPress={() => handleUserResponse('user reply')}>
                <Text>Next Step</Text>
            </TouchableOpacity>
        </View>
    );
}
