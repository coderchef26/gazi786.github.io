/**
 * Reusable Loading State Component
 * Eliminates duplicate loading UI across all slice components
 */

import { componentStyles } from '@/lib/theme/components';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export default function LoadingState({ 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}: LoadingStateProps) {
  return (
    <section className={`${componentStyles.section} ${className}`}>
      <div className={componentStyles.container}>
        <div className={componentStyles.loadingContainer}>
          <div className={`animate-spin rounded-full border-b-2 border-cyan-400 ${sizeClasses[size]}`} />
          <span className={componentStyles.loadingText}>{message}</span>
        </div>
      </div>
    </section>
  );
}