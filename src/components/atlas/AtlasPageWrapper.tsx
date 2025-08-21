"use client";

import { useEffect } from 'react';
import { Content } from '@prismicio/client';
import { useAtlas } from './AtlasProvider';

interface AtlasPageWrapperProps {
  children: React.ReactNode;
  pageData?: Content.PageDocument | any;
  className?: string;
}

/**
 * Higher-order component that automatically updates ATLAS knowledge base
 * when page data changes and provides accessibility enhancements
 */
export default function AtlasPageWrapper({ 
  children, 
  pageData, 
  className = "" 
}: AtlasPageWrapperProps) {
  const { updateKnowledgeBase, announce, isInitialized } = useAtlas();

  // Update ATLAS knowledge base when page data changes
  useEffect(() => {
    if (pageData && isInitialized) {
      try {
        updateKnowledgeBase(pageData);
        
        // Announce page content loaded for accessibility
        const pageTitle = pageData.data.title || 'Portfolio page';
        const sliceCount = pageData.data.slices?.length || 0;
        
        announce(
          `${pageTitle} loaded with ${sliceCount} sections. Use voice commands or navigation to explore.`,
          'polite'
        );
      } catch (error) {
        console.warn('Failed to update ATLAS knowledge base:', error);
      }
    }
  }, [pageData, isInitialized, updateKnowledgeBase, announce]);

  return (
    <div 
      className={`atlas-page-wrapper ${className}`}
      role="main"
      aria-live="polite"
    >
      {/* Skip links for accessibility */}
      <div className="atlas-skip-links">
        <a 
          href="#main-content" 
          className="atlas-skip-link"
          onClick={() => announce('Jumped to main content')}
        >
          Skip to main content
        </a>
        <a 
          href="#atlas-assistant" 
          className="atlas-skip-link"
          onClick={() => announce('Jumped to AI assistant')}
        >
          Skip to AI assistant
        </a>
      </div>

      {/* Main content with proper semantics */}
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      {/* Accessibility status for screen readers */}
      <div className="atlas-sr-only" aria-live="polite" aria-atomic="true">
        {pageData && (
          <span>
            Page content loaded: {pageData.data.title || 'Portfolio section'}
            {pageData.data.slices && (
              <span> with {pageData.data.slices.length} interactive sections</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}