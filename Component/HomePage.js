import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity } from 'react-native'
import style from '../style'
import { Pressable, TextInput } from 'react-native-gesture-handler'


export default function HomePage() {

  return (
    <View style={style.body}>
        <Text>Home</Text>
    </View>
  )
}