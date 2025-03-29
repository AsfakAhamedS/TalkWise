import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useRef } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function ForgetPage() {
    const navigation = useNavigation()
    const [select,setSelect] = useState(true)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputref = useRef([])
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    function handleChange(text, index){
        if (text.length > 1) return
        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)

        if (text && index < 5) {
        inputref.current[index + 1].focus()
        }
    }
    function handleKeyPress(e, index){
        if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
        if (index > 0) {
            inputref.current[index - 1].focus()
        }
        }
    }

    function validateEmail(email){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(email)
    }

    function generateOTP(){
        if(!email){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your email',
            })
            return
        }
        if(!validateEmail(email)){
            Toast.show(style.error({
                text1: 'Invalid Email',
                text2: 'Enter a valid email',
            }))
            return
        }
        console.log("url",url)
        axios.post(url+'forget-password', { useremail: email })
            .then(response => {
                if (response.status === 200) {
                    AsyncStorage.setItem('OTP', response.data.otp)
                        .then(() => {
                            Toast.show(style.success({
                                text1: response?.data?.message,
                                text2: 'Check your email for the OTP',
                            }))
                        })
                        .catch(err => console.error("AsyncStorage error:", err))
                }
            })
            .catch(error => {
                Toast.show(style.error({
                    text1: error.response?.data?.error,
                    text2: 'Failed to send OTP',
                }))
                // console.error("OTP Error:", error)
            })
    }

    async function verifyOTP(){
        console.log('works otp')
        const storedOtp = await AsyncStorage.getItem('OTP')
        console.log(storedOtp)
        const enteredOtp = otp.join('') 
        if (enteredOtp === storedOtp) {
            Toast.show(style.success({
                text1: 'OTP Verified',
                text2: 'Proceed to reset your password',
            }))
            setTimeout(() => setSelect(!select), 1500)
        } else {
            Toast.show(style.error({
                text1: 'Invalid OTP',
                text2: 'Please try again',
            }))
        }
    }

    function validatePassword(password){
        const passwordRegex = /^.{6,}$/ 
        return passwordRegex.test(password)
    }

    function handleSubmit(){
        if (!validatePassword(password)) {
            Toast.show(style.error({
                text1: 'Invalid Password',
                text2: 'Password must be at least 6 characters long',
            }))
            return
        }
        if (password !== confirmpassword) {
            Toast.show(style.error({
                text1: 'Passwords do not match',
                text2: 'Please enter the same password in both fields',
            }))
            return
        }
        axios.post(url+'password-change', { useremail: email, usernewpsd: password })
            .then(response => {
                if (response.status === 200) {
                    Toast.show(style.success({
                        text1: response?.data?.message,
                        text2: 'You can now log in with your new password',
                    }))
                    setTimeout(() => navigation.navigate('login'), 1500)
                }
            })
            .catch(error => {
                Toast.show(style.error({
                    text1: 'Update Failed',
                    text2: error.response?.data?.error || 'Something went wrong!',
                }))
            })
    }


    return(
        <View style={style.body}>
            <View style={{flex:1}}>
                <View>
                    <Text style={style.forget_head}>Forget Password</Text>
                </View>
                {select ? (
                    <View>
                        <View>
                            <Text style={style.forget_label} >Email</Text>
                        </View>
                        <View style={style.forget_inputcontainer}>
                            <Feather name="user" color="#000" size={20} style={{ marginLeft: 10, color: '#bababa' }}/>
                            <TextInput
                                style={style.forget_input} 
                                placeholder='Enter your email'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity 
                                onPress={generateOTP}
                                style={style.forget_code}>
                                <Text style={{ color: '#000', fontWeight: 'bold' }}>GET CODE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.otpcontainer}>
                            {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputref.current[index] = ref)}
                                style={style.otpInput}
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="numeric"
                            />
                            ))}
                        </View>
                        <View style={style.forget_btn}>
                            <TouchableOpacity 
                                style={style.forget_btn_to}
                                activeOpacity={0.7}
                                // onPress={verifyOTP}
                                onPress={() => setSelect(!select)}
                            >
                                <Text style={style.forget_btn_text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View>
                            <Text style={style.forget_label} >Password</Text>
                        </View>
                        <View style={style.forget_inputcontainer}>
                            <Octicons name="lock" size={20} style={{ marginLeft: 10, color: '#bababa' }} />
                            <TextInput
                                style={style.forget_input} 
                                placeholder='Enter your email'
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}/>
                        </View>
                        <View>
                            <Text style={style.forget_label} >Confirm Password</Text>
                        </View>
                        <View style={style.forget_inputcontainer}>
                            <Octicons name="lock" size={20} style={{ marginLeft: 10, color: '#bababa' }}/>
                            <TextInput
                                style={style.forget_input} 
                                placeholder='Enter your email'
                                secureTextEntry
                                value={confirmpassword}
                                onChangeText={setConfirmpassword}/>
                        </View>
                        <View style={style.forget_btn_psd}>
                            <TouchableOpacity 
                                style={style.forget_btn_to}
                                activeOpacity={0.7}
                                onPress={handleSubmit}>
                                <Text style={style.forget_btn_text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <Toast/>
        </View>
    )
}