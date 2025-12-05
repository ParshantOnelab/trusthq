
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import RiskAssistant from '@/components/RiskAssistant';

interface RiskAssistantButtonProps {
  companyId: number;
  companyName: string;
}

const RiskAssistantButton: React.FC<RiskAssistantButtonProps> = ({ companyId, companyName }) => {
  const [showRiskAssistant, setShowRiskAssistant] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Collapsible 
        open={showRiskAssistant}
        onOpenChange={setShowRiskAssistant}
        className="flex items-end"
      >
        <CollapsibleContent className={`absolute bottom-0 transition-all duration-500 ${isMobile ? 'right-0' : 'right-16'} w-[350px] animate-slide-in-right`}>
          <Card className="shadow-lg border-t-4 border-t-indigo-500 mb-4 rounded-xl overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50/80 to-white dark:from-indigo-900/20 dark:to-gray-900">
              <CardTitle className="flex items-center gap-2 text-lg text-indigo-900 dark:text-indigo-300">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Ask Risk Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RiskAssistant companyId={companyId} companyName={companyName} />
            </CardContent>
          </Card>
        </CollapsibleContent>
        
        {!showRiskAssistant && (
          <div className="absolute bottom-0 right-16 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 border border-indigo-100 dark:border-indigo-900/30 flex items-center transition-all duration-200 animate-fade-in">
            <Brain className="h-4 w-4 text-indigo-500 mr-2" />
            <span className="text-sm text-slate-600 dark:text-slate-300 line-clamp-1 max-w-[200px]">
              Ask about {companyName}'s risk profile...
            </span>
          </div>
        )}
        
        <CollapsibleTrigger asChild>
          <Button 
            className="rounded-full h-14 w-14 shadow-lg transition-transform duration-200 hover:scale-105 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
            size="icon"
          >
            {showRiskAssistant ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageSquare className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};

export default RiskAssistantButton;
