import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TopAppBar } from '../src/components/TopAppBar';
import { Colors } from '../src/constants/colors';
import { GradientButton } from '../src/components/GradientButton';
import { ShareModal } from '../src/components/ShareModal';
import { moderateScale, verticalScale } from '../src/utils/scaling';

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
              <MaterialIcons name="schedule" size={moderateScale(16)} color={Colors.surface} />
              <Text style={styles.timerText}>Expires in 5:00</Text>
            </View>

            {/* QR Placeholder */}
            <View style={styles.qrBox}>
              <View style={styles.qrBorder}>
                <MaterialIcons name="qr-code-2" size={moderateScale(120)} color="rgba(0, 103, 103, 0.2)" />
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
                <MaterialIcons name="print" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
              </View>
              <Text style={styles.secondaryActionText}>Print PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryActionBtn}>
              <View style={styles.secondaryActionIcon}>
                <MaterialIcons name="lock-reset" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
              </View>
              <Text style={styles.secondaryActionText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <MaterialIcons name="shield" size={moderateScale(24)} color={Colors.tertiary} />
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
    paddingTop: verticalScale(88),
    paddingHorizontal: moderateScale(24),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(28),
    color: Colors.onSurface,
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(16),
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  scopeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: moderateScale(6),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(32),
  },
  scopeButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderRadius: moderateScale(12),
  },
  scopeButtonActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  scopeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
  },
  scopeTextActive: {
    color: Colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  qrWrapper: {
    position: 'relative',
    marginBottom: verticalScale(16),
  },
  qrGlow: {
    position: 'absolute',
    top: moderateScale(-16),
    left: moderateScale(-16),
    right: moderateScale(-16),
    bottom: moderateScale(-16),
    backgroundColor: 'rgba(0, 103, 103, 0.05)',
    borderRadius: moderateScale(32),
  },
  qrContainer: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: moderateScale(24),
    padding: moderateScale(32),
    alignItems: 'center',
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.04,
    shadowRadius: moderateScale(24),
    elevation: 2,
  },
  timerBadge: {
    position: 'absolute',
    top: moderateScale(-16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.onSurface,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
    gap: moderateScale(8),
    zIndex: 10,
  },
  timerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.surface,
  },
  qrBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(32),
  },
  qrBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: 'rgba(0, 103, 103, 0.2)',
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fakeQr: {
    ...StyleSheet.absoluteFillObject,
    padding: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(8),
    opacity: 0.8,
  },
  fakeQrRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  qrBlockDark: {
    width: moderateScale(24),
    height: moderateScale(24),
    backgroundColor: Colors.onSurface,
    borderRadius: moderateScale(4),
  },
  qrBlockLight: {
    width: moderateScale(24),
    height: moderateScale(24),
    backgroundColor: Colors.surface,
    borderRadius: moderateScale(4),
  },
  qrMetaContainer: {
    alignItems: 'center',
  },
  tokenLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  pulseDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(4),
  },
  tokenText: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(12),
    color: Colors.primary,
    letterSpacing: moderateScale(1),
  },
  tokenId: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
    opacity: 0.6,
    letterSpacing: moderateScale(-0.5),
  },
  actionsContainer: {
    gap: verticalScale(16),
    marginBottom: verticalScale(24),
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(24),
    paddingVertical: verticalScale(16),
  },
  secondaryActionBtn: {
    alignItems: 'center',
    gap: moderateScale(8),
  },
  secondaryActionIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
  },
  privacyNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(171, 98, 60, 0.1)', // tertiary-container at 10%
    padding: moderateScale(24),
    borderRadius: moderateScale(16),
    gap: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(171, 98, 60, 0.05)',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(14),
    color: Colors.tertiary,
    marginBottom: verticalScale(4),
  },
  privacyDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
    lineHeight: moderateScale(18),
  },
});
