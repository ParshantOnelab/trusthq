
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import DashboardScoreBadge from './DashboardScoreBadge';
import { Skeleton } from '@/components/ui/skeleton';

interface Company {
  id: number;
  name: string;
  cin: string;
  score: number;
  lastChecked: string;
}

interface CompaniesTableProps {
  companies: Company[];
  isLoading?: boolean;
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ companies, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>CIN</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Last Checked</TableHead>
              <TableHead className="text-center pr-15">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>CIN</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Last Checked</TableHead>
            <TableHead className="text-center pr-15">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <TableRow key={company.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="text-sm font-medium">{company.name}</TableCell>
                <TableCell className="font-mono text-xs">{company.cin}</TableCell>
                <TableCell>
                  <DashboardScoreBadge score={company.score} />
                </TableCell>
                <TableCell className="text-muted-foreground">{company.lastChecked}</TableCell>
                <TableCell className="pl-4 text-right">
                  <Link to={`/company/${company.id}`}>
                    <Button variant="ghost" size="sm" className="hover:bg-trustiq-blue-50">
                      View Report
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-8 w-8 text-muted-foreground/70" />
                  <p className="font-medium">No companies found matching your search criteria</p>
                  <p className="text-sm">Try adjusting your filters or search term</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
