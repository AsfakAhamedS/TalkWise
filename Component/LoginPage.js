import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from '../style'


export default function LoginPage() {
    const navigation = useNavigation()
    const [show, setShow] = useState(true)

  return (
    <View style={style.body}>
        <View style={style.login_hero_img} >
            <Image source={require('../assets/loginimg.png')} style={{width:'100%',height:'100%'}}/>
        </View>
        <View style={{flex:3}}>
            <View>
                <Text style={style.login_head}>Wellcome Back!</Text>
            </View>
            <View style={style.login_form_grp} >
                <View 
                    style={{flexDirection:'row',borderBottomWidth:1,  marginBottom: 20}}
                >
                    <Feather name="user" color="#000" size={22} style={{position:'relative',top:6,marginRight:8,color:'#bababa'}}/>
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Enter your email address'
                    />
                </View>
                <View 
                    style={{ flexDirection:'row', borderBottomWidth:1}}
                >
                    <Octicons name="lock" color="#000" size={22} style={{position:'relative',top:7,marginRight:12,color:'#bababa'}}/>
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Enter your password'
                    />
                     <TouchableOpacity onPress={() => setShow(!show)}>
                        {show ?  <Ionicons name="eye-off-outline" color="#000" size={20} style={{width:20,height:20,position:'relative',left:110,top:11,color:'#bababa'}}/> 
                            : <Ionicons name="eye-outline" color="#000" size={20} style={{width:20,height:20,position:'relative',left:110,top:11,color:'#bababa'}}/>}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity  onPress={() => navigation.navigate('forget')}><Text style={style.log_signup_btn}>Forget password?</Text></TouchableOpacity>
            </View>
            <View style={style.login_btn}>
                <TouchableOpacity 
                    style={style.login_btn_to}
                    activeOpacity={0.4}
                    onPress={() => navigation.navigate('home')}
                >
                    <Text style={style.login_btn_text}>Log in</Text>
                </TouchableOpacity>
            </View>
            <View style={style.log_signup}>
                <Text style={style.log_signup_text}>Don't have an account? <TouchableOpacity><Text  style={style.log_signup_btn}>Sign up</Text></TouchableOpacity></Text>
            </View>
        </View>
    </View>
  )
}
           