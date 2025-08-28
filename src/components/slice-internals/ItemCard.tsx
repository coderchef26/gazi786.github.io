/**
 * Reusable Item Card Component
 * Flexible card component for displaying various content types
 * Eliminates repeated card patterns across slices
 */

import { motion } from 'framer-motion';
import { componentStyles } from '@/lib/theme/components';
import { animationPresets } from '@/lib/animations/slice-animations';
import Image from 'next/image';

interface ItemCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  tags?: string[];
  link?: {
    url: string;
    text: string;
    target?: string;
  };
  badge?: {
    text: string;
    color: string;
  };
  metadata?: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  onClick?: () => void;
  className?: string;
}

export default function ItemCard({
  title,
  subtitle,
  description,
  image,
  tags = [],
  link,
  badge,
  metadata = [],
  onClick,
  className = ''
}: ItemCardProps) {
  const CardContent = (
    <>
      {/* Image Section */}
      {image && (
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {badge && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${badge.color} text-white`}>
              {badge.text}
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-cyan-400 text-sm font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className={`${componentStyles.bodyText} text-sm mb-4 line-clamp-3`}>
            {description}
          </p>
        )}

        {/* Metadata */}
        {metadata.length > 0 && (
          <div className="space-y-2 mb-4">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center text-sm text-slate-400">
                {item.icon && (
                  <span className="mr-2 w-4 h-4 text-cyan-400">
                    {item.icon}
                  </span>
                )}
                <span className="font-medium mr-2">{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded-full border border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link/Action */}
        {link && (
          <a
            href={link.url}
            target={link.target}
            className={`inline-flex items-center ${componentStyles.primaryButton} ${componentStyles.primaryButtonHover} text-sm`}
            onClick={(e) => e.stopPropagation()}
          >
            {link.text}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </>
  );

  const cardClasses = `
    ${componentStyles.card}
    ${componentStyles.cardHover}
    group cursor-pointer
    ${className}
  `;

  return (
    <motion.div
      variants={animationPresets.sliceSection.item}
      whileHover="hover"
      className={cardClasses}
      onClick={onClick}
    >
      {CardContent}
    </motion.div>
  );
}