import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar,ScrollView,Dimensions} from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style'

const { width } = Dimensions.get('window')

export default function PayMethodPage() {
  const navigation = useNavigation()
  const route = useRoute()
  const { plan, amount, credit } = route.params || {}
  const [selectedMethod, setSelectedMethod] = useState(null)
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
  const darkmode = theme === 'Dark'

  const paymentmethods = [
    {
      id: 'UPI',
      title: 'UPI Payment',
      subtitle: 'Pay directly from your bank account',
      icon: () => (
        <Image
          source={require('../assets/upi_logo.png')}
          style={style.payment_logo}
          resizeMode="contain"
        />
      ),
      available: true
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'All major banks supported',
      icon: () => <FontAwesome5 name="university" size={22} color={darkmode ? "#fff" : "#333"} />,
      available: false
    },
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, RuPay',
      icon: () => <MaterialCommunityIcons name="credit-card-outline" size={24} color={darkmode ? "#fff" : "#333"} />,
      available: false
    },
    {
      id: 'wallet',
      title: 'Mobile Wallets',
      subtitle: 'Paytm, PhonePe, Amazon Pay',
      icon: () => <MaterialIcons name="account-balance-wallet" size={24} color={darkmode ? "#fff" : "#333"} />,
      available: false
    }
  ]

  function handleMethodSelection(methodId){
    if (methodId === 'UPI') {
      setSelectedMethod(methodId)
    } else {
      alert('Server down. Please try again later or choose UPI payment.')
    }
  }

  const handleProceed = () => {
    navigation.navigate("payment", { 
      plan, 
      amount, 
      credit, 
      item: selectedMethod 
    })
  }

  return (
    <SafeAreaView style={[style.paymethod_container, darkmode && {backgroundColor: '#121212'}]}>
      <StatusBar barStyle={darkmode ? "light-content" : "dark-content"} />

      <View style={[style.paymethod_summarycard, darkmode && {backgroundColor: '#1e1e1e',  borderColor: '#333'}]}>
        <View style={style.paymethod_plandetails}>
          <Text style={[style.paymethod_planname, darkmode && {backgroundColor: '#ffffff'}]}>{plan} Plan</Text>
          <View style={style.amount_container}>
            <Text style={[style. paymethod_currencysymbol, darkmode && {backgroundColor: '#ffffff'}]}>₹</Text>
            <Text style={[style.paymethod_amounttext, darkmode && {backgroundColor: '#ffffff'}]}>{amount}</Text>
          </View>
        </View>
        <View style={style.benefits_container}>
          <View style={style.benefit_row}>
            <Text style={[style.benefit_text, darkmode && {color: '#cccccc'}]}>
              {credit} Credits
            </Text>
          </View>
          <View style={style.benefit_row}>
            <Text style={[style.benefit_text, darkmode && {color: '#cccccc'}]}>
              Secure Payment
            </Text>
          </View>
        </View>
      </View>

      <Text style={[style.paymethod_section_title, darkmode && {color: '#ffffff'}]}>Choose Payment Method</Text>
      
      <ScrollView 
        style={style.paymethod_methodscontainer} 
        showsVerticalScrollIndicator={false}>
        {paymentmethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              style.paymethod_methodcard,
              darkmode && { backgroundColor: '#1e1e1e',borderColor: '#333'},
              selectedMethod === item.id && style.selectedmethodcard,
              selectedMethod === item.id && darkmode && { borderColor: '#8e8eff',backgroundColor: '#222240'},
              !item.available && style.disabledmethodcard]}
            onPress={() => handleMethodSelection(item.id)}
            disabled={!item.available}
            >
            <View style={style.methodcontent}>
              <View style={[
                style.methodiconcontainer, 
                darkmode && {backgroundColor: '#333'},
                selectedMethod === item.id && style.selectedmethodiconcontainer]}>
                {item.icon()}
              </View>
              <View style={style.methodtextcontainer}>
                <Text style={[
                  style.methodtitle, 
                  darkmode && { color: '#ffffff'},
                  !item.available && {color: '#999'}]}>
                  {item.title}
                </Text>
                <Text style={[
                  style.methodsubtitle,
                  darkmode && { color: '#cccccc'},
                  !item.available && {color: '#999'}]}>
                  {item.subtitle}
                </Text>
              </View>
              {!item.available && (
                <View style={style.paymentunavailable}>
                  <Text style={style.paymentunavailabletext}>Unavailable</Text>
                </View>
              )}
            </View>
            {selectedMethod === item.id && (
              <View style={{padding:4}}>
                <MaterialIcons name="check-circle" size={24} color={darkmode ? "#8e8eff" : "#4a4aff"} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={style.securitynotice}>
        <MaterialIcons name="verified-user" size={16} color={darkmode ? "#8e8eff" : "#4a4aff"} />
        <Text style={[style.securitytext, darkmode && { color: '#cccccc'}]}>
          All transactions are secure and encrypted
        </Text>
      </View>

      <View style={style.button_container}>
        <TouchableOpacity
          style={[
            style.proceed_button,
            !selectedMethod && style.disabled_button,
            darkmode && selectedMethod && {backgroundColor: '#8e8eff'}]}
          onPress={handleProceed}
          disabled={!selectedMethod}
        >
          <Text style={style.proceedbuttontext}>
            Proceed to Pay {amount > 0 ? `₹${amount}` : ''}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
