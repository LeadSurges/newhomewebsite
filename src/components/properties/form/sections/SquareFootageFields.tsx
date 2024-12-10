import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "../../types";
import { handleMinSquareFeetChange, handleMaxSquareFeetChange } from "../utils/squareFootageHandlers";

interface SquareFootageFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const SquareFootageFields = ({ formData, setFormData }: SquareFootageFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="square_feet_min">Min Square Feet</Label>
        <Input
          id="square_feet_min"
          type="number"
          min="0"
          value={formData.square_feet_min}
          onChange={(e) => handleMinSquareFeetChange(e.target.value, formData, setFormData)}
        />
      </div>
      <div>
        <Label htmlFor="square_feet_max">Max Square Feet</Label>
        <Input
          id="square_feet_max"
          type="number"
          min={formData.square_feet_min || "0"}
          value={formData.square_feet_max}
          onChange={(e) => handleMaxSquareFeetChange(e.target.value, formData, setFormData)}
        />
      </div>
    </div>
  );
};