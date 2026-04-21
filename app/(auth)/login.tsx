import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { GradientButton } from '../../src/components/GradientButton';
import { moderateScale, verticalScale } from '../../src/utils/scaling';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="medical-services" size={moderateScale(24)} color={Colors.onPrimaryContainer} />
          </View>
          <Text style={styles.brandName}>Medora</Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroWrapper}>
          <View style={styles.heroGlow} />
          <View style={styles.heroContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0woUsxE5jel42g-X8bONSsP7V0Z2mpIhex3NXy7WW1GV7bd95nEdH6RbSQSABIzhXhOt_HdenGf8cvmdoj3ugvKlSXTyIKQ4Vyh4XiiXkooHcrcLjoR_1XJYSS4DNiz9wfFSdHjqdJ-aQ3AK9w6P22yApwo-a8Z2j3gaDOD1EF7kWR_flzcsSA7WDjRycWE0a5v410Ip5rGMo931B8qw40J4lbltvmI6qx-k09E9DTa6wQUj9SxxVul_0RBEYghemj9j03DDPrYc' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Secure clinical{'\n'}access.</Text>
          <Text style={styles.subtitle}>
            Access your curated health narrative with a one-time code.
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.prefix}>+1</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="(555) 000-0000"
                  placeholderTextColor={Colors.outline}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <GradientButton 
              title="Send OTP" 
              onPress={handleLogin}
              style={styles.button}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.securityBadge}>
              <MaterialIcons name="enhanced-encryption" size={moderateScale(16)} color={Colors.primary} />
              <Text style={styles.securityText}>Your records are encrypted</Text>
            </View>
            <Text style={styles.disclaimer}>
              By continuing, you agree to Medora's <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(24),
  },
  logoContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(24),
    color: Colors.onSurface,
    letterSpacing: moderateScale(-0.5),
  },
  heroWrapper: {
    position: 'relative',
    marginBottom: verticalScale(40),
  },
  heroGlow: {
    position: 'absolute',
    top: moderateScale(-16),
    left: moderateScale(-16),
    right: moderateScale(-16),
    bottom: moderateScale(-16),
    backgroundColor: 'rgba(120, 214, 213, 0.2)', // primary-fixed-dim
    borderRadius: moderateScale(24),
  },
  heroContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainerLow,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(36),
    color: Colors.onSurface,
    lineHeight: moderateScale(44),
    marginBottom: verticalScale(16),
    letterSpacing: moderateScale(-1),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(18),
    color: Colors.onSurfaceVariant,
    lineHeight: moderateScale(28),
    maxWidth: moderateScale(280),
    marginBottom: verticalScale(32),
  },
  formContainer: {
    gap: verticalScale(24),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    gap: verticalScale(8),
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
    paddingHorizontal: moderateScale(20),
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(10),
    elevation: 2,
  },
  prefix: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(16),
    color: 'rgba(62, 73, 73, 0.6)',
    marginRight: moderateScale(12),
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(18),
    color: Colors.onSurface,
    height: '100%',
  },
  button: {
    marginTop: verticalScale(8),
  },
  footer: {
    alignItems: 'center',
    gap: verticalScale(24),
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: moderateScale(24),
  },
  securityText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
  },
  disclaimer: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(12),
    color: 'rgba(62, 73, 73, 0.6)',
    textAlign: 'center',
    maxWidth: moderateScale(240),
    lineHeight: moderateScale(18),
  },
  link: {
    textDecorationLine: 'underline',
  },
});
