import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "../types";

interface PropertyDetailsFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const GARAGE_SPACES = ["1", "2", "3", "4+"];
const CURRENT_YEAR = new Date().getFullYear();
const COMPLETION_YEARS = Array.from({ length: 5 }, (_, i) => (CURRENT_YEAR + i).toString());

export const PropertyDetailsFields = ({ formData, setFormData }: PropertyDetailsFieldsProps) => {
  return (
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
    </div>
  );
};