import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, FileText } from "lucide-react";
import { PropertyFormFields } from "./PropertyFormFields";
import { FileUploadField } from "./FileUploadField";
import { usePropertySubmit } from "./form/usePropertySubmit";
import { ImageOrderManager } from "./ImageOrderManager";
import type { FormData } from "./types";
import type { Property } from "@/types/property";

interface PropertyUploadFormProps {
  initialData?: Property;
}

export const PropertyUploadForm = ({ initialData }: PropertyUploadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    location: initialData?.location || "",
    bedrooms_min: initialData?.bedrooms_min?.toString() || "",
    bedrooms_max: initialData?.bedrooms_max?.toString() || "", 
    bathrooms_min: initialData?.bathrooms_min?.toString() || "",
    bathrooms_max: initialData?.bathrooms_max?.toString() || "", 
    square_feet_min: initialData?.square_feet_min?.toString() || "",
    square_feet_max: initialData?.square_feet_max?.toString() || "", 
    featured: initialData?.featured || false,
    builder_id: initialData?.builder_id || undefined,
    home_type: initialData?.home_type || [],
    construction_status: (initialData?.construction_status as "preconstruction" | "under_construction" | "complete") || "preconstruction",
    ownership_type: initialData?.ownership_type || "",
    quick_move_in: initialData?.quick_move_in || false,
    master_planned: initialData?.master_planned || false,
    garage_spaces: initialData?.garage_spaces?.toString() || "",
    completion_year: initialData?.completion_year?.toString() || "",
    keywords: initialData?.keywords || [],
    deposit_structure: initialData?.deposit_structure?.toString() || "",
    incentives: initialData?.incentives?.toString() || "",
    amenities: initialData?.amenities || [],
    features_and_finishes: initialData?.features_and_finishes || "",
    floorplan_status: initialData?.floorplan_status || "For Sale",
  });

  const {
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
  } = usePropertySubmit(initialData);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    const success = await handleSubmit(formData);
    
    if (success && !initialData) {
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
        home_type: [],
        construction_status: "preconstruction",
        ownership_type: "",
        quick_move_in: false,
        master_planned: false,
        garage_spaces: "",
        completion_year: "",
        keywords: [],
        deposit_structure: "",
        incentives: "",
        amenities: [],
        features_and_finishes: "",
        floorplan_status: "For Sale",
      });
      setSelectedFiles([]);
      setSelectedFloorplans([]);
      setPreviews([]);
      setFloorplanPreviews([]);
      setImageOrder([]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <PropertyFormFields formData={formData} setFormData={setFormData} />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField
              id="picture"
              label="Property Images"
              icon={ImagePlus}
              preview={previews}
              multiple={true}
              onChange={(files) => {
                const fileArray = Array.from(files);
                setSelectedFiles(fileArray);
                const newPreviews = fileArray.map(file => URL.createObjectURL(file));
                setPreviews(prevPreviews => {
                  const updatedPreviews = [...prevPreviews, ...newPreviews];
                  // Maintain existing order and append new images
                  const updatedOrder = [...imageOrder];
                  newPreviews.forEach(preview => {
                    if (!updatedOrder.includes(preview)) {
                      updatedOrder.push(preview);
                    }
                  });
                  setImageOrder(updatedOrder);
                  return updatedPreviews;
                });
              }}
            />

            <FileUploadField
              id="floorplan"
              label="Floor Plans"
              icon={FileText}
              preview={floorplanPreviews}
              multiple={true}
              onChange={(files) => {
                const fileArray = Array.from(files);
                setSelectedFloorplans(fileArray);
                const newPreviews = fileArray.map(file => URL.createObjectURL(file));
                setFloorplanPreviews(newPreviews);
              }}
            />
          </div>

          {previews.length > 0 && (
            <div className="mt-6">
              <ImageOrderManager
                images={previews}
                onChange={setImageOrder}
                propertyId={initialData?.id}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        {initialData ? "Update Property" : "Upload Property"}
      </Button>
    </form>
  );
};