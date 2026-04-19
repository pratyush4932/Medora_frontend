import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TopAppBar } from '../src/components/TopAppBar';
import { Colors } from '../src/constants/colors';

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <TopAppBar title="Scan Record" showBack showAvatar={false} rightAction="none" />

      {/* Full-bleed Camera Viewfinder */}
      <View style={styles.cameraContainer}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkd6akTQYWaaiTL_XAEqapuspS7-UhSkR_XG7XzSbJuEwrra-Nc9UkvQ6kfQLFs46bMhJXJ5gqxhMMm4mYJeBv2IMhxtiy9mpHbBctXeAPBYXG3qoO36hCQnEd3XSBvIbmfRsaApoB2S2vRuy502ziCQvuI_0usl6Gpp-9d1wxAwmbcRES6_nYpEB1OBoakMwxlVZbQWymC_-9fOknTEbAGAio6z2lChSJbLQiYj2MGDsuFxQRYs84AEdRTt7OWPtepA-GYkV7-_I' }}
          style={styles.cameraPreview}
        />
        
        {/* Scanning Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          <View style={styles.instructionBadge}>
            <Text style={styles.instructionText}>Align the QR code within the frame</Text>
          </View>
        </View>
      </View>

      {/* Status & Details Surface */}
      <View style={styles.detailsSurface}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Ready to scan</Text>
        </View>
        
        <Text style={styles.description}>
          Medora uses clinical-grade encryption to process your medical records. Point your camera at any medical QR code or document ID.
        </Text>
        
        <View style={styles.securityFooter}>
          <MaterialIcons name="lock" size={16} color={Colors.onSurfaceVariant} />
          <Text style={styles.securityText}>YOUR DATA IS PROCESSED SECURELY AND ENCRYPTED</Text>
        </View>

        {/* Tips Grid */}
        <View style={styles.tipsGrid}>
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={32} color={Colors.primary} />
            <Text style={styles.tipText}>Avoid glare on glossy documents</Text>
          </View>
          <View style={styles.tipCard}>
            <MaterialIcons name="center-focus-strong" size={32} color={Colors.primary} />
            <Text style={styles.tipText}>Keep document flat for best focus</Text>
          </View>
        </View>
      </View>

      {/* Bottom Nav Actions */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 24 }]}>
        <TouchableOpacity style={styles.navAction}>
          <MaterialIcons name="upload-file" size={24} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>UPLOAD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton}>
          <MaterialIcons name="lens" size={40} color={Colors.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navAction}>
          <MaterialIcons name="arrow-forward" size={24} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>PROCEED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    position: 'relative',
    overflow: 'hidden',
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // scanner-mask
  },
  scannerFrame: {
    width: 288, // 72 * 4
    height: 288,
    borderWidth: 2,
    borderColor: Colors.primaryFixed,
    borderRadius: 8,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: Colors.primary,
  },
  topLeft: {
    top: -4,
    left: -4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: -4,
    right: -4,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: -4,
    left: -4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: -4,
    right: -4,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  instructionBadge: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
  },
  instructionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#fff',
  },
  detailsSurface: {
    flex: 1,
    marginTop: -24,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
    marginBottom: 24,
  },
  statusDot: {
    width: 12,
    height: 12,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: Colors.onSurface,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: 32,
  },
  securityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(189, 201, 200, 0.15)',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.onSecondaryContainer,
    letterSpacing: 0.5,
  },
  tipsGrid: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  tipCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    padding: 20,
    borderRadius: 16,
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  tipText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: Colors.onSurface,
    lineHeight: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  navAction: {
    alignItems: 'center',
    padding: 8,
  },
  navLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 4,
    color: Colors.onSurfaceVariant,
  },
  captureButton: {
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -16 }],
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
