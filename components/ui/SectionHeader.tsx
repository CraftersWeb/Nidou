import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  count?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  count,
  iconName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.titleRow}>
          {iconName && (
            <View style={styles.iconCircle}>
              <Ionicons name={iconName} size={15} color={Palette.primary} />
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
          {count !== undefined && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          )}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {actionText && onActionPress && (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.7}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <Ionicons name="chevron-forward" size={14} color={Palette.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 20,
    paddingHorizontal: 4,
  },
  leftColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.textPrimary,
    letterSpacing: -0.3,
  },
  countBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 8,
    gap: 2,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.primary,
  },
});
