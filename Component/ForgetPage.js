import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useRef } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import style from '../style'

export default function ForgetPage() {
    const navigation = useNavigation()
    const [select,setSelect] = useState(true)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([])

    const handleChange = (text, index) => {
        if (text.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)

        if (text && index < 5) {
        inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
        if (index > 0) {
            inputRefs.current[index - 1].focus()
        }
        }
    }


    return(
        <View style={style.body}>
            <View>
                <Text style={style.login_head}>Forget Password</Text>
            </View>
            {select ? (
                <View>
                    <View>
                        <Text style={style.forget_label} >Email</Text>
                    </View>
                    <View 
                        style={{flexDirection:'row',borderWidth:1, padding:3, marginBottom: 20,borderRadius:10}}
                    >
                        <Feather name="user" color="#000" size={20} style={{position:'relative',top:8,marginLeft:10,marginRight:8,color:'#bababa'}}/>
                        <TextInput 
                            style={style.forget_input} 
                            placeholder='Enter your email'
                        />
                        <TouchableOpacity>
                            <Text style={style.otp_text} >GET CODE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.otpContainer}>
                        {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={style.otpInput}
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                        ))}
                    </View>
                    <View style={style.forget_btn}>
                        <TouchableOpacity 
                            style={style.forget_btn_to}
                            activeOpacity={0.7}
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
                    <View style={{borderWidth:1, padding:3, marginBottom: 20,borderRadius:10}}>
                        <TextInput 
                            style={style.forget_input} 
                            placeholder='Enter your password'
                        />
                    </View>
                    <View>
                        <Text style={style.forget_label} >Confirm Password</Text>
                    </View>
                    <View style={{borderWidth:1, padding:3, marginBottom: 20,borderRadius:10}}>
                        <TextInput 
                            style={style.forget_input} 
                            placeholder='Enter your confirm password'
                        />
                    </View>
                    <View style={style.forget_btn_psd}>
                        <TouchableOpacity 
                            style={style.forget_btn_to}
                            activeOpacity={0.7}
                            onPress={() => setSelect(!select)}
                        >
                            <Text style={style.forget_btn_text}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}