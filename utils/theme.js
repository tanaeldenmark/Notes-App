import { Platform } from 'react-native';

export const COLORS = {
  primary:         '#1a1a2e',
  accent:          '#e94560',
  background:      '#f4f2ee',
  surface:         '#ffffff',
  border:          '#e5e0d8',
  textPrimary:     '#1a1a2e',
  textSecondary:   '#5a5a72',
  textMuted:       '#b0adb8',
  danger:          '#e53935',
};

// Soft color palettes for note cards
export const PALETTES = [
  { bg: '#fffbeb', accent: '#d97706', border: '#fde68a', text: '#78350f' },
  { bg: '#f0fdf4', accent: '#16a34a', border: '#bbf7d0', text: '#14532d' },
  { bg: '#eff6ff', accent: '#2563eb', border: '#bfdbfe', text: '#1e3a8a' },
  { bg: '#fdf2f8', accent: '#9333ea', border: '#f5d0fe', text: '#581c87' },
  { bg: '#fff1f2', accent: '#e11d48', border: '#fecdd3', text: '#881337' },
  { bg: '#ecfeff', accent: '#0891b2', border: '#a5f3fc', text: '#164e63' },
  { bg: '#fefce8', accent: '#ca8a04', border: '#fef08a', text: '#713f12' },
  { bg: '#f0f9ff', accent: '#0284c7', border: '#bae6fd', text: '#0c4a6e' },
];

export const FONT = Platform.select({ ios: 'Georgia', default: 'serif' });

export const SHADOW_SM = {
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.07,
  shadowRadius: 4,
};

export const SHADOW_MD = {
  elevation: 5,
  shadowColor: '#1a1a2e',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
};

export const SHADOW_LG = {
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
};
