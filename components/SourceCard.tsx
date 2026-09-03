import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SchoolSource } from '@/types';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './ui/Badge';

interface SourceCardProps {
  source: SchoolSource;
  onSync?: () => void;
  isSyncing?: boolean;
}

export const SourceCard: React.FC<SourceCardProps> = ({
  source,
  onSync,
  isSyncing = false,
}) => {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    if (source.name === 'PRONOTE') return 'school-outline';
    if (source.name === 'School & Go') return 'restaurant-outline';
    return 'cloud-done-outline';
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.sourceIdent}>
          <View style={[styles.iconBox, { backgroundColor: Palette.primarySubtle }]}>
            <Ionicons name={getIconName()} size={22} color={Palette.primary} />
          </View>
          <View>
            <Text style={styles.name}>{source.name}</Text>
            <Text style={styles.accountText}>{source.accountName}</Text>
          </View>
        </View>

        <Badge
          label={source.connected ? 'Connecté' : 'Déconnecté'}
          variant={source.connected ? 'success' : 'muted'}
          icon={
            <Ionicons
              name={source.connected ? 'checkmark-circle' : 'close-circle'}
              size={12}
              color={source.connected ? Palette.primary : Palette.textMuted}
            />
          }
        />
      </View>

      <Text style={styles.description}>{source.description}</Text>

      <View style={styles.footerRow}>
        <View style={styles.syncStatus}>
          <Ionicons name="time-outline" size={13} color={Palette.textMuted} />
          <Text style={styles.syncText}>Dernière synchro : {source.lastSync}</Text>
        </View>

        <TouchableOpacity
          style={styles.syncButton}
          activeOpacity={0.7}
          onPress={onSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <ActivityIndicator size="small" color={Palette.primary} />
          ) : (
            <>
              <Ionicons name="sync-outline" size={13} color={Palette.primary} />
              <Text style={styles.syncBtnText}>Actualiser</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  sourceIdent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  accountText: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 1,
  },
  description: {
    fontSize: 13,
    color: Palette.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.borderLight,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: {
    fontSize: 11,
    color: Palette.textMuted,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  syncBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.primary,
  },
});
