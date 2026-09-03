import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Palette } from '@/constants/Colors';
import { useApp } from '@/services/AppContext';
import { SourceCard } from '@/components/SourceCard';
import { AddChildModal } from '@/components/AddChildModal';
import { SchoolGoModal } from '@/components/SchoolGoModal';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilScreen() {
  const router = useRouter();
  const {
    parent,
    childrenList,
    selectedChild,
    selectChild,
    addNewChild,
    sources,
    schoolGoData,
    triggerSync,
    isSyncing,
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSchoolGoModalOpen, setIsSchoolGoModalOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.background} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Profil & Paramètres</Text>
          <Text style={styles.pageSubtitle}>
            Gérez vos enfants et vos services connectés
          </Text>
        </View>

        {/* 1. Parent Account Card */}
        <View style={styles.parentCard}>
          <View style={styles.parentRow}>
            <View style={styles.parentAvatar}>
              <Text style={styles.parentAvatarText}>
                {parent.firstName.charAt(0)}
                {parent.lastName.charAt(0)}
              </Text>
            </View>

            <View style={styles.parentInfo}>
              <View style={styles.parentNameRow}>
                <Text style={styles.parentName}>
                  {parent.firstName} {parent.lastName}
                </Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={12} color={Palette.primary} />
                  <Text style={styles.verifiedText}>Parent</Text>
                </View>
              </View>
              <Text style={styles.parentEmail}>{parent.email}</Text>
              <Text style={styles.parentPhone}>{parent.phone}</Text>
            </View>
          </View>
        </View>

        {/* 2. Mes enfants Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Ionicons name="people-outline" size={18} color={Palette.primary} />
            <Text style={styles.sectionTitle}>Mes enfants</Text>
          </View>
          <Text style={styles.sectionBadgeText}>{childrenList.length} rattaché(s)</Text>
        </View>

        <View style={styles.childrenContainer}>
          {childrenList.map((child) => {
            const isCurrent = child.id === selectedChild.id;
            return (
              <TouchableOpacity
                key={child.id}
                style={[
                  styles.childCard,
                  isCurrent && styles.childCardCurrent,
                ]}
                activeOpacity={0.8}
                onPress={() => selectChild(child.id)}
              >
                <View style={styles.childLeft}>
                  <View
                    style={[
                      styles.childAvatar,
                      isCurrent && styles.childAvatarCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.childAvatarText,
                        isCurrent && styles.childAvatarTextCurrent,
                      ]}
                    >
                      {child.firstName.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.childDetails}>
                    <View style={styles.childNameRow}>
                      <Text style={styles.childName}>
                        {child.firstName} {child.lastName}
                      </Text>
                      {isCurrent && (
                        <View style={styles.activePill}>
                          <Text style={styles.activePillText}>Actif</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.childSchool}>
                      {child.grade} • {child.schoolName}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name={isCurrent ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isCurrent ? Palette.primary : Palette.textMuted}
                />
              </TouchableOpacity>
            );
          })}

          {/* + Ajouter un enfant Button */}
          <TouchableOpacity
            style={styles.addChildButton}
            onPress={() => setIsAddModalOpen(true)}
            activeOpacity={0.75}
          >
            <View style={styles.addChildIconCircle}>
              <Ionicons name="add" size={20} color={Palette.primary} />
            </View>
            <Text style={styles.addChildButtonText}>+ Ajouter un enfant</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Sources connectées Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Ionicons name="link-outline" size={18} color={Palette.primary} />
            <Text style={styles.sectionTitle}>Sources connectées</Text>
          </View>
          <TouchableOpacity
            style={styles.syncAllButton}
            onPress={() => triggerSync()}
            disabled={isSyncing}
          >
            <Text style={styles.syncAllText}>Tout actualiser</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sourcesContainer}>
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              onSync={() => triggerSync(source.id)}
              isSyncing={isSyncing}
            />
          ))}

          {/* Quick Access to School & Go Services */}
          <TouchableOpacity
            style={styles.openSchoolGoBtn}
            onPress={() => setIsSchoolGoModalOpen(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="restaurant-outline" size={18} color={Palette.primary} />
            <Text style={styles.openSchoolGoText}>
              Consulter les services School & Go (Menus, Solde, Périscolaire)
            </Text>
            <Ionicons name="chevron-forward" size={16} color={Palette.primary} />
          </TouchableOpacity>
        </View>

        {/* 4. App Concept & Settings */}
        <View style={styles.conceptCard}>
          <View style={styles.conceptLogoRow}>
            <View style={styles.conceptDot} />
            <Text style={styles.conceptTitle}>Nidou</Text>
            <View style={styles.versionPill}>
              <Text style={styles.versionText}>v1.0.0</Text>
            </View>
          </View>
          <Text style={styles.conceptQuote}>
            "L’essentiel au même endroit."
          </Text>
          <Text style={styles.conceptDesc}>
            Nidou centralise vos applications scolaires sans remplacer vos
            comptes existants. Pensé avec soin pour la tranquillité des parents.
          </Text>

          <TouchableOpacity
            style={styles.revisitOnboardingBtn}
            onPress={() => router.push('/onboarding')}
          >
            <Ionicons name="sparkles-outline" size={15} color={Palette.primary} />
            <Text style={styles.revisitText}>Revoir la présentation de l'app</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Add Child Modal */}
      <AddChildModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddChild={addNewChild}
      />

      {/* School & Go Detailed Modal */}
      <SchoolGoModal
        visible={isSchoolGoModalOpen}
        onClose={() => setIsSchoolGoModalOpen(false)}
        data={schoolGoData}
        childName={selectedChild.firstName}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
  },
  header: {
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Palette.textPrimary,
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  // Parent Card
  parentCard: {
    backgroundColor: Palette.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  parentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  parentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  parentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  parentName: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  parentEmail: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  parentPhone: {
    fontSize: 12,
    color: Palette.textMuted,
    marginTop: 1,
  },
  // Section Headers
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  sectionBadgeText: {
    fontSize: 12,
    color: Palette.textMuted,
    fontWeight: '500',
  },
  syncAllButton: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  syncAllText: {
    fontSize: 13,
    color: Palette.primary,
    fontWeight: '600',
  },
  // Children list
  childrenContainer: {
    gap: 10,
    marginBottom: 24,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.surface,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  childCardCurrent: {
    backgroundColor: Palette.primarySubtle,
    borderColor: Palette.primaryTint,
  },
  childLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E2EBE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childAvatarCurrent: {
    backgroundColor: Palette.primary,
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textSecondary,
  },
  childAvatarTextCurrent: {
    color: '#FFFFFF',
  },
  childDetails: {
    marginLeft: 12,
    flex: 1,
  },
  childNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  childName: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  activePill: {
    backgroundColor: Palette.primary,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  childSchool: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  addChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Palette.primary,
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
    marginTop: 4,
  },
  addChildIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addChildButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  // Sources
  sourcesContainer: {
    marginBottom: 20,
  },
  // Concept Card
  conceptCard: {
    backgroundColor: Palette.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 10,
  },
  conceptLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conceptDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.primary,
  },
  versionPill: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.primary,
  },
  conceptQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    color: Palette.textPrimary,
    marginTop: 8,
  },
  conceptDesc: {
    fontSize: 12,
    color: Palette.textSecondary,
    lineHeight: 17,
    marginTop: 6,
    marginBottom: 12,
  },
  revisitOnboardingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.primarySubtle,
    paddingVertical: 10,
    borderRadius: 12,
  },
  revisitText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.primary,
  },
  openSchoolGoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Palette.primarySubtle,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
    marginTop: 4,
  },
  openSchoolGoText: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.primary,
    flex: 1,
  },
  bottomSpacer: {
    height: 30,
  },
});
