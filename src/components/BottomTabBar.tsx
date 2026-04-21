import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale } from '../utils/scaling';

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 24 }]}>
      <View style={styles.backgroundLayer}>
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      </View>
      
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
          if (route.name === 'upload') iconName = 'add';
          else if (route.name === 'hospital') iconName = 'local-hospital';

          const isCenter = route.name === 'upload';

          // Center prominent Add button (if we wanted to make the middle one an add button instead of records)
          // For now, based on my_records_folders, it's Home, Records, Hospital
          
          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => router.push('/scanner')}
                activeOpacity={0.8}
                style={styles.centerTabContainer}
              >
                <LinearGradient
                  colors={[Colors.primary, '#2ea5a5']}
                  style={styles.centerTabButton}
                >
                  <MaterialIcons name="add" size={moderateScale(32)} color={Colors.onPrimary} />
                </LinearGradient>
                <Text style={[styles.tabLabel, { color: Colors.primary, marginTop: moderateScale(8) }]}>
                  {label as string}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
            >
              <MaterialIcons 
                name={iconName} 
                size={moderateScale(24)} 
                color={isFocused ? Colors.primary : Colors.onSurfaceVariant} 
              />
              <Text style={[styles.tabLabel, { color: isFocused ? Colors.primary : Colors.onSurfaceVariant }]}>
                {label as string}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(-4) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(40),
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    overflow: 'hidden',
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: verticalScale(12),
    paddingHorizontal: moderateScale(16),
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(16),
  },
  tabButtonFocused: {
    backgroundColor: 'rgba(31, 138, 138, 0.1)', // Primary at 10%
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(11),
    marginTop: moderateScale(4),
  },
  centerTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(-32), // Lift it up
  },
  centerTabButton: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: moderateScale(8) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(16),
    elevation: 8,
  },
});
