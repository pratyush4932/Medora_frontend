import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TopAppBar } from '../src/components/TopAppBar';
import { Colors } from '../src/constants/colors';
import { GradientButton } from '../src/components/GradientButton';
import { ShareModal } from '../src/components/ShareModal';

export default function ShareQrScreen() {
  const [scope, setScope] = useState<'full' | 'hospital'>('full');
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopAppBar title="Medora" showBack showAvatar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Share Identity</Text>
          <Text style={styles.subtitle}>Show this code to medical staff for instant access to your records.</Text>
        </View>

        {/* Scope Selection */}
        <View style={styles.scopeContainer}>
          <TouchableOpacity 
            style={[styles.scopeButton, scope === 'full' && styles.scopeButtonActive]}
            onPress={() => setScope('full')}
          >
            <Text style={[styles.scopeText, scope === 'full' && styles.scopeTextActive]}>Full Records</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.scopeButton, scope === 'hospital' && styles.scopeButtonActive]}
            onPress={() => setScope('hospital')}
          >
            <Text style={[styles.scopeText, scope === 'hospital' && styles.scopeTextActive]}>Hospital Only</Text>
          </TouchableOpacity>
        </View>

        {/* QR Code Module */}
        <View style={styles.qrWrapper}>
          <View style={styles.qrGlow} />
          <View style={styles.qrContainer}>
            {/* Timer Badge */}
            <View style={styles.timerBadge}>
              <MaterialIcons name="schedule" size={16} color={Colors.surface} />
              <Text style={styles.timerText}>Expires in 5:00</Text>
            </View>

            {/* QR Placeholder */}
            <View style={styles.qrBox}>
              <View style={styles.qrBorder}>
                <MaterialIcons name="qr-code-2" size={120} color="rgba(0, 103, 103, 0.2)" />
                {/* Fake QR pattern */}
                <View style={styles.fakeQr}>
                  <View style={styles.fakeQrRow}>
                    <View style={styles.qrBlockDark} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} />
                  </View>
                  <View style={styles.fakeQrRow}>
                    <View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} />
                  </View>
                  <View style={styles.fakeQrRow}>
                    <View style={styles.qrBlockDark} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} />
                  </View>
                  <View style={styles.fakeQrRow}>
                    <View style={styles.qrBlockLight} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} />
                  </View>
                  <View style={styles.fakeQrRow}>
                    <View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} /><View style={styles.qrBlockLight} /><View style={styles.qrBlockDark} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.qrMetaContainer}>
              <View style={styles.tokenLabel}>
                <View style={styles.pulseDot} />
                <Text style={styles.tokenText}>SECURE DYNAMIC TOKEN</Text>
              </View>
              <Text style={styles.tokenId}>ID: MED-9942-X021</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <GradientButton 
            title="Share Link" 
            icon="ios-share"
            onPress={() => setIsShareModalVisible(true)}
          />

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryActionBtn}>
              <View style={styles.secondaryActionIcon}>
                <MaterialIcons name="print" size={24} color={Colors.onSurfaceVariant} />
              </View>
              <Text style={styles.secondaryActionText}>Print PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryActionBtn}>
              <View style={styles.secondaryActionIcon}>
                <MaterialIcons name="lock-reset" size={24} color={Colors.onSurfaceVariant} />
              </View>
              <Text style={styles.secondaryActionText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <MaterialIcons name="shield" size={24} color={Colors.tertiary} />
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Security Guard Enabled</Text>
            <Text style={styles.privacyDesc}>
              This QR code is encrypted. Access is logged and you will receive a notification if your records are opened.
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Share Modal */}
      <ShareModal 
        visible={isShareModalVisible} 
        onClose={() => setIsShareModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingTop: 88,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 28,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  scopeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 6,
    borderRadius: 16,
    marginBottom: 32,
  },
  scopeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  scopeButtonActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scopeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  scopeTextActive: {
    color: Colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  qrWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  qrGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    backgroundColor: 'rgba(0, 103, 103, 0.05)',
    borderRadius: 32,
  },
  qrContainer: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  timerBadge: {
    position: 'absolute',
    top: -16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.onSurface,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
    zIndex: 10,
  },
  timerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.surface,
  },
  qrBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  qrBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: 'rgba(0, 103, 103, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fakeQr: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    opacity: 0.8,
  },
  fakeQrRow: {
    flexDirection: 'row',
    gap: 8,
  },
  qrBlockDark: {
    width: 24,
    height: 24,
    backgroundColor: Colors.onSurface,
    borderRadius: 4,
  },
  qrBlockLight: {
    width: 24,
    height: 24,
    backgroundColor: Colors.surface,
    borderRadius: 4,
  },
  qrMetaContainer: {
    alignItems: 'center',
  },
  tokenLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  tokenText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: 1,
  },
  tokenId: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    opacity: 0.6,
    letterSpacing: -0.5,
  },
  actionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 16,
  },
  secondaryActionBtn: {
    alignItems: 'center',
    gap: 8,
  },
  secondaryActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  privacyNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(171, 98, 60, 0.1)', // tertiary-container at 10%
    padding: 24,
    borderRadius: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(171, 98, 60, 0.05)',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.tertiary,
    marginBottom: 4,
  },
  privacyDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
});
