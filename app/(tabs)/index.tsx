import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Palette } from '@/constants/Colors';
import { useApp } from '@/services/AppContext';
import { Header } from '@/components/ui/Header';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ChildSelector } from '@/components/ChildSelector';
import { ScheduleCard } from '@/components/ScheduleCard';
import { HomeworkCard } from '@/components/HomeworkCard';
import { AlertCard } from '@/components/AlertCard';
import { AddChildModal } from '@/components/AddChildModal';
import { SchoolGoWidget } from '@/components/SchoolGoWidget';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const {
    parent,
    childrenList,
    selectedChild,
    selectChild,
    addNewChild,
    schedules,
    homeworks,
    alerts,
    grades,
    generalStats,
    schoolGoData,
    markAlertAsRead,
    triggerSync,
    isSyncing,
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Today's schedule
  const todaySchedule = schedules[0];
  // Homeworks for selected child
  const childHomeworks = homeworks.filter(
    (hw) => hw.childId === selectedChild.id
  );
  // Important homeworks
  const importantHomeworks = childHomeworks.slice(0, 3);
  // Alerts for selected child
  const childAlerts = alerts.filter((al) => al.childId === selectedChild.id);
  const unreadAlertsCount = childAlerts.filter((a) => !a.read).length;
  // Recent grade
  const childGrades = grades.filter((g) => g.childId === selectedChild.id);
  const latestGrade = childGrades[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.background} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isSyncing}
            onRefresh={() => triggerSync()}
            tintColor={Palette.primary}
            colors={[Palette.primary]}
          />
        }
      >
        {/* Top Parent Header */}
        <Header
          greeting="Bonjour 👋"
          userName={parent.firstName}
          unreadCount={unreadAlertsCount}
          onNotificationPress={() => {
            router.push('/modal');
          }}
        />

        {/* Selected Child Selector Card */}
        <ChildSelector
          selectedChild={selectedChild}
          allChildren={childrenList}
          onSelectChild={selectChild}
          onAddNewPress={() => setIsAddModalOpen(true)}
        />

        {/* 1. Section "À retenir" (High UX Priority for Parents) */}
        <SectionHeader
          title="À retenir"
          subtitle="Ce qui nécessite votre attention"
          count={unreadAlertsCount}
          iconName="flash-outline"
        />

        <View style={styles.sectionBlock}>
          {childAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={() => markAlertAsRead(alert.id)}
            />
          ))}
        </View>

        {/* 2. Section "Aujourd'hui" (Timeline of the day) */}
        <SectionHeader
          title="Aujourd'hui"
          subtitle={todaySchedule?.fullDateFormatted || 'Jeudi 4 septembre'}
          actionText="Voir planning"
          onActionPress={() => router.push('/(tabs)/planning')}
          iconName="calendar-outline"
        />

        <View style={styles.timelineBlock}>
          {todaySchedule?.courses.map((course, index) => (
            <ScheduleCard
              key={course.id}
              course={course}
              isLast={index === todaySchedule.courses.length - 1}
            />
          ))}
        </View>

        {/* 3. Section "Vie pratique & Cantine" (School & Go) */}
        <SectionHeader
          title="Cantine & Périscolaire"
          subtitle="Services School & Go de la journée"
          iconName="restaurant-outline"
        />

        <SchoolGoWidget
          data={schoolGoData}
          childName={selectedChild.firstName}
        />

        {/* 4. Section "À faire" (Devoirs suivis) */}
        <SectionHeader
          title="À faire"
          subtitle="Devoirs et vérification élève"
          count={childHomeworks.filter((h) => !h.checkedByStudent).length}
          actionText="Voir tout"
          onActionPress={() => router.push('/(tabs)/travail')}
          iconName="checkbox-outline"
        />

        <View style={styles.sectionBlock}>
          {importantHomeworks.map((hw) => (
            <HomeworkCard key={hw.id} homework={hw} />
          ))}
        </View>

        {/* 4. Section "Notes & Résultats" (Quick summary) */}
        <SectionHeader
          title="Notes & Évaluations"
          subtitle={`Moyenne ${generalStats.studentAverage}/20 • ${generalStats.period}`}
          actionText="Détails"
          onActionPress={() => router.push('/(tabs)/travail')}
          iconName="ribbon-outline"
        />

        <TouchableOpacity
          style={styles.gradeOverviewCard}
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/travail')}
        >
          <View style={styles.gradeOverviewLeft}>
            <View style={styles.gradeAverageBadge}>
              <Text style={styles.gradeAverageText}>
                {generalStats.studentAverage.toFixed(1)}
              </Text>
              <Text style={styles.gradeAverageTotal}>/20</Text>
            </View>

            <View style={styles.gradeOverviewMeta}>
              <Text style={styles.gradeOverviewTitle}>Moyenne générale</Text>
              <Text style={styles.gradeOverviewClass}>
                Classe : {generalStats.classAverage.toFixed(1)}/20 (+
                {(
                  generalStats.studentAverage - generalStats.classAverage
                ).toFixed(1)}
                )
              </Text>
            </View>
          </View>

          {latestGrade && (
            <View style={styles.latestGradePill}>
              <Text style={styles.latestGradeSubject}>
                Dernière : {latestGrade.subject}
              </Text>
              <Text style={styles.latestGradeScore}>
                {latestGrade.grade.toFixed(1)}/20
              </Text>
            </View>
          )}

          <Ionicons name="chevron-forward" size={16} color={Palette.textMuted} />
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal to Add a Child */}
      <AddChildModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddChild={addNewChild}
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
    paddingTop: 8,
    paddingBottom: 28,
  },
  sectionBlock: {
    marginBottom: 6,
  },
  timelineBlock: {
    backgroundColor: Palette.surface,
    borderRadius: 22,
    padding: 16,
    paddingTop: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 6,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  gradeOverviewCard: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  gradeOverviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gradeAverageBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  gradeAverageText: {
    fontSize: 18,
    fontWeight: '800',
    color: Palette.primary,
  },
  gradeAverageTotal: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.primaryLight,
    marginLeft: 1,
  },
  gradeOverviewMeta: {
    justifyContent: 'center',
  },
  gradeOverviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  gradeOverviewClass: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  latestGradePill: {
    backgroundColor: Palette.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Palette.borderLight,
    alignItems: 'flex-end',
  },
  latestGradeSubject: {
    fontSize: 11,
    color: Palette.textMuted,
  },
  latestGradeScore: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.primary,
    marginTop: 1,
  },
  bottomSpacer: {
    height: 30,
  },
});
