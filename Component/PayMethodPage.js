import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function PayMethodPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plan, amount, credit } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [theme, setTheme] = useState('');

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const mode = await AsyncStorage.getItem('Mode');
        setTheme(mode);
        navigation.setParams({ theme: mode });
      })();
    }, [])
  );

  const isDark = theme === 'Dark';

  const paymentMethods = [
    {
      id: 'UPI',
      title: 'UPI Payment',
      subtitle: 'Pay directly from your bank account',
      icon: () => (
        <Image
          source={require('../assets/upi_logo.png')}
          style={styles.paymentLogo}
          resizeMode="contain"
        />
      ),
      available: true
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'All major banks supported',
      icon: () => <FontAwesome5 name="university" size={22} color={isDark ? "#fff" : "#333"} />,
      available: false
    },
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, RuPay',
      icon: () => <MaterialCommunityIcons name="credit-card-outline" size={24} color={isDark ? "#fff" : "#333"} />,
      available: false
    },
    {
      id: 'wallet',
      title: 'Mobile Wallets',
      subtitle: 'Paytm, PhonePe, Amazon Pay',
      icon: () => <MaterialIcons name="account-balance-wallet" size={24} color={isDark ? "#fff" : "#333"} />,
      available: false
    }
  ];

  const handleMethodSelection = (methodId) => {
    if (methodId === 'UPI') {
      setSelectedMethod(methodId);
    } else {
      alert('Server down. Please try again later or choose UPI payment.');
    }
  };

  const handleProceed = () => {
    navigation.navigate("payment", { 
      plan, 
      amount, 
      credit, 
      method: selectedMethod 
    });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textLight]}>Payment Method</Text>
        <View style={styles.placeholderView} />
      </View>

      {/* Summary Card */}
      <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
        <View style={styles.planDetails}>
          <Text style={[styles.planName, isDark && styles.textLight]}>{plan} Plan</Text>
          <View style={styles.amountContainer}>
            <Text style={[styles.currencySymbol, isDark && styles.textLight]}>₹</Text>
            <Text style={[styles.amountText, isDark && styles.textLight]}>{amount}</Text>
          </View>
        </View>
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitRow}>
            <MaterialIcons name="star" size={16} color={isDark ? "#ffd700" : "#ffc107"} />
            <Text style={[styles.benefitText, isDark && styles.textLightSecondary]}>
              {credit} Credits
            </Text>
          </View>
          <View style={styles.benefitRow}>
            <MaterialIcons name="security" size={16} color={isDark ? "#8e8eff" : "#4a4aff"} />
            <Text style={[styles.benefitText, isDark && styles.textLightSecondary]}>
              Secure Payment
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Choose Payment Method</Text>
      
      <ScrollView style={styles.methodsContainer} showsVerticalScrollIndicator={false}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              isDark && styles.methodCardDark,
              selectedMethod === method.id && styles.selectedMethodCard,
              selectedMethod === method.id && isDark && styles.selectedMethodCardDark,
              !method.available && styles.disabledMethodCard
            ]}
            onPress={() => handleMethodSelection(method.id)}
            disabled={!method.available}
          >
            <View style={styles.methodContent}>
              <View style={[
                styles.methodIconContainer, 
                isDark && styles.methodIconContainerDark,
                selectedMethod === method.id && styles.selectedMethodIconContainer
              ]}>
                {method.icon()}
              </View>
              <View style={styles.methodTextContainer}>
                <Text style={[
                  styles.methodTitle, 
                  isDark && styles.textLight,
                  !method.available && styles.disabledText
                ]}>
                  {method.title}
                </Text>
                <Text style={[
                  styles.methodSubtitle,
                  isDark && styles.textLightSecondary,
                  !method.available && styles.disabledText
                ]}>
                  {method.subtitle}
                </Text>
              </View>
              {!method.available && (
                <View style={styles.unavailableBadge}>
                  <Text style={styles.unavailableText}>Unavailable</Text>
                </View>
              )}
            </View>
            
            {selectedMethod === method.id && (
              <View style={styles.checkIconContainer}>
                <MaterialIcons name="check-circle" size={24} color={isDark ? "#8e8eff" : "#4a4aff"} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <MaterialIcons name="verified-user" size={16} color={isDark ? "#8e8eff" : "#4a4aff"} />
        <Text style={[styles.securityText, isDark && styles.textLightSecondary]}>
          All transactions are secure and encrypted
        </Text>
      </View>

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            !selectedMethod && styles.disabledButton,
            isDark && selectedMethod && styles.proceedButtonDark
          ]}
          onPress={handleProceed}
          disabled={!selectedMethod}
        >
          <Text style={styles.proceedButtonText}>
            Proceed to Pay {amount > 0 ? `₹${amount}` : ''}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholderView: {
    width: 40,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryCardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 3,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  benefitsContainer: {
    marginTop: 4,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  methodsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  methodCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodCardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  selectedMethodCard: {
    borderColor: '#4a4aff',
    borderWidth: 2,
    backgroundColor: '#f8f8ff',
  },
  selectedMethodCardDark: {
    borderColor: '#8e8eff',
    backgroundColor: '#222240',
  },
  disabledMethodCard: {
    opacity: 0.7,
  },
  methodContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodIconContainerDark: {
    backgroundColor: '#333',
  },
  selectedMethodIconContainer: {
    backgroundColor: '#e6e6ff',
  },
  paymentLogo: {
    width: 30,
    height: 30,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  disabledText: {
    color: '#999',
  },
  checkIconContainer: {
    padding: 4,
  },
  unavailableBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  unavailableText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  securityText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  proceedButton: {
    backgroundColor: '#4a4aff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  proceedButtonDark: {
    backgroundColor: '#8e8eff',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  proceedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  textLight: {
    color: '#ffffff',
  },
  textLightSecondary: {
    color: '#cccccc',
  },
});