import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import style from '../style'


export default function LoginPage() {
    const navigation = useNavigation();

  return (
    <View style={style.body}>
        <View style={style.login_hero_img} >
            <Image source={require('../assets/loginimg.png')} style={{width:'100%',height:'100%'}}/>
        </View>
        <View style={{flex:2}}>
            <View>
                <Text style={style.login_head}>Log in</Text>
            </View>
            <View style={style.login_form_grp} >
                <View 
                    style={{flexDirection:'row', borderBottomWidth:1, gap: 5, marginBottom: 20}}
                >
                    <Text style={style.input_label}>+ 91</Text>
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Phone number'
                    />
                    <TouchableOpacity
                        style={style.input_otp}
                    >
                        <Text>GET CODE</Text>
                    </TouchableOpacity>
                </View>
                <View 
                    style={{flexDirection:'row', borderBottomWidth:1, gap: 5}}
                >
                    <TextInput 
                        style={style.input_ph} 
                        placeholder='Verification Code'
                    />
                </View>
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
        <View style={style.log_social_media}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('email')}
                style={style.social_media_shadow}
            >
                <View style={style.social_media}>
                    <Image source={require('../assets/icons8-email-48.png')} style={{ width: 30, height: 30 }} />
                    <Text style={{ fontSize: 18 }}>LOG IN WITH EMAIL</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}
           