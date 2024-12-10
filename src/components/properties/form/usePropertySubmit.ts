import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { FormData } from "../types";
import type { Property } from "@/types/property";

export const usePropertySubmit = (initialData?: Property) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFloorplan, setSelectedFloorplan] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image_url || null);
  const [floorplanPreview, setFloorplanPreview] = useState<string | null>(initialData?.floorplan_url || null);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Upload main image if selected
      let image_url = initialData?.image_url || "";
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
      let floorplan_url = initialData?.floorplan_url || "";
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

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        bedrooms: formData.bedrooms_min ? Number(formData.bedrooms_min) : null,
        bedrooms_min: formData.bedrooms_min || null,
        bedrooms_max: formData.bedrooms_max || null,
        bathrooms: formData.bathrooms_min ? Number(formData.bathrooms_min) : null,
        bathrooms_min: formData.bathrooms_min || null,
        bathrooms_max: formData.bathrooms_max || null,
        square_feet: formData.square_feet_min ? Number(formData.square_feet_min) : null,
        square_feet_min: formData.square_feet_min || null,
        square_feet_max: formData.square_feet_max || null,
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
        builder_id: formData.builder_id,
        deposit_structure: formData.deposit_structure,
        incentives: formData.incentives,
        amenities: formData.amenities,
        features_and_finishes: formData.features_and_finishes,
      };

      console.log("Submitting property data:", propertyData);

      if (initialData) {
        const { error: updateError } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", initialData.id);

        if (updateError) throw updateError;

        toast({
          title: "Success",
          description: "Property has been updated successfully.",
        });
      } else {
        const { error: insertError } = await supabase
          .from("properties")
          .insert(propertyData);

        if (insertError) throw insertError;

        toast({
          title: "Success",
          description: "Property has been uploaded successfully.",
        });
      }

      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return false;
    }
  };

  return {
    selectedFile,
    setSelectedFile,
    selectedFloorplan,
    setSelectedFloorplan,
    preview,
    setPreview,
    floorplanPreview,
    setFloorplanPreview,
    handleSubmit,
  };
};