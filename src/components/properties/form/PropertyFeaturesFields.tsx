import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../types";

interface PropertyFeaturesFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const AMENITIES_OPTIONS = [
  "Pool",
  "Gym",
  "Concierge",
  "Party Room",
  "Guest Suite",
  "Rooftop Terrace",
  "BBQ Area",
  "Pet Spa",
  "Bike Storage",
  "Electric Vehicle Charging",
  "Security System",
  "Theater Room",
  "Business Center",
  "Yoga Studio",
  "Steam Room",
  "Sauna",
];

export const PropertyFeaturesFields = ({ formData, setFormData }: PropertyFeaturesFieldsProps) => {
  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData({ ...formData, keywords });
  };

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          value={formData.keywords.join(', ')}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          placeholder="e.g. pool, garage, view"
        />
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-4">
          {AMENITIES_OPTIONS.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="features_and_finishes">Features & Finishes</Label>
        <Textarea
          id="features_and_finishes"
          value={formData.features_and_finishes}
          onChange={(e) => setFormData({ ...formData, features_and_finishes: e.target.value })}
          placeholder="Enter features and finishes details"
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, featured: checked as boolean })
            }
          />
          <Label htmlFor="featured">Featured Property</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="quick_move_in"
            checked={formData.quick_move_in}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, quick_move_in: checked as boolean })
            }
          />
          <Label htmlFor="quick_move_in">Quick Move-in</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="master_planned"
            checked={formData.master_planned}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, master_planned: checked as boolean })
            }
          />
          <Label htmlFor="master_planned">Master Planned Community</Label>
        </div>
      </div>
    </div>
  );
};