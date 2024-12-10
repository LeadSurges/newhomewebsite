import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, FileText } from "lucide-react";

export const PropertyUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    square_feet: "",
    featured: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFloorplan, setSelectedFloorplan] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [floorplanPreview, setFloorplanPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload main image if selected
      let image_url = "";
      if (selectedFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(`${Date.now()}-${selectedFile.name}`, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("property-images")
          .getPublicUrl(uploadData.path);

        image_url = publicUrl;
      }

      // Upload floorplan if selected
      let floorplan_url = "";
      if (selectedFloorplan) {
        const { data: floorplanData, error: floorplanError } = await supabase.storage
          .from("property-images")
          .upload(`floorplans/${Date.now()}-${selectedFloorplan.name}`, selectedFloorplan);

        if (floorplanError) throw floorplanError;

        const { data: { publicUrl } } = supabase.storage
          .from("property-images")
          .getPublicUrl(floorplanData.path);

        floorplan_url = publicUrl;
      }

      // Insert property data
      const { error: insertError } = await supabase
        .from("properties")
        .insert({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          location: formData.location,
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
          square_feet: formData.square_feet ? Number(formData.square_feet) : null,
          image_url,
          featured: formData.featured,
          floorplan_url,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Property has been uploaded successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        square_feet: "",
        featured: false,
      });
      setSelectedFile(null);
      setSelectedFloorplan(null);
      setPreview(null);
      setFloorplanPreview(null);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
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
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="square_feet">Square Feet</Label>
                <Input
                  id="square_feet"
                  type="number"
                  value={formData.square_feet}
                  onChange={(e) => setFormData({ ...formData, square_feet: e.target.value })}
                />
              </div>

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
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Property Images</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture" className="flex items-center gap-2">
                  <ImagePlus className="w-4 h-4" />
                  Choose Image
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFile(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {preview && (
                  <div className="mt-2">
                    <img src={preview} alt="Preview" className="max-w-sm rounded-lg border" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Floor Plans</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="floorplan" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Choose Floorplan
                </Label>
                <Input
                  id="floorplan"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFloorplan(e.target.files[0]);
                      setFloorplanPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {floorplanPreview && (
                  <div className="mt-2">
                    <img src={floorplanPreview} alt="Floorplan Preview" className="max-w-sm rounded-lg border" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Upload Property</Button>
    </form>
  );
};