import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PALETTES, FONT, SHADOW_SM } from '../utils/theme';
import { formatDate } from '../utils/storage';

export default function NoteCard({ note, onPress, onEdit, onDelete }) {
  const p = PALETTES[note.colorIdx % PALETTES.length];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: p.bg, borderColor: p.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Accent stripe */}
      <View style={[styles.stripe, { backgroundColor: p.accent }]} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: p.text }]} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {note.content || 'No content'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(note.ts)}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onEdit}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 6 }}
            >
              <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 10 }}
            >
              <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
    overflow: 'hidden',
    ...SHADOW_SM,
  },
  stripe: { width: 6 },
  content: { flex: 1, padding: 14 },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONT,
    marginBottom: 4,
  },
  preview: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: { fontSize: 11, color: '#aaa', fontStyle: 'italic' },
  actions: { flexDirection: 'row', gap: 2 },
  iconBtn: { padding: 4 },
  icon: { fontSize: 16 },
});
