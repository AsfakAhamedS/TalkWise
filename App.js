import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import LandingPage from './Component/LandingPage'
import LoginPage from './Component/LoginPage'
import ForgetPage from './Component/ForgetPage'
import SignupPage from './Component/SignupPage'
import UserNamePage from './Component/UserNamePage'
import UserAgePage from './Component/UserAgePage'
import UserProfilePage from './Component/UserProfilePage'
import UserComLevelPage from './Component/UserComLevelPage'
import TabNavPage from './Component/TabNavPage'
import PlanPage from './Component/PlanPage'
import PayMethodPage from './Component/PayMethodPage'
import PaymentPage from './Component/PaymentPage'
import EditProfilePage from './Component/EditProfilePage'
import LessonPage from './Component/LessonPage'
import UserChat from './Component/UserChat'
import QuizPage from './Component/QuizPage'
import SupportPage from './Component/SupportPage'
import AiChatPage from './Component/AiChatPage'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator()
export default function App() {
  const [screen, setScreen] = useState(Dimensions.get('window'))

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreen(window)
    }
    const eventremove = Dimensions.addEventListener('change', onChange)
    return () => {
      eventremove?.remove()
    }
  }, [])

  return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen 
            name="ai" 
            component={AiChatPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack('')} style={{ position:'relative',left:'80%' }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          /> */}
          
          <Stack.Screen 
            name="main" 
            component={TabNavPage} 
            options={{headerShown:false}}
          />


          <Stack.Screen 
            name="landing" 
            component={LandingPage} 
            options={{
              title:false,
              headerStyle: { backgroundColor: '#fff', elevation: 0 }
            }}
          />
          <Stack.Screen 
            name="login" 
            component={LoginPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => null,
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('landing')} style={{ marginRight: 20 }}>
                  <Ionicons name="close" size={28} color="black" />
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="forget" 
            component={ForgetPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => null,
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ marginRight: 20 }}>
                  <Ionicons name="close" size={28} color="black" />
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="signup" 
            component={SignupPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => null,
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ marginRight: 20 }}>
                  <Ionicons name="close" size={28} color="black" />
                </TouchableOpacity>
              ),
            })} 
          />
          <Stack.Screen 
            name="username" 
            component={UserNamePage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack('')} style={{ position:'relative',left:'80%' }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          />
          <Stack.Screen 
            name="userage" 
            component={UserAgePage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack('')} style={{ position:'relative',left:'80%' }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          />
          <Stack.Screen 
            name="userpic" 
            component={UserProfilePage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack('')} style={{ position:'relative',left:'80%' }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          />
          <Stack.Screen 
            name="userlevel" 
            component={UserComLevelPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack('')} style={{ position:'relative',left:'80%' }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          />
          <Stack.Screen 
            name="plan" 
            component={PlanPage}
            options={{headerShown:false}} 
          />
          <Stack.Screen 
            name="paymethod" 
            component={PayMethodPage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light'
              return {
                title: 'Payment',
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={{ paddingLeft: 15, alignItems: 'center', justifyContent: 'center', height: '100%'  }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={28} />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: theme === 'Dark' ? '#252525' : '#fff',
                  elevation: 0,
                },
                headerTintColor: theme === 'Dark' ? '#fff' : '#000',
              }
            }} 
          />
          <Stack.Screen 
            name="payment" 
            component={PaymentPage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light'
              return {
                title: 'Payment', 
                headerTitleAlign: 'center',       
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack('')} 
                    style={{ paddingLeft: 15, alignItems: 'center', justifyContent: 'center', height: '100%'  }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={28} />
                  </TouchableOpacity>
                ),
                headerStyle: { backgroundColor: theme === 'Dark' ? '#252525' : '#fff', elevation: 0 },
                headerTintColor: theme === 'Dark' ? '#fff' : '#000',
              }
            }} 
          />
          

          <Stack.Screen 
            name="lesson" 
            component={LessonPage}
            options={({ route, navigation }) => {
              const section = route.params?.level
             return {
                headerTitle: () => (
                  <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                    {section} Level
                  </Text>
                ),
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack('')} style={{ paddingHorizontal: 16 }}>
                    <AntDesign name="arrowleft" color="#000" size={28} />
                  </TouchableOpacity>
                ),
                headerStyle: { backgroundColor: '#fff', elevation: 0 },
                headerTitleAlign: 'center'
             }
            }} 
          /> 
         

          <Stack.Screen 
            name="chat" 
            component={UserChat}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                  Chat
                </Text>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
              headerTitleAlign: 'center'
            })}
          />
          <Stack.Screen 
            name="quiz" 
            component={QuizPage}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                  Quiz
                </Text>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
                  <AntDesign name="arrowleft" color="#000" size={28} />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
              headerTitleAlign: 'center'
            })}
          />


          <Stack.Screen 
            name="edit" 
            component={EditProfilePage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light'
              return {
                headerTitle: () => (
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme === 'Dark' ? '#fff' : '#000',
                    textAlign: 'center'
                  }}>
                    Edit Profile
                  </Text>
                ),
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={28} />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: theme === 'Dark' ? '#252525' : '#fff',
                  elevation: 0
                },
                headerTitleAlign: 'center'
              }
            }}
          />
          <Stack.Screen 
            name="support" 
            component={SupportPage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light'
              return {
                headerTitle: () => (
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme === 'Dark' ? '#fff' : '#000',
                    textAlign: 'center'
                  }}>
                    Support
                  </Text>
                ),
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={28} />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: theme === 'Dark' ? '#252525' : '#fff',
                  elevation: 0
                },
                headerTitleAlign: 'center'
              }
            }}
          />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}