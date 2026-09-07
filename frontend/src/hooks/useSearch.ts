import { useState, useMemo } from 'react';

/**
 * Custom TypeScript hook për kërkim / filtrim gjenerik
 * 
 * @template T - Lloji i objektit në listë (p.sh. Product, Customer)
 * @param data - Lista me të dhëna për t'u filtruar
 * @param searchKeys - Fushat (keys) të objektit ku do të kërkohet
 */
export function useSearch<T extends Record<string, any>>(
  data: T[] = [],
  searchKeys: (keyof T)[] = []
) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
}