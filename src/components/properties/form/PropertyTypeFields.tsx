import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "../types";

interface PropertyTypeFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const HOME_TYPES = ["Detached", "Semi-Detached", "Townhouse", "Condo"];

export const PropertyTypeFields = ({ formData, setFormData }: PropertyTypeFieldsProps) => {
  const toggleHomeType = (type: string) => {
    const currentTypes = formData.home_type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    setFormData({ ...formData, home_type: newTypes });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Home Types</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {HOME_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`home-type-${type}`}
                checked={formData.home_type?.includes(type)}
                onCheckedChange={() => toggleHomeType(type)}
              />
              <Label htmlFor={`home-type-${type}`} className="text-sm font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Construction Status</Label>
        <Select
          value={formData.construction_status}
          onValueChange={(value: "pre-construction" | "under-construction" | "completed") => 
            setFormData({ ...formData, construction_status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select construction status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pre-construction">Pre-construction</SelectItem>
            <SelectItem value="under-construction">Under Construction</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
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
            <SelectItem value="freehold">Freehold</SelectItem>
            <SelectItem value="condo">Condominium</SelectItem>
            <SelectItem value="leasehold">Leasehold</SelectItem>
            <SelectItem value="co-op">Co-op</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Floorplan Status</Label>
        <Select
          value={formData.floorplan_status || "available"}
          onValueChange={(value: "available" | "pending" | "unavailable") => 
            setFormData({ ...formData, floorplan_status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select floorplan status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};