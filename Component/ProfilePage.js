import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, styleheet, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import Fontisto from 'react-native-vector-icons/Fontisto'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function ProfileSettings() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [useremail, setUseremail] = useState(null)
    const [name, setName] = useState(null)
      const [modalVisible, setModalVisible] = useState(false)
      const [theme, setTheme] = useState("Light")

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
        <View style={[style.tab_body,theme === 'Dark' ? {backgroundColor:'#252525'} : {}]}>
            <View style={{marginTop:10}}>
                <View style={style.profile}>
                    <Image source={{uri:image}} style={style.pro_avatar}/>
                    <View>
                        <Text style={[style.profileName,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>{name}</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('edit')}>
                            <Text style={style.editprofile}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Native language</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Tamil</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Level</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Beginner</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Upgrade</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Free</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.settingitem}
                        onPress={() => setModalVisible(true)}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Mode</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>{theme}</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <Modal 
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                            <View style={style.modalcontainer}>
                              <View style={style.modalcontent}>
                                <Text style={style.modaltitle}>Select Theme</Text>
                    
                                <TouchableOpacity 
                                  style={style.modaloption} 
                                  onPress={() => {
                                    setTheme("Light")
                                    setModalVisible(false)
                                  }}
                                >
                                  <Text style={style.modaloptiontxt}>Light Mode</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity 
                                  style={style.modaloption} 
                                  onPress={() => {
                                    setTheme("Dark")
                                    setModalVisible(false)
                                  }}
                                >
                                  <Text style={style.modaloptiontxt}>Dark Mode</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity 
                                  style={style.modalclosebtn} 
                                  onPress={() => setModalVisible(false)}
                                >
                                  <Text style={style.modalclosebtntxt}>Cancel</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </Modal>
                    <TouchableOpacity style={[style.settingitem,{borderBottomWidth:10}]}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>MyProgress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Privacy policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Terms of use</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[style.settingitem,{borderBottomWidth:10}]}
                        onPress={() => navigation.navigate('plan')}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Plan</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={style.logoutbutton}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={style.logouttext}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


