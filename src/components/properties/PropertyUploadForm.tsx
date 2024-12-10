import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, FileText } from "lucide-react";
import { PropertyFormFields } from "./PropertyFormFields";
import { FileUploadField } from "./FileUploadField";
import { usePropertySubmit } from "./form/usePropertySubmit";
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
    bedrooms_min: initialData?.bedrooms?.toString() || "",
    bedrooms_max: "", 
    bathrooms_min: initialData?.bathrooms?.toString() || "",
    bathrooms_max: "", 
    square_feet_min: initialData?.square_feet?.toString() || "",
    square_feet_max: "", 
    featured: initialData?.featured || false,
    builder_id: initialData?.builder_id || undefined,
    home_type: initialData?.home_type || null,
    construction_status: initialData?.construction_status || null,
    ownership_type: initialData?.ownership_type || null,
    quick_move_in: initialData?.quick_move_in || false,
    master_planned: initialData?.master_planned || false,
    garage_spaces: initialData?.garage_spaces?.toString() || null,
    completion_year: initialData?.completion_year?.toString() || null,
    keywords: initialData?.keywords || [],
    deposit_structure: initialData?.deposit_structure?.toString() || "",
    incentives: initialData?.incentives?.toString() || "",
  });

  const {
    selectedFile,
    setSelectedFile,
    selectedFloorplan,
    setSelectedFloorplan,
    preview,
    setPreview,
    floorplanPreview,
    setFloorplanPreview,
    handleSubmit,
  } = usePropertySubmit(initialData);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        home_type: null,
        construction_status: null,
        ownership_type: null,
        quick_move_in: false,
        master_planned: false,
        garage_spaces: null,
        completion_year: null,
        keywords: [],
        deposit_structure: "",
        incentives: "",
      });
      setSelectedFile(null);
      setSelectedFloorplan(null);
      setPreview(null);
      setFloorplanPreview(null);
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

      <Button type="submit" className="w-full">
        {initialData ? "Update Property" : "Upload Property"}
      </Button>
    </form>
  );
};