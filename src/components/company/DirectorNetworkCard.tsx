
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DirectorGraph from '@/components/DirectorGraph';

interface DirectorNetworkCardProps {
  companyId: number;
}

const DirectorNetworkCard: React.FC<DirectorNetworkCardProps> = ({ companyId }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Director Network Graph</CardTitle>
        <CardDescription>
          Visualization of directors and their connections to other companies
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px] overflow-hidden">
        <div className="w-full h-full">
          <DirectorGraph companyId={companyId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectorNetworkCard;
