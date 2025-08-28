/**
 * Centralised Component Styles - ATLAS Design System
 * Eliminates repeated Tailwind class patterns
 */

import { themeColors, themeSpacing, themeEffects } from './colors';

export const componentStyles = {
  // Card components
  card: `rounded-xl bg-slate-800/50 ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.shadow} ${themeEffects.transition}`,
  cardHover: `hover:${themeColors.borderHover} hover:${themeEffects.glow}`,
  
  // Button components
  primaryButton: `${themeSpacing.buttonPadding} bg-gradient-to-r ${themeColors.accentGradient} ${themeColors.borderActive}/50 border rounded-lg ${themeEffects.transition}`,
  primaryButtonHover: `hover:${themeColors.accentGradientHover} hover:${themeColors.borderActive}`,
  
  secondaryButton: `${themeSpacing.buttonPadding} bg-slate-800/50 ${themeColors.border} border ${themeColors.secondary} rounded-lg ${themeEffects.transition}`,
  secondaryButtonHover: `hover:bg-slate-700/50 hover:${themeColors.borderHover}`,
  
  // Section layouts
  section: `${themeSpacing.sectionPadding} bg-gradient-to-b ${themeColors.sectionBg}`,
  container: `container mx-auto ${themeSpacing.containerPadding}`,
  
  // Typography
  heading: `text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r ${themeColors.primaryGradient} bg-clip-text`,
  subheading: `text-2xl md:text-3xl font-semibold ${themeColors.white} font-orbitron`,
  bodyText: `${themeColors.secondary} leading-relaxed`,
  
  // Loading states
  spinner: `animate-spin rounded-full h-12 w-12 border-b-2 ${themeColors.borderActive}`,
  loadingContainer: `flex items-center justify-center`,
  loadingText: `ml-4 ${themeColors.loading}`,
  
  // Filter buttons
  filterButton: `px-4 py-2 rounded-lg ${themeEffects.transition}`,
  filterButtonActive: `bg-gradient-to-r ${themeColors.accentGradient} ${themeColors.primary}`,
  filterButtonInactive: `${themeColors.secondary} hover:${themeColors.primary}`,
  
  // Grid layouts
  grid: 'grid gap-8',
  gridMd: 'md:grid-cols-2',
  gridLg: 'lg:grid-cols-3',
  
  // Focus states
  focusRing: `focus:outline-none focus:ring-2 focus:ring-cyan-400`,
} as const;

export type ComponentStyles = typeof componentStyles;