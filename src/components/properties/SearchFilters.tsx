import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, Bed, Bath, Ruler } from "lucide-react";

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

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-4 block">Price Range (${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()})</Label>
              <Slider
                defaultValue={[0, 5000000]}
                max={10000000}
                step={50000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
            </div>

            <div>
              <Label className="mb-4 flex items-center">
                <Bed className="h-4 w-4 mr-2" />
                Bedrooms ({bedroomRange[0]} - {bedroomRange[1]})
              </Label>
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

            <div>
              <Label className="mb-4 flex items-center">
                <Bath className="h-4 w-4 mr-2" />
                Bathrooms ({bathroomRange[0]} - {bathroomRange[1]})
              </Label>
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

            <div>
              <Label className="mb-4 flex items-center">
                <Ruler className="h-4 w-4 mr-2" />
                Square Feet ({squareFeetRange[0].toLocaleString()} - {squareFeetRange[1].toLocaleString()})
              </Label>
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

          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};