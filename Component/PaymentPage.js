import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert,  } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import style from '../style'
const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function PaymentPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const [useremail, setUseremail] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const {plan,amount,credit,method} = route.params || {}
    const [usercredits, setUsercredits] = useState(0) 
    const [paid, setPaid] = useState(false)
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

    useEffect(() => {
        (async () => {
            const uemail = await AsyncStorage.getItem('Email')
            setUseremail( uemail)
        })()
    }, [])
    
    useEffect(() => {
        if(useremail){
            console.log("trigged")
            avatar()
            subscription()
        }
    },[useremail])

    function avatar() {
        axios.post(url + "get-user-avatar", { type:'getuserdata', useremail: useremail })
        .then(response => {
            if(response.status == 200){
                setName(response?.data?.name)
                setEmail(response?.data?.email)
                setPhone(response?.data?.phone)
            }
        })
        .catch(error => {
            console.log("error ==> ", error.response?.data || "error")
        })
    }

    function subscription() {
        axios.post(url + "user-subscription", { useremail: useremail })
        .then(response => {
            if(response.status == 200){
                console.log(response?.data?.message)
                setUsercredits(response?.data?.credit)
            }
            console.log("subs ===>",usercredits)
        })
        .catch(error => {
            console.log("error ==> ", error.response?.data || "error")
        })
    }

    function userpayment() {
        console.log("wrks")
        axios.post(url + "user-payment", {
            paidusername:name, 
            paiduseremail:email, 
            paiduserphone:phone, 
            plan:plan, 
            credits:credit, 
            paymethod:method, 
            amount:amount
        })
        .then(response => {
            if(response.status == 200){
                console.log("Payment ===>",response?.data?.message)
            }
        })
        .catch(error => {
            console.log("error payment ==> ", error.response?.data || "error")
        })
    }

    console.log("theme ==>",theme)
    const handlePayment = () => {
        if (paid) return
        setPaid(true)
        userpayment()
        Alert.alert(
            "Payment Successful",
            `₹${amount} paid via ${method}\nYou’ve earned ${credit} new credits.`
        )
        setUsercredits(prev => prev + credit)
    }

    return (
        <View style={[style.payment_mainpaycon,theme === 'Dark' ? {backgroundColor:'#252525'} : {}]}>
            <Text style={[style.payment_heading,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Payment Details</Text>
            <View style={[style.payment_detailscart,theme === 'Dark' ? {backgroundColor:'#2E2E2E'} : {}]}>
                <Text style={[style.payment_sectitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>User Information</Text>
                <Text style={[style.payment_detailtext,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Name: {name}</Text>
                <Text style={[style.payment_detailtext,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Email: {email}</Text>
                <Text style={[style.payment_detailtext,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Phone: {phone}</Text>
            </View>
            <View style={[style.payment_detailscart,theme === 'Dark' ? {backgroundColor:'#2E2E2E'} : {}]}>
                <Text style={[style.payment_sectitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Plan Details</Text>
                <Text style={[style.payment_detaillabel,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Plan:</Text>
                <Text style={[style.payment_detailvalue,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>{plan || "Not selected"}</Text>

                <Text style={[style.payment_detaillabel,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Amount:</Text>
                <Text style={[style.payment_detailvalue,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>₹{amount || 0}</Text>

                <Text style={[style.payment_detaillabel,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Payment Method:</Text>
                <Text style={[style.payment_detailvalue,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>{method || "N/A"}</Text>

                <Text style={[style.payment_detaillabel,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Credits Earned:</Text>
                <Text style={[style.payment_detailvalue,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>{credit || 0} Credits</Text>
            </View>
            <View style={[style.payment_detailscart,theme === 'Dark' ? {backgroundColor:'#2E2E2E'} : {}]}>
                <Text style={[style.payment_sectitle,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Credit Summary</Text>
                <Text style={[style.payment_detailtext,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>Current Credits: {usercredits}</Text>
                <Text style={[style.payment_detailtext,theme === 'Dark' ? {color:'#FAFAFA'} : {}]}>After Payment: {usercredits + credit} Credits</Text>
                {/* <Text style={{ color: '#999', fontSize: 13, marginTop: 5 }}>Credits apply immediately</Text> */}
            </View>
            <TouchableOpacity
                style={[style.payment_button, theme === 'Dark' ? { backgroundColor: '#0A84FF' } : {},paid ? {backgroundColor:'#555'} : {}]}
                onPress={handlePayment}
                disabled={paid}>
                <Text style={style.payment_buttontext}>Pay ₹{amount} Now</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'center', marginTop: 6 }}>
                <View style={{ flexDirection:'row', gap:5, marginTop:10, alignItems:'center',justifyContent:'center' }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#FAFAFA' : "#000"} size={14}/>
                    <Text style={{ fontSize: 14, color: theme === 'Dark' ? '#FAFAFA' : '#666', }}>Change Payment Method</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


