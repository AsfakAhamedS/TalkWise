import React, { useEffect, useState } from 'react'
import { Text, View,Touchable, TouchableOpacity, TextInput, Image } from 'react-native'
import style from '../style'

export default function HomePage(){
    return(
        <>
        <View style={style.body}>
            <Text>Home</Text>
        </View>
        </>
    )
}