
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, onSearchChange }) => {
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/lookup?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm">
      <h2 className="h2 mb-3">Search Companies</h2>
      <div className="flex gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by company name or CIN..." 
            className="pl-9 pr-4 rounded-lg border-gray-400 focus:border-trustiq-blue-800"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button 
          type="submit" 
          onClick={handleSearch} 
          className="bg-trustiq-teal-400 hover:bg-trustiq-teal-500 text-black font-medium"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
