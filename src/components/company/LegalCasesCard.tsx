
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LegalCaseViewer from '@/components/LegalCaseViewer';
import { LegalCase } from '@/services/companyService';

interface LegalCasesCardProps {
  cases: LegalCase[];
}

const LegalCasesCard: React.FC<LegalCasesCardProps> = ({ cases }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Legal Case Viewer</CardTitle>
        <CardDescription>
          Court cases associated with this company
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LegalCaseViewer cases={cases} />
      </CardContent>
    </Card>
  );
};

export default LegalCasesCard;
