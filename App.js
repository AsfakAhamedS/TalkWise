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
import UserNativeLanPage from './Component/UserNativeLanPage'
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
import TicketPage from './Component/TicketPage'
import MyProgressPage from './Component/MyProgressPage'
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
            options={{headerShown:false}}
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
               <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                  marginLeft:15,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#F3F4F6',
                  justifyContent: 'center',
                  alignItems: 'center', }}>
                  <Ionicons name="arrow-back" size={20} color={'#111827'} />
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                   marginLeft:15,
                   width: 40,
                   height: 40,
                   borderRadius: 20,
                   backgroundColor: '#F3F4F6',
                   justifyContent: 'center',
                   alignItems: 'center', }}>
                   <Ionicons name="arrow-back" size={20} color={'#111827'} />
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                   marginLeft:15,
                   width: 40,
                   height: 40,
                   borderRadius: 20,
                   backgroundColor: '#F3F4F6',
                   justifyContent: 'center',
                   alignItems: 'center', }}>
                   <Ionicons name="arrow-back" size={20} color={'#111827'} />
                 </TouchableOpacity>
               ),
              headerStyle: { backgroundColor: '#fff', elevation: 0 },
            })} 
          />
          <Stack.Screen 
            name="nativelan" 
            component={UserNativeLanPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                   marginLeft:15,
                   width: 40,
                   height: 40,
                   borderRadius: 20,
                   backgroundColor: '#F3F4F6',
                   justifyContent: 'center',
                   alignItems: 'center', }}>
                   <Ionicons name="arrow-back" size={20} color={'#111827'} />
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
                title: false,
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                  }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#F3F4F6',
                      justifyContent: 'center',
                      alignItems: 'center', }}>
                      <Ionicons 
                        name="arrow-back" 
                        size={20} 
                        color={theme === 'Dark' ? '#FFFFFF' : '#111827'} 
                      />
                    </TouchableOpacity>
                    <Text style={{ 
                      marginLeft:15,
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#333',
                    }}>
                      Payment Method
                    </Text>
                  </View>
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
                title: false,     
                headerLeft: () => (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                  }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#F3F4F6',
                      justifyContent: 'center',
                      alignItems: 'center', }}>
                      <Ionicons 
                        name="arrow-back" 
                        size={20} 
                        color={theme === 'Dark' ? '#FFFFFF' : '#111827'} 
                      />
                    </TouchableOpacity>
                    <Text style={{ 
                      marginLeft:15,
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#333',
                    }}>
                      Payment
                    </Text>
                  </View>
                ),
                headerStyle: { backgroundColor: theme === 'Dark' ? '#252525' : '#fff', elevation: 0 },
                headerTintColor: theme === 'Dark' ? '#fff' : '#000',
              }
            }} 
          />
          

          <Stack.Screen 
            name="userlevel" 
            component={UserComLevelPage}
            options={{headerShown:false}} 
          />
          <Stack.Screen 
            name="lesson" 
            component={LessonPage}
            options={{headerShown:false}} 
          /> 
          <Stack.Screen 
            name="chat" 
            component={UserChat}
            options={{headerShown:false}}
          />
           <Stack.Screen 
            name="quiz" 
            component={QuizPage}
            options={({ navigation }) => ({
              title:false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                  marginLeft:15, 
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#F3F4F6',
                  justifyContent: 'center',
                  alignItems: 'center', }}>
                  <Ionicons 
                    name="arrow-back" 
                    size={20} 
                    color={ '#111827'} 
                  />
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
            name="ticketstatus" 
            component={TicketPage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light'
              return {
                title: false,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
                    marginLeft:15,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#F3F4F6',
                    justifyContent: 'center',
                    alignItems: 'center', }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={20} />
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
                title: false,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{  
                    marginLeft:15,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#F3F4F6',
                    justifyContent: 'center',
                    alignItems: 'center', }}>
                    <AntDesign name="arrowleft" color={theme === 'Dark' ? '#fff' : '#000'} size={20} />
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
            name="myprogress" 
            component={MyProgressPage}
            options={({ route, navigation }) => {
              const theme = route.params?.theme || 'Light';
              return {
                headerTitle: () => (
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme === 'Dark' ? '#fff' : '#000',
                    textAlign: 'center'
                  }}>
                    My Progress
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