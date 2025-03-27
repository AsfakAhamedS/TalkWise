import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style'
const url = "http://192.168.1.23:4500/" 

export default function UserDetailPage() {
    const navigation = useNavigation()
    const [select,setSelect] = useState('name')
   
    return (
        <View style={style.body}>
            {select === 'name' ? (
                <>
                <View style={style.userdp_heading}>
                    <Text style={[style.userdp_subhead,{fontWeight:300}]}>So nice to meet you.</Text>
                    <Text style={[style.userdp_subhead,{marginBottom:20}]}>What's your name?</Text>
                    <View style={style.inputcontainer}>
                        <Feather name="user" size={22} style={style.icon} />
                        <TextInput
                            style={[style.input,{fontSize:18}]}
                            placeholder="Enter your name"
                            // value={email}
                            // onChangeText={setEmail}
                        />
                    </View>
                </View>
                <View style={[style.login_btn,{marginBottom:80}]}>
                    <TouchableOpacity style={style.login_btn_to} activeOpacity={0.4} onPress={() => setSelect('age')}> 
                        <Text style={[style.login_btn_text,{padding:3}]}>Next</Text>
                    </TouchableOpacity>
                </View>
                </>
            ) : select === 'age' ? (
                <>
                <View style={style.userdp_heading}>
                    <Text style={[style.userdp_subhead,{fontWeight:300}]}>Hi Asfak</Text>
                    <Text style={[style.userdp_subhead,{marginBottom:20}]}>How old are you?</Text>
                    <View>
                        <TouchableOpacity style={[style.age_btn, true ? { backgroundColor: '#ECECEC' } : {}]}
                            onPress={() => setTimeout(() =>  setSelect('propic'), 1500)}
                        >

                            <Text style={style.age_btn_text}>Under 12</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>12 - 15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>16 - 24</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>25 - 34</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>35 - 44</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>45 - 54</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>55 - 64</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>65 or Older</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            ) : select === 'propic' ? (
                <>
                <View style={style.userdp_heading}>
                    <Text style={[style.userdp_subhead,{fontWeight:300}]}>Let's set up your</Text>
                    <Text style={[style.userdp_subhead,{marginBottom:20}]}>Profile picture</Text>
                    <View style={style.propic_upload}>
                        <View style={style.propic_circle}>
                            <MaterialCommunityIcons name="camera-plus-outline" color="blue" size={30} />
                        </View>
                    </View>
                    <Text style={style.alter_text}>or choose an avatar</Text>
                </View>
                </>
            ) : null}
            
        </View>
    )
}
           