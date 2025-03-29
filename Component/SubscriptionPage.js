import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {useNavigation} from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import style from '../style'

export default function SubscriptionPage(){
    const navigation = useNavigation()
    return(
        <>
         <StatusBar style='false'/>
        <View style={{flex:1,backgroundColor:'#fff'}}>
             <View style={{flex:1}}>
                <Image source={require('../assets/subscription/subs_img.jpg')} style={{ width: '100%', height: '100%' }}/>
                <View style={style.above_text}>
                    <View style={style.subscription_text}>
                        <MaterialCommunityIcons name="key" color="#fff" size={18}/>
                        <Text style={style.plan_text}>UNLOCK TALKWISE</Text>
                    </View>
                    <View style={style.subscription_main_text}>
                        <Text style={[style.userdp_subhead,{fontWeight:300,color:'#fff'}]}>Unlock your</Text>
                        <Text style={[style.userdp_subhead,{marginBottom:20,color:'#fff'}]}>Full potential</Text>
                    </View>
                    <View style={style.subscription_icon}>
                        <TouchableOpacity onPress={() => navigation.navigate('main')}>
                            <Octicons name="x" color="#fff" size={22}/>
                        </TouchableOpacity>
                    </View>
                </View>
             </View>
             <View style={style.plan}>
                <View style={style.plan_card_view}>
                    <View style={style.plan_card}>
                        <Text style={{fontSize:22,fontWeight:700,lineHeight:30,marginTop:35}}>Yearly</Text>
                        <Text style={{fontSize:22,fontWeight:700,lineHeight:30,marginBottom:35}}>₹12,000</Text>
                        <Text style={{fontSize:14,fontWeight:400,lineHeight:20}}>Only ₹1000 / monthly</Text>
                        <Text style={{fontSize:14,fontWeight:400,lineHeight:20}}>Billed yearly</Text>
                    </View>
                    <View style={style.plan_card}>
                        <Text style={{fontSize:22,fontWeight:700,lineHeight:30,marginTop:35}}>3 Months</Text>
                        <Text style={{fontSize:22,fontWeight:700,lineHeight:30,marginBottom:35}}>₹6,000</Text>
                        <Text style={{fontSize:14,fontWeight:400,lineHeight:20}}>Only ₹2000 / monthly</Text>
                        <Text style={{fontSize:14,fontWeight:400,lineHeight:20}}>Billed every 3 month</Text>
                    </View>
                </View>
             </View>
        </View>
        </>
    )
}