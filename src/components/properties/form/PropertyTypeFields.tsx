import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormData } from "../types";

interface PropertyTypeFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const HOME_TYPES = ["Condo", "Townhouse", "Single family home"];
const CONSTRUCTION_STATUSES = ["Preconstruction", "Construction", "Complete"];
const OWNERSHIP_TYPES = ["Freehold", "Condo", "Co-op", "Condop"];

export const PropertyTypeFields = ({ formData, setFormData }: PropertyTypeFieldsProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};