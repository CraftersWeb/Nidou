import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { AlertItem } from '@/types';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge, BadgeVariant } from './ui/Badge';

interface AlertCardProps {
  alert: AlertItem;
  onMarkAsRead?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkAsRead }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getThemeConfig = () => {
    switch (alert.type) {
      case 'homework':
        return {
          iconName: 'time-outline' as const,
          iconColor: '#B45309',
          iconBg: '#FEF3C7',
          badgeVariant: 'warning' as BadgeVariant,
        };
      case 'absence':
        return {
          iconName: 'alert-circle-outline' as const,
          iconColor: '#C026D3',
          iconBg: '#FAE8FF',
          badgeVariant: 'neutral' as BadgeVariant,
        };
      case 'grade':
        return {
          iconName: 'ribbon-outline' as const,
          iconColor: '#15803D',
          iconBg: '#DCFCE7',
          badgeVariant: 'success' as BadgeVariant,
        };
      case 'message':
      default:
        return {
          iconName: 'mail-outline' as const,
          iconColor: Palette.primary,
          iconBg: Palette.primarySubtle,
          badgeVariant: 'info' as BadgeVariant,
        };
    }
  };

  const config = getThemeConfig();

  return (
    <>
      <TouchableOpacity
        style={[styles.card, !alert.read && styles.unreadCard]}
        activeOpacity={0.8}
        onPress={() => {
          setModalOpen(true);
          if (onMarkAsRead && !alert.read) {
            onMarkAsRead();
          }
        }}
      >
        <View style={styles.mainRow}>
          {/* Icon Column */}
          <View style={[styles.iconCircle, { backgroundColor: config.iconBg }]}>
            <Ionicons name={config.iconName} size={18} color={config.iconColor} />
            {!alert.read && <View style={styles.unreadDot} />}
          </View>

          {/* Content Column */}
          <View style={styles.contentCol}>
            <View style={styles.headerRow}>
              <Badge
                label={alert.badgeText}
                variant={config.badgeVariant}
                style={styles.badge}
              />
              <Text style={styles.timeText}>{alert.timestamp}</Text>
            </View>

            <Text style={styles.title} numberOfLines={1}>
              {alert.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {alert.subtitle}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={16} color={Palette.textMuted} />
        </View>
      </TouchableOpacity>

      {/* Alert Details Modal */}
      <Modal
        visible={modalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalSheetHandle} />
            
            <View style={styles.modalHeader}>
              <View style={[styles.modalIconCircle, { backgroundColor: config.iconBg }]}>
                <Ionicons name={config.iconName} size={24} color={config.iconColor} />
              </View>
              <View style={styles.modalTitleGroup}>
                <Badge label={alert.badgeText} variant={config.badgeVariant} />
                <Text style={styles.modalTime}>{alert.timestamp}</Text>
              </View>
            </View>

            <Text style={styles.modalTitle}>{alert.title}</Text>
            <Text style={styles.modalSubtitle}>{alert.subtitle}</Text>

            {alert.actionDetails && (
              <View style={styles.detailBox}>
                <Text style={styles.detailBoxTitle}>Détail de la notification :</Text>
                <Text style={styles.detailBoxText}>{alert.actionDetails}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalOpen(false)}
            >
              <Text style={styles.modalButtonText}>Compris</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 13,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  unreadCard: {
    borderColor: Palette.primaryTint,
    backgroundColor: '#FBFCFB',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.alertUrgent,
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  contentCol: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  timeText: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '500',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textPrimary,
    letterSpacing: -0.1,
  },
  subtitle: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 48, 36, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Palette.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  modalSheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.borderStrong,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  modalIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleGroup: {
    gap: 4,
  },
  modalTime: {
    fontSize: 12,
    color: Palette.textMuted,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailBox: {
    backgroundColor: Palette.primarySubtle,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: Palette.primary,
  },
  detailBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
    marginBottom: 4,
  },
  detailBoxText: {
    fontSize: 13,
    color: Palette.textPrimary,
    lineHeight: 18,
  },
  modalButton: {
    backgroundColor: Palette.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
