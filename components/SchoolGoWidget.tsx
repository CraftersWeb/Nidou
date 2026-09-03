import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from '@/constants/Colors';
import { SchoolGoData } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { SchoolGoModal } from './SchoolGoModal';

interface SchoolGoWidgetProps {
  data: SchoolGoData;
  childName: string;
}

export const SchoolGoWidget: React.FC<SchoolGoWidgetProps> = ({
  data,
  childName,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => setModalOpen(true)}
      >
        {/* Top Header: Source badge & open action */}
        <View style={styles.topHeader}>
          <View style={styles.badgeRow}>
            <View style={styles.sourceTag}>
              <Ionicons name="restaurant-outline" size={13} color={Palette.primary} />
              <Text style={styles.sourceTagText}>School & Go</Text>
            </View>
            <Text style={styles.dayStatus}>Aujourd'hui à la cantine</Text>
          </View>

          <View style={styles.actionPill}>
            <Text style={styles.actionPillText}>Menus & Carte</Text>
            <Ionicons name="chevron-forward" size={13} color={Palette.primary} />
          </View>
        </View>

        {/* Canteen Summary */}
        <View style={styles.canteenRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.emojiText}>🥗</Text>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.dishTitle} numberOfLines={1}>
              {data.todayMenu.mainCourse}
            </Text>
            <Text style={styles.dishSubtitle} numberOfLines={1}>
              {data.todayMenu.starter} • {data.todayMenu.dessert}
            </Text>
          </View>

          <View style={styles.balanceBadge}>
            <Text style={styles.balanceNumber}>
              {data.canteenAccount.balance.toFixed(2)} €
            </Text>
            <Text style={styles.balanceLabel}>
              {data.canteenAccount.mealsRemaining} repas
            </Text>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.divider} />

        {/* Evening Study / After-School Line */}
        <View style={styles.footerRow}>
          <View style={styles.afterSchoolLine}>
            <Ionicons name="school-outline" size={14} color={Palette.primary} />
            <Text style={styles.afterSchoolText}>
              Étude du soir :{' '}
              <Text style={styles.boldText}>{data.afterSchool.timeSlot}</Text>
            </Text>
          </View>

          <View style={styles.transportLine}>
            <Ionicons name="bus-outline" size={13} color={Palette.textSecondary} />
            <Text style={styles.transportText}>Bus S-14 (17:48)</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Detailed Modal */}
      <SchoolGoModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        childName={childName}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 20,
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sourceTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  dayStatus: {
    fontSize: 12,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  actionPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
  },
  canteenRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  emojiText: {
    fontSize: 22,
  },
  menuInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  dishTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  dishSubtitle: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  balanceBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  balanceNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: Palette.primary,
  },
  balanceLabel: {
    fontSize: 10,
    color: Palette.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Palette.borderLight,
    marginVertical: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  afterSchoolLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  afterSchoolText: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  boldText: {
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  transportLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  transportText: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '500',
  },
});
