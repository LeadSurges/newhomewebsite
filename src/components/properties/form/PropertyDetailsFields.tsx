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
  console.log("PropertyDetailsFields - Current form data:", formData);

  const handleMinBedroomsChange = (value: string) => {
    const minBedrooms = value === "" ? "" : Math.max(1, parseInt(value));
    setFormData({ 
      ...formData, 
      bedrooms_min: minBedrooms.toString(),
      bedrooms_max: formData.bedrooms_max && parseInt(formData.bedrooms_max) < minBedrooms 
        ? minBedrooms.toString() 
        : formData.bedrooms_max
    });
  };

  const handleMaxBedroomsChange = (value: string) => {
    const maxBedrooms = value === "" ? "" : parseInt(value);
    setFormData({ 
      ...formData, 
      bedrooms_max: value,
      bedrooms_min: maxBedrooms && formData.bedrooms_min && parseInt(formData.bedrooms_min) > maxBedrooms 
        ? maxBedrooms.toString() 
        : formData.bedrooms_min
    });
  };

  const handleMinBathroomsChange = (value: string) => {
    const minBathrooms = value === "" ? "" : Math.max(1, parseFloat(value));
    setFormData({ 
      ...formData, 
      bathrooms_min: minBathrooms.toString(),
      bathrooms_max: formData.bathrooms_max && parseFloat(formData.bathrooms_max) < minBathrooms 
        ? minBathrooms.toString() 
        : formData.bathrooms_max
    });
  };

  const handleMaxBathroomsChange = (value: string) => {
    const maxBathrooms = value === "" ? "" : parseFloat(value);
    setFormData({ 
      ...formData, 
      bathrooms_max: value,
      bathrooms_min: maxBathrooms && formData.bathrooms_min && parseFloat(formData.bathrooms_min) > maxBathrooms 
        ? maxBathrooms.toString() 
        : formData.bathrooms_min
    });
  };

  const handleMinSquareFeetChange = (value: string) => {
    const minSqFt = value === "" ? "" : Math.max(500, parseInt(value));
    setFormData({ 
      ...formData, 
      square_feet_min: minSqFt.toString(),
      square_feet_max: formData.square_feet_max && parseInt(formData.square_feet_max) < minSqFt 
        ? minSqFt.toString() 
        : formData.square_feet_max
    });
  };

  const handleMaxSquareFeetChange = (value: string) => {
    const maxSqFt = value === "" ? "" : parseInt(value);
    setFormData({ 
      ...formData, 
      square_feet_max: value,
      square_feet_min: maxSqFt && formData.square_feet_min && parseInt(formData.square_feet_min) > maxSqFt 
        ? maxSqFt.toString() 
        : formData.square_feet_min
    });
  };

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
            onChange={(e) => handleMinBedroomsChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bedrooms_max">Max Bedrooms</Label>
          <Input
            id="bedrooms_max"
            type="number"
            min={formData.bedrooms_min || "1"}
            max="10"
            value={formData.bedrooms_max}
            onChange={(e) => handleMaxBedroomsChange(e.target.value)}
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
            onChange={(e) => handleMinBathroomsChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bathrooms_max">Max Bathrooms</Label>
          <Input
            id="bathrooms_max"
            type="number"
            min={formData.bathrooms_min || "1"}
            max="7"
            step="0.5"
            value={formData.bathrooms_max}
            onChange={(e) => handleMaxBathroomsChange(e.target.value)}
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
            onChange={(e) => handleMinSquareFeetChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="square_feet_max">Max Square Feet</Label>
          <Input
            id="square_feet_max"
            type="number"
            min={formData.square_feet_min || "500"}
            max="20000"
            step="100"
            value={formData.square_feet_max}
            onChange={(e) => handleMaxSquareFeetChange(e.target.value)}
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