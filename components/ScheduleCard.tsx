import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Course } from '@/types';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface ScheduleCardProps {
  course: Course;
  isLast?: boolean;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ course, isLast }) => {
  const isCurrent = course.status === 'current';
  const isPast = course.status === 'past';
  const isBreak = course.isBreak;

  return (
    <View style={styles.container}>
      {/* Time column */}
      <View style={styles.timeColumn}>
        <Text style={[styles.startTime, isCurrent && styles.activeTimeText]}>
          {course.startTime}
        </Text>
        <Text style={styles.endTime}>{course.endTime}</Text>
      </View>

      {/* Timeline line & indicator */}
      <View style={styles.timelineColumn}>
        <View
          style={[
            styles.dot,
            isCurrent && styles.dotActive,
            isPast && styles.dotPast,
            isBreak && styles.dotBreak,
          ]}
        >
          {isCurrent && <View style={styles.innerDot} />}
        </View>
        {!isLast && (
          <View
            style={[
              styles.line,
              isPast && styles.linePast,
              isBreak && styles.lineBreak,
            ]}
          />
        )}
      </View>

      {/* Course Card */}
      <View
        style={[
          styles.card,
          isBreak && styles.breakCard,
          isCurrent && styles.currentCard,
        ]}
      >
        <View style={styles.topRow}>
          <Text
            style={[
              styles.subject,
              isBreak && styles.breakSubject,
              isCurrent && styles.currentSubject,
            ]}
            numberOfLines={1}
          >
            {course.subject}
          </Text>

          {isCurrent && (
            <View style={styles.currentBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.currentBadgeText}>En cours</Text>
            </View>
          )}

          {isBreak && (
            <View style={styles.breakBadge}>
              <Ionicons
                name={course.subject.includes('Cantine') ? 'restaurant-outline' : 'cafe-outline'}
                size={12}
                color={Palette.moss}
              />
              <Text style={styles.breakBadgeText}>Pause</Text>
            </View>
          )}
        </View>

        {!isBreak ? (
          <View style={styles.metaRow}>
            {course.room ? (
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={13} color={Palette.textSecondary} />
                <Text style={styles.metaText}>{course.room}</Text>
              </View>
            ) : null}

            {course.teacher ? (
              <View style={styles.metaItem}>
                <Ionicons name="person-outline" size={13} color={Palette.textSecondary} />
                <Text style={styles.metaText}>{course.teacher}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            <Text style={styles.breakLocation}>
              {course.room} {course.teacher ? `• ${course.teacher}` : ''}
            </Text>
            {course.subject.includes('Cantine') && (
              <View style={styles.canteenTag}>
                <Ionicons name="restaurant" size={11} color={Palette.primary} />
                <Text style={styles.canteenTagText}>
                  School & Go • Colin sauce citronnée & Riz bio
                </Text>
              </View>
            )}
          </View>
        )}

        {course.notes ? (
          <View style={styles.notesContainer}>
            <Ionicons name="information-circle-outline" size={13} color={Palette.primary} />
            <Text style={styles.notesText}>{course.notes}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  timeColumn: {
    width: 48,
    alignItems: 'flex-start',
    paddingTop: 14,
  },
  startTime: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  activeTimeText: {
    color: Palette.primary,
    fontWeight: '800',
  },
  endTime: {
    fontSize: 11,
    fontWeight: '500',
    color: Palette.textMuted,
    marginTop: 2,
  },
  timelineColumn: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Palette.primary,
    backgroundColor: '#FFFFFF',
    marginTop: 17,
    zIndex: 2,
  },
  dotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: Palette.primary,
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
  },
  dotPast: {
    borderColor: Palette.borderStrong,
    backgroundColor: Palette.surfaceSubtle,
  },
  dotBreak: {
    borderColor: Palette.sage,
    backgroundColor: '#FFFFFF',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Palette.primaryTint,
    marginTop: 2,
    marginBottom: -6,
  },
  linePast: {
    backgroundColor: Palette.border,
  },
  lineBreak: {
    backgroundColor: '#E4ECE8',
  },
  card: {
    flex: 1,
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 13,
    marginLeft: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  currentCard: {
    borderColor: Palette.primary,
    borderWidth: 1.5,
    backgroundColor: '#FAFDFB',
  },
  breakCard: {
    backgroundColor: '#F7FAF8',
    borderColor: '#E7ECE9',
    borderStyle: 'dashed',
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.textPrimary,
    flex: 1,
    letterSpacing: -0.2,
  },
  currentSubject: {
    color: Palette.primary,
  },
  breakSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  breakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1ED',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  breakBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.moss,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  breakLocation: {
    fontSize: 12,
    color: Palette.textMuted,
    marginTop: 3,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
  },
  notesText: {
    fontSize: 12,
    color: Palette.primary,
    fontWeight: '500',
    flex: 1,
  },
  canteenTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  canteenTagText: {
    fontSize: 11,
    color: Palette.primary,
    fontWeight: '600',
  },
});
