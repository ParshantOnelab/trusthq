
import React from 'react';
import { BarChart3, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let colorClass = '';
  let gradientClass = '';
  let label = '';
  let icon = null;

  if (score >= 70) {
    colorClass = 'bg-green-100 text-green-800 border border-green-200 shadow-sm shadow-green-100';
    gradientClass = 'from-green-500 to-emerald-600';
    label = 'Trusted';
    icon = <BarChart3 className="mr-1.5 h-4 w-4" />;
  } else if (score >= 40) {
    colorClass = 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm shadow-yellow-100';
    gradientClass = 'from-yellow-500 to-amber-600';
    label = 'Caution';
    icon = <ShieldAlert className="mr-1.5 h-4 w-4" />;
  } else {
    colorClass = 'bg-red-100 text-red-800 border border-red-200 shadow-sm shadow-red-100';
    gradientClass = 'from-red-500 to-rose-600';
    label = 'Risky';
    icon = <AlertTriangle className="mr-1.5 h-4 w-4" />;
  }

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${colorClass} transition-all duration-300 hover:shadow-md`}>
      <span className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 rounded-full blur-md -z-10`}></span>
      {icon}
      {label} ({score}/100)
    </span>
  );
};

export default ScoreBadge;
