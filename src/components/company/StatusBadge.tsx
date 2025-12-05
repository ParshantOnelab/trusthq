
import React from 'react';
import { CheckCircle, AlertCircle, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClass = "";
  let icon = null;

  if (status === "Active") {
    colorClass = "bg-green-100 text-green-800 border-green-200";
    icon = <CheckCircle className="h-4 w-4 mr-1.5" />;
  } else if (status === "Inactive") {
    colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
    icon = <Clock className="h-4 w-4 mr-1.5" />;
  } else if (status === "Strike Off") {
    colorClass = "bg-red-100 text-red-800 border-red-200";
    icon = <AlertTriangle className="h-4 w-4 mr-1.5" />;
  } else {
    colorClass = "bg-gray-100 text-gray-800 border-gray-200";
    icon = <AlertCircle className="h-4 w-4 mr-1.5" />;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm border ${colorClass}`}>
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
