import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, styleheet, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function ProfileSettings() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [useremail, setUseremail] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        (async () => {
            console.log("loading")
            console.log("email trigged")
            const uemail = await AsyncStorage.getItem('Email')
            console.log("pro email",uemail)
            setUseremail(uemail)
            console.log(useremail)
        })()
    }, [])
    useEffect(() => {
        if (useremail) {
            console.log("avatar trigged")
            avatar()
        }
    }, [useremail])
    
    async function avatar(){
        console.log("email ==>",useremail)
        await axios.post(url+"get-user-avatar", {type:'getuserdata', useremail:useremail})
        .then(response => {
            if(response.status==200){
                setName(response?.data?.name)
                setImage(response?.data?.image)
                console.log("img url ==>",response?.data?.image)
        }})
        .catch(error => {
            console.log("error ==> ",error.response?.data || "error")
        }) 
    }

    async function handleLogout(navigation){
        await AsyncStorage.clear()
        console.log("All data cleared from asyncStorage")
        navigation.navigate('login')
    }

    return (
        <View style={style.tab_body}>
            <ScrollView style={{marginTop:35}}>
                <View style={style.profile}>
                    <Image source={{uri:image}} style={style.pro_avatar}/>
                    <View>
                        <Text style={style.profileName}>{name}</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('edit')}>
                            <Text style={style.editprofile}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Native language</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Tamil</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>App language</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>English</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Learning goal</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Education</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Level</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Beginner</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.settingitem,{borderBottomWidth:10}]}>
                        <Text style={style.settingtitle}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Privacy policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Terms of use</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={style.settingtitle}>Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[style.settingitem,{borderBottomWidth:10}]}
                        onPress={() => navigation.navigate('plan')}>
                        <Text style={style.settingtitle}>Plan</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={style.logoutbutton}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={style.logouttext}>Log out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}


