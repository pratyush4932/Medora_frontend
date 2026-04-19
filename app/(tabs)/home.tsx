import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TopAppBar } from '../../src/components/TopAppBar';
import { Colors } from '../../src/constants/colors';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopAppBar title="Medora" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Prithwi</Text>

          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="rgba(62, 73, 73, 0.6)" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search records, labs, or providers..."
              placeholderTextColor="rgba(62, 73, 73, 0.6)"
            />
          </View>

          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.actionCard} 
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/records')}
            >
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="folder-shared" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Records</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard} 
              activeOpacity={0.8}
              onPress={() => router.push('/share-qr')}
            >
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="qr-code-2" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Generate QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart Insights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Smart Insights</Text>
          <Text style={styles.sectionAction}>Last 24 Hours</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Heart Rate */}
          <View style={[styles.bentoCard, styles.cardLight]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#fee2e2' }]}>
                <MaterialIcons name="favorite" size={20} color="#dc2626" />
              </View>
              <Text style={styles.badgeText}>NORMAL RANGE</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.mainValue}>72</Text>
              <Text style={styles.unit}>bpm</Text>
            </View>
            <Text style={styles.cardDesc}>Your heart rate is steady and within optimal zones for resting.</Text>
          </View>

          {/* Sleep Profile (Large Teal Card) */}
          <View style={[styles.bentoCard, styles.cardPrimary]}>
            <View>
              <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <MaterialIcons name="dark-mode" size={20} color={Colors.onPrimaryContainer} />
              </View>
              <Text style={[styles.cardTitle, { color: Colors.onPrimaryContainer, marginTop: 16 }]}>Sleep Score</Text>
              <Text style={[styles.mainValue, { color: Colors.onPrimaryContainer, fontSize: 48 }]}>88</Text>
            </View>
            <View style={{ marginTop: 24 }}>
              <Text style={[styles.cardDesc, { color: 'rgba(243,255,254,0.8)' }]}>
                High quality deep sleep detected. Your recovery is 12% higher than average.
              </Text>
              {/* Fake chart bars */}
              <View style={styles.chartContainer}>
                <View style={[styles.bar, { height: '60%' }]} />
                <View style={[styles.bar, { height: '40%' }]} />
                <View style={[styles.bar, { height: '80%' }]} />
                <View style={[styles.bar, { height: '70%' }]} />
                <View style={[styles.bar, { height: '95%', backgroundColor: Colors.onPrimaryContainer }]} />
                <View style={[styles.bar, { height: '50%' }]} />
              </View>
            </View>
          </View>

          {/* Hydration */}
          <View style={[styles.bentoCard, styles.cardLight]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#eff6ff' }]}>
                <MaterialIcons name="water-drop" size={20} color="#2563eb" />
              </View>
              <Text style={styles.badgeText}>ACTIVE TARGET</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.mainValue}>1.8</Text>
              <Text style={styles.unit}>Liters</Text>
            </View>
            <Text style={styles.cardDesc}>You're 200ml behind your daily goal. Sip some water!</Text>
          </View>

          {/* Medication Reminder */}
          <TouchableOpacity 
            style={[styles.bentoCard, styles.cardTertiary]} 
            activeOpacity={0.9}
            onPress={() => router.push('/scanner')}
          >
            <View style={styles.medRow}>
              <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,255,255,0.2)', width: 56, height: 56, borderRadius: 28 }]}>
                <MaterialIcons name="camera-alt" size={28} color={Colors.onTertiary} />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={[styles.badgeText, { color: 'rgba(255,255,255,0.7)', marginBottom: 4 }]}>QUICK ACTION</Text>
                <Text style={[styles.cardTitle, { color: Colors.onTertiary, fontSize: 18 }]}>Scan Record</Text>
                <Text style={[styles.cardDesc, { color: 'rgba(255,255,255,0.9)' }]}>Point your camera to instantly digitize documents.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Records */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Records</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/records')}>
            <Text style={styles.sectionAction}>View Full Archive</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recordsList}>
          <TouchableOpacity style={styles.recordItem} onPress={() => router.push('/ai-summary')}>
            <View style={styles.recordIconContainer}>
              <MaterialIcons name="description" size={24} color={Colors.primary} />
            </View>
            <View style={styles.recordContent}>
              <Text style={styles.recordTitle}>Annual Health Screening</Text>
              <Text style={styles.recordDesc}>General checkup results and blood panel analysis.</Text>
            </View>
            <View style={styles.recordMeta}>
              <Text style={styles.recordDate}>Oct 14, 2023</Text>
              <Text style={styles.recordHospital}>METROPOLITAN HOSPITAL</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordItem}>
            <View style={styles.recordIconContainer}>
              <MaterialIcons name="scanner" size={24} color={Colors.primary} />
            </View>
            <View style={styles.recordContent}>
              <Text style={styles.recordTitle}>Lumbar Spine MRI</Text>
              <Text style={styles.recordDesc}>Diagnostic imaging report for lower back discomfort.</Text>
            </View>
            <View style={styles.recordMeta}>
              <Text style={styles.recordDate}>Sep 28, 2023</Text>
              <Text style={styles.recordHospital}>ADVANCED RADIOLOGY</Text>
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
  heroSection: {
    marginBottom: 48,
  },
  greeting: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 32,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  name: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 40,
    color: Colors.primary,
    letterSpacing: -1,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 32,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.onSurface,
    height: '100%',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(189, 201, 200, 0.15)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 103, 103, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.onSurface,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  sectionAction: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  bentoGrid: {
    gap: 24,
    marginBottom: 48,
  },
  bentoCard: {
    borderRadius: 24,
    padding: 24,
  },
  cardLight: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(189, 201, 200, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  cardPrimary: {
    backgroundColor: Colors.primaryContainer,
  },
  cardTertiary: {
    backgroundColor: Colors.tertiary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconBadge: {
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(62, 73, 73, 0.6)',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
  },
  mainValue: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 36,
    color: Colors.onSurface,
  },
  unit: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: Colors.onSurfaceVariant,
  },
  cardTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
  },
  cardDesc: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 80,
    marginTop: 16,
    backgroundColor: 'rgba(243,255,254,0.1)',
    borderRadius: 12,
    padding: 12,
  },
  bar: {
    flex: 1,
    backgroundColor: 'rgba(243,255,254,0.4)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  medRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordsList: {
    gap: 16,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 20,
    gap: 16,
  },
  recordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  recordDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  recordMeta: {
    alignItems: 'flex-end',
    display: 'none', // Hide on mobile, show on tablet
  },
  recordDate: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.onSurface,
  },
  recordHospital: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
