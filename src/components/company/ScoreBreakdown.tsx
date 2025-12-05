
import React, { useState, useEffect } from 'react';
import { ScoreComponent } from '@/services/companyService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreBreakdownProps {
  scoreComponents: ScoreComponent[];
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scoreComponents }) => {
  const [animatedComponents, setAnimatedComponents] = useState<string[]>([]);

  // Animate components on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedComponents(scoreComponents.map(c => c.name));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [scoreComponents]);

  // Get tooltip descriptions for each component
  const getTooltipDescription = (name: string, score: number) => {
    const maxScore = 25;
    
    switch (name) {
      case "MCA Compliance": 
        return `Score ${score}/${maxScore} – All regulatory filings up to date`;
      case "Director Risk": 
        return `Score ${score}/${maxScore} – Director associated with 2 struck-off firms`;
      case "Legal Risk": 
        return `Score ${score}/${maxScore} – 1 pending vendor case found`;
      case "Financial Signals": 
      case "Financial signals":
        return `Score ${score}/${maxScore} – Paid-up capital exceeds ₹10L`;
      case "GST Filing": 
        return `Score ${score}/${maxScore} – Regular GST filing pattern`;
      default:
        return `Score ${score}/${maxScore} – Analysis complete`;
    }
  };

  // Get summary text for preview - Use component summary if available
  const getSummaryPreview = (component: ScoreComponent) => {
    return component.summary || "Analysis complete";
  };

  // The max score is now consistently 25 for all components
  const getScoreMax = () => 25;

  // Get a color based on the percentage of the max score
  const getHeatmapColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    
    if (percentage >= 80) return {
      bg: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20',
      border: 'border-green-300 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      progress: 'bg-gradient-to-r from-green-500 to-green-400'
    };
    if (percentage >= 60) return {
      bg: 'bg-gradient-to-r from-lime-50 to-lime-100 dark:from-lime-950/30 dark:to-lime-900/20',
      border: 'border-lime-300 dark:border-lime-800', 
      text: 'text-lime-800 dark:text-lime-300',
      progress: 'bg-gradient-to-r from-lime-500 to-lime-400'
    };
    if (percentage >= 40) return {
      bg: 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20',
      border: 'border-amber-300 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-300',
      progress: 'bg-gradient-to-r from-amber-500 to-amber-400'
    };
    if (percentage >= 20) return {
      bg: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20',
      border: 'border-orange-300 dark:border-orange-800',
      text: 'text-orange-800 dark:text-orange-300',
      progress: 'bg-gradient-to-r from-orange-500 to-orange-400'
    };
    return {
      bg: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20',
      border: 'border-red-300 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      progress: 'bg-gradient-to-r from-red-500 to-red-400'
    };
  };

  // Get the emoji for each component
  const getComponentEmoji = (name: string) => {
    switch (name) {
      case "MCA Compliance": return "📝";
      case "Director Risk": return "👤";
      case "Legal Risk": return "⚖️";
      case "Financial Signals": 
      case "Financial signals": 
        return "💰";
      case "GST Filing": return "🧾";
      case "Vendor feedback": return "👥";
      case "Web signals": return "🌐";
      default: return "📊";
    }
  };

  // Sort components by score in descending order
  const sortedComponents = [...scoreComponents].sort((a, b) => b.score - a.score);
  
  // The consistent max score for all components
  const maxScore = 25;

  return (
    <TooltipProvider>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3"
      >
        {sortedComponents.map((component, index) => {
          const tooltipDescription = getTooltipDescription(component.name, component.score);
          const emoji = getComponentEmoji(component.name);
          const colorScheme = getHeatmapColor(component.score, maxScore);
          const percentage = (component.score / maxScore) * 100;
          const summaryPreview = getSummaryPreview(component);
          const isAnimated = animatedComponents.includes(component.name);
          
          return (
            <AccordionItem 
              key={component.name}
              value={component.name}
              className={cn(
                "rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
                colorScheme.bg,
                colorScheme.border,
                "border",
                "transform transition-all duration-500",
                isAnimated ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className={cn(
                "px-4 py-3 hover:no-underline group",
                colorScheme.text
              )}>
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg bg-white/80 dark:bg-gray-800/40 shadow-sm rounded-full h-9 w-9 flex items-center justify-center">{emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start">
                        <span className="text-left">{component.name}</span>
                        <span className="text-xs opacity-80">{summaryPreview}</span>
                      </div>
                      <span>{component.score}/{maxScore}</span>
                    </div>

                    {/* Progress bar with animation */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${colorScheme.progress} transition-all duration-1000 ease-out`} 
                        style={{ 
                          width: isAnimated ? `${percentage}%` : '0%',
                          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.3)' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-indigo-500" />
                  <div>
                    <p className="text-slate-700 dark:text-slate-300">{tooltipDescription}</p>
                    
                    {component.name === "Director Risk" && (
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="flex items-start">
                          <span className="mr-1 text-amber-500">Director: Rahul Sharma</span> - associated with 2 struck-off firms
                        </li>
                        <li>No PEP or Sanctions flags detected</li>
                        <li>Active since 2018, 4 other active directorships</li>
                      </ul>
                    )}
                    
                    {component.name === "Legal Risk" && (
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="flex items-start">
                          <span className="mr-1 text-amber-500">1 pending vendor case</span> (Haryana High Court)
                        </li>
                        <li>No consumer complaints in last 24 months</li>
                        <li>No labor disputes detected</li>
                      </ul>
                    )}
                    
                    {component.name === "MCA Compliance" && (
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="flex items-start">
                          <span className="mr-1 text-green-500">All annual returns filed on time</span>
                        </li>
                        <li>No active compliance notices</li>
                        <li>Complete board meeting minutes available</li>
                      </ul>
                    )}
                    
                    {(component.name === "Financial Signals" || component.name === "Financial signals") && (
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="flex items-start">
                          <span className="mr-1 text-green-500">Paid-up capital exceeds ₹10L</span>
                        </li>
                        <li>Positive revenue growth in last fiscal year</li>
                        <li>No reported payment defaults</li>
                      </ul>
                    )}
                    
                    {component.name === "GST Filing" && (
                      <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="flex items-start">
                          <span className="mr-1 text-green-500">Regular monthly GST filing pattern</span>
                        </li>
                        <li>No notices or penalties in last 12 months</li>
                        <li>Input tax credit fully utilized</li>
                      </ul>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </TooltipProvider>
  );
};

export default ScoreBreakdown;
