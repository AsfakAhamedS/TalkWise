import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import Checkbox from 'expo-checkbox'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function SignupPage() {
    const navigation = useNavigation()
    const [show, setShow] = useState(true)
    const [conshow, setConshow] = useState(true)
    const [checked, setChecked] = useState(false)
    const  [formdata, setFormdata] = useState({email:'',phone:'',password:'',confirmPassword: ''})
    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState(true)

    const handleInputChange = (name, value) => {
        let errorText = ''
        const patterns = {
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            phone: /^\d{10}$/, 
            password: /^.{6,}$/
        }

        if (patterns[name]) {
            errorText = value.length > 0 && !patterns[name].test(value) ? `${name} is invalid` : ''
        }

        if (name === 'confirmPassword') {
            errorText = value !== formdata.password ? 'Passwords do not match' : ''
        }

        setErrors((prev) => ({ ...prev, [name]: errorText }))
        setFormdata((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        const allfieldsvalid = Object.values(formdata).every((value) => value.length > 0) &&
        Object.values(errors).every((err) => err === '')
        setDisable(!allfieldsvalid)
    }, [formdata, errors])

    function handleSubmit(){
        AsyncStorage.setItem('Email', formdata.email)
        .then(() => console.log("Email stored"))
        .catch(err => console.error("Email error:", err))
        axios.post(url+'user-create-account', { useremail:formdata.email, userphoneno:formdata.phone, userpsd:formdata.password })
            .then(response => {
                if (response.status === 200) {
                    AsyncStorage.setItem('Token', response.data.token)
                    .then(() => {
                        console.log(response.data.token)
                        Toast.show(style.success({
                            text1: response?.data?.message,
                            text2: 'You can now log in with your new password',
                        }))
                        setTimeout(() => navigation.navigate('username'), 2000)
                    })
                    .catch(err => console.error("Token error:", err))
                }
            })
            .catch(error => {
                Toast.show(style.error({
                    text1: 'Signup Failed',
                    text2: error.response?.data?.error,
                }))
            })
    }

    return (
        <View style={style.signup_body}>
             <View style={{ flex: 3 }}>
                <View style={style.signup_header}>
                  <Text style={style.signup_headertitle}>Create Account</Text>
                  <Text style={style.signup_headersubtitle}>Join our community today</Text>
                </View>
                <View style={style.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={22} style={style.icon}/>
                    <TextInput
                        style={style.input}
                        placeholder="Enter your email address"
                        value={formdata.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                </View>
                {errors.email && <Text style={style.errorText}>{errors.email}</Text>}
                <View style={style.inputContainer}>
                    <SimpleLineIcons name="phone" color="#000" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your phone no"
                        keyboardType="numeric"
                        value={formdata.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                    />
                </View>
                {errors.phone && <Text style={style.errorText}>{errors.phone}</Text>}
                <View style={style.inputContainer}>
                    <Octicons name="lock" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your password"
                        value={formdata.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={show}
                    />
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={22} style={style.icon} />
                    </TouchableOpacity>
                </View>  
                {errors.password && <Text style={style.errorText}>{errors.password}</Text>}
                <View style={style.inputContainer}>
                    <Octicons name="lock" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your confirm password"
                        value={formdata.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry={conshow}
                    />
                    <TouchableOpacity onPress={() => setConshow(!conshow)}>
                        <Ionicons name={conshow ? "eye-off-outline" : "eye-outline"} size={22} style={style.icon} />
                    </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text style={style.errorText}>{errors.confirmPassword}</Text>}
                <View style={style.termsContainer}>
                    <Checkbox
                    style={style.checkbox}
                    value={checked}
                    onValueChange={setChecked}
                    disabled={disable}/>
                    <Text style={style.termsText}>I agree to the <Text style={style.termsLink}>Terms & Conditions</Text></Text>
                </View>
                <View style={style.signup_btn}>
                    <TouchableOpacity 
                        // onPress={() => navigation.navigate('userdetailpage')}
                        onPress={handleSubmit}
                        style={[style.signupButton, disable && style.disabledButton]} 
                        activeOpacity={0.6}
                        disabled = {disable}
                    >
                        <Text style={style.signupButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.loginPrompt}>
                  <Text style={style.loginPromptText}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={style.loginLink}>Log In</Text>
                  </TouchableOpacity>
                </View>
             </View>
             <Toast/>
        </View>
    )
}
           