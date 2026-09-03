import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Palette } from '@/constants/Colors';
import { SchoolGoData } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './ui/Badge';

interface SchoolGoModalProps {
  visible: boolean;
  onClose: () => void;
  data: SchoolGoData;
  childName: string;
}

type TabType = 'canteen' | 'menus' | 'afterschool' | 'transport';

export const SchoolGoModal: React.FC<SchoolGoModalProps> = ({
  visible,
  onClose,
  data,
  childName,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('menus');
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const currentMenu = data.menus[selectedMenuIndex] || data.todayMenu;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.schoolGoTag}>
                <Ionicons name="restaurant-outline" size={14} color={Palette.primary} />
                <Text style={styles.schoolGoTagText}>Services School & Go</Text>
              </View>
              <Text style={styles.title}>Vie pratique & Périscolaire</Text>
              <Text style={styles.subtitle}>
                Restauration, garderie et transports de {childName}
              </Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={Palette.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'menus' && styles.tabActive]}
              onPress={() => setActiveTab('menus')}
            >
              <Ionicons
                name="nutrition-outline"
                size={16}
                color={activeTab === 'menus' ? Palette.primary : Palette.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'menus' && styles.tabTextActive,
                ]}
              >
                Menus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'canteen' && styles.tabActive]}
              onPress={() => setActiveTab('canteen')}
            >
              <Ionicons
                name="card-outline"
                size={16}
                color={activeTab === 'canteen' ? Palette.primary : Palette.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'canteen' && styles.tabTextActive,
                ]}
              >
                Carte & Solde
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'afterschool' && styles.tabActive]}
              onPress={() => setActiveTab('afterschool')}
            >
              <Ionicons
                name="school-outline"
                size={16}
                color={activeTab === 'afterschool' ? Palette.primary : Palette.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'afterschool' && styles.tabTextActive,
                ]}
              >
                Étude du soir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'transport' && styles.tabActive]}
              onPress={() => setActiveTab('transport')}
            >
              <Ionicons
                name="bus-outline"
                size={16}
                color={activeTab === 'transport' ? Palette.primary : Palette.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'transport' && styles.tabTextActive,
                ]}
              >
                Transport
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Tab Content */}
          <ScrollView
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* ====== TAB 1: MENUS DE LA SEMAINE ====== */}
            {activeTab === 'menus' && (
              <View style={styles.tabContent}>
                {/* Day selector */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.daysScroll}
                >
                  {data.menus.map((m, idx) => (
                    <TouchableOpacity
                      key={m.date}
                      style={[
                        styles.dayChip,
                        idx === selectedMenuIndex && styles.dayChipActive,
                      ]}
                      onPress={() => setSelectedMenuIndex(idx)}
                    >
                      <Text
                        style={[
                          styles.dayChipText,
                          idx === selectedMenuIndex && styles.dayChipTextActive,
                        ]}
                      >
                        {m.dayLabel}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Selected Menu Card */}
                <View style={styles.menuCard}>
                  <View style={styles.menuHeader}>
                    <Text style={styles.menuDateText}>{currentMenu.dayLabel}</Text>
                    <View style={styles.labelsRow}>
                      {currentMenu.labels.map((lbl) => (
                        <View key={lbl} style={styles.labelPill}>
                          <Text style={styles.labelText}>{lbl}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.dishSection}>
                    <View style={styles.dishRow}>
                      <View style={styles.dishIconBox}>
                        <Text style={styles.dishEmoji}>🥗</Text>
                      </View>
                      <View style={styles.dishTexts}>
                        <Text style={styles.dishCategory}>Entrée</Text>
                        <Text style={styles.dishName}>{currentMenu.starter}</Text>
                      </View>
                    </View>

                    <View style={styles.dishDivider} />

                    <View style={styles.dishRow}>
                      <View style={styles.dishIconBox}>
                        <Text style={styles.dishEmoji}>🍲</Text>
                      </View>
                      <View style={styles.dishTexts}>
                        <Text style={styles.dishCategory}>Plat principal</Text>
                        <Text style={styles.dishName}>{currentMenu.mainCourse}</Text>
                        <Text style={styles.dishAccompaniment}>
                          Accompagnement : {currentMenu.sideDish}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.dishDivider} />

                    <View style={styles.dishRow}>
                      <View style={styles.dishIconBox}>
                        <Text style={styles.dishEmoji}>🧀</Text>
                      </View>
                      <View style={styles.dishTexts}>
                        <Text style={styles.dishCategory}>Produit laitier</Text>
                        <Text style={styles.dishName}>{currentMenu.dairy}</Text>
                      </View>
                    </View>

                    <View style={styles.dishDivider} />

                    <View style={styles.dishRow}>
                      <View style={styles.dishIconBox}>
                        <Text style={styles.dishEmoji}>🍏</Text>
                      </View>
                      <View style={styles.dishTexts}>
                        <Text style={styles.dishCategory}>Dessert</Text>
                        <Text style={styles.dishName}>{currentMenu.dessert}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* ====== TAB 2: CARTE DU SELF & SOLDE ====== */}
            {activeTab === 'canteen' && (
              <View style={styles.tabContent}>
                {/* Virtual Self Badge Card */}
                <View style={styles.virtualCard}>
                  <View style={styles.virtualCardTop}>
                    <View>
                      <Text style={styles.virtualCardSchool}>
                        Collège Victor Hugo
                      </Text>
                      <Text style={styles.virtualCardTitle}>
                        Carte de Restauration Scolaire
                      </Text>
                    </View>
                    <View style={styles.virtualCardLogo}>
                      <Ionicons name="restaurant" size={20} color="#FFFFFF" />
                    </View>
                  </View>

                  <View style={styles.virtualCardStudent}>
                    <Text style={styles.virtualCardName}>{childName} Martin</Text>
                    <Text style={styles.virtualCardClass}>Classe 5e B • Demi-pensionnaire</Text>
                  </View>

                  {/* Mock Barcode / QR Simulation */}
                  <View style={styles.barcodeBox}>
                    <View style={styles.barcodeLines}>
                      {[12, 6, 18, 4, 14, 8, 20, 6, 10, 16, 8, 12, 18, 6, 14, 10].map(
                        (h, i) => (
                          <View
                            key={i}
                            style={[
                              styles.barcodeBar,
                              { width: i % 3 === 0 ? 3 : 2, height: 28 },
                            ]}
                          />
                        )
                      )}
                    </View>
                    <Text style={styles.cardNumberText}>
                      {data.canteenAccount.cardNumber}
                    </Text>
                  </View>
                </View>

                {/* Balance & Meals remaining */}
                <View style={styles.accountBox}>
                  <View style={styles.accountRow}>
                    <View>
                      <Text style={styles.accountLabel}>Solde disponible</Text>
                      <Text style={styles.accountBalance}>
                        {data.canteenAccount.balance.toFixed(2)} €
                      </Text>
                    </View>
                    <View style={styles.mealsBadge}>
                      <Text style={styles.mealsCount}>
                        {data.canteenAccount.mealsRemaining} repas
                      </Text>
                      <Text style={styles.mealsSubtext}>restants</Text>
                    </View>
                  </View>

                  <View style={styles.accountDivider} />

                  <View style={styles.lastScanRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={Palette.primary}
                    />
                    <Text style={styles.lastScanText}>
                      {data.canteenAccount.lastScanTime}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* ====== TAB 3: PÉRISCOLAIRE & ÉTUDE DU SOIR ====== */}
            {activeTab === 'afterschool' && (
              <View style={styles.tabContent}>
                <View style={styles.studyCard}>
                  <View style={styles.studyHeader}>
                    <View style={styles.studyIconCircle}>
                      <Ionicons
                        name="book-outline"
                        size={22}
                        color={Palette.primary}
                      />
                    </View>
                    <View style={styles.studyTitleGroup}>
                      <Badge label="Inscrit ce jour" variant="success" />
                      <Text style={styles.studyTitle}>
                        {data.afterSchool.title}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.studyDetails}>
                    <View style={styles.detailLine}>
                      <Ionicons
                        name="time-outline"
                        size={15}
                        color={Palette.primary}
                      />
                      <Text style={styles.detailLabel}>Horaire :</Text>
                      <Text style={styles.detailValue}>
                        {data.afterSchool.timeSlot}
                      </Text>
                    </View>

                    <View style={styles.detailLine}>
                      <Ionicons
                        name="location-outline"
                        size={15}
                        color={Palette.primary}
                      />
                      <Text style={styles.detailLabel}>Lieu :</Text>
                      <Text style={styles.detailValue}>
                        {data.afterSchool.location}
                      </Text>
                    </View>

                    <View style={styles.detailLine}>
                      <Ionicons
                        name="person-outline"
                        size={15}
                        color={Palette.primary}
                      />
                      <Text style={styles.detailLabel}>Encadrant :</Text>
                      <Text style={styles.detailValue}>
                        {data.afterSchool.supervisor}
                      </Text>
                    </View>

                    <View style={styles.detailLine}>
                      <Ionicons
                        name="exit-outline"
                        size={15}
                        color={Palette.primary}
                      />
                      <Text style={styles.detailLabel}>Sortie :</Text>
                      <Text style={styles.detailValueHighlight}>
                        {data.afterSchool.pickupAuthorization}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* ====== TAB 4: TRANSPORT SCOLAIRE ====== */}
            {activeTab === 'transport' && (
              <View style={styles.tabContent}>
                <View style={styles.transportCard}>
                  <View style={styles.transportHeader}>
                    <View style={styles.busCircle}>
                      <Ionicons name="bus" size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.transportTitleBox}>
                      <Text style={styles.busLineName}>
                        {data.transport.lineName}
                      </Text>
                      <Text style={styles.busStopName}>
                        {data.transport.stopName}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.transportStatusRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#16A34A"
                    />
                    <Text style={styles.transportStatusText}>
                      {data.transport.driverAlert}
                    </Text>
                  </View>

                  <View style={styles.transportTimes}>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeBoxLabel}>Ramassage matin</Text>
                      <Text style={styles.timeBoxHour}>
                        {data.transport.morningDeparture}
                      </Text>
                      <Text style={styles.timeBoxSub}>Arrivée collège 08:00</Text>
                    </View>

                    <View style={styles.timeBoxDivider} />

                    <View style={styles.timeBox}>
                      <Text style={styles.timeBoxLabel}>Retour soir</Text>
                      <Text style={styles.timeBoxHour}>
                        {data.transport.eveningDropoff}
                      </Text>
                      <Text style={styles.timeBoxSub}>Départ collège 17:35</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(14, 48, 36, 0.45)',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: Palette.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: '90%',
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.borderStrong,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerLeft: {
    flex: 1,
  },
  schoolGoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  schoolGoTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Palette.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Palette.background,
    borderRadius: 14,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Palette.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  tabTextActive: {
    color: Palette.primary,
    fontWeight: '700',
  },
  contentScroll: {
    flexGrow: 0,
  },
  tabContent: {
    paddingBottom: 10,
  },
  // Menus
  daysScroll: {
    gap: 8,
    marginBottom: 14,
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: Palette.surfaceSubtle,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  dayChipActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  dayChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  menuCard: {
    backgroundColor: Palette.background,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  menuDateText: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  labelsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  labelPill: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.primary,
  },
  dishSection: {
    gap: 10,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dishIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishEmoji: {
    fontSize: 18,
  },
  dishTexts: {
    flex: 1,
  },
  dishCategory: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dishName: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginTop: 1,
  },
  dishAccompaniment: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  dishDivider: {
    height: 1,
    backgroundColor: Palette.borderLight,
    marginVertical: 2,
  },
  // Virtual Card
  virtualCard: {
    backgroundColor: Palette.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  virtualCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  virtualCardSchool: {
    fontSize: 11,
    color: '#D4EBE2',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  virtualCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 1,
  },
  virtualCardLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  virtualCardStudent: {
    marginVertical: 14,
  },
  virtualCardName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  virtualCardClass: {
    fontSize: 12,
    color: '#D4EBE2',
    marginTop: 2,
  },
  barcodeBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  barcodeBar: {
    backgroundColor: '#14261F',
    borderRadius: 1,
  },
  cardNumberText: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Palette.textSecondary,
    letterSpacing: 1,
  },
  accountBox: {
    backgroundColor: Palette.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountLabel: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  accountBalance: {
    fontSize: 24,
    fontWeight: '800',
    color: Palette.textPrimary,
    marginTop: 2,
  },
  mealsBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  mealsCount: {
    fontSize: 14,
    fontWeight: '800',
    color: Palette.primary,
  },
  mealsSubtext: {
    fontSize: 10,
    color: Palette.primary,
    fontWeight: '600',
  },
  accountDivider: {
    height: 1,
    backgroundColor: Palette.borderLight,
    marginVertical: 12,
  },
  lastScanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastScanText: {
    fontSize: 13,
    color: Palette.primary,
    fontWeight: '600',
  },
  // Study
  studyCard: {
    backgroundColor: Palette.background,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  studyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Palette.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studyTitleGroup: {
    flex: 1,
    gap: 4,
  },
  studyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  studyDetails: {
    gap: 12,
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: Palette.textPrimary,
    fontWeight: '700',
  },
  detailValueHighlight: {
    fontSize: 13,
    color: Palette.primary,
    fontWeight: '700',
  },
  // Transport
  transportCard: {
    backgroundColor: Palette.background,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  transportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  busCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportTitleBox: {
    flex: 1,
  },
  busLineName: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.textPrimary,
  },
  busStopName: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  transportStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 16,
  },
  transportStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  transportTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  timeBox: {
    flex: 1,
    alignItems: 'center',
  },
  timeBoxLabel: {
    fontSize: 11,
    color: Palette.textMuted,
    fontWeight: '600',
  },
  timeBoxHour: {
    fontSize: 18,
    fontWeight: '800',
    color: Palette.primary,
    marginTop: 2,
  },
  timeBoxSub: {
    fontSize: 10,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  timeBoxDivider: {
    width: 1,
    height: 32,
    backgroundColor: Palette.border,
  },
});
