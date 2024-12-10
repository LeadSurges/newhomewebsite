import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BuilderSelect } from "@/components/builders/BuilderSelect";
import { FormData } from "./types";

interface PropertyFormFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const HOME_TYPES = ["Condo", "Townhouse", "Single family home"];
const CONSTRUCTION_STATUSES = ["Preconstruction", "Construction", "Complete"];
const OWNERSHIP_TYPES = ["Freehold", "Condo", "Co-op", "Condop"];
const GARAGE_SPACES = ["1", "2", "3", "4+"];
const CURRENT_YEAR = new Date().getFullYear();
const COMPLETION_YEARS = Array.from({ length: 5 }, (_, i) => (CURRENT_YEAR + i).toString());

export const PropertyFormFields = ({ formData, setFormData }: PropertyFormFieldsProps) => {
  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData({ ...formData, keywords });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <BuilderSelect
          value={formData.builder_id || ""}
          onChange={(value) => setFormData({ ...formData, builder_id: value })}
        />

        <div>
          <Label>Home Type</Label>
          <Select
            value={formData.home_type || ""}
            onValueChange={(value) => setFormData({ ...formData, home_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select home type" />
            </SelectTrigger>
            <SelectContent>
              {HOME_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Construction Status</Label>
          <Select
            value={formData.construction_status || ""}
            onValueChange={(value) => setFormData({ ...formData, construction_status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select construction status" />
            </SelectTrigger>
            <SelectContent>
              {CONSTRUCTION_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms_min">Min Bedrooms</Label>
            <Input
              id="bedrooms_min"
              type="number"
              min="1"
              max="10"
              value={formData.bedrooms_min}
              onChange={(e) => setFormData({ ...formData, bedrooms_min: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bedrooms_max">Max Bedrooms</Label>
            <Input
              id="bedrooms_max"
              type="number"
              min="1"
              max="10"
              value={formData.bedrooms_max}
              onChange={(e) => setFormData({ ...formData, bedrooms_max: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bathrooms_min">Min Bathrooms</Label>
            <Input
              id="bathrooms_min"
              type="number"
              min="1"
              max="7"
              step="0.5"
              value={formData.bathrooms_min}
              onChange={(e) => setFormData({ ...formData, bathrooms_min: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bathrooms_max">Max Bathrooms</Label>
            <Input
              id="bathrooms_max"
              type="number"
              min="1"
              max="7"
              step="0.5"
              value={formData.bathrooms_max}
              onChange={(e) => setFormData({ ...formData, bathrooms_max: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="square_feet_min">Min Square Feet</Label>
            <Input
              id="square_feet_min"
              type="number"
              min="500"
              max="20000"
              step="100"
              value={formData.square_feet_min}
              onChange={(e) => setFormData({ ...formData, square_feet_min: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="square_feet_max">Max Square Feet</Label>
            <Input
              id="square_feet_max"
              type="number"
              min="500"
              max="20000"
              step="100"
              value={formData.square_feet_max}
              onChange={(e) => setFormData({ ...formData, square_feet_max: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label>Ownership Type</Label>
          <Select
            value={formData.ownership_type || ""}
            onValueChange={(value) => setFormData({ ...formData, ownership_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ownership type" />
            </SelectTrigger>
            <SelectContent>
              {OWNERSHIP_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Garage Spaces</Label>
          <Select
            value={formData.garage_spaces || ""}
            onValueChange={(value) => setFormData({ ...formData, garage_spaces: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select garage spaces" />
            </SelectTrigger>
            <SelectContent>
              {GARAGE_SPACES.map((spaces) => (
                <SelectItem key={spaces} value={spaces}>
                  {spaces}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Completion Year</Label>
          <Select
            value={formData.completion_year || ""}
            onValueChange={(value) => setFormData({ ...formData, completion_year: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select completion year" />
            </SelectTrigger>
            <SelectContent>
              {COMPLETION_YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            value={formData.keywords.join(', ')}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder="e.g. pool, garage, view"
          />
        </div>

        <div className="space-y-2 pt-4">
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
    </div>
  );
};