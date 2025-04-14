import React, { useState, useCallback } from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

export default function SubscriptionPage() {
  const navigation = useNavigation()
  const [selectedPlan, setSelectedPlan] = useState('threemonth')
  const [theme, setTheme] = useState('')

  const planInfo = {
    free: { 
      plan: 'Free', 
      amount: 0, 
      credit: 0,
      features: ['Limited Credits', 'Basic Features', 'No Priority Support']
    },
    threemonth: { 
      plan: 'Basic', 
      amount: 299, 
      credit: 100,
      features: ['100 Credits', 'All Basic Features', 'Email Support'],
      popular: true
    },
    sixmonth: { 
      plan: 'Standard', 
      amount: 499, 
      credit: 300,
      features: ['300 Credits', 'All Standard Features', '24/7 Support']
    },
    yearly: { 
      plan: 'Premium', 
      amount: 1000, 
      credit: 500,
      features: ['500 Credits', 'All Premium Features', 'Priority Support'] 
    },
  }
  
  const billingCycle = {
    free: 'Free forever',
    threemonth: 'Billed quarterly',
    sixmonth: 'Billed semi-annually',
    yearly: 'Billed annually',
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const mode = await AsyncStorage.getItem('Mode')
        setTheme(mode)
      })()
    }, [])
  )

  const isDark = theme === 'Dark'

  const PlanCard = ({ planKey, isPrimary = false }) => {
    const plan = planInfo[planKey]
    const isSelected = selectedPlan === planKey
    const isPopular = plan.popular
    
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.planCard,
          isSelected && styles.selectedPlanCard,
          isDark && styles.planCardDark,
          isPrimary && styles.primaryPlanCard
        ]}
        onPress={() => setSelectedPlan(planKey)}
      >
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}
        
        <View style={styles.planHeader}>
          <Text style={[
            styles.planName,
            isDark && styles.textLight,
            isSelected && styles.selectedText
          ]}>
            {plan.plan}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[
              styles.currencySymbol,
              isDark && styles.textLight,
              isSelected && styles.selectedText
            ]}>
              ₹
            </Text>
            <Text style={[
              styles.planPrice,
              isDark && styles.textLight,
              isSelected && styles.selectedText
            ]}>
              {plan.amount}
            </Text>
          </View>
          
          <Text style={[
            styles.billingCycle,
            isDark && styles.textLightSecondary
          ]}>
            {billingCycle[planKey]}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={[
                styles.checkIconContainer,
                isSelected ? styles.selectedCheckIcon : (isDark ? styles.darkCheckIcon : {})
              ]}>
                <FontAwesome name="check" color={isSelected ? "#fff" : (isDark ? "#0A84FF" : "#007AFF")} size={10} />
              </View>
              <Text style={[
                styles.featureText,
                isDark && styles.textLightSecondary
              ]}>
                {feature}
              </Text>
            </View>
          ))}
          
          {planKey !== 'free' && (
            <Text style={[
              styles.creditsText,
              isDark && styles.textLightSecondary
            ]}>
              Earn {plan.credit} Credits
            </Text>
          )}
        </View>
        
        {isSelected && (
          <View style={styles.selectionIndicator}>
            <FontAwesome name="check" color="#fff" size={14} />
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.heroSection}>
        <ImageBackground
          source={require('../assets/subscription/subs_img.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={styles.heroOverlay}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.heroContent}>
              <View style={styles.heroTagContainer}>
                <MaterialCommunityIcons name="key" color="#fff" size={16} />
                <Text style={styles.heroTag}>UNLOCK TALKWISE</Text>
              </View>
              
              <Text style={styles.heroTitle}>Unlock your</Text>
              <Text style={styles.heroTitleBold}>Full potential</Text>
              
              <Text style={styles.heroSubtitle}>
                Choose a plan that works for you
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      
      <View style={[styles.plansSection, isDark && styles.plansSectionDark]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.planCardsContainer}>
            <PlanCard planKey="free" />
            <PlanCard planKey="threemonth" />
            <PlanCard planKey="sixmonth" />
            <PlanCard planKey="yearly" />
          </View>
        </ScrollView>
        
        <View style={styles.subscribeContainer}>
          <TouchableOpacity
            style={[
              styles.subscribeButton,
              selectedPlan === 'free' ? styles.freeButton : {},
              isDark && styles.subscribeButtonDark
            ]}
            activeOpacity={0.8}
            onPress={() => {
              const { plan, amount, credit } = planInfo[selectedPlan]
              navigation.navigate("paymethod", { plan, amount, credit })
            }}
          >
            <Text style={styles.subscribeButtonText}>
              {selectedPlan === 'free' ? 'Continue with Free Plan' : 'Subscribe Now'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.termsContainer}>
            <Text style={[styles.termsText, isDark && styles.termsTextDark]}>
              Prices are in INR • Auto-renewal
            </Text>
            <Text style={[styles.termsText, isDark && styles.termsTextDark]}>
              Cancel subscription anytime
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  heroSection: {
    height: height * 0.33,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 24,
    left: 16,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    marginBottom: 16,
  },
  heroTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroTag: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
  heroTitleBold: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 4,
  },
  plansSection: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
  },
  plansSectionDark: {
    backgroundColor: '#1E1E1E',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  planCardsContainer: {
    paddingBottom: 24,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    position: 'relative',
  },
  planCardDark: {
    backgroundColor: '#252525',
    borderColor: '#333333',
  },
  primaryPlanCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  selectedPlanCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#FF9500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 4,
  },
  planPrice: {
    fontSize: 34,
    fontWeight: '700',
    color: '#333333',
  },
  billingCycle: {
    fontSize: 14,
    color: '#666666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 16,
  },
  featuresContainer: {
    marginTop: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E6F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  darkCheckIcon: {
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
  },
  selectedCheckIcon: {
    backgroundColor: '#007AFF',
  },
  featureText: {
    fontSize: 15,
    color: '#555555',
  },
  creditsText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 8,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#F8F9FA',
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonDark: {
    backgroundColor: '#0A84FF',
  },
  freeButton: {
    backgroundColor: '#34C759',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 2,
  },
  termsTextDark: {
    color: '#AAAAAA',
  },
  textLight: {
    color: '#FFFFFF',
  },
  textLightSecondary: {
    color: '#CCCCCC',
  },
  selectedText: {
    color: '#007AFF',
  },
})