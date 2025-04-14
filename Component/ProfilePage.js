import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import style from '../style';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

export default function ProfilePage() {
  const navigation = useNavigation();
  
  // State variables
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    email: null,
    name: null,
    image: null,
    level: '',
    language: ''
  });
  
  // Modal states
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState("Light");
  
  // Data arrays
  const languages = [
    'Arabic', 'Chinese', 'English', 'French', 'German', 'Hindi',
    'Japanese', 'Kannada', 'Korean', 'Malayalam', 'Portuguese',
    'Russian', 'Spanish', 'Tamil', 'Telugu', 'Urdu'
  ];
  const modes = ['Light', 'Dark'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // Apply theme when changed
  useEffect(() => {
    AsyncStorage.setItem('Mode', theme);
  }, [theme]);

  // Load user email on mount
  useEffect(() => {
    const loadUserEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('Email');
        if (userEmail) {
          setUserData(prev => ({ ...prev, email: userEmail }));
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Authentication Error',
            text2: 'User is not logged in',
            position: 'bottom'
          });
        }
      } catch (error) {
        console.error("Failed to load user email:", error);
        setIsLoading(false);
      }
    };
    
    loadUserEmail();
  }, []);

  // Fetch user profile when email is available
  useFocusEffect(
    useCallback(() => {
      if (userData.email) {
        fetchUserProfile();
      }
    }, [userData.email])
  );

  // Fetch user profile data
  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}get-user-avatar`, {
        type: 'getuserdata',
        useremail: userData.email
      });
      
      if (response.status === 200) {
        const { name, image, level, nativeLanguage } = response.data;
        setUserData(prev => ({
          ...prev,
          name,
          image,
          level,
          language: nativeLanguage
        }));
        
        // Also load the current theme
        const savedTheme = await AsyncStorage.getItem('Mode');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      }
    } catch (error) {
      console.error("Profile fetch error:", error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Profile Error',
        text2: 'Failed to load profile data',
        position: 'bottom'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('login');
    } catch (error) {
      console.error("Logout error:", error);
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Please try again',
        position: 'bottom'
      });
    }
  };

  // Update user profile data
  const updateUserData = async (language, level) => {
    if (!level || !language || !userData.email) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'All fields are required',
        position: 'bottom'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}get-user-avatar`, {
        type: 'updateuserdata',
        level,
        useremail: userData.email,
        language
      });

      if (response.status === 200) {
        setShowLevelModal(false);
        setShowLanguageModal(false);
        
        setUserData(prev => ({
          ...prev,
          level,
          language
        }));
        
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: response.data.message || 'Your settings have been saved',
          position: 'bottom'
        });
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.response?.data?.message || 'Please try again later',
        position: 'bottom'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create a placeholder image component for when user image is not available
  const ProfilePlaceholder = () => (
    <View style={[
      styles.profileImagePlaceholder,
      theme === 'Dark' ? { backgroundColor: '#3A3A3C' } : { backgroundColor: '#E5E5EA' }
    ]}>
      <MaterialIcons name="person" size={40} color={theme === 'Dark' ? '#8E8E93' : '#8A8A8E'} />
    </View>
  );

  // Section Item Component for settings
  const SettingItem = ({ title, value, icon, onPress, showDivider = true, showArrow = true }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem,
        showDivider ? { borderBottomWidth: 0.5, borderBottomColor: theme === 'Dark' ? '#3A3A3C' : '#E5E5EA' } : {}
      ]}
      onPress={onPress}
    >
      <View style={styles.settingItemLeft}>
        {icon}
        <Text style={[
          styles.settingTitle,
          theme === 'Dark' ? { color: '#FAFAFA' } : { color: '#1C1C1E' }
        ]}>
          {title}
        </Text>
      </View>
      
      {value && (
        <View style={styles.settingItemRight}>
          <Text style={styles.settingValue}>{value}</Text>
          {showArrow && <Fontisto name="angle-right" color={theme === 'Dark' ? '#8E8E93' : '#C7C7CC'} size={14} />}
        </View>
      )}
    </TouchableOpacity>
  );

  // Modal Component for selection lists
  const SelectionModal = ({ visible, onClose, title, data, onSelect, selectedValue }) => (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={[
        styles.modalContent,
        theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
      ]}>
        <Text style={[
          styles.modalTitle,
          theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }
        ]}>
          {title}
        </Text>
        
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalListContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={[
                styles.modalItem,
                index !== data.length - 1 ? {
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme === 'Dark' ? '#3A3A3C' : '#E5E5EA'
                } : {},
                selectedValue === item ? styles.selectedItem : {}
              ]}
            >
              <Text style={[
                styles.modalItemText,
                theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' },
                selectedValue === item ? styles.selectedItemText : {}
              ]}>
                {item}
              </Text>
              
              {selectedValue === item && (
                <Ionicons name="checkmark" size={22} color="#007AFF" />
              )}
            </TouchableOpacity>
          )}
        />
        
        <TouchableOpacity
          onPress={onClose}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={[
        styles.container,
        theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }
      ]}>
        <ActivityIndicator size="large" color={theme === 'Dark' ? '#0A84FF' : '#007AFF'} />
        <Text style={[
          styles.loadingText,
          theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }
        ]}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[
      styles.safeArea,
      theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }
    ]}>
      <ScrollView 
        style={[
          styles.container,
          theme === 'Dark' ? { backgroundColor: '#1C1C1E' } : { backgroundColor: '#F2F2F7' }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {userData.image ? (
            <Image 
              source={{ uri: userData.image }} 
              style={styles.profileImage}
            />
          ) : (
            <ProfilePlaceholder />
          )}
          
          <View style={styles.profileInfo}>
            <Text style={[
              styles.profileName,
              theme === 'Dark' ? { color: '#FFFFFF' } : { color: '#000000' }
            ]}>
              {userData.name || 'User'}
            </Text>
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('edit')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          {/* Preferences Section */}
          <View style={styles.settingsSection}>
            <Text style={[
              styles.sectionHeader,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }
            ]}>
              PREFERENCES
            </Text>
            
            <View style={[
              styles.sectionContent,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
            ]}>
              <SettingItem 
                title="Native Language" 
                value={userData.language || 'Not set'}
                icon={<MaterialIcons name="language" size={22} color="#007AFF" style={styles.settingIcon} />}
                onPress={() => setShowLanguageModal(true)}
              />
              
              <SettingItem 
                title="Proficiency Level" 
                value={userData.level || 'Not set'}
                icon={<MaterialCommunityIcons name="ladder" size={22} color="#FF9500" style={styles.settingIcon} />}
                onPress={() => setShowLevelModal(true)}
              />
              
              <SettingItem 
                title="Display Mode" 
                value={theme}
                icon={<Ionicons name={theme === 'Dark' ? "moon" : "sunny"} size={22} color="#5856D6" style={styles.settingIcon} />}
                onPress={() => setShowThemeModal(true)}
                showDivider={false}
              />
            </View>
          </View>
          
          {/* Account Section */}
          <View style={styles.settingsSection}>
            <Text style={[
              styles.sectionHeader,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }
            ]}>
              ACCOUNT
            </Text>
            
            <View style={[
              styles.sectionContent,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
            ]}>
              <SettingItem 
                title="Subscription" 
                value="Free"
                icon={<MaterialIcons name="stars" size={22} color="#FF2D55" style={styles.settingIcon} />}
                onPress={() => navigation.navigate('plan')}
              />
              
              <SettingItem 
                title="My Progress" 
                value=""
                icon={<MaterialIcons name="trending-up" size={22} color="#34C759" style={styles.settingIcon} />}
                onPress={() => navigation.navigate('myprogress')}
                showDivider={false}
              />
            </View>
          </View>
          
          {/* Support Section */}
          <View style={styles.settingsSection}>
            <Text style={[
              styles.sectionHeader,
              theme === 'Dark' ? { color: '#8E8E93' } : { color: '#6C6C70' }
            ]}>
              SUPPORT
            </Text>
            
            <View style={[
              styles.sectionContent,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
            ]}>
              <SettingItem 
                title="Support Tickets" 
                value=""
                icon={<MaterialIcons name="receipt" size={22} color="#30B0C7" style={styles.settingIcon} />}
                onPress={() => navigation.navigate('ticketstatus')}
              />
              
              <SettingItem 
                title="Contact Support (24/7)" 
                value=""
                icon={<MaterialIcons name="support-agent" size={22} color="#AF52DE" style={styles.settingIcon} />}
                onPress={() => navigation.navigate('support')}
                showDivider={false}
              />
            </View>
          </View>
          
          {/* Logout Button */}
          <TouchableOpacity 
            style={[
              styles.logoutButton,
              theme === 'Dark' ? { backgroundColor: '#2C2C2E' } : { backgroundColor: '#FFFFFF' }
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Selection Modals */}
      <SelectionModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title="Select Native Language"
        data={languages}
        selectedValue={userData.language}
        onSelect={(language) => {
          updateUserData(language, userData.level);
        }}
      />

      <SelectionModal
        visible={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        title="Select Proficiency Level"
        data={levels}
        selectedValue={userData.level}
        onSelect={(level) => {
          updateUserData(userData.language, level);
        }}
      />

      <SelectionModal
        visible={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title="Select Display Mode"
        data={modes}
        selectedValue={theme}
        onSelect={(mode) => {
          setTheme(mode);
          setShowThemeModal(false);
        }}
      />

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  editButton: {
    marginTop: 4,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  settingsContainer: {
    flex: 1,
    paddingBottom: 24,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 17,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 17,
    color: '#8E8E93',
    marginRight: 8,
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 17,
    fontWeight: '500',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 16,
    paddingBottom: 34,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalListContainer: {
    paddingHorizontal: 16,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  modalItemText: {
    fontSize: 17,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
  },
  selectedItemText: {
    fontWeight: '500',
    color: '#007AFF',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
});