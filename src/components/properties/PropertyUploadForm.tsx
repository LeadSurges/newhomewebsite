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