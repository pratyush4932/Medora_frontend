import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface IconButtonProps extends TouchableOpacityProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function IconButton({ 
  name, 
  size = 24, 
  color = Colors.primary, 
  backgroundColor = Colors.surfaceContainerLow,
  style,
  ...props 
}: IconButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={[styles.container, { backgroundColor }, style]} 
      {...props}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
