
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LegalCaseViewer from '@/components/LegalCaseViewer';
import DirectorGraph from '@/components/DirectorGraph';
import { LegalCase } from '@/services/companyService';
import { Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyTabsProps {
  companyId: number;
  legalCases: LegalCase[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

// This component is no longer used in the main layout
// It's kept for reference or potential reuse
const CompanyTabs: React.FC<CompanyTabsProps> = ({ 
  companyId,
  legalCases,
  activeTab,
  onTabChange
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleFullscreen = () => {
    const element = document.getElementById('company-tabs');
    
    if (!document.fullscreenElement) {
      element?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div id="company-tabs" className={`transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : 'w-full -mx-6 sm:mx-0'}`}>
      <div className="flex justify-end mb-2 px-6 sm:px-4">
        <Button variant="outline" size="sm" onClick={toggleFullscreen} className="h-8">
          <Expand className="h-4 w-4 mr-1" />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 sm:px-4">
        {/* Director Network Card - Left Side */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Director Network Graph</CardTitle>
            <CardDescription>
              Visualization of directors and their connections to other companies
            </CardDescription>
          </CardHeader>
          <CardContent className={`${isFullscreen ? 'h-[calc(100vh-220px)]' : 'h-[500px]'}`}>
            <DirectorGraph companyId={companyId} />
          </CardContent>
        </Card>
        
        {/* Legal Cases Card - Right Side */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Legal Case Viewer</CardTitle>
            <CardDescription>
              Court cases associated with this company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LegalCaseViewer cases={[
              {
                title: "Vendor Payment Dispute – ABC Ltd.",
                date: "Jan 12, 2023",
                status: "Open",
                type: "Vendor Dispute",
                riskTier: 2
              },
              ...legalCases
            ]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyTabs;
