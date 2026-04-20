import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { TopAppBar } from '../../src/components/TopAppBar';

export default function RecordsScreen() {
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
              <MaterialIcons name="camera-alt" size={32} color={Colors.onPrimary} />
            </View>
            <Text style={styles.uploadTitle}>Scan Document</Text>
            <Text style={[styles.uploadDesc, { color: Colors.onPrimary, opacity: 0.9 }]}>Use camera to scan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadCard}>
            <View style={[styles.uploadIconContainer, { backgroundColor: 'rgba(0, 103, 103, 0.1)' }]}>
              <MaterialIcons name="upload-file" size={32} color={Colors.primary} />
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
              <MaterialIcons name="science" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Lab Results</Text>
              <Text style={styles.folderCount}>12 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="medication" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Prescriptions</Text>
              <Text style={styles.folderCount}>8 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="camera" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.folderTitle}>Imaging</Text>
              <Text style={styles.folderCount}>4 Documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.folderCard}>
            <View style={styles.folderIconContainer}>
              <MaterialIcons name="folder-special" size={24} color={Colors.primary} />
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
              <MaterialIcons name="description" size={24} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Cardiology Report</Text>
              <Text style={styles.docMeta}>Mar 14, 2024 • St. Jude Medical</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.docItem}>
            <View style={styles.docIconContainer}>
              <MaterialIcons name="science" size={24} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Comprehensive Blood Panel</Text>
              <Text style={styles.docMeta}>Feb 22, 2024 • Quest Labs</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.docItem}>
            <View style={styles.docIconContainer}>
              <MaterialIcons name="edit-note" size={24} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.docContent}>
              <Text style={styles.docTitle}>Weekly Vitals Log</Text>
              <Text style={styles.docMeta}>Mar 08, 2024 • Self-Reported</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outlineVariant} />
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
    paddingTop: 88,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
  },
  quickUploadGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  uploadCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.onPrimary,
  },
  uploadDesc: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    opacity: 0.8,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 36,
    color: Colors.onSurface,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    maxWidth: '90%',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  filterTextActive: {
    color: Colors.onPrimary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
  },
  folderCard: {
    width: '47%',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    gap: 16,
  },
  folderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 103, 103, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  folderCount: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  recentTitle: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 20,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  recentAction: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  documentsList: {
    gap: 16,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 24,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 1,
    gap: 16,
  },
  docIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docContent: {
    flex: 1,
  },
  docTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.onSurface,
    marginBottom: 2,
  },
  docMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
});
