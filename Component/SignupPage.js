import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Checkbox from 'expo-checkbox';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

// Validation patterns
const VALIDATION_PATTERNS = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^\d{10}$/,
    message: 'Phone number must be 10 digits'
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    message: 'Password must be at least 8 characters with letters and numbers'
  }
};

const SignupPage = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form input
  const validateInput = useCallback((name, value) => {
    let errorMessage = '';
    
    if (value.trim() === '') {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (VALIDATION_PATTERNS[name]) {
      if (!VALIDATION_PATTERNS[name].pattern.test(value)) {
        return VALIDATION_PATTERNS[name].message;
      }
    }

    if (name === 'confirmPassword' && value !== formData.password) {
      return 'Passwords do not match';
    }

    return '';
  }, [formData.password]);

  // Handle input changes
  const handleInputChange = useCallback((name, value) => {
    const errorMessage = validateInput(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, [validateInput]);

  // Validate entire form
  useEffect(() => {
    const areAllFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    const areAllFieldsValid = Object.values(errors).every(error => error === '');
    
    setIsFormValid(areAllFieldsFilled && areAllFieldsValid);
  }, [formData, errors]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid || !isTermsAccepted) return;
    
    setIsLoading(true);
    
    try {
      await AsyncStorage.setItem('Email', formData.email);
      
      const response = await axios.post(`${API_URL}user-create-account`, {
        useremail: formData.email,
        userphoneno: formData.phone,
        userpsd: formData.password
      });
      
      if (response.status === 200) {
        await AsyncStorage.setItem('Token', response.data.token);
        
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully',
          text2: 'You can now complete your profile',
          visibilityTime: 3000
        });
        
        // Navigate after a brief delay to allow the user to see the success message
        setTimeout(() => navigation.navigate('username'), 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
      
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: errorMessage,
        visibilityTime: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Form input component to reduce repetition
  const FormInput = ({ name, placeholder, icon, secureTextEntry = false, toggleVisibility = null, isVisible = false, keyboardType = 'default' }) => (
    <>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={formData[name]}
          onChangeText={(value) => handleInputChange(name, value)}
          secureTextEntry={secureTextEntry && !isVisible}
          keyboardType={keyboardType}
          autoCapitalize={name === 'email' ? 'none' : 'sentences'}
          autoComplete={name === 'email' ? 'email' : name === 'password' ? 'password' : 'off'}
        />
        {toggleVisibility && (
          <TouchableOpacity onPress={toggleVisibility} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Ionicons 
              name={isVisible ? "eye-outline" : "eye-off-outline"} 
              size={22} 
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {errors[name] ? <Text style={styles.errorText}>{errors[name]}</Text> : null}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>Join our community today</Text>
          </View>
          
          <FormInput
            name="email"
            placeholder="Email address"
            icon={<MaterialCommunityIcons name="email-outline" size={22} color="#666" style={styles.icon} />}
            keyboardType="email-address"
          />
          
          <FormInput
            name="phone"
            placeholder="Phone number"
            icon={<SimpleLineIcons name="phone" size={22} color="#666" style={styles.icon} />}
            keyboardType="numeric"
          />
          
          <FormInput
            name="password"
            placeholder="Create password"
            icon={<Octicons name="lock" size={22} color="#666" style={styles.icon} />}
            secureTextEntry={true}
            isVisible={isPasswordVisible}
            toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          
          <FormInput
            name="confirmPassword"
            placeholder="Confirm password"
            icon={<Octicons name="lock" size={22} color="#666" style={styles.icon} />}
            secureTextEntry={true}
            isVisible={isConfirmPasswordVisible}
            toggleVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          />
          
          <View style={styles.termsContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isTermsAccepted}
              onValueChange={setIsTermsAccepted}
              color={isTermsAccepted ? '#4B68E9' : undefined}
            />
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.signupButton,
              (!isFormValid || !isTermsAccepted || isLoading) && styles.disabledButton
            ]}
            activeOpacity={0.7}
            onPress={handleSubmit}
            disabled={!isFormValid || !isTermsAccepted || isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24
  },
  header: {
    marginBottom: 30
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 56,
    backgroundColor: '#F9F9F9'
  },
  icon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333'
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginBottom: 12,
    marginTop: -6,
    paddingLeft: 4
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 4
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    flex: 1
  },
  termsLink: {
    color: '#4B68E9',
    fontWeight: '500'
  },
  signupButton: {
    backgroundColor: '#4B68E9',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  disabledButton: {
    backgroundColor: '#A9B4E8',
    opacity: 0.8
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  loginPromptText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4
  },
  loginLink: {
    fontSize: 14,
    color: '#4B68E9',
    fontWeight: '600'
  }
});

export default SignupPage;