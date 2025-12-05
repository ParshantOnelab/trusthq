
import { useState, useEffect } from 'react';
import { getRecentCompanies } from '@/services/companyService';

export interface CompanyData {
  id: number;
  name: string;
  cin: string;
  score: number;
  lastChecked: string;
}

export function useCompanyData() {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchCompanies = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      
      // For now, we're using the dummy data directly from the service
      const data = await getRecentCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch companies'));
      console.error('Error fetching companies:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const refreshCompanies = () => {
    return fetchCompanies(true);
  };

  return { 
    companies, 
    isLoading, 
    isRefreshing,
    error, 
    refreshCompanies 
  };
}
