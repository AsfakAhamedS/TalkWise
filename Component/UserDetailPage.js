import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserDetailPage() {
    const navigation = useNavigation()
    const [select,setSelect] = useState('name')
    const [image, setImage] = useState('')

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [10, 10],
            quality: 1,
        })
        console.log(result)
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
   
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
                        <TouchableOpacity onPress={pickImage}>
                            <View style={style.propic_circle}>
                                {image === '' ?  
                                    (<MaterialCommunityIcons name="camera-plus-outline" color="blue" size={30} /> )
                                : (<>
                                    {image && <Image source={{ uri: image }} style={style.image} />}
                                    <View style={style.inside_icon}>
                                        <MaterialCommunityIcons name="camera-plus-outline" color="#fff" size={13} />
                                    </View>
                                    </>)}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={style.alter_text}>or choose an avatar</Text>
                    <View style={style.avatar}>
                         <View style={style.men_avatar}>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_men_one.jpg')} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_men_two.jpg')} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_men_three.jpg')} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>    
                         </View>
                         <View style={style.women_avatar}>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_women_one.jpg')} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_women_two.jpg')} style={{ width: 100, height: 100 }} />    
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/avatar/avatar_women_three.jpg')} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                         </View>
                    </View>
                </View>
                <View style={[style.login_btn,{marginBottom:80}]}>
                    <TouchableOpacity style={style.login_btn_to} activeOpacity={0.4} onPress={() => setSelect('level')}> 
                        <Text style={[style.login_btn_text,{padding:3}]}>Next</Text>
                    </TouchableOpacity>
                </View>
                </>
            ) : select === 'level' ? (
                <>
                <View style={style.userdp_heading}>
                    <Text style={[style.userdp_subhead,{fontWeight:300}]}>On a scale of 1 - 3</Text>
                    <Text style={[style.userdp_subhead,{marginBottom:20}]}>How's your English?</Text>
                    <View>
                        <TouchableOpacity style={[style.age_btn, true ? { backgroundColor: '#ECECEC' } : {}]}
                            onPress={() => setTimeout(() =>  navigation.navigate('plan'), 1500)}
                        >

                            <Text style={style.age_btn_text}>1 - Beginner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>2 - Intermediate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.age_btn}>
                            <Text style={style.age_btn_text}>3 - Advanced</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            ) : null}
            
        </View>
    )
}
           