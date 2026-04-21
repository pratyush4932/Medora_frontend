import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { GradientButton } from './GradientButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from '../utils/scaling';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
}


export function ShareModal({ visible, onClose }: ShareModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />

          <TouchableWithoutFeedback>
            <View style={[styles.sheet, { paddingBottom: insets.bottom || 24 }]}>
              <View style={styles.header}>
                <Text style={styles.title}>Share Options</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <GradientButton title="Copy Link" icon="link" style={styles.copyButton} />

                <View style={styles.actionsGrid}>
                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="chat" size={moderateScale(28)} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="forum" size={moderateScale(28)} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>Messages</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="mail" size={moderateScale(28)} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>Email</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                  <MaterialIcons name="lock" size={moderateScale(16)} color={Colors.onSurfaceVariant} />
                  <Text style={styles.footerText}>Your data is shared securely.</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(46, 49, 49, 0.4)',
  },
  sheet: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(-20) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(60),
    elevation: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(16),
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(18),
    color: Colors.primaryContainer,
  },
  closeButton: {
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.surfaceContainerLow,
  },
  content: {
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
    gap: moderateScale(32),
  },
  copyButton: {
    borderRadius: moderateScale(20),
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(16),
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(12),
    backgroundColor: Colors.surfaceContainerLow,
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
  },
  actionIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  actionLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
    marginTop: moderateScale(16),
    opacity: 0.7,
  },
  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
    letterSpacing: moderateScale(0.5),
  },
});
