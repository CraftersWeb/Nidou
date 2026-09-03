import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Palette } from '@/constants/Colors';
import { Child } from '@/types';
import { Ionicons } from '@expo/vector-icons';

interface ChildSelectorProps {
  selectedChild: Child;
  allChildren: Child[];
  onSelectChild: (id: string) => void;
  onAddNewPress?: () => void;
}

export const ChildSelector: React.FC<ChildSelectorProps> = ({
  selectedChild,
  allChildren,
  onSelectChild,
  onAddNewPress,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.contentRow}>
          {/* Avatar / Monogram */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {selectedChild.firstName.charAt(0).toUpperCase()}
            </Text>
            <View style={styles.onlineDot} />
          </View>

          {/* Child Details */}
          <View style={styles.infoCol}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{selectedChild.firstName}</Text>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText}>{selectedChild.grade}</Text>
              </View>
            </View>
            <Text style={styles.schoolName} numberOfLines={1}>
              {selectedChild.schoolName}
            </Text>
          </View>

          {/* Switch Button */}
          <View style={styles.switchButton}>
            <Text style={styles.switchText}>Changer</Text>
            <Ionicons name="swap-vertical" size={14} color={Palette.primary} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal to Switch Child */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable style={styles.modalSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Sélectionner un enfant</Text>
            <Text style={styles.sheetSubtitle}>
              Consultez les informations scolaires centralisées
            </Text>

            <View style={styles.childrenList}>
              {allChildren.map((child) => {
                const isSelected = child.id === selectedChild.id;
                return (
                  <TouchableOpacity
                    key={child.id}
                    style={[
                      styles.childOption,
                      isSelected && styles.childOptionSelected,
                    ]}
                    onPress={() => {
                      onSelectChild(child.id);
                      setIsModalVisible(false);
                    }}
                  >
                    <View
                      style={[
                        styles.optionAvatar,
                        isSelected && styles.optionAvatarSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionAvatarText,
                          isSelected && styles.optionAvatarTextSelected,
                        ]}
                      >
                        {child.firstName.charAt(0)}
                      </Text>
                    </View>

                    <View style={styles.optionInfo}>
                      <Text style={styles.optionName}>{child.firstName}</Text>
                      <Text style={styles.optionDetail}>
                        {child.grade} • {child.schoolName}
                      </Text>
                    </View>

                    {isSelected ? (
                      <View style={styles.checkCircle}>
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      </View>
                    ) : (
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={Palette.textMuted}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {onAddNewPress && (
              <TouchableOpacity
                style={styles.addOptionButton}
                onPress={() => {
                  setIsModalVisible(false);
                  onAddNewPress();
                }}
              >
                <Ionicons name="add-circle-outline" size={20} color={Palette.primary} />
                <Text style={styles.addOptionText}>Ajouter un autre enfant</Text>
              </TouchableOpacity>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399',
    position: 'absolute',
    bottom: -1,
    right: -1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  gradeBadge: {
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Palette.primaryTint,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
  },
  schoolName: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primarySubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  switchText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.primary,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 48, 36, 0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Palette.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: Palette.borderStrong,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 4,
    marginBottom: 18,
  },
  childrenList: {
    gap: 10,
  },
  childOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.background,
  },
  childOptionSelected: {
    backgroundColor: Palette.primarySubtle,
    borderColor: Palette.primary,
  },
  optionAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E2EBE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionAvatarSelected: {
    backgroundColor: Palette.primary,
  },
  optionAvatarText: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.textSecondary,
  },
  optionAvatarTextSelected: {
    color: '#FFFFFF',
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  optionDetail: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Palette.primary,
    backgroundColor: Palette.primarySubtle,
  },
  addOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.primary,
  },
});
