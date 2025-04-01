import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View,Image } from 'react-native'
import HomePage from './HomePage'
import ProfilePage from './ProfilePage'
import SubscriptionPage from './SubscriptionPage'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

export default function TabNavPage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName

          if(route.name === 'Home'){
            return <FontAwesome name="home" size={23} color={color} />
          }else if(route.name === 'Plan'){
            return <MaterialCommunityIcons name="crown-outline" size={25} color={color} />
          }else if(route.name === 'Profile'){
            iconName = focused ? 'person' : 'person-outline'
            return <Ionicons name={iconName} size={20} color={color} />
          }
        },
        tabBarActiveTintColor: '#252525',
        tabBarInactiveTintColor: '#bababa',
        tabBarStyle: {
          backgroundColor: '#fff', 
          height: 60, 
          paddingBottom: 8,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      




      <Tab.Screen name="Home" 
        component={HomePage} 
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20}}>
              <Image 
                source={require('../assets/talkwisepng/Asset 2.png')} 
                style={{ width: 40, height: 40, marginRight: 7 }} 
                resizeMode="contain"
              />
              <Image source={require('../assets/talkwisepng/Asset 3.png')} 
                style={{ width: 100, height: 100 }} 
                resizeMode="contain"
              />
            </View>
          ),
          headerStyle: {
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 2,
          },
          headerTitleStyle: {
            fontSize: 18, 
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name="Plan"
        component={SubscriptionPage} 
        options={{ headerShown: false }} 
      />
     <Tab.Screen name="Profile" 
        component={ProfilePage} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  )
}
