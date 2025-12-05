
import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FilterType } from '@/hooks/useCompanyFilters';

interface CompanyFiltersProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge 
        variant={activeFilter === "all" ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => setActiveFilter("all")}
      >
        All Reports
      </Badge>
      <Badge 
        variant={activeFilter === "trusted" ? "default" : "outline"}
        className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
        onClick={() => setActiveFilter("trusted")}
      >
        <CheckCircle className="h-3 w-3 mr-1" /> Trusted
      </Badge>
      <Badge 
        variant={activeFilter === "moderate" ? "default" : "outline"}
        className="cursor-pointer bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
        onClick={() => setActiveFilter("moderate")}
      >
        <Clock className="h-3 w-3 mr-1" /> Moderate Risk
      </Badge>
      <Badge 
        variant={activeFilter === "high-risk" ? "default" : "outline"}
        className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
        onClick={() => setActiveFilter("high-risk")}
      >
        <AlertCircle className="h-3 w-3 mr-1" /> High Risk
      </Badge>
    </div>
  );
};

export default CompanyFilters;
