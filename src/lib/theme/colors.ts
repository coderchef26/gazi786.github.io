/**
 * Centralised Theme Colors - ATLAS Design System
 * Eliminates repeated gradient and color patterns across components
 */

export const themeColors = {
  // Primary gradients - Iron Man inspired
  primaryGradient: 'from-cyan-400 via-blue-500 to-cyan-300',
  primaryGradientReverse: 'from-cyan-300 via-blue-500 to-cyan-400',
  accentGradient: 'from-cyan-500/20 to-blue-500/20',
  accentGradientHover: 'from-cyan-500/30 to-blue-500/30',
  
  // Background gradients
  sectionBg: 'from-slate-900 to-slate-800',
  cardBg: 'from-slate-800/50 to-slate-900/30',
  overlayBg: 'bg-slate-900/95',
  
  // Text colors
  primary: 'text-cyan-400',
  secondary: 'text-slate-300',
  muted: 'text-slate-500',
  white: 'text-white',
  
  // Border colors
  border: 'border-slate-700',
  borderHover: 'border-cyan-500',
  borderActive: 'border-cyan-400',
  
  // Component specific
  loading: 'text-cyan-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
} as const;

export const themeSpacing = {
  sectionPadding: 'py-20',
  containerPadding: 'px-4',
  cardPadding: 'p-6',
  buttonPadding: 'px-6 py-3',
} as const;

export const themeEffects = {
  backdropBlur: 'backdrop-blur-sm',
  shadow: 'shadow-lg shadow-cyan-500/10',
  glow: 'shadow-2xl shadow-cyan-500/20',
  transition: 'transition-all duration-300',
} as const;

export type ThemeColors = typeof themeColors;
export type ThemeSpacing = typeof themeSpacing;
export type ThemeEffects = typeof themeEffects;