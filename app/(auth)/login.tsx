import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { GradientButton } from '../../src/components/GradientButton';

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
            <MaterialIcons name="medical-services" size={24} color={Colors.onPrimaryContainer} />
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
              <MaterialIcons name="enhanced-encryption" size={16} color={Colors.primary} />
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  heroWrapper: {
    position: 'relative',
    marginBottom: 40,
  },
  heroGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    backgroundColor: 'rgba(120, 214, 213, 0.2)', // primary-fixed-dim
    borderRadius: 24,
  },
  heroContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
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
    fontSize: 36,
    color: Colors.onSurface,
    lineHeight: 44,
    marginBottom: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: Colors.onSurfaceVariant,
    lineHeight: 28,
    maxWidth: 280,
    marginBottom: 32,
  },
  formContainer: {
    gap: 24,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 16,
    height: 64,
    paddingHorizontal: 20,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  prefix: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: 'rgba(62, 73, 73, 0.6)',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: Colors.onSurface,
    height: '100%',
  },
  button: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    gap: 24,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
  },
  securityText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  disclaimer: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: 'rgba(62, 73, 73, 0.6)',
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
