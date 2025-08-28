/**
 * Reusable Slice Container Component
 * Provides consistent layout and structure for all collection slices
 * Eliminates repeated section/container patterns
 */

import { motion } from 'framer-motion';
import { componentStyles } from '@/lib/theme/components';
import { animationPresets } from '@/lib/animations/slice-animations';
import LoadingState from '@/components/shared/LoadingState';
import EmptyState from '@/components/shared/EmptyState';

interface SliceContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyStateConfig?: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
  };
  className?: string;
}

export default function SliceContainer({
  title,
  subtitle,
  children,
  isLoading = false,
  isEmpty = false,
  emptyStateConfig,
  className = ''
}: SliceContainerProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <section className={`${componentStyles.section} ${className}`}>
      <div className={componentStyles.container}>
        {/* Header Section */}
        {(title || subtitle) && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationPresets.sliceSection.heading}
            className="text-center mb-16"
          >
            {title && (
              <h2 className={componentStyles.heading}>
                {title}
              </h2>
            )}
            
            {subtitle && (
              <motion.p
                variants={animationPresets.sliceSection.heading}
                className={`${componentStyles.bodyText} text-xl mt-6 max-w-3xl mx-auto`}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Content Section */}
        {isEmpty && emptyStateConfig ? (
          <EmptyState
            title={emptyStateConfig.title}
            description={emptyStateConfig.description}
            icon={emptyStateConfig.icon}
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationPresets.sliceSection.container}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}