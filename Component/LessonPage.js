import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || '' 

export default function LessonPage() {
    const navigation = useNavigation()
    const [useremail, setUseremail] = useState('')
    const [level, setLevel] = useState('')
    const [lessondata, setLessondata] = useState('')

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
    
    function avatar() {
        axios.post(url + "get-user-avatar", { type:'getuserdata', useremail: useremail })
        .then(response => {
            if(response.status == 200) {
                AsyncStorage.setItem('Section', response?.data?.level)
                .then(() => {
                    setLevel(response?.data?.level)
                    console.log(level)
                    if(level){
                        navigation.setParams({ level: level })
                    }
                })
                .catch(err => console.error("Section error:", err))
            }
            sectionlevel()
        })
        .catch(error => {
            console.log("error ==> ", error.response?.data || "error")
        })
    }

    async function sectionlevel(){
        const seclevel = await AsyncStorage.getItem('Section')
        console.log(seclevel)
        if(seclevel){
            axios.post(url+"get-lesson", { section:seclevel })
            .then(response => {
                if(response.status == 200) {
                    setLessondata(response?.data?.levels)
                }
            })
            .catch(error => {
                console.log("error ==> ", error?.response?.data || "error")
            })
        }
    }

    return (
        <View style={style.lessonpage_body}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={lessondata}
                keyExtractor={(item) => item.level.toString()}
                renderItem={({item}) => (
                    <View key={item.level} style={style.lesson_card}>
                        <Text style={style.lesson_cardtitle}>{item.level} - {item.title}</Text>
                        <Text style={style.lesson_carddescription}>{item.description}</Text>
                        <TouchableOpacity 
                            style={style.lesson_cardbtn}
                            onPress={() => navigation.navigate('chat', { level: item.level })}>
                            <Text style={style.lesson_cardbtntext}>Start Level</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text>No lessons available</Text>} 
            />
        </View>
    )
}
