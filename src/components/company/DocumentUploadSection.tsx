
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import DocumentUploader from '@/components/DocumentUploader';
import { ScoreComponent } from '@/services/companyService';

interface DocumentUploadSectionProps {
  companyId: number;
  onDocumentProcessed: (result: { oldScore: number, newScore: number, updatedComponents: ScoreComponent[] }) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ companyId, onDocumentProcessed }) => {
  const [documentUploadMode, setDocumentUploadMode] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDocumentUpload = () => {
    // Directly open file selection dialog instead of showing the drop area
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setDocumentUploadMode(false);
    setProcessingComplete(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentUploadMode(true);
      setProcessingComplete(false);
    }
  };

  const handleDocumentProcessComplete = (oldScore: number, newScore: number, updatedComponents: ScoreComponent[]) => {
    setProcessingComplete(true);
    onDocumentProcessed({ oldScore, newScore, updatedComponents });
  };

  const handleUploadAgain = () => {
    // Reset and open file dialog again
    setProcessingComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    handleDocumentUpload();
  };

  return (
    <Card className="border-dashed border-2 bg-muted/5">
      {!documentUploadMode ? (
        <>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Upload className="h-5 w-5 mr-2" />
              Enhance Trust Score
            </CardTitle>
            <CardDescription>
              Upload financial documents to improve scoring accuracy
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 text-center">
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              multiple
            />
            <Button 
              onClick={handleDocumentUpload} 
              variant="secondary" 
              className="px-6 mx-auto"
            >
              Upload Documents
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Supports bank statements, ITRs, financial PDFs (Max 5MB)
            </p>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="pb-3 flex flex-row items-start justify-between">
            <div>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload financial documents
              </CardDescription>
            </div>
            {!processingComplete ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCancel}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleUploadAgain} 
                variant="secondary" 
                size="sm"
                className="px-4"
              >
                Upload Again
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <DocumentUploader 
              companyId={companyId} 
              onProcessComplete={handleDocumentProcessComplete}
              initialFiles={fileInputRef.current?.files || null}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default DocumentUploadSection;
