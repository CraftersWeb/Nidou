import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Palette } from '@/constants/Colors';
import { useApp } from '@/services/AppContext';
import { AlertCard } from '@/components/AlertCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();
  const { alerts, markAlertAsRead, selectedChild } = useApp();
  const childAlerts = alerts.filter((a) => a.childId === selectedChild.id);

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="notifications" size={24} color={Palette.primary} />
          </View>
          <Text style={styles.title}>Centre de notifications</Text>
          <Text style={styles.subtitle}>
            Toutes les alertes PRONOTE & School & Go pour {selectedChild.firstName}
          </Text>
        </View>

        <View style={styles.alertsList}>
          {childAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={() => markAlertAsRead(alert.id)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    padding: 20,
    paddingTop: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Palette.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: '85%',
  },
  alertsList: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Palette.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
