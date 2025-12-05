
import { dummyCompanyDetails, dummySearchResults } from '@/data/dummyData';

export interface CompanySearchResult {
  id: number;
  name: string;
  cin: string;
  status: string;
  roc: string;
  paidUpCapital: number;
  activity: string;
}

export interface LegalCase {
  title: string;
  date: string;
  status: string;
  type: string;
  riskTier: number;
}

export interface ScoreComponent {
  name: string;
  score: number;
  summary: string; // Changed from optional to required
}

export interface CompanyDetails {
  id: number;
  name: string;
  cin: string;
  status: string;
  dateOfIncorporation: string;
  roc: string;
  class: string;
  type: string;
  paidUpCapital: number;
  activity: string;
  score: number;
  aiSummary: string;
  recommendation: string;
  scoreComponents: ScoreComponent[];
  legalCases: LegalCase[];
}

export interface FinancialData {
  avgMonthlyBalance: string;
  chequeBounces: string;
  declaredIncome: string;
  itrYear: string;
  gstMatch: string;
}

// Search companies by name or CIN
export const searchCompanies = async (query: string): Promise<CompanySearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter the dummy data based on the search query
  return dummySearchResults.filter(company => 
    company.name.toLowerCase().includes(query.toLowerCase()) || 
    company.cin.toLowerCase().includes(query.toLowerCase())
  );
};

// Get company by ID
export const getCompanyById = async (id: number): Promise<CompanyDetails> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const company = dummyCompanyDetails.find(c => c.id === id);
  
  if (!company) {
    throw new Error('Company not found');
  }
  
  return company;
};

// Get list of companies (for dashboard)
export const getRecentCompanies = async (): Promise<any[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return dummyCompanyDetails.map(company => ({
    id: company.id,
    name: company.name,
    cin: company.cin,
    score: company.score,
    lastChecked: new Date().toISOString().split('T')[0] // Today's date
  }));
};

// Parse uploaded documents and generate financial data
export const parseFinancialDocuments = async (companyId: number): Promise<{
  financialData: FinancialData;
  oldScore: number;
  newScore: number;
  updatedComponents: ScoreComponent[];
}> => {
  // Simulate API delay for document processing
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Get company data
  const company = await getCompanyById(companyId);
  const oldScore = company.score;
  
  // Generate financial data based on company ID
  // In a real app, this would come from document parsing
  const isHighScore = company.score >= 70;
  
  const financialData: FinancialData = {
    avgMonthlyBalance: isHighScore ? "₹12,50,000" : "₹7,80,000",
    chequeBounces: isHighScore ? "0" : "2",
    declaredIncome: isHighScore ? "₹82,00,000" : "₹58,00,000",
    itrYear: "2023-24",
    gstMatch: isHighScore ? "Matched" : "Partially Matched"
  };
  
  // Calculate score adjustments based on criteria
  let financialSignalsPoints = 0;
  const hasHighMonthlyBalance = parseFloat(financialData.avgMonthlyBalance.replace(/[₹,]/g, '')) > 1000000; // > 10L
  const hasHighIncome = parseFloat(financialData.declaredIncome.replace(/[₹,]/g, '')) > 7500000; // > 75L
  const hasNoChequesBounced = financialData.chequeBounces === "0";
  const hasGstMatched = financialData.gstMatch === "Matched";
  
  // Add points based on criteria
  if (hasHighMonthlyBalance) financialSignalsPoints += 5;
  else financialSignalsPoints -= 2;
  
  if (hasHighIncome) financialSignalsPoints += 3;
  else financialSignalsPoints -= 1;
  
  if (hasNoChequesBounced) financialSignalsPoints += 5;
  else financialSignalsPoints -= 3;
  
  if (hasGstMatched) financialSignalsPoints += 2;
  else financialSignalsPoints -= 1;
  
  // Find Financial Signals component
  const updatedComponents = [...company.scoreComponents];
  const financialIndex = updatedComponents.findIndex(c => c.name === "Financial Signals" || c.name === "Financial signals");
  
  if (financialIndex !== -1) {
    // Get current score
    const currentFinancialScore = updatedComponents[financialIndex].score;
    
    // Calculate new score (ensure it stays between 0 and 25)
    const newFinancialScore = Math.max(0, Math.min(25, currentFinancialScore + financialSignalsPoints));
    
    // Update the financial signals score with a summary
    updatedComponents[financialIndex] = {
      ...updatedComponents[financialIndex],
      score: newFinancialScore,
      summary: updatedComponents[financialIndex].summary || "Updated based on financial documents" // Ensure summary exists
    };
    
    // Calculate overall score adjustment
    // We assume each component has equal weight
    const scoreDiff = (newFinancialScore - currentFinancialScore) / updatedComponents.length;
    
    // Calculate new overall score
    let newScore = Math.round(oldScore + scoreDiff);
    // Ensure it's between 0 and 100
    newScore = Math.max(0, Math.min(100, newScore));
    
    return {
      financialData,
      oldScore,
      newScore,
      updatedComponents
    };
  }
  
  // If financial signals component not found, return unmodified score
  return {
    financialData,
    oldScore,
    newScore: oldScore,
    updatedComponents
  };
};

// Update company score and components after document analysis
export const updateCompanyScore = async (
  companyId: number,
  newScore: number,
  updatedComponents: ScoreComponent[]
): Promise<CompanyDetails> => {
  // In a real app, this would persist to the database
  // For now, we'll just simulate the API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find the company
  const company = dummyCompanyDetails.find(c => c.id === companyId);
  
  if (!company) {
    throw new Error('Company not found');
  }
  
  // Update company score and components (this won't persist between page reloads)
  company.score = newScore;
  company.scoreComponents = updatedComponents;
  
  return company;
};
