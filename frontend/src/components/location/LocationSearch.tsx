import { Search, Building2 } from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import type { Location } from '@/pages/MainScreen';
import { useState } from 'react';
import { Button } from '../ui/button';

interface LocationSearchProps {
  searchType: 'pickup' | 'dropoff';
  onLocationSelect: (location: Location, type: 'pickup' | 'dropoff') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  importance: number;
}

const LocationSearch = ({ searchType, onLocationSelect, searchQuery, setSearchQuery }: LocationSearchProps) => {
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query + ', Vietnam'
        )}&format=json&addressdetails=1&limit=5&countrycodes=vn`,
        {
          headers: {
            'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            'User-Agent': 'DatXeUFP/1.0'
          }
        }
      );
      const data: NominatimResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching locations:', error);
      toast.error('Failed to search locations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (result: NominatimResult) => {
    const location = {
      lng: parseFloat(result.lon),
      lat: parseFloat(result.lat),
      address: result.display_name
    };
    onLocationSelect(location, searchType);
    setSearchResults([]);
    setSearchQuery('');
    toast.success(`${searchType === 'pickup' ? 'Pickup' : 'Dropoff'} location set: ${location.address}`);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={`Search for ${searchType} location...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={() => {
            if (searchQuery) {
              handleSearch(searchQuery);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(searchQuery);
            }
          }}
          className="pr-10"
        />
        <Button 
          onClick={() => handleSearch(searchQuery)}
          disabled={isLoading || !searchQuery}
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {searchResults.map((result) => (
            <button
              key={result.place_id}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-0"
              onClick={() => handleLocationSelect(result)}
            >
              <Building2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">
                  {result.display_name.split(',')[0]}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {result.display_name.split(',').slice(1).join(',')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;