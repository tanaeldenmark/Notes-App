import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DeleteModal from '../components/DeleteModal';
import { loadNotes, saveNotes, formatDate } from '../utils/storage';
import { COLORS, PALETTES, FONT, SHADOW_SM, SHADOW_MD } from '../utils/theme';

export default function ViewNoteScreen({ route, navigation }) {
  const { note } = route.params;
  const [showDelete, setShowDelete] = useState(false);
  const p = PALETTES[note.colorIdx % PALETTES.length];

  const handleDelete = async () => {
    try {
      const all = await loadNotes();
      await saveNotes(all.filter(n => n.id !== note.id));
      setShowDelete(false);
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Failed to delete note. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>

      {/* Nav bar */}
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.backTxt}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.navRight}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditNote', { note })}
            activeOpacity={0.8}
          >
            <Text style={styles.editBtnTxt}>✏️  Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setShowDelete(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteBtnTxt}>🗑️  Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Note card */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: p.bg, borderColor: p.border }]}>
          <View style={[styles.topBar, { backgroundColor: p.accent }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.noteTitle, { color: p.text }]}>{note.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaDate}>📅  {formatDate(note.ts)}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.noteBody}>
              {note.content || 'This note has no content.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <DeleteModal
        visible={showDelete}
        noteTitle={note.title}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOW_SM,
  },
  backTxt: { fontSize: 17, color: COLORS.primary, fontWeight: '600' },
  navRight: { flexDirection: 'row', gap: 10 },
  editBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editBtnTxt: { color: '#fff', fontWeight: '600', fontSize: 13 },
  deleteBtn: {
    backgroundColor: '#fef2f2',
    borderWidth: 1.5,
    borderColor: '#fecaca',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteBtnTxt: { color: COLORS.danger, fontWeight: '600', fontSize: 13 },

  scroll: { padding: 16, paddingBottom: 40 },
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...SHADOW_MD,
  },
  topBar: { height: 6 },
  cardBody: { padding: 20 },
  noteTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: FONT,
    lineHeight: 32,
    marginBottom: 6,
  },
  metaRow: { flexDirection: 'row', marginBottom: 16 },
  metaDate: { fontSize: 12, color: '#aaa', fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: 16 },
  noteBody: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 26,
    fontFamily: FONT,
  },
});
