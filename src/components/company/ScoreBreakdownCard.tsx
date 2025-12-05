
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScoreBreakdown from './ScoreBreakdown';
import { ScoreComponent } from '@/services/companyService';
import { BarChart3 } from 'lucide-react';

interface ScoreBreakdownCardProps {
  scoreComponents: ScoreComponent[];
}

const ScoreBreakdownCard: React.FC<ScoreBreakdownCardProps> = ({ scoreComponents }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-t-indigo-100 dark:border-t-indigo-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center text-indigo-900 dark:text-indigo-300">
          <BarChart3 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Score Breakdown by Factor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScoreBreakdown scoreComponents={scoreComponents} />
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdownCard;
