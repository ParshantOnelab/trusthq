
import React from 'react';

interface AISummarySectionProps {
  summary: string;
}

const AISummarySection: React.FC<AISummarySectionProps> = ({ summary }) => {
  return (
    <div className="bg-amber-50/70 dark:bg-amber-900/10 rounded-lg border shadow-sm p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:border-amber-200 dark:hover:border-amber-800">
      <h2 className="h2 mb-4 flex items-center">
        <span className="bg-amber-100 p-1 rounded-md mr-2">🤖</span>
        AI Summary
      </h2>
      <div className="flex-grow overflow-y-auto">
        <p className="body-medium">{summary}</p>
      </div>
    </div>
  );
};

export default AISummarySection;
