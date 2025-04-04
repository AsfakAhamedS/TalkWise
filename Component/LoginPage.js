import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function LoginPage() {
    const navigation = useNavigation()
    const [show, setShow] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        AsyncStorage.setItem('Email', email)
        .then(() => console.log("Email stored"))
        .catch(err => console.error("Email error:", err))
        console.log("email ===>",await AsyncStorage.getItem('Email'))
        console.log("url ===>",url)
        axios.post(url + 'user-login', { useremail: email, userpsd: password })
        .then(response => {
            if (response.status === 200) {
                AsyncStorage.setItem('Token', response.data.token)
                .then(() => {
                    // console.log(response.data.message)
                    Toast.show(style.success({
                        text1: response?.data?.message,
                        text2: 'Welcome back!',
                    }))
                    setTimeout(() => navigation.navigate('main'), 1500)
                })
                .catch(err => console.error("Token error:", err))
            }
        })
        .catch(error => {
            Toast.show(style.error({
                text1: 'Login Failed',
                text2: error.response?.data?.error || 'Invalid email or password!',
            }))
        })
    }

    return (
        <View style={style.body}>
            <View style={style.login_hero_img}>
                <Image source={require('../assets/loginpage/loginimg.png')} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={style.login_signup_head}>Welcome Back!</Text>
                <View style={style.inputcontainer}>
                    <Feather name="user" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your email address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={style.inputcontainer}>
                    <Octicons name="lock" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={show}
                    />
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={22} style={style.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('forget')}>
                    <Text style={style.log_forget_btn}>Forget password?</Text>
                </TouchableOpacity>
                
                <View style={style.login_btn}>
                    <TouchableOpacity style={style.login_btn_to} activeOpacity={0.4} onPress={handleLogin}>
                        <Text style={style.login_btn_text}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.log_signup}>
                    <Text style={style.log_signup_text}>
                        Don't have an account?
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text style={style.log_signup_btn}> Sign up</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
            <Toast />
        </View>
    )
}
           