
import React from 'react';
import { CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationBadgeProps {
  recommendation: string;
}

const RecommendationBadge: React.FC<RecommendationBadgeProps> = ({ recommendation }) => {
  let colorClass = '';
  let shadowColor = '';
  let icon = null;

  if (recommendation.includes('Proceed') && !recommendation.includes('Caution')) {
    colorClass = 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200 dark:from-green-900/30 dark:to-green-800/20 dark:text-green-300 dark:border-green-800/30';
    shadowColor = 'rgba(16, 185, 129, 0.2)';
    icon = <CheckCircle className="mr-2 h-5 w-5" />;
  } else if (recommendation.includes('Caution') || recommendation.includes('Additional')) {
    colorClass = 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20 dark:text-yellow-300 dark:border-yellow-800/30';
    shadowColor = 'rgba(245, 158, 11, 0.2)';
    icon = <AlertTriangle className="mr-2 h-5 w-5" />;
  } else if (recommendation.includes('Hold') || recommendation.includes('Reject')) {
    colorClass = 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200 dark:from-red-900/30 dark:to-red-800/20 dark:text-red-300 dark:border-red-800/30';
    shadowColor = 'rgba(239, 68, 68, 0.2)';
    icon = <AlertTriangle className="mr-2 h-5 w-5" />;
  } else {
    colorClass = 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 dark:text-blue-300 dark:border-blue-800/30';
    shadowColor = 'rgba(59, 130, 246, 0.2)';
    icon = <FileText className="mr-2 h-5 w-5" />;
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-md text-base font-medium",
        colorClass,
        "shadow-sm transition-all duration-300"
      )}
      style={{ boxShadow: `0 4px 12px ${shadowColor}` }}
    >
      {icon}
      {recommendation}
    </span>
  );
};

export default RecommendationBadge;
