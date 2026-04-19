import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../src/constants/colors';
import { TopAppBar } from '../src/components/TopAppBar';

export default function AiSummaryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopAppBar title="AI Health Summary" showBack showAvatar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Actions */}
        <TouchableOpacity style={styles.viewFileButton} activeOpacity={0.8}>
          <MaterialIcons name="visibility" size={20} color={Colors.onPrimary} />
          <Text style={styles.viewFileText}>View Uploaded File</Text>
        </TouchableOpacity>

        {/* Medora Intelligence Report Badge */}
        <View style={styles.badgeRow}>
          <MaterialIcons name="auto-awesome" size={24} color={Colors.primary} />
          <Text style={styles.badgeText}>MEDORA INTELLIGENCE REPORT</Text>
        </View>

        {/* AI Report Card */}
        <View style={styles.reportCard}>
          <Text style={styles.reportText}>
            You're making steady progress, Alex. Your recent laboratory results show positive trends in glucose management.
          </Text>
          
          <View style={styles.timestampBadge}>
            <View style={styles.timestampDot} />
            <Text style={styles.timestampText}>Report generated today at 09:42 AM</Text>
          </View>
        </View>

        {/* Folder Actions */}
        <View style={styles.folderActions}>
          <TouchableOpacity style={styles.createFolderBtn} activeOpacity={0.7}>
            <MaterialIcons name="create-new-folder" size={20} color={Colors.primary} />
            <Text style={styles.createFolderText}>Create Folder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addFolderBtn} activeOpacity={0.8}>
            <MaterialIcons name="folder-special" size={20} color={Colors.onPrimary} />
            <Text style={styles.addFolderText}>Add to Existing Folder</Text>
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
    paddingTop: 88,
    paddingBottom: 40,
    paddingHorizontal: 24,
    gap: 16,
  },
  viewFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 32,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  viewFileText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: Colors.onPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  badgeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    letterSpacing: 0.5,
    color: Colors.primary,
  },
  reportCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 32,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    marginTop: 8,
  },
  reportText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.onSurface,
    marginBottom: 24,
  },
  timestampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 103, 103, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    alignSelf: 'flex-start',
    gap: 8,
  },
  timestampDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  timestampText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.primary,
  },
  folderActions: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
  },
  createFolderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 32,
    gap: 8,
  },
  createFolderText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: Colors.primary,
  },
  addFolderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 32,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addFolderText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: Colors.onPrimary,
  },
});
