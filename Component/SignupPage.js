import { StatusBar } from 'expo-status-bar'
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
    const [checked, setChecked] = useState(false);


    return (
        <View style={style.body}>
             <View style={{ flex: 3 }}>
                <Text style={style.login_signup_head}>Join us today!</Text>
                <View style={style.inputcontainer}>
                    <MaterialCommunityIcons name="email-outline" size={22} style={style.icon}/>
                    <TextInput
                        style={style.input}
                        placeholder="Enter your email address"
                        // value={email}
                        // onChangeText={setEmail}
                    />
                </View>
                <View style={style.inputcontainer}>
                    <SimpleLineIcons name="phone" color="#000" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your phone no"
                        // value={email}
                        // onChangeText={setEmail}
                    />
                </View>
                <View style={style.inputcontainer}>
                    <Octicons name="lock" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your password"
                        // value={password}
                        // onChangeText={setPassword}
                        secureTextEntry={show}
                    />
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={22} style={style.icon} />
                    </TouchableOpacity>
                </View>
                <View style={style.inputcontainer}>
                    <Octicons name="lock" size={22} style={style.icon} />
                    <TextInput
                        style={style.input}
                        placeholder="Enter your confirm password"
                        // value={password}
                        // onChangeText={setPassword}
                        secureTextEntry={conshow}
                    />
                    <TouchableOpacity onPress={() => setConshow(!conshow)}>
                        <Ionicons name={conshow ? "eye-off-outline" : "eye-outline"} size={22} style={style.icon} />
                    </TouchableOpacity>
                </View>
                <View style={style.section}>
                    <Checkbox
                    style={style.checkbox}
                    value={checked}
                    onValueChange={setChecked}
                    />
                    <Text style={style.paragraph}>I agree to the <Text style={{color:'blue'}}>Terms & Conditions</Text></Text>
                </View>
                <View style={style.signup_btn}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('userdetailpage')}
                        style={style.signup_btn_to} 
                        activeOpacity={0.4}
                        disabled = {!checked}
                    >
                        <Text style={style.signup_btn_text}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
             </View>
        </View>
    )
}
           