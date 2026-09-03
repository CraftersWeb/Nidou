import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Palette } from '@/constants/Colors';
import { useApp } from '@/services/AppContext';
import { HomeworkCard } from '@/components/HomeworkCard';
import { GradeCard } from '@/components/GradeCard';
import { Ionicons } from '@expo/vector-icons';

type ViewMode = 'homework' | 'grades';
type HomeworkFilter = 'all' | 'pending' | 'checked';

export default function TravailScreen() {
  const { homeworks, grades, subjectSummaries, generalStats, selectedChild } =
    useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('homework');
  const [hwFilter, setHwFilter] = useState<HomeworkFilter>('all');

  const childHomeworks = homeworks.filter(
    (hw) => hw.childId === selectedChild.id
  );
  const childGrades = grades.filter((gr) => gr.childId === selectedChild.id);

  // Homework calculations based on student checks
  const checkedByStudentCount = childHomeworks.filter(
    (h) => h.checkedByStudent
  ).length;
  const pendingCount = childHomeworks.length - checkedByStudentCount;
  const totalHomeworks = childHomeworks.length;

  const filteredHomeworks = childHomeworks.filter((hw) => {
    if (hwFilter === 'pending') return !hw.checkedByStudent;
    if (hwFilter === 'checked') return hw.checkedByStudent;
    return true;
  });

  const progressPercent =
    totalHomeworks > 0
      ? Math.round((checkedByStudentCount / totalHomeworks) * 100)
      : 0;

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
          <View>
            <Text style={styles.pageTitle}>Travail & Évaluations</Text>
            <Text style={styles.pageSubtitle}>
              Suivi scolaire de {selectedChild.firstName} • {selectedChild.grade}
            </Text>
          </View>
        </View>

        {/* Top Segmented Switcher: Devoirs vs Notes */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              viewMode === 'homework' && styles.segmentButtonActive,
            ]}
            onPress={() => setViewMode('homework')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={viewMode === 'homework' ? 'checkbox' : 'checkbox-outline'}
              size={16}
              color={viewMode === 'homework' ? Palette.primary : Palette.textSecondary}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === 'homework' && styles.segmentTextActive,
              ]}
            >
              Devoirs ({pendingCount} à faire)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              viewMode === 'grades' && styles.segmentButtonActive,
            ]}
            onPress={() => setViewMode('grades')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={viewMode === 'grades' ? 'ribbon' : 'ribbon-outline'}
              size={16}
              color={viewMode === 'grades' ? Palette.primary : Palette.textSecondary}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === 'grades' && styles.segmentTextActive,
              ]}
            >
              Notes ({generalStats.studentAverage}/20)
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= MODE DEVOIRS ================= */}
        {viewMode === 'homework' && (
          <>
            {/* Student Progress Banner */}
            <View style={styles.progressCard}>
              <View style={styles.progressTopRow}>
                <View style={styles.progressTextGroup}>
                  <Text style={styles.progressTitle}>
                    Devoirs cochés par l'élève
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {checkedByStudentCount} sur {totalHomeworks} devoirs validés
                    par {selectedChild.firstName}
                  </Text>
                </View>
                <View style={styles.percentBadge}>
                  <Text style={styles.percentText}>{progressPercent}%</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
            </View>

            {/* Read-only notification badge for parents */}
            <View style={styles.infoBanner}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={Palette.primary}
              />
              <Text style={styles.infoBannerText}>
                Les devoirs sont cochés directement par {selectedChild.firstName}{' '}
                sur son espace élève PRONOTE.
              </Text>
            </View>

            {/* Homework Status Filter Tabs */}
            <View style={styles.filterTabs}>
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  hwFilter === 'all' && styles.filterTabActive,
                ]}
                onPress={() => setHwFilter('all')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    hwFilter === 'all' && styles.filterTabTextActive,
                  ]}
                >
                  Tous ({totalHomeworks})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterTab,
                  hwFilter === 'pending' && styles.filterTabActive,
                ]}
                onPress={() => setHwFilter('pending')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    hwFilter === 'pending' && styles.filterTabTextActive,
                  ]}
                >
                  Non cochés ({pendingCount})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterTab,
                  hwFilter === 'checked' && styles.filterTabActive,
                ]}
                onPress={() => setHwFilter('checked')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    hwFilter === 'checked' && styles.filterTabTextActive,
                  ]}
                >
                  Cochés par l’élève ({checkedByStudentCount})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Homework List */}
            <View style={styles.listContainer}>
              {filteredHomeworks.length === 0 ? (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIconCircle}>
                    <Ionicons
                      name="checkmark-done"
                      size={28}
                      color={Palette.primary}
                    />
                  </View>
                  <Text style={styles.emptyTitle}>
                    Aucun devoir dans cette catégorie
                  </Text>
                  <Text style={styles.emptySubtitle}>
                    Tous les travaux scolaires sont à jour.
                  </Text>
                </View>
              ) : (
                filteredHomeworks.map((hw) => (
                  <HomeworkCard key={hw.id} homework={hw} />
                ))
              )}
            </View>
          </>
        )}

        {/* ================= MODE NOTES ================= */}
        {viewMode === 'grades' && (
          <>
            {/* General Average Summary Card */}
            <View style={styles.gradesSummaryCard}>
              <View style={styles.gradesSummaryHeader}>
                <View>
                  <Text style={styles.gradesSummaryPeriod}>
                    {generalStats.period}
                  </Text>
                  <Text style={styles.gradesSummaryTitle}>Moyenne générale</Text>
                </View>
                <View style={styles.averageBigPill}>
                  <Text style={styles.averageBigNumber}>
                    {generalStats.studentAverage.toFixed(1)}
                  </Text>
                  <Text style={styles.averageBigTotal}>/20</Text>
                </View>
              </View>

              <View style={styles.gradesSummaryDivider} />

              <View style={styles.gradesSummaryRow}>
                <View style={styles.gradeStatBlock}>
                  <Text style={styles.gradeStatLabel}>Moyenne classe</Text>
                  <Text style={styles.gradeStatValue}>
                    {generalStats.classAverage.toFixed(1)} / 20
                  </Text>
                </View>
                <View style={styles.gradeStatBlock}>
                  <Text style={styles.gradeStatLabel}>Meilleure note</Text>
                  <Text style={styles.gradeStatValueHighlight}>
                    {generalStats.highestGrade.toFixed(1)} / 20
                  </Text>
                </View>
                <View style={styles.gradeStatBlock}>
                  <Text style={styles.gradeStatLabel}>Évaluations</Text>
                  <Text style={styles.gradeStatValue}>
                    {generalStats.gradesTotal} notes
                  </Text>
                </View>
              </View>
            </View>

            {/* Subject Averages Mini Cards */}
            <Text style={styles.sectionHeading}>Moyennes par matière</Text>
            <View style={styles.subjectAveragesContainer}>
              {subjectSummaries.map((sub) => {
                const isAbove = sub.average >= sub.classAverage;
                return (
                  <View key={sub.subject} style={styles.subjectAvgCard}>
                    <View style={styles.subjectAvgHeader}>
                      <Text style={styles.subjectAvgName} numberOfLines={1}>
                        {sub.subject}
                      </Text>
                      <View style={styles.subjectAvgBadge}>
                        <Text style={styles.subjectAvgNumber}>
                          {sub.average.toFixed(1)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.subjectBarBg}>
                      <View
                        style={[
                          styles.subjectBarFill,
                          { width: `${(sub.average / 20) * 100}%` },
                        ]}
                      />
                    </View>

                    <View style={styles.subjectAvgFooter}>
                      <Text style={styles.subjectAvgClass}>
                        Classe : {sub.classAverage.toFixed(1)}
                      </Text>
                      <Text
                        style={[
                          styles.subjectDiff,
                          { color: isAbove ? Palette.primary : Palette.alertWarning },
                        ]}
                      >
                        {isAbove
                          ? `+${(sub.average - sub.classAverage).toFixed(1)}`
                          : `${(sub.average - sub.classAverage).toFixed(1)}`}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Recent Evaluations List */}
            <Text style={styles.sectionHeading}>Dernières évaluations</Text>
            <View style={styles.listContainer}>
              {childGrades.map((grade) => (
                <GradeCard key={grade.id} grade={grade} />
              ))}
            </View>
          </>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  // Segmented Switcher
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 16,
    padding: 4,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  segmentButtonActive: {
    backgroundColor: Palette.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  segmentTextActive: {
    color: Palette.primary,
    fontWeight: '700',
  },
  // Progress Card
  progressCard: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  progressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTextGroup: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  progressSubtitle: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  percentBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentText: {
    fontSize: 14,
    fontWeight: '800',
    color: Palette.primary,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.primary,
    borderRadius: 4,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  infoBannerText: {
    fontSize: 12,
    color: Palette.primary,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  filterTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  filterTabActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContainer: {
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    backgroundColor: Palette.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.textPrimary,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: Palette.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  // Notes Mode Styles
  gradesSummaryCard: {
    backgroundColor: Palette.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  gradesSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradesSummaryPeriod: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gradesSummaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Palette.textPrimary,
    marginTop: 2,
  },
  averageBigPill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: Palette.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  averageBigNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  averageBigTotal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D4EBE2',
    marginLeft: 2,
  },
  gradesSummaryDivider: {
    height: 1,
    backgroundColor: Palette.borderLight,
    marginVertical: 14,
  },
  gradesSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradeStatBlock: {
    flex: 1,
  },
  gradeStatLabel: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '500',
  },
  gradeStatValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginTop: 2,
  },
  gradeStatValueHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.primary,
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginBottom: 10,
    marginTop: 6,
  },
  subjectAveragesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  subjectAvgCard: {
    width: '48%',
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  subjectAvgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subjectAvgName: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.textPrimary,
    flex: 1,
    marginRight: 4,
  },
  subjectAvgBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  subjectAvgNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: Palette.primary,
  },
  subjectBarBg: {
    height: 5,
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 6,
  },
  subjectBarFill: {
    height: '100%',
    backgroundColor: Palette.primary,
    borderRadius: 3,
  },
  subjectAvgFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjectAvgClass: {
    fontSize: 10,
    color: Palette.textMuted,
  },
  subjectDiff: {
    fontSize: 10,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 30,
  },
});
