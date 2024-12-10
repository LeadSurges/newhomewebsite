import { FormData } from "./types";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { PropertyTypeFields } from "./form/PropertyTypeFields";
import { PropertyDetailsFields } from "./form/PropertyDetailsFields";
import { PropertyFeaturesFields } from "./form/PropertyFeaturesFields";
import { AdditionalDetailsFields } from "./form/AdditionalDetailsFields";

interface PropertyFormFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PropertyFormFields = ({ formData, setFormData }: PropertyFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <BasicInfoFields formData={formData} setFormData={setFormData} />
        <PropertyTypeFields formData={formData} setFormData={setFormData} />
        <AdditionalDetailsFields formData={formData} setFormData={setFormData} />
      </div>
      <div className="space-y-4">
        <PropertyDetailsFields formData={formData} setFormData={setFormData} />
        <PropertyFeaturesFields formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};