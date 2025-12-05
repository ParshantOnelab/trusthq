
import { dummyDirectorNetworks } from '@/data/dummyData';

export interface DirectorNetwork {
  companyId: number;
  directors: Director[];
}

export interface Director {
  name: string;
  riskScore: number;
  otherCompanies: RelatedCompany[];
}

export interface RelatedCompany {
  name: string;
  cin: string;
}

// Get director network for a company
export const getDirectorNetwork = async (companyId: number): Promise<DirectorNetwork> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const network = dummyDirectorNetworks.find(n => n.companyId === companyId);
  
  if (!network) {
    throw new Error('Director network not found');
  }
  
  return network;
};
