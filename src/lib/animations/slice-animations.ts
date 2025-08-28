/**
 * Centralised Animation Configurations
 * Eliminates repeated Framer Motion animation patterns across slices
 */

import { Variants } from 'framer-motion';

export const sliceAnimations = {
  // Container animations
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  } as Variants,

  // Item animations with stagger
  item: {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  } as Variants,

  // Heading animations
  heading: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  } as Variants,

  // Filter button animations
  filterButton: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  } as Variants,

  // Card hover animations
  card: {
    rest: { 
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { 
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as Variants,

  // Fade in from direction
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as Variants,

  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as Variants,

  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as Variants,

  // Loading animations
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  // Particle effects
  floatingParticle: {
    y: [-20, -100],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
} as const;

// Animation presets for common use cases
export const animationPresets = {
  // For slice sections
  sliceSection: {
    container: sliceAnimations.container,
    heading: sliceAnimations.heading,
    item: sliceAnimations.item,
  },

  // For card grids
  cardGrid: {
    container: sliceAnimations.container,
    card: sliceAnimations.card,
  },

  // For filter interfaces
  filterInterface: {
    container: {
      ...sliceAnimations.container,
      visible: {
        ...sliceAnimations.container.visible,
        transition: {
          duration: 0.5,
          staggerChildren: 0.1,
        },
      },
    },
    button: sliceAnimations.filterButton,
  },
} as const;

export type SliceAnimations = typeof sliceAnimations;
export type AnimationPresets = typeof animationPresets;