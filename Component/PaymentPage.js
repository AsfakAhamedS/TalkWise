import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from '../style';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

export default function PaymentPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const { plan, amount, credit, method } = route.params || {};
    
    // State management
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        phone: ''
    });
    const [userCredits, setUserCredits] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [theme, setTheme] = useState('Light');
    const [error, setError] = useState(null);
    
    // Theme setup
    useFocusEffect(
        useCallback(() => {
            const loadTheme = async () => {
                try {
                    const mode = await AsyncStorage.getItem('Mode');
                    setTheme(mode || 'Light');
                    navigation.setParams({ theme: mode });
                } catch (err) {
                    console.error("Failed to load theme:", err);
                }
            };
            
            loadTheme();
        }, [])
    );

    // Load user data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userEmail = await AsyncStorage.getItem('Email');
                if (!userEmail) {
                    setError("User not authenticated");
                    setIsLoading(false);
                    return;
                }
                
                setUserData(prev => ({ ...prev, email: userEmail }));
                fetchUserInfo(userEmail);
                fetchSubscriptionInfo(userEmail);
            } catch (err) {
                setError("Failed to load user data");
                setIsLoading(false);
            }
        };
        
        loadUserData();
    }, []);
    
    // Fetch user profile information
    const fetchUserInfo = async (userEmail) => {
        try {
            const response = await axios.post(`${API_URL}get-user-avatar`, { 
                type: 'getuserdata', 
                useremail: userEmail 
            });
            
            if (response.status === 200) {
                setUserData({
                    email: response.data.email,
                    name: response.data.name,
                    phone: response.data.phone
                });
            }
        } catch (err) {
            console.error("Error fetching user data:", err.response?.data || err.message);
            setError("Could not load user information");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fetch subscription details
    const fetchSubscriptionInfo = async (userEmail) => {
        try {
            const response = await axios.post(`${API_URL}user-subscription`, { 
                useremail: userEmail 
            });
            
            if (response.status === 200) {
                setUserCredits(response.data.credit);
            }
        } catch (err) {
            console.error("Error fetching subscription data:", err.response?.data || err.message);
            setError("Could not load subscription information");
        }
    };
    
    // Process payment
    const processPayment = async () => {
        try {
            const response = await axios.post(`${API_URL}user-payment`, {
                paidusername: userData.name,
                paiduseremail: userData.email,
                paiduserphone: userData.phone,
                plan: plan,
                credits: credit,
                paymethod: method,
                amount: amount
            });
            
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("Payment error:", err.response?.data || err.message);
            throw new Error("Payment processing failed");
        }
    };

    // Handle payment button press
    const handlePayment = async () => {
        if (isPaid) return;
        
        setIsLoading(true);
        try {
            const success = await processPayment();
            
            if (success) {
                setIsPaid(true);
                setUserCredits(prev => prev + credit);
                
                Alert.alert(
                    "Payment Successful",
                    `₹${amount} paid via ${method}\nYou've earned ${credit} new credits.\nA receipt has been sent to your email.`,
                    [{ text: "OK", onPress: () => navigation.navigate("main") }],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    "Payment Failed",
                    "There was an issue processing your payment. Please try again.",
                    [{ text: "OK" }]
                );
            }
        } catch (err) {
            Alert.alert(
                "Payment Error",
                err.message || "An unexpected error occurred",
                [{ text: "OK" }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Determine component colors based on theme
    const isDark = theme === 'Dark';
    const colors = {
        background: isDark ? '#252525' : '#F7F7F7',
        card: isDark ? '#2E2E2E' : '#FFFFFF',
        text: isDark ? '#FAFAFA' : '#333333',
        subtext: isDark ? '#BBBBBB' : '#666666',
        primary: isDark ? '#0A84FF' : '#4285F4',
        buttonText: '#FFFFFF',
        disabledButton: '#555555',
        border: isDark ? '#444444' : '#EEEEEE',
    };

    // Loading and error states
    if (isLoading && !isPaid) {
        return (
            <View style={[style.payment_mainpaycon, { backgroundColor: colors.background, justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.text, marginTop: 15, textAlign: 'center' }}>Loading payment details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[style.payment_mainpaycon, { backgroundColor: colors.background, justifyContent: 'center' }]}>
                <AntDesign name="exclamationcircle" size={50} color="#FF6B6B" />
                <Text style={{ color: colors.text, marginTop: 15, textAlign: 'center', fontSize: 18 }}>{error}</Text>
                <TouchableOpacity 
                    style={{
                        marginTop: 20,
                        backgroundColor: colors.primary,
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Text style={{ color: colors.buttonText, fontWeight: '500' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <View style={[style.payment_mainpaycon, { backgroundColor: colors.background, paddingBottom: 30 }]}>
                <Text style={[style.payment_heading, { color: colors.text, marginBottom: 20, fontSize: 24, fontWeight: '600' }]}>
                    Payment Details
                </Text>

                {/* User Information Card */}
                <View style={[
                    style.payment_detailscart, 
                    { 
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: colors.border
                    }
                ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <FontAwesome name="user-circle" size={18} color={colors.primary} />
                        <Text style={[
                            style.payment_sectitle, 
                            { 
                                color: colors.text, 
                                marginLeft: 8,
                                fontSize: 18,
                                fontWeight: '600' 
                            }
                        ]}>User Information</Text>
                    </View>
                    
                    <View style={{ marginLeft: 4 }}>
                        <Text style={[style.payment_detailtext, { color: colors.text, marginBottom: 8 }]}>
                            <Text style={{ fontWeight: '500' }}>Name:</Text> {userData.name}
                        </Text>
                        <Text style={[style.payment_detailtext, { color: colors.text, marginBottom: 8 }]}>
                            <Text style={{ fontWeight: '500' }}>Email:</Text> {userData.email}
                        </Text>
                        <Text style={[style.payment_detailtext, { color: colors.text }]}>
                            <Text style={{ fontWeight: '500' }}>Phone:</Text> {userData.phone}
                        </Text>
                    </View>
                </View>

                {/* Plan Details Card */}
                <View style={[
                    style.payment_detailscart,
                    { 
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: colors.border
                    }
                ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <FontAwesome name="credit-card" size={18} color={colors.primary} />
                        <Text style={[
                            style.payment_sectitle, 
                            { 
                                color: colors.text, 
                                marginLeft: 8,
                                fontSize: 18,
                                fontWeight: '600' 
                            }
                        ]}>Plan Details</Text>
                    </View>

                    {/* Plan info with better formatting */}
                    <View style={{ marginBottom: 18 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>Plan</Text>
                            <Text style={{ color: colors.text, fontWeight: '500', fontSize: 15 }}>{plan || "Not selected"}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>Amount</Text>
                            <Text style={{ color: colors.text, fontWeight: '600', fontSize: 15 }}>₹{amount || 0}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>Payment Method</Text>
                            <Text style={{ color: colors.text, fontWeight: '500', fontSize: 15 }}>{method || "N/A"}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>Credits Earned</Text>
                            <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 15 }}>{credit || 0} Credits</Text>
                        </View>
                    </View>
                </View>

                {/* Credit Summary Card */}
                <View style={[
                    style.payment_detailscart,
                    { 
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 24,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: colors.border
                    }
                ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <FontAwesome name="star" size={18} color={colors.primary} />
                        <Text style={[
                            style.payment_sectitle, 
                            { 
                                color: colors.text, 
                                marginLeft: 8,
                                fontSize: 18,
                                fontWeight: '600' 
                            }
                        ]}>Credit Summary</Text>
                    </View>

                    <View style={{ marginBottom: 4 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>Current Credits</Text>
                            <Text style={{ color: colors.text, fontWeight: '500', fontSize: 15 }}>{userCredits}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.subtext, fontSize: 15 }}>After Payment</Text>
                            <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 15 }}>{userCredits + credit} Credits</Text>
                        </View>
                    </View>
                    
                    <Text style={{ color: colors.subtext, fontSize: 13, marginTop: 8, fontStyle: 'italic' }}>
                        Credits will be applied immediately after payment
                    </Text>
                </View>

                {/* Payment Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: isPaid ? colors.disabledButton : colors.primary,
                        paddingVertical: 16,
                        borderRadius: 10,
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 2,
                    }}
                    onPress={handlePayment}
                    disabled={isPaid || isLoading}>
                    {isLoading && isPaid === false ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={{ color: colors.buttonText, fontSize: 16, fontWeight: '600' }}>
                            {isPaid ? "Payment Complete" : `Pay ₹${amount} Now`}
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={{ alignSelf: 'center', padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="arrowleft" color={colors.subtext} size={14} />
                        <Text style={{ fontSize: 14, color: colors.subtext, marginLeft: 5 }}>
                            Change Payment Method
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}