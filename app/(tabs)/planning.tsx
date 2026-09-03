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
import { ScheduleCard } from '@/components/ScheduleCard';
import { Ionicons } from '@expo/vector-icons';

export default function PlanningScreen() {
  const { schedules, selectedChild } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const currentDay = schedules[selectedDayIndex] || schedules[0];
  const totalCourses = currentDay.courses.filter((c) => !c.isBreak).length;
  const totalBreaks = currentDay.courses.filter((c) => c.isBreak).length;

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
            <Text style={styles.pageTitle}>Planning</Text>
            <Text style={styles.pageSubtitle}>
              Emploi du temps de {selectedChild.firstName} • {selectedChild.grade}
            </Text>
          </View>
        </View>

        {/* Day Selector Pills */}
        <View style={styles.daySelectorContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsScroll}
          >
            {schedules.map((day, idx) => {
              const isSelected = idx === selectedDayIndex;
              return (
                <TouchableOpacity
                  key={day.date}
                  style={[styles.pill, isSelected && styles.pillActive]}
                  onPress={() => setSelectedDayIndex(idx)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.pillText, isSelected && styles.pillTextActive]}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Day Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryDate}>
              {currentDay.fullDateFormatted}
            </Text>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Ionicons name="book-outline" size={13} color={Palette.primary} />
                <Text style={styles.statText}>{totalCourses} cours</Text>
              </View>
              <View style={styles.statDot} />
              <View style={styles.statItem}>
                <Ionicons name="cafe-outline" size={13} color={Palette.moss} />
                <Text style={styles.statText}>{totalBreaks} pauses</Text>
              </View>
              <View style={styles.statDot} />
              <Text style={styles.statTimeRange}>
                {currentDay.courses[0]?.startTime} -{' '}
                {currentDay.courses[currentDay.courses.length - 1]?.endTime}
              </Text>
            </View>
          </View>

          <View style={styles.summaryIconCircle}>
            <Ionicons name="calendar" size={20} color={Palette.primary} />
          </View>
        </View>

        {/* Schedule Timeline */}
        <View style={styles.timelineContainer}>
          {currentDay.courses.map((course, index) => (
            <ScheduleCard
              key={course.id}
              course={course}
              isLast={index === currentDay.courses.length - 1}
            />
          ))}
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  daySelectorContainer: {
    marginVertical: 12,
  },
  pillsScroll: {
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  pillActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: Palette.primarySubtle,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryDate: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Palette.textMuted,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  statTimeRange: {
    fontSize: 12,
    color: Palette.textMuted,
  },
  summaryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  timelineContainer: {
    backgroundColor: Palette.surface,
    borderRadius: 22,
    padding: 16,
    paddingTop: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  bottomSpacer: {
    height: 30,
  },
});
