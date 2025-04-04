import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from '../style'

export default function PaymentPage() {
    const navigation = useNavigation()
    const route = useRoute()
    const { plan, price, credits } = route.params || {}


    const [selectedMethod, setSelectedMethod] = useState(null)
    const [userCredits, setUserCredits] = useState(0)  

    const handlePayment = () => {
        alert(`Payment of ₹${price} via ${selectedMethod} successful! 🎉`)
        setUserCredits(prev => prev + credits)  
    }

    return (
        <View style={style.paycontainer}>
    
            <Text style={style.paytitle}>Payment Details</Text>

   
            <View style={style.detailsbox}>
                <Text style={style.courseTitle}>Selected Plan:</Text>
                <Text style={style.courseText}>{plan || "No Plan Selected"}</Text>
                <Text style={style.priceText}>Amount: ₹{price || 0}</Text>
                <Text style={style.creditText}>Earned Credits: {credits || 0}</Text>
            </View>
        </View>
    )
}



