import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Palette } from '@/constants/Colors';

export type BadgeVariant = 'success' | 'warning' | 'urgent' | 'info' | 'neutral' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  style,
  textStyle,
  icon,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#E8F5E9',
          color: '#1B4D3E',
          borderColor: '#C8E6C9',
        };
      case 'warning':
        return {
          backgroundColor: '#FFFBEB',
          color: '#B45309',
          borderColor: '#FDE68A',
        };
      case 'urgent':
        return {
          backgroundColor: '#FEF2F2',
          color: '#B91C1C',
          borderColor: '#FECACA',
        };
      case 'info':
        return {
          backgroundColor: '#EBF5F1',
          color: '#1B4D3E',
          borderColor: '#D4EBE2',
        };
      case 'muted':
        return {
          backgroundColor: '#F3F4F6',
          color: '#6B7280',
          borderColor: '#E5E7EB',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: '#EDF2E8',
          color: '#286E58',
          borderColor: '#D2DEC9',
        };
    }
  };

  const current = getBadgeStyle();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: current.backgroundColor, borderColor: current.borderColor },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, { color: current.color }, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
