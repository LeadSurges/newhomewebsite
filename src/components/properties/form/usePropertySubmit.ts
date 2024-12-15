import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { FormData } from "../types";
import type { Property } from "@/types/property";

const VALID_CONSTRUCTION_STATUSES = ["preconstruction", "under_construction", "complete"] as const;
type ConstructionStatus = typeof VALID_CONSTRUCTION_STATUSES[number];

export const usePropertySubmit = (initialData?: Property) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFloorplan, setSelectedFloorplan] = useState<File | null>(null);
  const [previews, setPreviews] = useState<string[]>(initialData?.image_url ? initialData.image_url.split(',') : []);
  const [floorplanPreview, setFloorplanPreview] = useState<string | null>(initialData?.floorplan_url || null);
  const { toast } = useToast();

  const validateConstructionStatus = (status: string): ConstructionStatus => {
    if (VALID_CONSTRUCTION_STATUSES.includes(status as ConstructionStatus)) {
      return status as ConstructionStatus;
    }
    console.warn(`Invalid construction status: ${status}, defaulting to "preconstruction"`);
    return "preconstruction";
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      console.log("Starting property submission with data:", formData);
      
      // Upload main images if selected
      let image_urls: string[] = initialData?.image_url ? initialData.image_url.split(',') : [];
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("property-images")
            .upload(`${Date.now()}-${file.name}`, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("property-images")
            .getPublicUrl(uploadData.path);

          return publicUrl;
        });

        const newUrls = await Promise.all(uploadPromises);
        image_urls = newUrls;
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

      // Validate and ensure construction_status is one of the allowed values
      const construction_status = validateConstructionStatus(formData.construction_status);

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
        image_url: image_urls.join(','),
        featured: formData.featured,
        floorplan_url,
        home_type: formData.home_type || null,
        construction_status,
        ownership_type: formData.ownership_type || null,
        quick_move_in: formData.quick_move_in,
        master_planned: formData.master_planned,
        garage_spaces: formData.garage_spaces ? Number(formData.garage_spaces) : null,
        completion_year: formData.completion_year ? Number(formData.completion_year) : null,
        keywords: formData.keywords,
        builder_id: formData.builder_id,
        deposit_structure: formData.deposit_structure,
        incentives: formData.incentives,
        amenities: formData.amenities,
        features_and_finishes: formData.features_and_finishes,
      };

      console.log("Final property data being submitted:", propertyData);

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
      console.error("Error submitting property:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return false;
    }
  };

  return {
    selectedFiles,
    setSelectedFiles,
    selectedFloorplan,
    setSelectedFloorplan,
    previews,
    setPreviews,
    floorplanPreview,
    setFloorplanPreview,
    handleSubmit,
  };
};