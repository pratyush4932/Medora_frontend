import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TopAppBar } from '../src/components/TopAppBar';
import { Colors } from '../src/constants/colors';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const SCANNER_SIZE = 280;

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scanLineY = useSharedValue(0);

  useEffect(() => {
    scanLineY.value = withRepeat(
      withTiming(SCANNER_SIZE, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [scanLineY]);

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scanLineY.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Full-screen Camera Viewfinder (Full-bleed) */}
      <View style={StyleSheet.absoluteFillObject}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkd6akTQYWaaiTL_XAEqapuspS7-UhSkR_XG7XzSbJuEwrra-Nc9UkvQ6kfQLFs46bMhJXJ5gqxhMMm4mYJeBv2IMhxtiy9mpHbBctXeAPBYXG3qoO36hCQnEd3XSBvIbmfRsaApoB2S2vRuy502ziCQvuI_0usl6Gpp-9d1wxAwmbcRES6_nYpEB1OBoakMwxlVZbQWymC_-9fOknTEbAGAio6z2lChSJbLQiYj2MGDsuFxQRYs84AEdRTt7OWPtepA-GYkV7-_I' }}
          style={styles.cameraPreview}
          resizeMode="cover"
        />
        
        {/* Darkened overlay for scanning focus */}
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerFrame}>
            {/* Corner Markers */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated Scanning Line */}
            <Animated.View style={[styles.scanLine, animatedLineStyle]} />
          </View>
          
          <View style={styles.instructionBadge}>
            <MaterialIcons name="qr-code-scanner" size={18} color="#fff" />
            <Text style={styles.instructionText}>Align record within frame</Text>
          </View>
        </View>
      </View>

      <TopAppBar 
        title="Scan Record" 
        showBack 
        showAvatar={false} 
        rightAction="close" 
        onRightPress={() => router.back()} 
      />

      {/* Floating Status & Details Card */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.detailsSurface}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Scanning Medical Record...</Text>
          </View>
          
          <Text style={styles.description}>
            Medora's AI automatically encrypts and digitizes your reports with 256-bit clinical security.
          </Text>
          
          <View style={styles.securityRow}>
            <MaterialIcons name="verified-user" size={14} color={Colors.primary} />
            <Text style={styles.securityText}>HIPAA COMPLIANT ENCRYPTION</Text>
          </View>
        </View>
      </View>

      {/* Bottom Nav Actions Bar */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 24 }]}>
        <TouchableOpacity 
          style={styles.navAction} 
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <MaterialIcons name="photo-library" size={26} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>GALLERY</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={() => {}}
          activeOpacity={0.9}
        >
          <View style={styles.captureOuter}>
            <View style={styles.captureInner} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navAction} 
          onPress={() => router.push('/ai-summary')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="auto-awesome" size={26} color={Colors.primary} />
          <Text style={[styles.navLabel, { color: Colors.primary }]}>ANALYZE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  scannerFrame: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.primary,
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.primary,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  instructionBadge: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  instructionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#fff',
    letterSpacing: 0.2,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  detailsSurface: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0, 106, 106, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  navAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
  },
  navLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    marginTop: 6,
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  captureButton: {
    transform: [{ translateY: -25 }],
  },
  captureOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: Colors.primary,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
});
