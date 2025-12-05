
import React from 'react';
import { AlertTriangle, Check, CheckCircle } from 'lucide-react';
import { LegalCase } from '@/services/companyService';

interface LegalCaseViewerProps {
  cases: LegalCase[];
}

const LegalCaseViewer: React.FC<LegalCaseViewerProps> = ({ cases }) => {
  if (cases.length === 0) {
    return (
      <div className="text-center py-8">
        <Check className="h-12 w-12 text-green-500 mx-auto mb-2" />
        <p className="text-muted-foreground">No legal cases found for this company</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Case Title</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Risk Tier</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((legalCase, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4 text-xs font-medium">{legalCase.title}</td>
              <td className="py-3 px-4 text-xs">{legalCase.date}</td>
              <td className="py-3 px-4">
                <CaseStatusBadge status={legalCase.status} />
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted">
                  {legalCase.type}
                </span>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <RiskTierBadge tier={legalCase.riskTier} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CaseStatusBadge = ({ status }: { status: string }) => {
  if (status === 'Closed') {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
        <Check className="mr-1 h-3 w-3" />
        Closed
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
        <AlertTriangle className="mr-1 h-3 w-3" />
        {status}
      </span>
    );
  }
};

const RiskTierBadge = ({ tier }: { tier: number }) => {
  let bgColor = '';
  
  switch (tier) {
    case 1:
      bgColor = 'bg-green-100 text-green-800';
      break;
    case 2:
      bgColor = 'bg-yellow-100 text-yellow-800';
      break;
    case 3:
      bgColor = 'bg-red-100 text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${bgColor} whitespace-nowrap`}>
      Tier {tier}
    </span>
  );
};

export default LegalCaseViewer;
