import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadNotes, saveNotes } from '../utils/storage';
import { COLORS, FONT, SHADOW_SM } from '../utils/theme';

export default function EditNoteScreen({ route, navigation }) {
  const { note } = route.params;
  const [title, setTitle]     = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving]   = useState(false);
  const contentRef            = useRef(null);

  const handleUpdate = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Note', 'Please add a title or content before updating.');
      return;
    }
    setSaving(true);
    try {
      const all = await loadNotes();
      const updated = all.map(n =>
        n.id === note.id
          ? {
              ...n,
              title:   title.trim() || 'Untitled',
              content: content.trim(),
              ts:      Date.now(),
            }
          : n
      );
      await saveNotes(updated);
      // Pop back to Home (remove both EditNote and ViewNote from stack)
      navigation.popToTop();
    } catch {
      Alert.alert('Error', 'Failed to update note. Please try again.');
      setSaving(false);
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
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.navTitle}>Edit Note</Text>

        <TouchableOpacity
          style={[styles.updateBtn, saving && { opacity: 0.5 }]}
          onPress={handleUpdate}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.updateTxt}>{saving ? 'Saving…' : 'Update'}</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor={COLORS.textMuted}
            value={title}
            onChangeText={setTitle}
            maxLength={120}
            autoFocus
            returnKeyType="next"
            onSubmitEditing={() => contentRef.current?.focus()}
          />

          <View style={styles.divider} />

          <TextInput
            ref={contentRef}
            style={styles.contentInput}
            placeholder="Write your note here…"
            placeholderTextColor={COLORS.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.counter}>{content.length} characters</Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
  cancelTxt: { fontSize: 16, color: COLORS.textSecondary, fontWeight: '500', minWidth: 64 },
  navTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },
  updateBtn: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 12,
    minWidth: 72,
    alignItems: 'center',
    ...SHADOW_SM,
  },
  updateTxt: { color: '#fff', fontWeight: '700', fontSize: 14 },

  form: { padding: 20, paddingBottom: 40 },
  titleInput: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: FONT,
    paddingVertical: 6,
  },
  divider: {
    height: 1.5,
    backgroundColor: COLORS.border,
    marginTop: 8,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 26,
    minHeight: 260,
    fontFamily: FONT,
  },
  counter: {
    textAlign: 'right',
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 10,
    fontStyle: 'italic',
  },
});
