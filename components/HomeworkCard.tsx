import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Homework } from '@/types';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './ui/Badge';

interface HomeworkCardProps {
  homework: Homework;
  compact?: boolean;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({
  homework,
  compact = false,
}) => {
  const isCheckedByStudent = homework.checkedByStudent;
  const isUrgent =
    !isCheckedByStudent &&
    (homework.dueDateLabel.toLowerCase().includes('demain') ||
      homework.dueDateLabel.toLowerCase().includes("aujourd'hui"));

  return (
    <View
      style={[
        styles.card,
        isCheckedByStudent && styles.cardChecked,
        isUrgent && styles.cardUrgent,
      ]}
    >
      {/* Header Row: Subject, PRONOTE Source & Due Date */}
      <View style={styles.headerRow}>
        <View style={styles.subjectRow}>
          <Text style={[styles.subject, isCheckedByStudent && styles.subjectChecked]}>
            {homework.subject}
          </Text>
          <View style={styles.sourceBadge}>
            <Text style={styles.sourceText}>{homework.source}</Text>
          </View>
        </View>

        {/* Due Date Badge */}
        <Badge
          label={homework.dueDateLabel}
          variant={isUrgent ? 'urgent' : isCheckedByStudent ? 'neutral' : 'warning'}
          icon={
            <Ionicons
              name="calendar-outline"
              size={12}
              color={
                isUrgent
                  ? Palette.alertUrgent
                  : isCheckedByStudent
                  ? Palette.textMuted
                  : Palette.alertWarning
              }
            />
          }
        />
      </View>

      {/* Main Title & Description */}
      <Text
        style={[styles.title, isCheckedByStudent && styles.titleChecked]}
      >
        {homework.title}
      </Text>

      {!compact && homework.description ? (
        <Text
          style={[styles.description, isCheckedByStudent && styles.descriptionChecked]}
          numberOfLines={2}
        >
          {homework.description}
        </Text>
      ) : null}

      {/* Footer: Read-only Student Check Status & Est Time */}
      <View style={styles.footerRow}>
        {/* Student Verification Indicator (Read-only for parent) */}
        <View
          style={[
            styles.statusIndicator,
            isCheckedByStudent
              ? styles.statusIndicatorChecked
              : styles.statusIndicatorPending,
          ]}
        >
          <Ionicons
            name={isCheckedByStudent ? 'checkmark-circle' : 'time-outline'}
            size={16}
            color={isCheckedByStudent ? '#1B4D3E' : '#B45309'}
          />
          <View>
            <Text
              style={[
                styles.statusText,
                isCheckedByStudent
                  ? styles.statusTextChecked
                  : styles.statusTextPending,
              ]}
            >
              {isCheckedByStudent
                ? 'Coché par l’élève'
                : 'Non coché par l’élève'}
            </Text>
            {isCheckedByStudent && homework.checkedAtLabel ? (
              <Text style={styles.checkedTimeSubtext}>
                {homework.checkedAtLabel}
              </Text>
            ) : null}
          </View>
        </View>

        {homework.estimatedMinutes && !isCheckedByStudent ? (
          <View style={styles.timeEst}>
            <Ionicons name="time-outline" size={12} color={Palette.textMuted} />
            <Text style={styles.timeEstText}>~{homework.estimatedMinutes} min</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  cardChecked: {
    backgroundColor: '#F8FBF9',
    borderColor: '#E2ECE7',
  },
  cardUrgent: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFFDFD',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subject: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subjectChecked: {
    color: Palette.textSecondary,
  },
  sourceBadge: {
    backgroundColor: Palette.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  sourceText: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  titleChecked: {
    color: Palette.textSecondary,
  },
  description: {
    fontSize: 13,
    color: Palette.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  descriptionChecked: {
    color: Palette.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.borderLight,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusIndicatorChecked: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  statusIndicatorPending: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextChecked: {
    color: '#1B4D3E',
  },
  statusTextPending: {
    color: '#B45309',
  },
  checkedTimeSubtext: {
    fontSize: 10,
    color: '#3F8E73',
    fontWeight: '500',
  },
  timeEst: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeEstText: {
    fontSize: 12,
    color: Palette.textMuted,
    fontWeight: '500',
  },
});
