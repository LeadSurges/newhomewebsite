import { FormData } from "../../types";

export const handleMinBathroomsChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMinBathroomsChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, bathrooms_min: "" });
    return;
  }
  
  const minBathrooms = Math.max(1, parseFloat(value));
  const maxBathrooms = formData.bathrooms_max ? parseFloat(formData.bathrooms_max) : null;
  
  setFormData({ 
    ...formData, 
    bathrooms_min: minBathrooms.toString(),
    bathrooms_max: maxBathrooms && maxBathrooms < minBathrooms 
      ? minBathrooms.toString() 
      : formData.bathrooms_max
  });
};

export const handleMaxBathroomsChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMaxBathroomsChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, bathrooms_max: "" });
    return;
  }
  
  const maxBathrooms = parseFloat(value);
  const minBathrooms = formData.bathrooms_min ? parseFloat(formData.bathrooms_min) : null;
  
  setFormData({ 
    ...formData, 
    bathrooms_max: maxBathrooms.toString(),
    bathrooms_min: minBathrooms && minBathrooms > maxBathrooms 
      ? maxBathrooms.toString() 
      : formData.bathrooms_min
  });
};