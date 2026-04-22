import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { moderateScale, verticalScale } from '../../src/utils/scaling';
import { COUNTRIES, Country } from '../../src/constants/countries';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find(c => c.code === 'US') || COUNTRIES[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery)
  );

  const handleSendOTP = () => {
    router.replace('/(tabs)/home');
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity 
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setIsCountryModalVisible(false);
        setSearchQuery('');
      }}
    >
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryDialCode}>{item.dial_code}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGlow} />
      
      <View style={styles.card}>
        {/* Header Icon */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="medical-services" size={moderateScale(24)} color={Colors.primary} />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Welcome to{'\n'}Medora</Text>
        <Text style={styles.subtitle}>
          Securely access and manage your clinical narrative.
        </Text>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity 
              style={styles.countryCodeContainer}
              onPress={() => setIsCountryModalVisible(true)}
            >
              <MaterialIcons name="language" size={moderateScale(18)} color={Colors.onSurfaceVariant} />
              <Text style={styles.countryCode}>{selectedCountry.dial_code}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TextInput 
              style={styles.input}
              placeholder="(555) 000-0000"
              placeholderTextColor="rgba(62, 73, 73, 0.4)"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={Colors.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialIcons name="lock" size={moderateScale(16)} color="#8d4a26" />
          <Text style={styles.footerText}>
            Your records are encrypted and secure.
          </Text>
        </View>
      </View>

      {/* Country Selection Modal */}
      <Modal
        visible={isCountryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setIsCountryModalVisible(false)}>
                <MaterialIcons name="close" size={moderateScale(24)} color={Colors.onSurface} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={moderateScale(20)} color={Colors.onSurfaceVariant} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search country or code"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={false}
              />
            </View>

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              renderItem={renderCountryItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.countryList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(300),
    backgroundColor: 'rgba(120, 214, 213, 0.1)',
  },
  card: {
    width: '90%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: moderateScale(40),
    padding: moderateScale(32),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(10) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(30),
    elevation: 5,
  },
  logoWrapper: {
    marginBottom: verticalScale(24),
  },
  logoContainer: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(16),
    backgroundColor: '#f2f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
    fontWeight: '800',
    fontSize: moderateScale(36),
    color: Colors.onSurface,
    lineHeight: moderateScale(42),
    marginBottom: verticalScale(16),
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontSize: moderateScale(16),
    color: Colors.onSurfaceVariant,
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(32),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f4f4',
    borderRadius: moderateScale(20),
    padding: moderateScale(4),
    marginBottom: verticalScale(40),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    borderRadius: moderateScale(16),
  },
  activeTab: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  tabText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  activeTabText: {
    color: Colors.onSurface,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: verticalScale(8),
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e8e9',
    borderRadius: moderateScale(4),
    height: verticalScale(56),
    marginBottom: verticalScale(40),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    gap: moderateScale(8),
    height: '100%',
  },
  countryCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.onSurface,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    fontSize: moderateScale(16),
    color: Colors.onSurface,
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(4),
    gap: moderateScale(12),
    marginBottom: verticalScale(48),
  },
  buttonText: {
    color: Colors.onPrimary,
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: '#f2f4f4',
    paddingTop: verticalScale(24),
  },
  footerText: {
    fontSize: moderateScale(14),
    color: '#8d4a26',
    flex: 1,
    lineHeight: moderateScale(20),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    height: SCREEN_HEIGHT * 0.8,
    padding: moderateScale(24),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: Colors.onSurface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    height: verticalScale(48),
    marginBottom: verticalScale(16),
    gap: moderateScale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: Colors.onSurface,
  },
  countryList: {
    paddingBottom: verticalScale(40),
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainer,
  },
  countryName: {
    fontSize: moderateScale(16),
    color: Colors.onSurface,
    flex: 1,
  },
  countryDialCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.primary,
  },
});


