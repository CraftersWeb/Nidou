import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradeItem } from '@/types';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface GradeCardProps {
  grade: GradeItem;
}

export const GradeCard: React.FC<GradeCardProps> = ({ grade }) => {
  const isAboveAverage = grade.grade >= grade.classAverage;

  return (
    <View style={styles.card}>
      {/* Top Header: Subject, Date, Coefficient */}
      <View style={styles.topRow}>
        <View style={styles.subjectGroup}>
          <Text style={styles.subject}>{grade.subject}</Text>
          <Text style={styles.dateText}>{grade.date}</Text>
        </View>

        <View style={styles.coeffBadge}>
          <Text style={styles.coeffText}>Coeff. {grade.coefficient}</Text>
        </View>
      </View>

      {/* Middle Row: Title & Grade Display */}
      <View style={styles.middleRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.evaluationTitle}>{grade.title}</Text>
          <Text style={styles.periodText}>{grade.period}</Text>
        </View>

        {/* Grade Bubble */}
        <View style={styles.gradeBox}>
          <Text style={styles.gradeNumber}>{grade.grade.toFixed(1)}</Text>
          <Text style={styles.gradeTotal}>/{grade.outOf}</Text>
        </View>
      </View>

      {/* Stats bar: Class comparison */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Moy. classe</Text>
          <Text style={styles.statValue}>{grade.classAverage.toFixed(1)}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Note min.</Text>
          <Text style={styles.statValue}>{grade.minGrade.toFixed(1)}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Note max.</Text>
          <Text style={styles.statValue}>{grade.maxGrade.toFixed(1)}</Text>
        </View>

        <View style={styles.badgeAbove}>
          <Ionicons
            name={isAboveAverage ? 'trending-up' : 'trending-down'}
            size={13}
            color={isAboveAverage ? Palette.primary : Palette.alertWarning}
          />
          <Text
            style={[
              styles.aboveText,
              { color: isAboveAverage ? Palette.primary : Palette.alertWarning },
            ]}
          >
            {isAboveAverage
              ? `+${(grade.grade - grade.classAverage).toFixed(1)}`
              : `${(grade.grade - grade.classAverage).toFixed(1)}`}
          </Text>
        </View>
      </View>

      {/* Teacher's comment if available */}
      {grade.comment ? (
        <View style={styles.commentBox}>
          <Ionicons name="chatbox-ellipses-outline" size={13} color={Palette.primary} />
          <Text style={styles.commentText}>"{grade.comment}"</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subjectGroup: {
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
  dateText: {
    fontSize: 12,
    color: Palette.textMuted,
  },
  coeffBadge: {
    backgroundColor: Palette.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  coeffText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  evaluationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
    letterSpacing: -0.2,
  },
  periodText: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  gradeBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  gradeNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: Palette.primary,
  },
  gradeTotal: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.primaryLight,
    marginLeft: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Palette.borderLight,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: Palette.textMuted,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    height: 18,
    backgroundColor: Palette.border,
    marginHorizontal: 8,
  },
  badgeAbove: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  aboveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#FAFDFB',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: Palette.primary,
  },
  commentText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Palette.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
});
