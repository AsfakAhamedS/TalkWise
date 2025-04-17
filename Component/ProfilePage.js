import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, ScrollView,SafeAreaView,} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Modal from 'react-native-modal'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from 'react-native-toast-message'
import style from '../style'
const API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export default function ProfilePage() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [userdata, setUserdata] = useState({email: null, name: null, image: null, level: '', language: ''})
  const [showthememodal, setShowthememodal] = useState(false)
  const [showlevelmodal, setShowlevelmodal] = useState(false)
  const [showlanguagemodal, setShowlanguagemodal] = useState(false)
  
  const [theme, setTheme] = useState("Light")
  
  const languages = [
    'Arabic', 'Chinese', 'English', 'French', 'German', 'Hindi','Japanese', 'Kannada', 'Korean', 'Malayalam', 'Portuguese','Russian', 'Spanish', 'Tamil', 'Telugu', 'Urdu'
  ]
  const modes = ['Light', 'Dark']
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    function themeset(){
      AsyncStorage.setItem('Mode', theme)
      .then(() => {console.log('Theme saved')})
      .catch((err) => {console.log('Error:', err)})
    }
    themeset()
  }, [theme])

  useEffect(() => {
    const loaduseremail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('Email')
        if (userEmail) {
          setUserdata(prev => ({ ...prev, email: userEmail }))
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to load user email:", error)
        setLoading(false)
      }
    }
    loaduseremail()
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (userdata.email) {
        fetchuserprofile()
      }
    }, [userdata.email])
  )

  function fetchuserprofile(){
    setLoading(true)

    axios.post(`${API_URL}get-user-avatar`, {
      type: 'getuserdata',
      useremail: userdata.email
    })
    .then(async (res) => {
      if (res.status === 200) {
        const { name, image, level, nativeLanguage } = res.data
        setUserdata(prev => ({
          ...prev,
          name,
          image,
          level,
          language: nativeLanguage
        }))
        const savedTheme = await  AsyncStorage.getItem('Mode')
        if (savedTheme) {
          setTheme(savedTheme)
        }
      }
    })
    .catch((err) => {
      console.error("Profile fetch error:", err.response?.data || err.message)
      Toast.show(style.error({
        text1: 'Profile Error',
        text2: 'Failed to load profile data',
        position: 'bottom'
      }))
    })
    .finally(() => {
      setLoading(false)
    })
  }

  async function handleLogout(){
    try{
      await AsyncStorage.clear()
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      })
    }catch(error){
      console.error("Logout error:", error)
      Toast.show(style.error({
        text1: 'Logout Failed',
        text2: 'Please try again',
        position: 'bottom'
      }))
    }
  }

  function updateUserData(language, level){
    if (!level || !language || !userdata.email) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'All fields are required',
        position: 'bottom'
      })
      return
    }
    setLoading(true)

    axios.post(`${API_URL}get-user-avatar`, {
      type: 'updateuserdata',
      level,
      useremail: userdata.email,
      language
    })
    .then((res) => {
      if (res.status === 200) {
        setShowlevelmodal(false)
        setShowlanguagemodal(false)
        
        setUserdata(prev => ({
          ...prev,
          level,
          language
        }))
        
        Toast.show(style.success({
          text1: 'Profile Updated',
          text2: res.data.message || 'Your settings have been saved',
          position: 'bottom'
        }))
      }
    })
    .catch((err) => {
      console.error("Update error:", err.response?.data || err.message)
      Toast.show(style.error({
        text1: 'Update Failed',
        text2: err.response?.data?.message || 'Please try again later',
        position: 'bottom'
      }))
    })
    setLoading(false)
  }

  const SettingItem = ({ title, value, icon, onPress, showDivider = true, showArrow = true }) => (
    <TouchableOpacity 
      style={[
        style.setting_item,
        showDivider ? { borderBottomWidth: 0.5, borderBottomColor: theme === 'Dark' ? '#3A3A3C' : '#E5E5EA' } : {}]}
      onPress={onPress}
    >
      <View style={style.setting_item_left}>
        {icon}
        <Text style={[
          style.setting_title,
          theme === 'Dark' ? { color: '#FAFAFA' } : { color: '#1C1C1E' }]}>
          {title}
        </Text>
      </View>
      {value && (
        <View style={style.setting_item_right}>
          <Text style={style.setting_value}>{value}</Text>
          {showArrow && <Fontisto name="angle-right" color={theme === 'Dark' ? '#8E8E93' : '#C7C7CC'} size={14} />}
        </View>
      )}
    </TouchableOpacity>
  )


  const SelectionModal = ({ visible, onClose, title, data, onSelect, selectedValue }) => (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={style.modalContainer}
    >
      <View style={[
        style.modalContent,
        theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
      ]}>
        <Text style={[
          style.modalTitle,
          theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }
        ]}>
          {title}
        </Text>
        
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.modalListContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={[
                style.modalItem,
                index !== data.length - 1 ? {
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme === 'Dark' ? '#3A3A3C' : '#E5E5EA'
                } : {},
                selectedValue === item ? style.selectedItem : {}
              ]}
            >
              <Text style={[
                style.modalItemText,
                theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' },
                selectedValue === item ? style.selectedItemText : {}
              ]}>
                {item}
              </Text>
              
              {selectedValue === item && (
                <Ionicons name="checkmark" size={22} color="#007AFF" />
              )}
            </TouchableOpacity>
          )}
        />
        
        <TouchableOpacity
          onPress={onClose}
          style={style.cancelButton}
        >
          <Text style={style.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )

  if (loading) {
    return (
      <View style={[
        style.container,{flex:1,justifyContent:'center',alignItems:'center'},
        theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }]}>
        <ActivityIndicator size="large" color={theme === 'Dark' ? '#0A84FF' : '#007AFF'} />
        <Text style={[
          style.loadingText,
          theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }]}>
          Loading profile...
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[style.profile_safearea,theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }]}>
      <ScrollView 
        style={[
          style.profile_container,
          theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.profile_header}>
          {userdata.image ? (
            <Image source={{ uri: userdata.image }} style={style.profile_image}/>
          ) : (
            <View style={[
              style.profile_img_placeholder,
              theme === 'Dark' ? { backgroundColor: '#3A3A3C' } : { backgroundColor: '#E5E5EA' }]}>
              <MaterialIcons name="person" size={40} color={theme === 'Dark' ? '#8E8E93' : '#8A8A8E'} />
            </View>
          )} 
          <View style={style.profile_info}>
            <Text style={[
              style.profile_name,
              theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }]}>
              {userdata.name || 'User'}
            </Text>   
            <TouchableOpacity 
              style={style.edit_button}
              onPress={() => navigation.navigate('edit')}>
              <Text style={style.edit_button_text}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.settings_container}>
          <View style={style.settings_section}>
            <Text style={[
              style.section_header,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }]}>
              PREFERENCES
            </Text>
            <View style={[
              style.section_content,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }]}>
              <SettingItem 
                title="Native Language" 
                value={userdata.language || 'Not set'}
                onPress={() => setShowlanguagemodal(true)}
              />
              <SelectionModal
                visible={showlanguagemodal}
                onClose={() => setShowlanguagemodal(false)}
                title="Select Native Language"
                data={languages}
                selectedValue={userdata.language}
                onSelect={(language) => {
                  updateUserData(language, userdata.level)
                }}
              />
              <SettingItem 
                title="Proficiency Level" 
                value={userdata.level || 'Not set'}
                onPress={() => setShowlevelmodal(true)}
              />
              <SelectionModal
                visible={showlevelmodal}
                onClose={() => setShowlevelmodal(false)}
                title="Select Proficiency Level"
                data={levels}
                selectedValue={userdata.level}
                onSelect={(level) => {
                  updateUserData(userdata.language, level)
                }}
              />
              <SettingItem 
                title="Display Mode" 
                value={theme}
                onPress={() => setShowthememodal(true)}
                showDivider={false}
              />
              <SelectionModal
                visible={showthememodal}
                onClose={() => setShowthememodal(false)}
                title="Select Display Mode"
                data={modes}
                selectedValue={theme}
                onSelect={(mode) => {
                  setTheme(mode)
                  setShowthememodal(false)
                }}
              />
            </View>
          </View>

          <View style={style.settings_section}>
            <Text style={[
              style.section_header,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }]}>
              ACCOUNT
            </Text>
            <View style={[
              style.section_content,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }]}>
              <SettingItem 
                title="Subscription" 
                value="Free"
                onPress={() => navigation.navigate('plan')}
              />
              <SettingItem 
                title="My Progress" 
                value=""
                onPress={() => navigation.navigate('myprogress')}
                showDivider={false}
              />
            </View>
          </View>

          <View style={style.settings_section}>
            <Text style={[
              style.section_header,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }]}>
              SUPPORT
            </Text>
            <View style={[
              style.section_content,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }]}>
              <SettingItem 
                title="Support Tickets" 
                value=""
                onPress={() => navigation.navigate('ticketstatus')}
              />
              <SettingItem 
                title="Contact Support (24/7)" 
                value=""
                onPress={() => navigation.navigate('support')}
                showDivider={false}
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              style.logout_button,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' } ]}
            onPress={handleLogout} >
            <Text style={style.logout_text}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  )
}
