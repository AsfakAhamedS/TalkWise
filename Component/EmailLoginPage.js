import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import style from '../style'


export default function EmailLoginPage() {
    const navigation = useNavigation();

  return (
    <View style={style.body}>
        <View style={style.login_hero_img} >
            <Image source={require('../assets/emaillogimg.png')} style={{width:'100%',height:'100%'}}/>
        </View>
        <View style={{flex:3}}>
            <View>
                <Text style={style.login_head}>Log in</Text>
            </View>
            <View style={style.login_form_grp} >
                <View 
                    style={{flexDirection:'row',borderBottomWidth:1,  marginBottom: 20}}
                >
                    <Feather name="user" color="#000" size={24} style={{position:'relative',top:5,marginRight:10}}/>
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Enter your email address'
                    />
                </View>
                <View 
                    style={{ flexDirection:'row', borderBottomWidth:1}}
                >
                    <Octicons name="lock" color="#000" size={24} style={{position:'relative',top:6,marginRight:15}}/>
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Enter your password'
                    />
                </View>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity><Text style={style.log_signup_btn}>Forget password?</Text></TouchableOpacity>
            </View>
            <View style={style.login_btn}>
                <TouchableOpacity 
                    style={style.login_btn_to}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('home')}
                >
                    <Text style={style.login_btn_text}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}