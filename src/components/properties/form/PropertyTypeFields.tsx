import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "../types";

interface PropertyTypeFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

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
            <SelectItem value="Detached">Detached</SelectItem>
            <SelectItem value="Semi-Detached">Semi-Detached</SelectItem>
            <SelectItem value="Townhouse">Townhouse</SelectItem>
            <SelectItem value="Condo">Condo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Construction Status</Label>
        <Select
          value={formData.construction_status}
          onValueChange={(value: "preconstruction" | "under_construction" | "complete") => {
            console.log("Setting construction status to:", value);
            setFormData({ ...formData, construction_status: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select construction status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="preconstruction">Pre-construction</SelectItem>
            <SelectItem value="under_construction">Under Construction</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
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
            <SelectItem value="Freehold">Freehold</SelectItem>
            <SelectItem value="Condominium">Condominium</SelectItem>
            <SelectItem value="Leasehold">Leasehold</SelectItem>
            <SelectItem value="Co-op">Co-op</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Floorplan Status</Label>
        <Select
          value={formData.floorplan_status || "For Sale"}
          onValueChange={(value) => setFormData({ ...formData, floorplan_status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select floorplan status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="For Sale">For Sale</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};