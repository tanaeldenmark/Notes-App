import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { COLORS, SHADOW_LG } from '../utils/theme';

export default function DeleteModal({ visible, noteTitle, onCancel, onConfirm }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.emoji}>🗑️</Text>
          <Text style={styles.heading}>Delete Note?</Text>
          <Text style={styles.body}>
            <Text style={styles.bold}>"{noteTitle}"</Text>
            {' '}will be permanently deleted and cannot be recovered.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.75}>
              <Text style={styles.cancelLabel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm} activeOpacity={0.75}>
              <Text style={styles.deleteLabel}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    ...SHADOW_LG,
  },
  emoji: { fontSize: 44, marginBottom: 12 },
  heading: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  bold: { fontWeight: '700', color: COLORS.textPrimary },
  row: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cancelLabel: { fontSize: 15, fontWeight: '600', color: COLORS.textSecondary },
  deleteBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
  },
  deleteLabel: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
