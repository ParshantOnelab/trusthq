
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';

interface RiskSummaryProps {
  riskSummary: string;
}

const RiskSummary: React.FC<RiskSummaryProps> = ({ riskSummary }) => {
  // Analyze the summary to extract risk factors and positive indicators
  const hasRiskFactors = riskSummary.toLowerCase().includes("risk") || 
                         riskSummary.toLowerCase().includes("case") || 
                         riskSummary.toLowerCase().includes("fraud") ||
                         riskSummary.toLowerCase().includes("dispute");
  
  const hasPositiveIndicators = riskSummary.toLowerCase().includes("compliant") || 
                               riskSummary.toLowerCase().includes("clean") || 
                               riskSummary.toLowerCase().includes("excellent") ||
                               riskSummary.toLowerCase().includes("strong");
  
  // Extract risk factors and positive indicators based on the summary text
  const negativeFactors = [];
  if (riskSummary.toLowerCase().includes("fraud")) {
    negativeFactors.push("Fraud case detected");
  }
  if (riskSummary.toLowerCase().includes("dispute")) {
    negativeFactors.push("Vendor dispute detected");
  }
  if (riskSummary.toLowerCase().includes("pending")) {
    negativeFactors.push("Pending legal case");
  }
  if (riskSummary.toLowerCase().includes("risky director")) {
    negativeFactors.push("Director with risk indicators");
  }
  
  const positiveFactors = [];
  if (riskSummary.toLowerCase().includes("compliant")) {
    positiveFactors.push("Compliant with regulatory requirements");
  }
  if (riskSummary.toLowerCase().includes("clean")) {
    positiveFactors.push("Clean history with no major issues");
  }
  if (riskSummary.toLowerCase().includes("excellent")) {
    positiveFactors.push("Excellent compliance record");
  }
  if (riskSummary.toLowerCase().includes("strong")) {
    positiveFactors.push("Strong financial indicators");
  }
  
  // Add default factors if none were detected
  if (negativeFactors.length === 0 && hasRiskFactors) {
    negativeFactors.push("Potential risk factors identified");
  }
  
  if (positiveFactors.length === 0 && hasPositiveIndicators) {
    positiveFactors.push("Positive compliance indicators");
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-t-indigo-100 dark:border-t-indigo-900">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center text-indigo-900 dark:text-indigo-300">
              <ShieldAlert className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Risk Analysis
            </CardTitle>
            <CardDescription>
              Key risk factors and positive indicators
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid gap-4 md:grid-cols-2">
          {negativeFactors.length > 0 && (
            <div className="bg-red-50/50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30 transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-sm font-semibold flex items-center text-red-600 dark:text-red-400 mb-2">
                <AlertTriangle className="h-4 w-4 mr-1" /> 
                Risk Factors
              </h4>
              <ul className="space-y-2">
                {negativeFactors.map((factor, index) => (
                  <li key={index} className="body-medium flex items-start">
                    <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 shadow-sm">
                      !
                    </span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {positiveFactors.length > 0 && (
            <div className="bg-green-50/50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/30 transition-transform duration-300 hover:-translate-y-1">
              <h4 className="text-sm font-semibold flex items-center text-green-600 dark:text-green-400 mb-2">
                <CheckCircle className="h-4 w-4 mr-1" /> 
                Positive Indicators
              </h4>
              <ul className="space-y-2">
                {positiveFactors.map((factor, index) => (
                  <li key={index} className="body-medium flex items-start">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 shadow-sm">
                      ✓
                    </span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <p className="body-medium text-slate-600 dark:text-slate-400 mt-4 pt-4 border-t border-border bg-indigo-50/30 dark:bg-indigo-900/10 p-3 rounded-lg">
          {riskSummary}
        </p>
      </CardContent>
    </Card>
  );
};

export default RiskSummary;
