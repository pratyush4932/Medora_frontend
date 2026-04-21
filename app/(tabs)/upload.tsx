import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { TopAppBar } from '../../src/components/TopAppBar';
import { moderateScale, verticalScale } from '../../src/utils/scaling';
import { useRouter } from 'expo-router';

export default function RecordsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Hospital', 'Manual'];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopAppBar title="Medora" rightAction="notifications" showAvatar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload</Text>
          <Text style={styles.subtitle}>Digitize your health records with one tap. Secure, indexed, and always available.</Text>
        </View>

        {/* Quick Upload Actions */}
        <View style={styles.quickUploadGrid}>
          <TouchableOpacity 
            style={[styles.uploadCard, { backgroundColor: Colors.primary }]}
            onPress={() => router.push('/scanner')}
          >
            <View style={styles.uploadIconContainer}>
              <MaterialIcons name="camera-alt" size={moderateScale(32)} color={Colors.onPrimary} />
            </View>
            <Text style={styles.uploadTitle}>Scan Document</Text>
            <Text style={[styles.uploadDesc, { color: Colors.onPrimary, opacity: 0.9 }]}>Use camera to scan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadCard}>
            <View style={[styles.uploadIconContainer, { backgroundColor: 'rgba(0, 103, 103, 0.1)' }]}>
              <MaterialIcons name="upload-file" size={moderateScale(32)} color={Colors.primary} />
            </View>
            <Text style={[styles.uploadTitle, { color: Colors.onSurface }]}>Choose File</Text>
            <Text style={styles.uploadDesc}>Upload from device</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Folders Grid */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="science" size={moderateScale(24)} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Lab Results</Text>
              <Text style={styles.folderCount}>12 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="medication" size={moderateScale(24)} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Prescriptions</Text>
              <Text style={styles.folderCount}>8 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="camera" size={moderateScale(24)} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Imaging</Text>
              <Text style={styles.folderCount}>4 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="folder-special" size={moderateScale(24)} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>General Reports</Text>
              <Text style={styles.folderCount}>15 Documents</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Documents */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Documents</Text>
          <TouchableOpacity>
            <Text style={styles.recentAction}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.documentsList}>
          <TouchableOpacity style={styles.docItem}>
            <View style={styles.docIconContainer}>
              <MaterialIcons name="description" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Cardiology Report</Text>
              <Text style={styles.docMeta}>Mar 14, 2024 • St. Jude Medical</Text>
            </View>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.docItem}>
            <View style={styles.docIconContainer}>
              <MaterialIcons name="science" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Comprehensive Blood Panel</Text>
              <Text style={styles.docMeta}>Feb 22, 2024 • Quest Labs</Text>
            </View>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.docItem}>
            <View style={styles.docIconContainer}>
              <MaterialIcons name="edit-note" size={moderateScale(24)} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Weekly Vitals Log</Text>
              <Text style={styles.docMeta}>Mar 08, 2024 • Self-Reported</Text>
            </View>
            <MaterialIcons name="chevron-right" size={moderateScale(24)} color={Colors.outlineVariant} />
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    paddingBottom: verticalScale(100),
    paddingHorizontal: moderateScale(24),
  },
  header: {
    marginBottom: verticalScale(24),
  },
  quickUploadGrid: {
    flexDirection: 'row',
    gap: moderateScale(16),
    marginBottom: verticalScale(40),
  },
  uploadCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    alignItems: 'center',
    gap: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(12),
    elevation: 2,
  },
  uploadIconContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  uploadTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(15),
    color: Colors.onPrimary,
  },
  uploadDesc: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(11),
    color: Colors.onSurfaceVariant,
    opacity: 0.8,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(36),
    color: Colors.onSurface,
    letterSpacing: moderateScale(-1),
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(16),
    color: Colors.onSurfaceVariant,
    lineHeight: moderateScale(24),
    maxWidth: '90%',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: moderateScale(6),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(32),
  },
  filterButton: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(12),
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  filterText: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(14),
    color: Colors.onSurfaceVariant,
  },
  filterTextActive: {
    color: Colors.onPrimary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(16),
    marginBottom: verticalScale(40),
  },
  folderCard: {
    width: '47%',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: moderateScale(20),
    borderRadius: moderateScale(24),
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.04,
    shadowRadius: moderateScale(24),
    elevation: 2,
    gap: moderateScale(16),
  },
  folderIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(0, 103, 103, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(16),
    color: Colors.onSurface,
    marginBottom: verticalScale(4),
  },
  folderCount: {
    fontFamily: 'Inter_500Medium',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: verticalScale(16),
  },
  recentTitle: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: moderateScale(20),
    color: Colors.onSurface,
    letterSpacing: moderateScale(-0.5),
  },
  recentAction: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(14),
    color: Colors.primary,
  },
  documentsList: {
    gap: verticalScale(16),
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: moderateScale(16),
    borderRadius: moderateScale(24),
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.03,
    shadowRadius: moderateScale(12),
    elevation: 1,
    gap: moderateScale(16),
  },
  docIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docContent: {
    flex: 1,
  },
  docTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: moderateScale(14),
    color: Colors.onSurface,
    marginBottom: verticalScale(2),
  },
  docMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: moderateScale(12),
    color: Colors.onSurfaceVariant,
  },
});
