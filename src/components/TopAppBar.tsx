import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale } from '../utils/scaling';

interface TopAppBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: 'notifications' | 'close' | 'none';
  onRightPress?: () => void;
  showAvatar?: boolean;
}

export function TopAppBar({ 
  title, 
  showBack = false, 
  rightAction = 'notifications',
  onRightPress,
  showAvatar = true
}: TopAppBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top || 16 }]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={moderateScale(24)} color={Colors.primary} />
            </TouchableOpacity>
          )}
          {!showBack && showAvatar && (
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiwHFavm6Mzx2hxVsGx-3zMDt07Da0jv0ET6yEpJqEqhMauj3H7FEx57r4pSVnaSJnffyE6w9zAhuPzyod5AEIZe4US7OTDhfcUQHXfra9r7BnBNZLLRLgSihAWqAyM_QBCoR8N5h8DEv7mAv8Z1HmszjGjinGrbsbjBZMU1TOkQZ9poTtUJk88C2peiaj8frhKcAqM8nM7GXIIj_SDlVCpPWOhR4kGqZoI8jYT2ULMyfOtlrnUiGJ4QCVdYsh6ChHVXhsEiBrjpw' }} 
                style={styles.avatar}
              />
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          {rightAction === 'notifications' && (
            <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
              <MaterialIcons name="notifications-none" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          )}
          {rightAction === 'close' && (
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: moderateScale(8), padding: moderateScale(4) }]} onPress={onRightPress}>
              <MaterialIcons name="close" size={moderateScale(20)} color="#fff" />
            </TouchableOpacity>
          )}
          {rightAction === 'notifications' && showAvatar && showBack && (
             <View style={styles.avatarContainerSmall}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiwHFavm6Mzx2hxVsGx-3zMDt07Da0jv0ET6yEpJqEqhMauj3H7FEx57r4pSVnaSJnffyE6w9zAhuPzyod5AEIZe4US7OTDhfcUQHXfra9r7BnBNZLLRLgSihAWqAyM_QBCoR8N5h8DEv7mAv8Z1HmszjGjinGrbsbjBZMU1TOkQZ9poTtUJk88C2peiaj8frhKcAqM8nM7GXIIj_SDlVCpPWOhR4kGqZoI8jYT2ULMyfOtlrnUiGJ4QCVdYsh6ChHVXhsEiBrjpw' }} 
                style={styles.avatar}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(16),
    height: verticalScale(64),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(20),
    color: Colors.primary,
    letterSpacing: moderateScale(-0.5),
  },
  iconButton: {
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: 'transparent',
  },
  avatarContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainer,
  },
  avatarContainerSmall: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainer,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
