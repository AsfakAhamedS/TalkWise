import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import style from '../style'
import { Pressable, ScrollView } from 'react-native-gesture-handler'

export default function PlanPage(){
    const navigation = useNavigation()
    const [selectedplan, setSelectedplan] = useState('free')
    const [theme, setTheme] = useState('')
    const planinfo = {
        free: { plan: 'Free', amount: 0, credit: 0 },
        threemonth: { plan: 'Basic', amount: 299, credit: 100 },
        sixmonth: { plan: 'Standard', amount: 499, credit: 300 },
        yearly: { plan: 'Premium', amount: 1000, credit: 500 },
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
              const mode = await AsyncStorage.getItem('Mode')
              setTheme(mode)
            })()
        }, [])
    )
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
                <View style={[style.plan,theme === 'Dark' ? {backgroundColor:'#252525',borderColor:'#252525'} : {}]}>
                    <ScrollView style={{marginTop:50}}>
                        <View style={style.plan_card_view} >
                            <Pressable 
                                style={[style.plan_card, selectedplan === "free" ? { borderColor: '#007AFF' } : {}]}
                                onPress={() => setSelectedplan("free")}>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35, color: theme === 'Dark' ? '#FAFAFA' : null }}>{planinfo.free.plan}</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>₹{planinfo.free.amount}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Limited Credits</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Limited access only</Text>
                                {selectedplan === "free" ? 
                                (<View style={style.plan_circle}>
                                    <FontAwesome name="check" color="#fff" size={13} />
                                </View>) : null}
                            </Pressable>
                            <Pressable 
                                style={[style.plan_card,selectedplan === "threemonth" ? { borderColor: '#007AFF' } : {}]}
                                onPress={() => setSelectedplan("threemonth")}>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>{planinfo.threemonth.plan}</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>₹{planinfo.threemonth.amount}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Earned {planinfo.threemonth.credit} Credits</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Billed every 3 months</Text>
                                {selectedplan === "threemonth" ?
                                (<View style={style.plan_circle}>
                                    <FontAwesome name="check" color="#fff" size={13} />
                                </View>) : null}
                            </Pressable>
                        </View>
                        <View style={style.plan_card_view}>
                            <Pressable 
                                style={[style.plan_card, selectedplan === "sixmonth" ? { borderColor: '#007AFF' } : {}]}
                                onPress={() => setSelectedplan("sixmonth")}>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>{planinfo.sixmonth.plan}</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>₹{planinfo.sixmonth.amount}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Earned {planinfo.sixmonth.credit} Credits</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Billed every 6 months</Text>
                                {selectedplan === "sixmonth" ? 
                                (<View style={style.plan_circle}>
                                    <FontAwesome name="check" color="#fff" size={13} />
                                </View>) : null}
                            </Pressable>
                            <Pressable 
                                style={[style.plan_card,selectedplan === "yearly" ? { borderColor: '#007AFF' } : {}]}
                                onPress={() => setSelectedplan("yearly")}>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginTop: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>{planinfo.yearly.plan}</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 35, color: theme === 'Dark' ? '#FAFAFA' : null  }}>₹{planinfo.yearly.amount}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Earned {planinfo.yearly.credit} Credits</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 20, color: theme === 'Dark' ? '#FAFAFA' : null  }}>Billed yearly</Text>
                                {selectedplan === "yearly" ?
                                (<View style={style.plan_circle}>
                                    <FontAwesome name="check" color="#fff" size={13} />
                                </View>) : null}
                            </Pressable>
                        </View>
                    </ScrollView>
                    <View style={style.subscribe_btn}>
                        <TouchableOpacity 
                            style={[style.subscribe_btn_to,theme === 'Dark' ? {backgroundColor: '#0A84FF'} : {}]} 
                            activeOpacity={0.4} 
                            onPress={() => {
                                const { plan, amount, credit } = planinfo[selectedplan]
                                AsyncStorage.setItem('FromLogin', 'true')
                                navigation.navigate("paymethod", {plan, amount, credit})}}
                            disabled={!selectedplan}>
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