import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, verticalScale } from '../../src/utils/scaling';

export default function SignupScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <SafeAreaView style={styles.container}>
      {/* Ambient Background Elements */}
      <View style={styles.ambientTop} />
      <View style={styles.ambientBottom} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Top Accent Line */}
          <LinearGradient
            colors={[Colors.primary, Colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topAccent}
          />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="medical-services" size={moderateScale(28)} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Welcome to Medora</Text>
            <Text style={styles.subtitle}>Securely access and manage your clinical narrative.</Text>
          </View>

          {/* Tabs */}
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
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.prefixContainer}>
                  <MaterialIcons name="language" size={moderateScale(20)} color={Colors.secondary} />
                  <Text style={styles.prefix}>+1</Text>
                </View>
                <TextInput 
                  style={styles.input}
                  placeholder="(555) 000-0000"
                  placeholderTextColor={Colors.secondary}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.buttonContainer}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Send OTP</Text>
                <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={Colors.onPrimary} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <MaterialIcons name="lock" size={moderateScale(18)} color={Colors.tertiary} />
            <Text style={styles.footerText}>Your records are encrypted and secure.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  ambientTop: {
    position: 'absolute',
    top: moderateScale(-100),
    left: moderateScale(-100),
    width: moderateScale(300),
    height: moderateScale(300),
    borderRadius: moderateScale(150),
    backgroundColor: 'rgba(120, 214, 213, 0.2)', // primary-fixed-dim
  },
  ambientBottom: {
    position: 'absolute',
    bottom: moderateScale(-100),
    right: moderateScale(-100),
    width: moderateScale(350),
    height: moderateScale(350),
    borderRadius: moderateScale(175),
    backgroundColor: 'rgba(189, 199, 220, 0.1)', // secondary-fixed-dim
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: moderateScale(32),
    padding: moderateScale(32),
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(20) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(30),
    elevation: 10,
    overflow: 'hidden',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: moderateScale(4),
  },
  header: {
    gap: verticalScale(16),
    marginBottom: verticalScale(32),
  },
  iconContainer: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.04,
    shadowRadius: moderateScale(8),
    elevation: 2,
    marginBottom: verticalScale(8),
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(32),
    color: Colors.onBackground,
    letterSpacing: moderateScale(-0.5),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(16),
    color: Colors.onSurfaceVariant,
    lineHeight: moderateScale(24),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: moderateScale(4),
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(32),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderRadius: moderateScale(16),
  },
  activeTab: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(1) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(2),
    elevation: 1,
  },
  tabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
  },
  activeTabText: {
    fontFamily: 'Inter_700Bold',
    color: Colors.onBackground,
  },
  form: {
    gap: verticalScale(24),
  },
  inputGroup: {
    gap: verticalScale(12),
  },
  inputLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
    marginLeft: moderateScale(4),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: moderateScale(16),
    height: verticalScale(64),
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(189, 201, 200, 0.2)', // outline-variant at 20%
  },
  prefix: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(16),
    color: Colors.onBackground,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(18),
    color: Colors.onBackground,
    paddingHorizontal: moderateScale(16),
    height: '100%',
  },
  buttonContainer: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(16),
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: moderateScale(8) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(20),
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
    height: verticalScale(64),
    borderRadius: moderateScale(16),
  },
  buttonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(18),
    color: Colors.onPrimary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(12),
    marginTop: verticalScale(24),
    paddingTop: verticalScale(24),
    borderTopWidth: 1,
    borderTopColor: 'rgba(189, 201, 200, 0.1)',
  },
  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.secondary,
  },
});
