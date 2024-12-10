import { FormData } from "../types";
import { BedroomFields } from "./sections/BedroomFields";
import { BathroomFields } from "./sections/BathroomFields";
import { SquareFootageFields } from "./sections/SquareFootageFields";
import { AdditionalFields } from "./sections/AdditionalFields";

interface PropertyDetailsFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PropertyDetailsFields = ({ formData, setFormData }: PropertyDetailsFieldsProps) => {
  console.log("PropertyDetailsFields - Current form data:", formData);

  return (
    <div className="space-y-4">
      <BedroomFields formData={formData} setFormData={setFormData} />
      <BathroomFields formData={formData} setFormData={setFormData} />
      <SquareFootageFields formData={formData} setFormData={setFormData} />
      <AdditionalFields formData={formData} setFormData={setFormData} />
    </div>
  );
};