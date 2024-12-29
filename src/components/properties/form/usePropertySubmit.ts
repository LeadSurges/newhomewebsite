import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { FormData } from "../types";
import type { Property } from "@/types/property";

export const usePropertySubmit = (initialData?: Property) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFloorplans, setSelectedFloorplans] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialData?.image_url ? initialData.image_url.split(',') : []);
  const [floorplanPreviews, setFloorplanPreviews] = useState<string[]>(initialData?.floorplan_url ? initialData.floorplan_url.split(',') : []);
  const [imageOrder, setImageOrder] = useState<string[]>(initialData?.image_order || initialData?.image_url?.split(',') || []);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      console.log("Starting property submission with data:", formData);
      
      // Convert string values to numbers where needed
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        completion_year: formData.completion_year ? parseInt(formData.completion_year) : null,
        garage_spaces: formData.garage_spaces ? parseInt(formData.garage_spaces) : null,
        maintenance_fee_per_sqft: formData.maintenance_fee_per_sqft ? parseFloat(formData.maintenance_fee_per_sqft) : null,
        parking_cost: formData.parking_cost ? parseFloat(formData.parking_cost) : null,
        storage_cost: formData.storage_cost ? parseFloat(formData.storage_cost) : null,
        price_range_min: formData.price_range_min ? parseFloat(formData.price_range_min) : null,
        price_range_max: formData.price_range_max ? parseFloat(formData.price_range_max) : null,
        image_url: previews.join(','),
        floorplan_url: floorplanPreviews.join(','),
        image_order: imageOrder
      };

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
    selectedFloorplans,
    setSelectedFloorplans,
    previews,
    setPreviews,
    floorplanPreviews,
    setFloorplanPreviews,
    imageOrder,
    setImageOrder,
    handleSubmit,
  };
};
