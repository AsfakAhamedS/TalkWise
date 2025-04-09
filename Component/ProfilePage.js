import { useEffect, useState, useCallback  } from 'react'
import { View, Text, Image, TouchableOpacity, styleheet, ScrollView, FlatList } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect  } from '@react-navigation/native'
import Modal from 'react-native-modal'
import Fontisto from 'react-native-vector-icons/Fontisto'
import style from '../style'
import Toast from 'react-native-toast-message'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function ProfileSettings() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [useremail, setUseremail] = useState(null)
    const [name, setName] = useState(null)
    const [showthememodal, setShowthememodal] = useState(false)
    const [theme, setTheme] = useState("Light")
    const [showlevelmodal, setShowlevelmodal] = useState(false)
    const [level, setLevel] = useState('')
    const [showLanguageModal, setShowLanguageModal] = useState(false)
    const [language, setLanguage] = useState('Tamil') 
    const languages = [
        'Arabic',
        'Chinese',
        'English',
        'French',
        'German',
        'Hindi',
        'Japanese',
        'Kannada',
        'Korean',
        'Malayalam',
        'Portuguese',
        'Russian',
        'Spanish',
        'Tamil',
        'Telugu',
        'Urdu'
      ]  
    const modes = ['Light','Dark']
    const levels = ['Beginner', 'Intermediate', 'Advanced']

    useEffect(() => {
        AsyncStorage.setItem('Mode',theme)
    },[theme])
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

    useFocusEffect(
        useCallback(() => {
            if(useremail) {
                console.log("Focused: fetching avatar")
                avatar()
            }
        }, [useremail])
    )
    
    async function avatar(){
        console.log("email ==>",useremail)
        await axios.post(url+"get-user-avatar", {type:'getuserdata', useremail:useremail})
        .then(response => {
            if(response.status==200){
                setName(response?.data?.name)
                setImage(response?.data?.image)
                setLevel(response?.data?.level)
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

    function updatedata(level){
        console.log("User Email:", useremail)
        if(!level || !useremail){
            Toast.show(style.error({
                text1: "Updated Failed",
                text2: "All fields require",
            }))
            return
        }
        axios.post(url+"get-user-avatar", { type: 'updateuserdata', level:level, useremail:useremail })
        .then(response => {
            if (response.status == 200) {
                
                setShowlevelmodal(false)
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
                    <TouchableOpacity style={style.settingitem} onPress={() => setShowLanguageModal(true)}>
                        <Text style={[style.settingtitle, theme === 'Dark' ? { color: '#FAFAFA' } : {}]}>
                            Native language
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <Text style={[style.settingtitle, { color: '#bababa' }]}>{language}</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{ marginTop: 3 }} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showLanguageModal}
                        animationType="fade"
                        onRequestClose={() => setShowLanguageModal(false)}>
                        <TouchableOpacity
                            style={style.theme_modal_btn}
                            activeOpacity={1}
                            onPressOut={() => setShowLanguageModal(false)} >
                            <View style={[style.theme_modal_container,theme === 'Dark' ? { backgroundColor: '#333' } : { backgroundColor: '#fff' },{ maxHeight: 400 }, ]}>
                                <FlatList
                                    data={languages}
                                    keyExtractor={(item) => item}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingVertical: 10 }}
                                    renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                        setLanguage(item)
                                        setShowLanguageModal(false)
                                        }}
                                        style={[style.theme_modal_inside_btn,index !== languages.length - 1 ? { borderBottomWidth: 1 } : { borderBottomWidth: 0 },]} >
                                        <Text style={[style.theme_modal_txt,theme === 'Dark' ? { color: '#FAFAFA' } : { color: '#000' },]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowLanguageModal(false)}
                                    style={style.theme_modal_cancel_btn}>
                                    <Text style={style.theme_modal_cancel_txt}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <TouchableOpacity style={style.settingitem} onPress={() => setShowlevelmodal(true)}>
                        <Text style={[style.settingtitle, theme === 'Dark' ? { color: '#FAFAFA' } : {}]}>Level</Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <Text style={[style.settingtitle, { color: '#bababa' }]}>{level}</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{ marginTop: 3 }} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showlevelmodal}
                        animationType="fade"
                        onRequestClose={() => setShowlevelmodal(false)}>
                        <TouchableOpacity
                            style={style.theme_modal_btn}
                            activeOpacity={1}
                            onPressOut={() => setShowlevelmodal(false)}>
                            <View style={[style.theme_modal_container,theme === 'Dark' ? { backgroundColor: '#333' } : { backgroundColor: '#fff' },]}>
                                {levels.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setLevel(item)          
                                            setShowlevelmodal(false)
                                            updatedata(item)         
                                        }}
                                        style={[style.theme_modal_inside_btn,index !== levels.length - 1 ? { borderBottomWidth: 1 } : { borderBottomWidth: 0 },]}>
                                        <Text style={[style.theme_modal_txt,theme === 'Dark' ? { color: '#FAFAFA' } : { color: '#000' }]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    onPress={() => setShowlevelmodal(false)}
                                    style={style.theme_modal_cancel_btn}>
                                    <Text style={style.theme_modal_cancel_txt}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Upgrade</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>Free</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.settingitem}
                        onPress={() => setShowthememodal(true)}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Mode</Text>
                        <View style={{flexDirection:'row',gap:15}}>
                            <Text style={[style.settingtitle,{color:'#bababa'}]}>{theme}</Text>
                            <Fontisto name="angle-right" color="gray" size={14} style={{marginTop:3}}/>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showthememodal}
                        animationType="fade"
                        onRequestClose={() => setShowthememodal(false)}>
                        <TouchableOpacity style={style.theme_modal_btn}
                            activeOpacity={1}
                            onPressOut={() => setShowthememodal(false)}>
                            <View style={[style.theme_modal_container,theme === 'Dark' ? {backgroundColor:'#333'} : {backgroundColor:'#fff'}]}>
                                {modes.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setTheme(item)
                                            setShowthememodal(false)
                                        }}
                                        style={[style.theme_modal_inside_btn,index !== modes.length - 1 ? {borderBottomWidth:1} : {borderBottomWidth:0}]}>
                                        <Text style={[style.theme_modal_txt,theme === 'Dark' ? {color:'#FAFAFA'} : {color:'#000'}]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    onPress={() => setShowthememodal(false)}
                                    style={style.theme_modal_cancel_btn}>
                                    <Text style={style.theme_modal_cancel_txt}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <TouchableOpacity style={[style.settingitem,{borderBottomWidth:10}]}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>MyProgress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.settingitem}
                        onPress={() => navigation.navigate('plan')}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.settingitem}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Privacy policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[style.settingitem,{borderBottomWidth:10}]}
                        onPress={() => navigation.navigate('support')}>
                        <Text style={[style.settingtitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Contact us 24X7</Text>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity 
                    style={style.logoutbutton}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={style.logouttext}>Log out</Text>
                </TouchableOpacity>
            </View>
            <Toast/>
        </View>
    )
}


