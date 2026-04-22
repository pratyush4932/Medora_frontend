import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { TopAppBar } from '../../src/components/TopAppBar';
import { moderateScale, verticalScale } from '../../src/utils/scaling';

const { width } = Dimensions.get('window');

export default function SummaryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <TopAppBar title="AI Health Summary" showBack showAvatar />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Decorative Header Background */}
        <View style={styles.headerBackground} />

        {/* View Uploaded File Button Area */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.primaryActionButton} activeOpacity={0.8}>
            <MaterialIcons name="visibility" size={moderateScale(22)} color={Colors.onPrimary} />
            <Text style={styles.primaryActionText}>View Uploaded File</Text>
          </TouchableOpacity>
        </View>

        {/* Medora Intelligence Report Header */}
        <View style={styles.reportHeaderRow}>
          <MaterialIcons name="auto-awesome" size={moderateScale(24)} color={Colors.primary} />
          <Text style={styles.reportHeaderText}>MEDORA INTELLIGENCE REPORT</Text>
        </View>

        {/* AI Summary Card */}
        <View style={styles.cardContainer}>
          {/* Stylized Teal Accent */}
          <View style={styles.cardAccent} />
          
          <View style={styles.cardContent}>
            <Text style={styles.summaryText}>
              You're making steady progress, Alex. Your recent laboratory results show positive trends in glucose management.
            </Text>
            
            <View style={styles.timestampContainer}>
              <View style={styles.dot} />
              <Text style={styles.timestampText}>Report generated today at 09:42 AM</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.outlinedButton} activeOpacity={0.7}>
            <MaterialIcons name="create-new-folder" size={moderateScale(24)} color={Colors.primary} />
            <Text style={styles.outlinedButtonText}>Create Folder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryActionButton} activeOpacity={0.8}>
            <MaterialIcons name="folder-special" size={moderateScale(24)} color={Colors.onPrimary} />
            <Text style={styles.primaryActionText}>Add to Existing Folder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: verticalScale(74), // Reduced to sit tighter under header
    paddingBottom: verticalScale(120),
    paddingHorizontal: moderateScale(24),
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(160),
    backgroundColor: 'rgba(0, 103, 103, 0.06)',
    borderBottomLeftRadius: moderateScale(48),
    borderBottomRightRadius: moderateScale(48),
  },
  buttonWrapper: {
    marginTop: verticalScale(36),
    marginBottom: verticalScale(12),
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(34),
    gap: moderateScale(12),
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: moderateScale(6) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(10),
    elevation: 6,
    marginBottom: verticalScale(16),
  },
  primaryActionText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(17),
    color: Colors.onPrimary,
    letterSpacing: 0.3,
  },
  reportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  reportHeaderText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(14),
    letterSpacing: moderateScale(0.8),
    color: Colors.primary,
  },
  cardContainer: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: moderateScale(32),
    marginBottom: verticalScale(32),
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(12) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(24),
    elevation: 3,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: moderateScale(85),
    height: moderateScale(85),
    borderTopLeftRadius: moderateScale(32),
    borderLeftWidth: moderateScale(6),
    borderTopWidth: moderateScale(6),
    borderColor: Colors.primary,
  },
  cardContent: {
    padding: moderateScale(32),
    paddingTop: moderateScale(48),
  },
  summaryText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(22),
    lineHeight: moderateScale(34),
    color: Colors.onSurface,
    marginBottom: verticalScale(30),
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 103, 103, 0.08)',
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(24),
    alignSelf: 'flex-start',
    gap: moderateScale(10),
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.primary,
  },
  timestampText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: moderateScale(13),
    color: Colors.primary,
  },
  footerActions: {
    gap: moderateScale(16),
  },
  outlinedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: moderateScale(2),
    borderColor: Colors.primary,
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(34),
    gap: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  outlinedButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: moderateScale(17),
    color: Colors.primary,
    letterSpacing: 0.3,
  },
});

