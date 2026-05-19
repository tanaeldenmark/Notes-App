import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes_app_v1';

/** Load all notes. Returns [] if nothing saved yet. */
export async function loadNotes() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('[loadNotes]', err);
    return [];
  }
}

/** Persist full notes array. */
export async function saveNotes(notes) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('[saveNotes]', err);
    throw err;
  }
}

/** Unique ID for a new note. */
export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

/** "Jan 1, 2025" */
export function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
