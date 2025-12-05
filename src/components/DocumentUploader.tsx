import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Upload, FileType2, Check, X, Loader2, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { parseFinancialDocuments, updateCompanyScore, FinancialData, ScoreComponent } from '@/services/companyService';

interface DocumentUploaderProps {
  companyId: number;
  onProcessComplete?: (oldScore: number, newScore: number, updatedComponents: ScoreComponent[]) => void;
  initialFiles: FileList | null;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ companyId, onProcessComplete, initialFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedData, setParsedData] = useState<{
    financialData: FinancialData;
    oldScore: number;
    newScore: number;
    scoreGain: number;
  } | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(true);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      handleFiles(initialFiles);
    }
  }, [initialFiles]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type !== 'application/pdf') {
        toast.error('Only PDF files are accepted');
        return;
      }
      
      if (files[i].size > 5 * 1024 * 1024) {
        toast.error(`File ${files[i].name} exceeds 5MB limit`);
        return;
      }
    }
    
    uploadFiles(files);
  };

  const uploadFiles = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    setParsedData(null);
    setShowUploadForm(false);
    
    const totalDuration = 2500;
    const interval = 100;
    let progress = 0;
    
    const updateProgress = setInterval(() => {
      progress += (100 * interval) / totalDuration;
      if (progress >= 100) {
        progress = 100;
        clearInterval(updateProgress);
        
        setIsUploading(false);
        processDocuments();
      }
      setUploadProgress(progress);
    }, interval);
  };

  const processDocuments = async () => {
    setIsProcessing(true);
    
    try {
      const result = await parseFinancialDocuments(companyId);
      
      await updateCompanyScore(companyId, result.newScore, result.updatedComponents);
      
      const scoreGain = result.newScore - result.oldScore;
      
      setParsedData({
        financialData: result.financialData,
        oldScore: result.oldScore,
        newScore: result.newScore,
        scoreGain: scoreGain
      });
      
      toast.success('Documents processed successfully');
      
      if (onProcessComplete) {
        onProcessComplete(result.oldScore, result.newScore, result.updatedComponents);
      }
    } catch (error) {
      console.error("Error processing documents:", error);
      toast.error('Failed to process documents');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {(showUploadForm && !parsedData && !isUploading && !isProcessing) ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-muted/30' : 'border-muted-foreground/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-muted p-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Drop PDFs here or click to upload</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Upload bank statements, ITRs, or financial PDFs
            </p>
            <input
              id="file-upload-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              multiple
            />
            <Button asChild variant="outline" className="mt-2">
              <label htmlFor="file-upload-input" className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Select Files
              </label>
            </Button>
          </div>
        </div>
      ) : null}

      {(isUploading || isProcessing) && (
        <div className="w-full">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <p className="text-sm font-medium">
              {isUploading ? 'Uploading documents...' : 'Analyzing financial data...'}
            </p>
          </div>
          {isUploading ? (
            <Progress value={uploadProgress} className="h-2" />
          ) : (
            <div className="space-y-2">
              <Progress value={100} className="h-2 bg-amber-100 dark:bg-amber-950">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full animate-pulse" />
              </Progress>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Extracting financial signals from documents...
              </p>
            </div>
          )}
        </div>
      )}

      {parsedData && (
        <div className="mt-2 border rounded-lg p-4 bg-white shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="font-medium text-lg">
                {parsedData.scoreGain > 0 ? (
                  <>📈 Score increased by <span className="text-green-600 font-bold">+{parsedData.scoreGain} points</span></>
                ) : parsedData.scoreGain < 0 ? (
                  <>📉 Score decreased by <span className="text-red-600 font-bold">{parsedData.scoreGain} points</span></>
                ) : (
                  <>Score unchanged</>
                )}
              </h3>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-600 dark:text-slate-300 mb-2">Extracted Financial Data</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-muted-foreground">🏦 Average Monthly Balance</p>
                <p className="font-medium">{parsedData.financialData.avgMonthlyBalance}</p>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-muted-foreground">❌ Cheque Bounces</p>
                <p className={`font-medium ${parsedData.financialData.chequeBounces === "0" ? "text-green-600" : "text-red-600"}`}>
                  {parsedData.financialData.chequeBounces}
                </p>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-muted-foreground">💰 Declared Income</p>
                <p className="font-medium">{parsedData.financialData.declaredIncome}</p>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-muted-foreground">📅 ITR Year</p>
                <p className="font-medium">{parsedData.financialData.itrYear}</p>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 col-span-1 md:col-span-2">
                <p className="text-xs text-muted-foreground">📊 GST Match</p>
                <p className={`font-medium ${parsedData.financialData.gstMatch.includes("Matched") ? "text-green-600" : "text-amber-600"}`}>
                  {parsedData.financialData.gstMatch}
                </p>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800/30 text-center">
              <p className="text-sm text-green-800 dark:text-green-300">
                Trust Score: <span className="font-bold">{parsedData.oldScore}</span> → <span className="font-bold">{parsedData.newScore}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
