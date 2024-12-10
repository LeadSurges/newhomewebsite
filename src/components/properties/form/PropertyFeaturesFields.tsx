import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "../types";

interface PropertyFeaturesFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PropertyFeaturesFields = ({ formData, setFormData }: PropertyFeaturesFieldsProps) => {
  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData({ ...formData, keywords });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          value={formData.keywords.join(', ')}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          placeholder="e.g. pool, garage, view"
        />
      </div>

      <div className="space-y-2">
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
  );
};