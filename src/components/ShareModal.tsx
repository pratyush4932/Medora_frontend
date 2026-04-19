import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { GradientButton } from './GradientButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
                  <MaterialIcons name="close" size={24} color={Colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <GradientButton title="Copy Link" icon="link" style={styles.copyButton} />

                <View style={styles.actionsGrid}>
                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="chat" size={28} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="forum" size={28} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>Messages</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIconContainer}>
                      <MaterialIcons name="mail" size={28} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>Email</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                  <MaterialIcons name="lock" size={16} color={Colors.onSurfaceVariant} />
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.15,
    shadowRadius: 60,
    elevation: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: Colors.primaryContainer,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 32,
  },
  copyButton: {
    borderRadius: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    opacity: 0.7,
  },
  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
});
