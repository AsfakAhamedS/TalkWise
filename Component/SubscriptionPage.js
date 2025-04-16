import React, { useState, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, SafeAreaView, ImageBackground,Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import style from '../style'

const { width, height } = Dimensions.get('window')

export default function SubscriptionPage() {
  const navigation = useNavigation()
  const [selectedplan, setSelectedplan] = useState('threemonth')
  const [theme, setTheme] = useState('')

  const planInfo = {
    free: { 
      plan: 'Free', 
      amount: 0, 
      credit: 0,
      billtxt: 'Free Forever',
      features: ['Limited Credits', 'Basic Features', 'No Priority Support']
    },
    // threemonth: { 
    //   plan: 'Basic', 
    //   amount: 299, 
    //   credit: 100,
    //   billtxt: 'Billed quarterly',
    //   features: ['100 Credits', 'All Basic Features', 'Email Support'],
    //   popular: true
    // },
    // sixmonth: { 
    //   plan: 'Standard', 
    //   amount: 499, 
    //   credit: 300,
     //   billtxt: 'Billed semi-annually',
    //   features: ['300 Credits', 'All Standard Features', '24/7 Support']
    // },
    // yearly: { 
    //   plan: 'Premium', 
    //   amount: 1000, 
    //   credit: 500,
    // yearly: 'Billed One-Time',
    //   features: ['500 Credits', 'All Premium Features', 'Priority Support'] 
    // },
    yearly: { 
      plan: 'Premium', 
      amount: 1000, 
      credit: 500,
      billtxt: 'Billed One-Time',
      features: ['500 Credits', 'All Premium Features', 'Priority Support',] 
    },
  }
  
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const mode = await AsyncStorage.getItem('Mode')
        setTheme(mode)
      })()
    }, [])
  )
  const darkmode = theme === 'Dark'

  const PlanCard = ({ planKey, isPrimary = false }) => {
    const plan = planInfo[planKey]
    console?.log("plan ==>",plan)
    const selected = selectedplan === planKey
    // const isPopular = plan.popular
    
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          style.plan_cardcontainer,
          selected && style.selected_plancard,
          darkmode && {backgroundColor: '#252525',borderColor: '#333333'},
          isPrimary && {borderWidth: 2,borderColor: '#007AFF'},
        ]}
        onPress={() => setSelectedplan(planKey)}>
        {/* {isPopular && (
          <View style={style.popularBadge}>
            <Text style={style.popularText}>POPULAR</Text>
          </View>
        )} */}
        
        <View style={style.plan_header}>
          <Text style={[style.plan_name,darkmode && {backgroundColor: '#FFFFFF'},selected && {color: '#007AFF'}]}>
            {plan.plan}
          </Text>
          <View style={style.price_container}>
            <Text style={[style.currency_symbol,darkmode && {backgroundColor: '#FFFFFF'},selected && {color: '#007AFF'}]}>
              ₹
            </Text>
            <Text style={[style.plan_price,darkmode && {color: '#FFFFFF'},selected && {color: '#007AFF'}]}>
              {plan.amount}
            </Text>
          </View>
          <Text style={[style.billing_cycle,darkmode && {backgroundColor: '#CCCCCC'}]}>
            {plan.billtxt}
          </Text>
        </View>
        <View style={style.divider} />
        <View style={style.features_container}>
          {plan.features.map((feature, index) => (
            <View key={index} style={style.feature_row}>
              <View style={[
                style.checkicon_container,
                selected ? style.selected_checkicon : (darkmode ? {backgroundColor: 'rgba(10, 132, 255, 0.15)'} : {})]}>
                <FontAwesome name="check" color={selected ? "#fff" : (darkmode ? "#0A84FF" : "#007AFF")} size={10} />
              </View>
              <Text style={[style.feature_text,darkmode &&  {color: '#CCCCCC'}]}>
                {feature}
              </Text>
            </View>
          ))}
          {planKey !== 'free' && (
            <Text style={[style.credits_text,darkmode &&  {color: '#CCCCCC'}]}>
              Earn {plan.credit} Credits
            </Text>
          )}
        </View>
        {selected && (
          <View style={style.selection_indicator}>
            <FontAwesome name="check" color="#fff" size={14} />
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[style.subcription_container, darkmode && style.subcription_containerdark]}>
      <StatusBar style={darkmode ? 'light' : 'dark'} />
      
      <View style={[style.hero_section,{ height: height * 0.33 }]}>
        <ImageBackground
          source={require('../assets/subscription/subs_img.jpg')}
          style={style.hero_image}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={style.hero_overlay}>
            <TouchableOpacity 
              style={style.subcription_backbutton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={style.hero_content}>
              <View style={style.hero_tagcontainer}>
                <MaterialCommunityIcons name="key" color="#fff" size={16} />
                <Text style={style.hero_tag}>UNLOCK TALKWISE</Text>
              </View>
              <Text style={style.hero_title}>Unlock your</Text>
              <Text style={style.hero_titlebold}>Full potential</Text>
              <Text style={style.hero_subtitle}>Choose a plan that works for you</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      
      <View style={[style.plans_section, darkmode && style.plans_sectiondark]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.scroll_content}>
          <View style={style.plan_cardscontainer}>
            <PlanCard planKey="free" />
            {/* <PlanCard planKey="threemonth" />
            <PlanCard planKey="sixmonth" /> */}
            <PlanCard planKey="yearly" />
          </View>
        </ScrollView>
        
        <View style={[style.subscribe_container, darkmode && {backgroundColor: '#1E1E1E'}]}>
          <TouchableOpacity
            style={[
              style.subscribe_button,
              selectedplan === 'free' ? style.free_button : {},
              darkmode &&  {backgroundColor: '#0A84FF'}]}
            activeOpacity={0.8}
            onPress={() => {
              const { plan, amount, credit } = planInfo[selectedplan]
              navigation.navigate("paymethod", { plan, amount, credit })}}
          >
            <Text style={style.subscribe_buttontext}>
              {selectedplan === 'free' ? 'Continue with Free Plan' : 'Subscribe Now'}
            </Text>
          </TouchableOpacity>
          <View style={style.terms_container}>
            <Text style={[style.terms_text, darkmode && {backgroundColor: '#AAAAAA'}]}>
              Prices are in INR • Auto-renewal
            </Text>
            <Text style={[style.terms_text, darkmode && {backgroundColor: '#AAAAAA'}]}>
              Cancel subscription anytime
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
