import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { moderateScale, verticalScale } from '../utils/scaling';

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GradientButton({ title, icon, style, textStyle, ...props }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {icon && <MaterialIcons name={icon} size={moderateScale(20)} color={Colors.onPrimary} style={styles.icon} />}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: moderateScale(16),
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: moderateScale(8) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(20),
    elevation: 8,
  },
  gradient: {
    width: '100%',
    paddingVertical: verticalScale(20),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(18),
    color: Colors.onPrimary,
  },
  icon: {
    marginRight: moderateScale(8),
  },
});
