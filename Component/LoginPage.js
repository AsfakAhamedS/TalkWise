import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, Platform, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import style from  '../style'
const API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export default function LoginPage(){
  const navigation = useNavigation()
  const [psdvisible, setPsdvisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formdata, setFormdata] = useState({email: '',password: ''})
  const [errors, setErrors] = useState({email: '',password: ''})

  function validateForm(){
    let valid = true
    const newerrors = { email: '', password: '' }

    if (!formdata.email.trim()) {
      newerrors.email = 'Email is required'
      valid = false
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formdata.email)) {
      newerrors.email = 'Please enter a valid email address'
      valid = false
    }
    if (!formdata.password) {
      newerrors.password = 'Password is required'
      valid = false
    }
    setErrors(newerrors)
    return valid
  }

  function handleInputChange(field, value){

    setFormdata({...formdata, [field]: value})
    if(errors[field]) {
      setErrors({...errors,[field]: ''})
    }
  }

  function handleLogin(){
    if (!validateForm()) return
    setLoading(true)
    
    AsyncStorage.setItem('Email', formdata.email)
    .then(() => {console.log('Email saved')})
    .catch((error) => {console.log('Error:', error)})
      
    axios.post(`${API_URL}user-login`, {
        useremail: formdata.email,
        userpsd: formdata.password
    })
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem('Token', res?.data?.token)
        
        Toast.show(style.success({
          text1: res?.data?.message,
          text2: 'Welcome back!',
          visibilityTime: 2000
        }))
        
        setTimeout(async () => {
          await AsyncStorage.setItem('FromLogin', 'true')
          navigation.navigate('main')
        }, 1500)
      }
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.error || 'Invalid email or password'
      
      Toast.show(style.error({
        text1: 'Login Failed',
        text2: errorMessage,
        visibilityTime: 3000
      }))
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
    <SafeAreaView style={style.safe_area}>
      <StatusBar style={'light'} />
      <View style={style.login_img_container}>
        <Image 
          source={require('../assets/loginpage/LoginHeroImg.png')} 
          style={style.login_img}
          resizeMode="cover"/>
        <View style={style.login_logocontainer}>
          <Image 
            source={require('../assets/talkwisepng/Asset 2.png')} 
            style={style.login_logoimg}
            resizeMode="contain"/>
        </View>
      </View>  
      <View style={style.form_container}>
        <Text style={style.header_title}>Welcome Back!</Text>
        <Text style={style.header_subtitle}>Sign in to continue</Text>
            
        <View style={style.input_wrap_container}>
          <View style={[style.input_container, errors.email ? style.input_error : null]}>
            <Feather name="user" size={22} color="#666" style={style.icon} />
            <TextInput
              style={style.input}
              placeholder="Email address"
              value={formdata.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"/>
          </View>
          {errors.email ? <Text style={style.error_text}>{errors.email}</Text> : null}
        </View>
            
        <View style={style.input_wrap_container}>
          <View style={[style.input_container, errors.password ? style.input_error : null]}>
            <Octicons name="lock" size={22} color="#666" style={style.icon} />
            <TextInput
              style={style.input}
              placeholder="Password"
              value={formdata.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!psdvisible}
              autoCapitalize="none"
              autoComplete="password"/>
            <TouchableOpacity 
              onPress={() => setPsdvisible(!psdvisible)}
              hitSlop={20}>
              <Ionicons 
                name={psdvisible ? "eye-outline" : "eye-off-outline"} size={22} color="#666" />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={style.error_text}>{errors.password}</Text> : null}
        </View>
            
        <TouchableOpacity 
          style={style.forgot_psd_btn}
          onPress={() => navigation.navigate('forget')}>
          <Text style={style.forgot_psd_text}>Forgot password?</Text>
        </TouchableOpacity>
            
        <TouchableOpacity
          style={[style.login_btn, loading && style.login_disabled_btn]}
          activeOpacity={0.7}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={style.login_btn_text}> {loading ? 'Signing In...' : 'Sign In'}</Text>
        </TouchableOpacity>
            
        <View style={style.signup_btn_log}>
          <Text style={style.signup_btn_text_log}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={style.signup_btn_link_log}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
    </>
  )
}

