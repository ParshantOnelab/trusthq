
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { CompanyDetails } from '@/services/companyService';
import StatusBadge from './StatusBadge';

interface CompanyOverviewProps {
  company: CompanyDetails;
  onDownloadReport: () => void;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company, onDownloadReport }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">{company.name}</CardTitle>
            </div>
            <CardDescription className="mt-1">
              CIN: {company.cin}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <StatusBadge status={company.status} />
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                Date of Incorporation
              </p>
              <p className="text-sm font-normal text-slate-700">{company.dateOfIncorporation}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">
                <MapPin className="h-3 w-3 inline mr-1" />
                ROC
              </p>
              <p className="text-sm font-normal text-slate-700">{company.roc}</p>
            </div>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">Class / Type</p>
              <p className="text-sm font-normal text-slate-700">{company.class} / {company.type}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">Paid-up Capital</p>
              <p className="text-sm font-normal text-slate-700">₹{company.paidUpCapital.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">Activity</p>
              <p className="text-sm font-normal text-slate-700 line-clamp-2">{company.activity}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
