
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecommendationBadge from './RecommendationBadge';
import { Bot } from 'lucide-react';

interface WorkflowRecommendationProps {
  recommendation: string;
  recommendationReason: string;
}

const WorkflowRecommendation: React.FC<WorkflowRecommendationProps> = ({ 
  recommendation, 
  recommendationReason 
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-t-indigo-100 dark:border-t-indigo-900 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10">
        <CardTitle className="flex items-center text-indigo-900 dark:text-indigo-300">
          <Bot className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          AI Recommendation
        </CardTitle>
        <CardDescription>
          Based on trust score and risk profile
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-6 relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-indigo-500 absolute -top-20 -left-20"></div>
          <div className="w-40 h-40 rounded-full bg-indigo-500 absolute -bottom-20 -right-20"></div>
        </div>
        
        <div className="inline-block mb-4 relative z-10 transition-transform duration-300 hover:scale-105">
          <RecommendationBadge recommendation={recommendation} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 max-w-xs mx-auto relative z-10">
          {recommendationReason}
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkflowRecommendation;
