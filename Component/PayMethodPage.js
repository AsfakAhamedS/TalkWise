import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style from '../style'

export default function PayMethodPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const { plan, amount, credit } = route.params || 'Asfak Ahamed S'
    const [selectedMethod, setSelectedMethod] = useState(null)

    console.log(plan,amount,credit)
    
    return (
        <View style={style.payment_container}>
            <Text style={style.payment_title}>Choose Payment Method</Text>
            <TouchableOpacity
                style={[style.payment_option, selectedMethod === 'upi' ? style.method_selected : {}]}
                onPress={() => setSelectedMethod('upi')}>
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
                style={[style.payment_option, selectedMethod === 'netbanking' ? style.method_selected : {}]}
                onPress={() => alert('Server down, Please try again')}>
                    <View style={style.payment_inbtn}>
                        <View style={style.pay_icon_container}><FontAwesome name="bank" color="#000" size={22} /></View>
                        <View style={style.pay_txt_container}><Text style={style.payment_text}>Net Banking</Text></View>
                    </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.payment_option, selectedMethod === 'card' ? style.method_selected : {}]}
                onPress={() => alert('Server down, Please try again')}>
                    <View style={style.payment_inbtn}>
                        <View style={style.pay_icon_container}><Ionicons name="card" color="#000" size={22} /></View>
                        <View style={style.pay_txt_container}><Text style={style.payment_text}>Credit/Debit Card</Text></View>
                    </View>
            </TouchableOpacity>
            <View style={style.pay_btn_container}>
                <TouchableOpacity
                    style={style.pay_btn} 
                    onPress={() => navigation.navigate("payment",{plan,amount,credit})}
                    disabled={!selectedMethod}>
                    <Text style={style.pay_btn_txt}>Proceed to Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
