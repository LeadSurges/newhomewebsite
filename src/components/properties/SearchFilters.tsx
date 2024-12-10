import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  initialLocation?: string;
}

export const SearchFilters = ({ onSearch, initialLocation = "" }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    location: initialLocation,
    priceRange: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    features: [] as string[],
  });

  const handleFilterChange = (key: string, value: string) => {
    console.log(`Filter changed: ${key} = ${value}`);
    setFilters(prev => ({ ...prev, [key]: value }));
    onSearch({ ...filters, [key]: value });
  };

  return (
    <section className="sticky top-16 z-10 bg-white border-b py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by location, development name..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full focus:ring-accent focus:ring-offset-0"
            />
          </div>
          <Button onClick={() => onSearch(filters)}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger className="w-[160px] focus:ring-accent focus:ring-offset-0">
              <SelectValue placeholder="Home type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
          >
            <SelectTrigger className="w-[160px] focus:ring-accent focus:ring-offset-0">
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-400000">Under $400,000</SelectItem>
              <SelectItem value="400000-600000">$400,000 - $600,000</SelectItem>
              <SelectItem value="600000-800000">$600,000 - $800,000</SelectItem>
              <SelectItem value="800000-1000000">$800,000 - $1M</SelectItem>
              <SelectItem value="1000000-plus">$1M+</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleFilterChange("bedrooms", value)}
          >
            <SelectTrigger className="w-[160px] focus:ring-accent focus:ring-offset-0">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1+ bed</SelectItem>
              <SelectItem value="2">2+ beds</SelectItem>
              <SelectItem value="3">3+ beds</SelectItem>
              <SelectItem value="4">4+ beds</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.bathrooms}
            onValueChange={(value) => handleFilterChange("bathrooms", value)}
          >
            <SelectTrigger className="w-[160px] focus:ring-accent focus:ring-offset-0">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+ bath</SelectItem>
              <SelectItem value="2">2+ baths</SelectItem>
              <SelectItem value="3">3+ baths</SelectItem>
              <SelectItem value="4">4+ baths</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="whitespace-nowrap">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More filters
          </Button>

          <Button variant="outline" className="ml-auto whitespace-nowrap">
            Save search
          </Button>
        </div>
      </div>
    </section>
  );
};