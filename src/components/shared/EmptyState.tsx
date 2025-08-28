/**
 * Reusable Empty State Component
 * Provides consistent empty/no-data UI across slices
 */

import { motion } from 'framer-motion';
import { componentStyles } from '@/lib/theme/components';
import { sliceAnimations } from '@/lib/animations/slice-animations';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({ 
  title, 
  description, 
  icon, 
  action,
  className = '' 
}: EmptyStateProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sliceAnimations.fadeInUp}
      className={`text-center py-16 ${className}`}
    >
      {icon && (
        <motion.div 
          variants={sliceAnimations.fadeInUp}
          className="mb-6 flex justify-center"
        >
          <div className="w-16 h-16 text-slate-500">
            {icon}
          </div>
        </motion.div>
      )}
      
      <motion.h3 
        variants={sliceAnimations.fadeInUp}
        className="text-2xl font-semibold text-slate-300 mb-3"
      >
        {title}
      </motion.h3>
      
      {description && (
        <motion.p 
          variants={sliceAnimations.fadeInUp}
          className={`${componentStyles.bodyText} mb-6 max-w-md mx-auto`}
        >
          {description}
        </motion.p>
      )}
      
      {action && (
        <motion.button
          variants={sliceAnimations.fadeInUp}
          whileHover="hover"
          whileTap="tap"
          onClick={action.onClick}
          className={`${componentStyles.primaryButton} ${componentStyles.primaryButtonHover} ${componentStyles.focusRing}`}
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}