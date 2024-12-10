import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "../../types";

interface AdditionalFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const GARAGE_SPACES = ["1", "2", "3", "4+"];
const CURRENT_YEAR = new Date().getFullYear();
const COMPLETION_YEARS = Array.from({ length: 5 }, (_, i) => (CURRENT_YEAR + i).toString());

export const AdditionalFields = ({ formData, setFormData }: AdditionalFieldsProps) => {
  return (
    <>
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
    </>
  );
};