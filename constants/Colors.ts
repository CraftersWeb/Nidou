export const Palette = {
  // Nidou Signature Greens
  primaryDark: '#0E3024',
  primary: '#1B4D3E',      // Vert forêt élégant & rassurant
  primaryLight: '#286E58',
  primarySoft: '#3F8E73',
  primarySubtle: '#EBF5F1', // Fond vert très doux
  primaryTint: '#D4EBE2',
  
  // Secondary / Accent
  mint: '#68C3A3',
  sage: '#8AA39B',
  moss: '#52796F',
  
  // Neutrals & Canvas
  background: '#F6F9F7',   // Blanc cassé végétal moderne
  surface: '#FFFFFF',      // Cartes blanches pures
  surfaceSubtle: '#F0F4F2',
  surfaceActive: '#E3EFEA',
  
  // Typography
  textPrimary: '#14261F',  // Noir vert profond
  textSecondary: '#52665D',// Gris vert intermédiaire lisible
  textMuted: '#84968E',    // Gris doux
  textInverse: '#FFFFFF',
  
  // Borders & Dividers
  border: '#E3EAE6',
  borderLight: '#EEF3F0',
  borderStrong: '#CBD8D2',
  
  // Status Accents (soft & premium)
  alertUrgent: '#D9534F',
  alertUrgentBg: '#FDF2F2',
  alertWarning: '#D97706',
  alertWarningBg: '#FFFBEB',
  alertSuccess: '#16A34A',
  alertSuccessBg: '#F0FDF4',
  alertInfo: '#0D9488',
  alertInfoBg: '#F0FDFA',
  alertNote: '#C27803',
  alertNoteBg: '#FEF9EC',
};

export default {
  light: {
    text: Palette.textPrimary,
    textSecondary: Palette.textSecondary,
    background: Palette.background,
    surface: Palette.surface,
    tint: Palette.primary,
    tabIconDefault: '#8FA39A',
    tabIconSelected: Palette.primary,
    border: Palette.border,
  },
  dark: {
    text: '#ECF3F0',
    textSecondary: '#A2B5AD',
    background: '#0D1A15',
    surface: '#142720',
    tint: Palette.mint,
    tabIconDefault: '#4A6258',
    tabIconSelected: Palette.mint,
    border: '#1F382E',
  },
};
