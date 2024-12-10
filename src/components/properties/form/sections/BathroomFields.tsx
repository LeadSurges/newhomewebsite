import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "../../types";
import { handleMinBathroomsChange, handleMaxBathroomsChange } from "../utils/bathroomHandlers";

interface BathroomFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const BathroomFields = ({ formData, setFormData }: BathroomFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="bathrooms_min">Min Bathrooms</Label>
        <Input
          id="bathrooms_min"
          type="number"
          min="1"
          step="0.5"
          value={formData.bathrooms_min}
          onChange={(e) => handleMinBathroomsChange(e.target.value, formData, setFormData)}
        />
      </div>
      <div>
        <Label htmlFor="bathrooms_max">Max Bathrooms</Label>
        <Input
          id="bathrooms_max"
          type="number"
          min={formData.bathrooms_min || "1"}
          step="0.5"
          value={formData.bathrooms_max}
          onChange={(e) => handleMaxBathroomsChange(e.target.value, formData, setFormData)}
        />
      </div>
    </div>
  );
};