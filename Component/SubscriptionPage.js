import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {useNavigation} from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import style from '../style'
import { ScrollView } from 'react-native-gesture-handler'

export default function SubscriptionPage(){
    const navigation = useNavigation()
    const [selectedPlan, setSelectedPlan] = useState(null)
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
                </View>
             </View>
             <View style={style.plan}>
                <ScrollView style={{marginTop:50}}>
                    <View style={style.plan_card_view}>
                        <TouchableOpacity 
                            style={[style.plan_card, selectedPlan === "onemonth" ? { borderColor: '#007AFF' } : {}]}
                            onPress={() => setSelectedPlan("onemonth")}>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35 }}>1 Month</Text>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35 }}>₹299</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Earned 50 Credits</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Billed month</Text>
                            {selectedPlan === "onemonth" ? 
                            (<View style={style.plan_circle}>
                                <FontAwesome name="check" color="#fff" size={13} />
                            </View>) : null}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[style.plan_card,selectedPlan === "threemonth" ? { borderColor: '#007AFF' } : {}]}
                            onPress={() => setSelectedPlan("threemonth")}>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35 }}>3 Months</Text>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35 }}>₹499</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Earned 100 Credits</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Billed every 3 months</Text>
                            {selectedPlan === "threemonth" ?
                            (<View style={style.plan_circle}>
                                <FontAwesome name="check" color="#fff" size={13} />
                            </View>) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={style.plan_card_view}>
                        <TouchableOpacity 
                            style={[style.plan_card, selectedPlan === "sixmonth" ? { borderColor: '#007AFF' } : {}]}
                            onPress={() => setSelectedPlan("sixmonth")}>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35 }}>6 Months</Text>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35 }}>₹1,000</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Earned 300 Credits</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Billed every 6 months</Text>
                            {selectedPlan === "sixmonth" ? 
                            (<View style={style.plan_circle}>
                                <FontAwesome name="check" color="#fff" size={13} />
                            </View>) : null}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[style.plan_card,selectedPlan === "yearly" ? { borderColor: '#007AFF' } : {}]}
                            onPress={() => setSelectedPlan("yearly")}>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35 }}>Yearly</Text>
                            <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35 }}>₹1,500</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Earned 500 Credits</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}>Billed yearly</Text>
                            {selectedPlan === "yearly" ?
                            (<View style={style.plan_circle}>
                                <FontAwesome name="check" color="#fff" size={13} />
                            </View>) : null}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={style.subscribe_btn}>
                    <TouchableOpacity style={style.subscribe_btn_to} activeOpacity={0.4} >
                        <Text style={style.subscribe_btn_text}>Subscribe now</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={style.subscribe_txt}>Prices are in INR</Text>
                    <Text style={style.subscribe_txt}>Auto renewal, Cancel anytime</Text>
                </View>
             </View>
        </View>
        </>
    )
}