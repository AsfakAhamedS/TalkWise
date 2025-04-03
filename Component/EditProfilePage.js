import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import DropDownPicker from 'react-native-dropdown-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function EditProfilePage() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [useremail, setUseremail] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [level, setLevel] = useState('')
    const [updateimage, setUpdateimage] = useState('')
    const [press, setPress] = useState('')

    useEffect(() => {
        (async () => {
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail( uemail)
        })()
    }, [])
    useEffect(() => {
        if (useremail) {
            console.log("avatar trigged")
            avatar()
        }
    }, [useremail])
     useEffect(() => {
            (async () => {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    Toast.show(style.error({text1: "Permission denied!",}))
                }
            })()
    }, [pickImage])

     async function pickImage(){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if (!result.canceled) {
                setUpdateimage(result.assets[0].uri)
            }
    }
    
    function avatar() {
        axios.post(url + "get-user-avatar", { type:'getuserdata', useremail: useremail })
            .then(response => {
                if (response.status == 200) {
                    setName(response?.data?.name)
                    setEmail(response?.data?.email)
                    setPhone(response?.data?.phone)
                    setAge(response?.data?.age)
                    setLevel(response?.data?.level)
                    setImage(response?.data?.image)
                }
            })
            .catch(error => {
                console.log("error ==> ", error.response?.data || "error")
            })
    }
    async function uploadImage(){
        if (!updateimage) {
            Toast.show(style.error({ 
                text1: "Image error",
                text2: "No image selected!"
             }))
            return
        }
        const formData = new FormData()
        formData.append('useremail', useremail)
        console.log(useremail)
        // formData.append('useremail', "asfak@gmail.com")
        formData.append('file', {
            uri: updateimage,
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
            }
        })
        .catch(error => {
            Toast.show(style.error({ 
                text1: "Upload Failed!", 
                text2: error.response?.data?.message, 
                }))
        })  
    }

    function updatedata(){
        const phoneRegex = /^\d{10}$/
        if(!name || !email || !phone || !age || !level){
            Toast.show(style.error({
                text1: "Updated Failed",
                text2: "All fields require",
            }))
            return
        }
        console.log(phone)
        if(!phoneRegex.test(phone)){
            Toast.show(style.error({
                text1: 'Invalid Phone no',
                text2: 'Enter a valid Phone no',
            }))
            return
        }
        uploadImage()
        axios.post(url + "get-user-avatar", { type: 'updateuserdata', useremail: useremail, name, phone, age , level })
        .then(response => {
            if (response.status == 200) {
                Toast.show(style.success({
                    text1: "Updated",
                    text2: response?.data?.message,
                }))
            }
        })
        .catch(error => {
            console.log("error ==> ", error.response?.data || "error")
        })
    }

    return (
        <>
        <View style={style.edit_pro_container}>
            <View style={style.edit_avatar_container}>
                {updateimage === '' ?  
                (<>
                    <Image source={{ uri: image }} style={style.edit_pro_avatar} />
                    <TouchableOpacity 
                        style={style.edit_pro_icon} 
                        onPress={pickImage}>
                        <MaterialCommunityIcons name="camera-plus-outline" color="#fff" size={13} />
                    </TouchableOpacity>
                </>)
                : (<>
                    <Image source={{ uri: updateimage }} style={style.edit_pro_avatar} />
                    <TouchableOpacity 
                        style={style.edit_pro_icon} 
                        onPress={pickImage}>
                        <MaterialCommunityIcons name="camera-plus-outline" color="#fff" size={13} />
                    </TouchableOpacity>
                </>)}
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>NAME</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={style.edit_input}/>
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>EMAIL</Text>
                <TextInput
                    value={email}
                    style={[style.edit_input, { color: "gray" }]}
                    editable={false}/>
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>PHONE</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={style.edit_input}
                    keyboardType="numeric"/>
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>Age</Text>
                <TextInput
                    value={age}
                    onChangeText={setAge}
                    style={style.edit_input}/>
            </View>
            
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>Communication Level</Text>
                <TextInput
                    value={level}
                    onChangeText={setLevel}
                    style={style.edit_input}/>
            </View>
            <TouchableOpacity 
                style={{ marginRight: 25,fontSize:18 }}
                onPress={updatedata}>
                <Text style={style.edit_save_btn}>Save</Text>
            </TouchableOpacity>
        </View>
        <Toast />
        </>
    );
}

