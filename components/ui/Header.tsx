import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  greeting?: string;
  userName?: string;
  unreadCount?: number;
  onNotificationPress?: () => void;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  greeting = 'Bonjour 👋',
  userName = 'Sophie',
  unreadCount = 2,
  onNotificationPress,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.userName}>{userName}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <TouchableOpacity
        style={styles.notificationBtn}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={22} color={Palette.primary} />
        {unreadCount > 0 && (
          <View style={styles.badgeDot}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  textGroup: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.textSecondary,
    letterSpacing: 0.2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: Palette.textPrimary,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: Palette.textMuted,
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
    position: 'relative',
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Palette.alertUrgent,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
