import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "../../types";
import { handleMinBedroomsChange, handleMaxBedroomsChange } from "../utils/propertyFieldHandlers";

interface BedroomFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const BedroomFields = ({ formData, setFormData }: BedroomFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="bedrooms_min">Min Bedrooms</Label>
        <Input
          id="bedrooms_min"
          type="number"
          min="1"
          max="10"
          value={formData.bedrooms_min}
          onChange={(e) => handleMinBedroomsChange(e.target.value, formData, setFormData)}
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
          onChange={(e) => handleMaxBedroomsChange(e.target.value, formData, setFormData)}
        />
      </div>
    </div>
  );
};