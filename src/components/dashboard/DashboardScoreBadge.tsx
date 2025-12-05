
import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const DashboardScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let colorClass = '';
  let label = '';

  if (score >= 70) {
    colorClass = 'bg-green-100 text-green-800';
    label = 'Trusted';
  } else if (score >= 40) {
    colorClass = 'bg-yellow-100 text-yellow-800';
    label = 'Moderate Risk';
  } else {
    colorClass = 'bg-red-100 text-red-800';
    label = 'High Risk';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {score}/100 • {label}
    </span>
  );
};

export default DashboardScoreBadge;
