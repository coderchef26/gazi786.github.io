/**
 * Reusable Filter Buttons Component
 * Eliminates duplicate filter UI across all collection slices
 * Maintains consistent ATLAS design while being slice-agnostic
 */

import { motion } from 'framer-motion';
import { componentStyles } from '@/lib/theme/components';
import { animationPresets } from '@/lib/animations/slice-animations';

interface FilterButtonsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export default function FilterButtons({
  categories,
  activeFilter,
  onFilterChange,
  className = ''
}: FilterButtonsProps) {
  if (categories.length <= 1) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationPresets.filterInterface.container}
      className={`flex flex-wrap gap-4 justify-center mb-12 ${className}`}
    >
      {categories.map((category) => {
        const isActive = activeFilter === category;
        const displayName = category.charAt(0).toUpperCase() + category.slice(1);
        
        return (
          <motion.button
            key={category}
            variants={animationPresets.filterInterface.button}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onFilterChange(category)}
            className={`
              ${componentStyles.filterButton}
              ${isActive 
                ? componentStyles.filterButtonActive 
                : componentStyles.filterButtonInactive
              }
              ${componentStyles.focusRing}
            `}
            aria-pressed={isActive}
            aria-label={`Filter by ${displayName}`}
          >
            {displayName}
          </motion.button>
        );
      })}
    </motion.div>
  );
}