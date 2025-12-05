
import { useState, useMemo, useCallback } from 'react';
import { CompanyData } from './useCompanyData';

export type FilterType = 'all' | 'trusted' | 'moderate' | 'high-risk';

export function useCompanyFilters(companies: CompanyData[]) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCompanies = useMemo(() => {
    let filtered = companies;
    
    // Filter by risk level
    if (activeFilter !== "all") {
      filtered = filtered.filter(company => {
        if (activeFilter === "trusted" && company.score >= 70) return true;
        if (activeFilter === "moderate" && company.score >= 40 && company.score < 70) return true;
        if (activeFilter === "high-risk" && company.score < 40) return true;
        return false;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(query) || 
        company.cin.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [companies, activeFilter, searchQuery]);
  
  const clearFilters = useCallback(() => {
    setActiveFilter("all");
    setSearchQuery("");
  }, []);

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredCompanies,
    clearFilters
  };
}
