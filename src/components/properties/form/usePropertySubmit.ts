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
      console.log("Current image order:", imageOrder);
      
      // Get existing image URLs if updating
      let image_urls: string[] = initialData?.image_url ? initialData.image_url.split(',') : [];
      
      // Upload main images if selected
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
        // For updates, combine existing and new URLs
        image_urls = initialData ? [...image_urls, ...newUrls] : newUrls;
        console.log("Updated image URLs:", image_urls);
      }

      // Upload floorplans if selected
      let floorplan_urls: string[] = initialData?.floorplan_url ? initialData.floorplan_url.split(',') : [];
      if (selectedFloorplans.length > 0) {
        const uploadPromises = selectedFloorplans.map(async (file) => {
          const { data: floorplanData, error: floorplanError } = await supabase.storage
            .from("property-images")
            .upload(`floorplans/${Date.now()}-${file.name}`, file);

          if (floorplanError) throw floorplanError;

          const { data: { publicUrl } } = supabase.storage
            .from("property-images")
            .getPublicUrl(floorplanData.path);

          return publicUrl;
        });

        const newUrls = await Promise.all(uploadPromises);
        floorplan_urls = newUrls;
      }

      // Process image order
      let finalImageOrder = [...imageOrder];
      
      // Remove any URLs that no longer exist in image_urls
      finalImageOrder = finalImageOrder.filter(url => image_urls.includes(url));
      
      // Add any new images that aren't in the order
      image_urls.forEach(url => {
        if (!finalImageOrder.includes(url)) {
          finalImageOrder.push(url);
        }
      });

      console.log("Final image order:", finalImageOrder);

      const propertyData = {
        ...formData,
        image_url: image_urls.join(','),
        floorplan_url: floorplan_urls.join(','),
        image_order: finalImageOrder,
        price: parseFloat(formData.price),
        completion_year: formData.completion_year ? parseInt(formData.completion_year) : null,
        garage_spaces: formData.garage_spaces ? parseInt(formData.garage_spaces) : null
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