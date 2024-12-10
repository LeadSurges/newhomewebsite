import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, FileText } from "lucide-react";
import { PropertyFormFields } from "./PropertyFormFields";
import { FileUploadField } from "./FileUploadField";
import type { FormData } from "./types";

export const PropertyUploadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms_min: "",
    bedrooms_max: "",
    bathrooms_min: "",
    bathrooms_max: "",
    square_feet_min: "",
    square_feet_max: "",
    featured: false,
    home_type: null,
    construction_status: null,
    ownership_type: null,
    quick_move_in: false,
    master_planned: false,
    garage_spaces: null,
    completion_year: null,
    keywords: [],
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
          bedrooms: Number(formData.bedrooms_min),
          bedrooms_max: Number(formData.bedrooms_max),
          bathrooms: Number(formData.bathrooms_min),
          bathrooms_max: Number(formData.bathrooms_max),
          square_feet: Number(formData.square_feet_min),
          square_feet_max: Number(formData.square_feet_max),
          image_url,
          featured: formData.featured,
          floorplan_url,
          home_type: formData.home_type,
          construction_status: formData.construction_status,
          ownership_type: formData.ownership_type,
          quick_move_in: formData.quick_move_in,
          master_planned: formData.master_planned,
          garage_spaces: formData.garage_spaces === "4+" ? 4 : Number(formData.garage_spaces),
          completion_year: formData.completion_year ? Number(formData.completion_year) : null,
          keywords: formData.keywords,
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
        bedrooms_min: "",
        bedrooms_max: "",
        bathrooms_min: "",
        bathrooms_max: "",
        square_feet_min: "",
        square_feet_max: "",
        featured: false,
        home_type: null,
        construction_status: null,
        ownership_type: null,
        quick_move_in: false,
        master_planned: false,
        garage_spaces: null,
        completion_year: null,
        keywords: [],
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
          <PropertyFormFields formData={formData} setFormData={setFormData} />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField
              id="picture"
              label="Property Images"
              icon={ImagePlus}
              preview={preview}
              onChange={(file) => {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            <FileUploadField
              id="floorplan"
              label="Floor Plans"
              icon={FileText}
              preview={floorplanPreview}
              onChange={(file) => {
                setSelectedFloorplan(file);
                setFloorplanPreview(URL.createObjectURL(file));
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Upload Property</Button>
    </form>
  );
};