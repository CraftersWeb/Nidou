import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Palette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface AddChildModalProps {
  visible: boolean;
  onClose: () => void;
  onAddChild: (name: string, grade: string, school: string) => void;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({
  visible,
  onClose,
  onAddChild,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !grade.trim()) return;
    onAddChild(
      name.trim(),
      grade.trim(),
      school.trim() || 'Établissement scolaire'
    );
    setName('');
    setGrade('');
    setSchool('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Ajouter un enfant</Text>
              <Text style={styles.subtitle}>
                Rattachez un profil pour regrouper ses services
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={Palette.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prénom de l’enfant *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Gabriel, Sarah..."
              placeholderTextColor={Palette.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Classe *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 4e C, CM1, 6e 2..."
              placeholderTextColor={Palette.textMuted}
              value={grade}
              onChangeText={setGrade}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Établissement scolaire</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Collège Jean Moulin"
              placeholderTextColor={Palette.textMuted}
              value={school}
              onChangeText={setSchool}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!name.trim() || !grade.trim()) && styles.submitButtonDisabled,
            ]}
            disabled={!name.trim() || !grade.trim()}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Ajouter à Nidou</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.borderStrong,
    alignSelf: 'center',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  subtitle: {
    fontSize: 13,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Palette.background,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Palette.textPrimary,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.primary,
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
