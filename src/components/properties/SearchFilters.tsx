import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, Bed, Bath, Ruler, DollarSign } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [bedroomRange, setBedroomRange] = useState([1, 7]);
  const [bathroomRange, setBathroomRange] = useState([1, 5]);
  const [squareFeetRange, setSquareFeetRange] = useState([500, 10000]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      location,
      priceRange,
      bedroomRange,
      bathroomRange,
      squareFeetRange,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card className="mb-8 bg-white shadow-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="location" className="text-lg font-semibold mb-2 block">Location</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </Label>
                </div>
                <Slider
                  defaultValue={[0, 5000000]}
                  max={10000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">
                    Bedrooms: {bedroomRange[0]} - {bedroomRange[1]}
                  </Label>
                </div>
                <Slider
                  defaultValue={[1, 7]}
                  min={1}
                  max={10}
                  step={1}
                  value={bedroomRange}
                  onValueChange={setBedroomRange}
                  className="my-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">
                    Bathrooms: {bathroomRange[0]} - {bathroomRange[1]}
                  </Label>
                </div>
                <Slider
                  defaultValue={[1, 5]}
                  min={1}
                  max={7}
                  step={0.5}
                  value={bathroomRange}
                  onValueChange={setBathroomRange}
                  className="my-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">
                    Square Feet: {formatNumber(squareFeetRange[0])} - {formatNumber(squareFeetRange[1])}
                  </Label>
                </div>
                <Slider
                  defaultValue={[500, 10000]}
                  min={500}
                  max={20000}
                  step={100}
                  value={squareFeetRange}
                  onValueChange={setSquareFeetRange}
                  className="my-4"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-accent hover:bg-accent/90 transition-colors"
          >
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};