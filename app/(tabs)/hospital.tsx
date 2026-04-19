import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';

export default function HospitalRecordsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Header without Glassmorphism for this screen to match design */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Text style={styles.appBarTitle}>Medora Health</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8VA4SZBnDdzHMnXiwIUazGaJ_BoYaXV3qNoEvd8Wr5OgKLVYdsbHa_890BF0yFOfscfd-OE2lqn2iMWk6Az_XAXzLlnt39LNLOBJl4YorrDCyDTN0zEyx6tRmEhWboosax0L3Wzn5juQRVI-imqkgwSIyx5x0k8Z80r-_HoHvvkW9nYxpVDTQtJ07A2sFTix22o4CMBsCFne-RUnknkdNFn9k170-l5KwGguezIfhiXbEgobhBGQJdZpAXPkq3c6GcCMCM11g3hg' }} 
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Records Overview</Text>
          <Text style={styles.subtitle}>A curated chronological view of your clinical history, organized by primary care facility.</Text>
        </View>

        {/* Metropolitan Hospital Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.hospitalIcon}>
              <MaterialIcons name="local-hospital" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.hospitalName}>Metropolitan Hospital</Text>
              <Text style={styles.hospitalMeta}>12 Documents • Last updated Oct 24</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            {/* Record Card 1 */}
            <TouchableOpacity style={styles.recordCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialIcons name="science" size={24} color={Colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Comprehensive Blood Analysis</Text>
                  
                  <View style={styles.metaRow}>
                    <MaterialIcons name="calendar-today" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Oct 24, 2023</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="person" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Dr. Sarah Jenkins</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="category" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Lab Result</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={Colors.primary} style={styles.chevron} />
              </View>
            </TouchableOpacity>

            {/* Record Card 2 */}
            <TouchableOpacity style={styles.recordCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialIcons name="scanner" size={24} color={Colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Lumbar MRI Scan</Text>
                  
                  <View style={styles.metaRow}>
                    <MaterialIcons name="calendar-today" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Sep 12, 2023</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="domain" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Radiology Dept</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="category" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Imaging</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={Colors.primary} style={styles.chevron} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* City Wellness Center Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.hospitalIcon}>
              <MaterialIcons name="health-and-safety" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.hospitalName}>City Wellness Center</Text>
              <Text style={styles.hospitalMeta}>4 Documents • Last updated Aug 05</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            {/* Record Card 3 */}
            <TouchableOpacity style={styles.recordCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialIcons name="monitor-heart" size={24} color={Colors.primary} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Cardiology Evaluation</Text>
                  
                  <View style={styles.metaRow}>
                    <MaterialIcons name="calendar-today" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Aug 05, 2023</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="person" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Dr. Alan Chen</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MaterialIcons name="category" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.metaText}>Evaluation</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={Colors.primary} style={styles.chevron} />
              </View>
            </TouchableOpacity>
          </View>
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
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(248, 250, 250, 0.8)',
    zIndex: 50,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: Colors.primary,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 36,
    color: Colors.onSurface,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: Colors.onSurfaceVariant,
    lineHeight: 28,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    paddingLeft: 8,
  },
  hospitalIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hospitalName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: Colors.onSurface,
  },
  hospitalMeta: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  cardsContainer: {
    gap: 24,
  },
  recordCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(189, 201, 200, 0.2)',
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  cardIcon: {
    padding: 12,
    backgroundColor: 'rgba(214, 224, 246, 0.3)', // secondary-container at 30%
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: Colors.onSurface,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  metaText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  chevron: {
    display: 'none', // Can use media queries with NativeWind, but basic display here
  },
});
