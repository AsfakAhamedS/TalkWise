import React, { useState, useCallback  } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style from '../style'

export default function PayMethodPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const { plan, amount, credit } = route.params || {}
    const [selectedmethod, setSelectedmethod] = useState(null)
    const [theme, setTheme] = useState('')

    useFocusEffect(
        useCallback(() => {
          (async () => {
            const mode = await AsyncStorage.getItem('Mode')
            setTheme(mode)
            navigation.setParams({ theme: mode })
          })()
        }, [])
    )
    
    return (
        <View style={[style.payment_container,theme === 'Dark' ? {backgroundColor:'#252525'} : {}]}>
            <Text style={[style.payment_title,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Choose Payment Method</Text>
            <TouchableOpacity
                style={[style.payment_option, selectedmethod === 'UPI' ? style.method_selected : {}]}
                onPress={() => setSelectedmethod('UPI')}>
                <View style={style.payment_inbtn}>
                    <View style={style.pay_icon_container}>
                        <Image
                        source={require('../assets/upi_logo.png')}
                        style={{ width: 40, height: 40, marginRight: 7 }} 
                        resizeMode="contain"/>
                    </View>
                    <View style={style.pay_txt_container}><Text style={style.payment_text}>UPI Payment</Text></View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.payment_option, selectedmethod === 'netbanking' ? style.method_selected : {}]}
                onPress={() => alert('Server down, Please try again')}>
                    <View style={style.payment_inbtn}>
                        <View style={style.pay_icon_container}><FontAwesome name="bank" color="#000" size={22} /></View>
                        <View style={style.pay_txt_container}><Text style={style.payment_text}>Net Banking</Text></View>
                    </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.payment_option, selectedmethod === 'card' ? style.method_selected : {}]}
                onPress={() => alert('Server down, Please try again')}>
                    <View style={style.payment_inbtn}>
                        <View style={style.pay_icon_container}><Ionicons name="card" color="#000" size={22} /></View>
                        <View style={style.pay_txt_container}><Text style={style.payment_text}>Credit/Debit Card</Text></View>
                    </View>
            </TouchableOpacity>
            <View style={style.pay_btn_container}>
                <TouchableOpacity
                    style={[style.pay_btn, theme === 'Dark' && { backgroundColor: '#0A84FF' }, !selectedmethod && { backgroundColor: '#555' }]} 
                    onPress={() => {
                        const { plan, amount, credit, method } = route.params
                        navigation.navigate("payment",{ plan, amount, credit, method: selectedmethod })}}
                    disabled={!selectedmethod}>
                    <Text style={style.pay_btn_txt}>Proceed to Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
