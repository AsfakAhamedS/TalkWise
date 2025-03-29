import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import style from '../style'

export default function ProfilePage(){
    return(
        <>
        <View style={style.body}>
            <Text>Profile</Text>
        </View>
        </>
    )
}