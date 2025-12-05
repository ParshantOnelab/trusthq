
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Shield } from 'lucide-react';
import ScoreSummary from './ScoreSummary';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ScoreSectionProps {
  score: number;
  updatedScore: { oldScore: number, newScore: number } | null;
  onDownloadReport: () => void;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({ 
  score, 
  updatedScore, 
  onDownloadReport 
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-t-indigo-100 dark:border-t-indigo-900 overflow-visible bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-300 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" />
          Trust Score
        </h3>
        <Button 
          onClick={onDownloadReport} 
          size="sm"
          className="shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </CardHeader>
      <CardContent className="relative">
        {/* Add subtle watermark */}
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <div className="h-24 w-24 rounded-full bg-indigo-500"></div>
        </div>
        <ScoreSummary score={score} updatedScore={updatedScore} />
      </CardContent>
    </Card>
  );
};

export default ScoreSection;
