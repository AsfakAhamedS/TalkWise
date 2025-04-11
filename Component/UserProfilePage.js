import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function UserProfilePage() {
    const navigation = useNavigation()
    const [image, setImage] = useState('')
    const avatar = [
        require('../assets/avatar/avatar_men_one.jpg'),
        require('../assets/avatar/avatar_men_two.jpg'),
        require('../assets/avatar/avatar_men_three.jpg'),
        require('../assets/avatar/avatar_women_one.jpg'),
        require('../assets/avatar/avatar_women_two.jpg'),
        require('../assets/avatar/avatar_women_three.jpg'),
    ]

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                Toast.show(style.error({text1: "Permission denied!",}))
            }
        })()
    }, [])

    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }
   
    async function uploadImage(){
        if (!image) {
            Toast.show(style.error({ 
                text1: "Image error",
                text2: "No image selected!"
             }))
            return
        }
        const email = await AsyncStorage.getItem('Email')
        const formData = new FormData()
        formData.append('useremail', email)
        // formData.append('useremail', "asfak@gmail.com")
        formData.append('file', {
            uri: image,
            name: `profile_${Date.now()}.jpg`,
            type: 'image/jpeg',
        })

        axios.post(url+'upload-pro-pic', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
        .then(response => {
            if(response.status === 200) {
                Toast.show(style.success({ 
                    text1: "Upload Successful!", 
                    text2:response?.data?.message,
                    }))
                setTimeout(() => navigation.navigate('nativelan'), 1000)
            }
        })
        .catch(error => {
            Toast.show(style.error({ 
                text1: "Upload Failed!", 
                text2: error.response?.data?.message, 
                }))
        })  
    }

    async function uploadavatar(avatar){
        const email = await AsyncStorage.getItem('Email')
        console.log(email)
        const formData = new FormData()
        formData.append('useremail', email) 
        formData.append('file', {
            uri: Image.resolveAssetSource(avatar).uri,
            name: `avatar_${Date.now()}.jpg`,
            type: 'image/jpeg',
        })
        await axios.post(url + 'upload-pro-pic', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
        .then(response => {
            if (response.status === 200) {
                Toast.show(style.success({
                    text1: "Avatar Selected!",
                    text2: "Your profile picture has been updated",
                }))
                setTimeout(() => navigation.navigate('userlevel'), 1000)
            }
        })
        .catch(error => {
            Toast.show(style.error({
                text1: "Upload Failed!",
                text2: error.response?.data?.message,
            }))
        })
    }
    
    return (
        <View style={style.body}>
            <View style={style.userdp_heading}>
                <Text style={[style.userdp_subhead, { fontWeight: '300' }]}>Let's set up your</Text>
                <Text style={[style.userdp_subhead, { marginBottom: 20 }]}>Profile picture</Text>
                <View style={style.propic_upload}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={style.propic_circle}>
                            {image === '' ?  
                                (<MaterialCommunityIcons name="camera-plus-outline" color="blue" size={30} /> )
                            : (<>
                                <Image source={{ uri: image }} style={style.image} />
                                <View style={style.inside_icon}>
                                    <MaterialCommunityIcons name="camera-plus-outline" color="#fff" size={13} />
                                </View>
                                </>)}
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={style.alter_text}>or choose an avatar</Text>
                <View style={style.avatar}>
                    {avatar.map((avatar, index) => (
                        <TouchableOpacity key={index} onPress={() => uploadavatar(avatar)}>
                            <Image source={avatar} style={{ width: 100, height: 100 }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={[style.login_btn, { marginBottom: 80 }]}>
                <TouchableOpacity 
                    style={style.login_btn_to} 
                    activeOpacity={0.4} 
                    onPress={uploadImage}> 
                    <Text style={[style.login_btn_text, { padding: 3 }]}>Next</Text>
                </TouchableOpacity>
            </View>
            <Toast/>
        </View>
    )
}
