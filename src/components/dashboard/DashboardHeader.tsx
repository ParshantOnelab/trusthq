
import React from 'react';
import { BarChart3, Clock } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  metrics: {
    totalCompaniesVerified: number;
    lastActivityDate: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, metrics }) => {
  // Capitalize the first letter of the name
  const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
  
  return (
    <div className="bg-gradient-to-r from-trustiq-blue-900 to-trustiq-blue-800 -mx-6 px-6 py-8 text-white rounded-lg shadow-lg">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">Welcome back, {capitalizedName}</h1>
        <p className="text-white/90 text-lg">
          Here's an overview of your company verification activity.
        </p>
        
        {/* Quick Summary Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-white/80" />
            <span className="text-white">{metrics.totalCompaniesVerified} companies verified</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-white/80" />
            <span className="text-white">Last activity: {metrics.lastActivityDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
