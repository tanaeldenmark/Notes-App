import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import NoteCard from '../components/NoteCard';
import DeleteModal from '../components/DeleteModal';
import { loadNotes, saveNotes } from '../utils/storage';
import { COLORS, SHADOW_SM, SHADOW_MD } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [deleteTarget, setTarget]   = useState(null);

  // Reload notes every time this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      setLoading(true);
      loadNotes().then(data => {
        if (alive) { setNotes(data); setLoading(false); }
      });
      return () => { alive = false; };
    }, [])
  );

  const handleDelete = async () => {
    try {
      const updated = notes.filter(n => n.id !== deleteTarget.id);
      await saveNotes(updated);
      setNotes(updated);
    } catch {
      Alert.alert('Error', 'Could not delete note. Please try again.');
    } finally {
      setTarget(null);
    }
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingTxt}>Loading notes…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* ── Header ─────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Notes</Text>
          <Text style={styles.headerSub}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddNote')}
          activeOpacity={0.85}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search bar ─────────────────────────── */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchEmoji}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes…"
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Notes / Empty ──────────────────────── */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📝</Text>
          <Text style={styles.emptyTitle}>
            {search ? 'No results found' : 'No notes available'}
          </Text>
          <Text style={styles.emptyHint}>
            {search
              ? 'Try a different search term'
              : 'Tap + to create your first note'}
          </Text>
          {!search && (
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => navigation.navigate('AddNote')}
              activeOpacity={0.85}
            >
              <Text style={styles.emptyBtnTxt}>+ Create Note</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => navigation.navigate('ViewNote', { note: item })}
              onEdit={() => navigation.navigate('EditNote', { note: item })}
              onDelete={() => setTarget(item)}
            />
          )}
        />
      )}

      <DeleteModal
        visible={!!deleteTarget}
        noteTitle={deleteTarget?.title ?? ''}
        onCancel={() => setTarget(null)}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingTxt: { marginTop: 12, fontSize: 15, color: COLORS.textMuted },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOW_SM,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  fab: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    ...SHADOW_MD,
  },
  fabIcon: { fontSize: 30, color: '#fff', lineHeight: 34, fontWeight: '300' },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  searchEmoji: { fontSize: 15, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  clearBtn: { fontSize: 13, color: COLORS.textMuted, paddingLeft: 8 },

  list: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 28 },

  empty: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 40, paddingBottom: 60,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    fontSize: 20, fontWeight: '700',
    color: COLORS.textSecondary, textAlign: 'center',
  },
  emptyHint: {
    fontSize: 14, color: COLORS.textMuted,
    textAlign: 'center', marginTop: 8, lineHeight: 20,
  },
  emptyBtn: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28, paddingVertical: 13,
    borderRadius: 14,
    ...SHADOW_MD,
  },
  emptyBtnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
