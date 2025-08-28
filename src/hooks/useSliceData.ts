/**
 * Shared Hook for Slice Data Management
 * Eliminates repeated data extraction patterns across all collection slices
 * Bismillah - Created for DRY compliance while preserving Prismic integration
 */

import { useState, useEffect, useMemo } from 'react';

interface UseSliceDataConfig<T> {
  slice: any;
  extractItems: (slice: any) => T[];
  getFilterCategories?: (items: T[]) => string[];
  defaultFilter?: string;
}

interface UseSliceDataReturn<T> {
  items: T[];
  filteredItems: T[];
  categories: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isLoading: boolean;
  isEmpty: boolean;
  hasFilters: boolean;
}

export function useSliceData<T>({
  slice,
  extractItems,
  getFilterCategories,
  defaultFilter = 'all'
}: UseSliceDataConfig<T>): UseSliceDataReturn<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  // Extract items from slice
  const items = useMemo(() => {
    if (!slice?.items) return [];
    return extractItems(slice);
  }, [slice, extractItems]);

  // Extract filter categories
  const categories = useMemo(() => {
    if (!getFilterCategories || !items.length) return [];
    return ['all', ...getFilterCategories(items)];
  }, [items, getFilterCategories]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (!items.length || activeFilter === 'all') return items;
    
    if (!getFilterCategories) return items;
    
    return items.filter((item: any) => {
      // This will be customized per slice type
      if (item.technology) return item.technology === activeFilter;
      if (item.category) return item.category === activeFilter;
      if (item.type) return item.type === activeFilter;
      return true;
    });
  }, [items, activeFilter, getFilterCategories]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    items,
    filteredItems,
    categories,
    activeFilter,
    setActiveFilter,
    isLoading,
    isEmpty: filteredItems.length === 0,
    hasFilters: categories.length > 1,
  };
}