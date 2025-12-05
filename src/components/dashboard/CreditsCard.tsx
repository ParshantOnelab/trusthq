
import React from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CreditsCardProps {
  availableCredits: number;
}

const CreditsCard: React.FC<CreditsCardProps> = ({ availableCredits }) => {
  const handleDownloadReports = () => {
    toast.info("Download feature coming soon!");
  };

  return (
    <Card className="border-dashed shadow-none h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Available Credits</CardTitle>
            <CardDescription>For new company lookups</CardDescription>
          </div>
          <div className="text-2xl font-bold text-trustiq-teal-500">
            {availableCredits}
            <span className="text-xs ml-1 font-normal text-muted-foreground">credits</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={handleDownloadReports} className="w-full flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          Download Reports
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditsCard;
