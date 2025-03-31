import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
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

    useEffect(() => {
        (async () => {
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail( uemail)
        })()
    }, [])
    useEffect(() => {
        avatar()
    }, [])
    
    function avatar() {
        axios.post(url + "get-user-avatar", { useremail: useremail })
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

    return (
        <View style={style.edit_pro_container}>
            <View style={style.edit_avatar_container}>
                <Image source={{ uri: image }} style={style.edit_pro_avatar} />
                <TouchableOpacity style={style.edit_pro_icon}>
                    <MaterialCommunityIcons name="camera-plus-outline" color="#fff" size={13} />
                </TouchableOpacity>
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
                    style={style.edit_input}/>
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>Age</Text>
                <TextInput
                    value={age}
                    style={style.edit_input}/>
            </View>
            <View style={style.edit_input_container}>
                <Text style={style.edit_label}>Communication Level</Text>
                <TextInput
                    value={level}
                    style={style.edit_input}/>
            </View>
        </View>
    );
}

