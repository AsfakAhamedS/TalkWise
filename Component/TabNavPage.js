import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './HomePage'
import ProfilePage from './ProfilePage'
import { Ionicons } from '@expo/vector-icons'


const Tab = createBottomTabNavigator()

export default function TabNavPage() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="home" component={HomePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  )
}
