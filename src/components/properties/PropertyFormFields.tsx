import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { BuilderSelect } from "@/components/builders/BuilderSelect";
import { FormData } from "./types";

interface PropertyFormFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PropertyFormFields = ({ formData, setFormData }: PropertyFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <BuilderSelect
          value={formData.builder_id || ""}
          onChange={(value) => setFormData({ ...formData, builder_id: value })}
        />
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-4 block">Bedrooms ({formData.bedrooms})</Label>
          <Slider
            id="bedrooms"
            min={1}
            max={10}
            step={1}
            value={[Number(formData.bedrooms) || 1]}
            onValueChange={(value) => setFormData({ ...formData, bedrooms: value[0].toString() })}
            className="my-4"
          />
        </div>

        <div>
          <Label className="mb-4 block">Bathrooms ({formData.bathrooms})</Label>
          <Slider
            id="bathrooms"
            min={1}
            max={7}
            step={0.5}
            value={[Number(formData.bathrooms) || 1]}
            onValueChange={(value) => setFormData({ ...formData, bathrooms: value[0].toString() })}
            className="my-4"
          />
        </div>

        <div>
          <Label className="mb-4 block">Square Feet ({formData.square_feet})</Label>
          <Slider
            id="square_feet"
            min={500}
            max={20000}
            step={100}
            value={[Number(formData.square_feet) || 500]}
            onValueChange={(value) => setFormData({ ...formData, square_feet: value[0].toString() })}
            className="my-4"
          />
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, featured: checked as boolean })
            }
          />
          <Label htmlFor="featured">Featured Property</Label>
        </div>
      </div>
    </div>
  );
};