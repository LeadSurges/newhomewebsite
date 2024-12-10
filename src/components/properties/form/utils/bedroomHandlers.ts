import { FormData } from "../../types";

export const handleMinBedroomsChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMinBedroomsChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, bedrooms_min: "" });
    return;
  }
  
  const minBedrooms = Math.max(1, parseInt(value));
  const maxBedrooms = formData.bedrooms_max ? parseInt(formData.bedrooms_max) : null;
  
  setFormData({ 
    ...formData, 
    bedrooms_min: minBedrooms.toString(),
    bedrooms_max: maxBedrooms && maxBedrooms < minBedrooms 
      ? minBedrooms.toString() 
      : formData.bedrooms_max
  });
};

export const handleMaxBedroomsChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMaxBedroomsChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, bedrooms_max: "" });
    return;
  }
  
  const maxBedrooms = parseInt(value);
  const minBedrooms = formData.bedrooms_min ? parseInt(formData.bedrooms_min) : null;
  
  setFormData({ 
    ...formData, 
    bedrooms_max: maxBedrooms.toString(),
    bedrooms_min: minBedrooms && minBedrooms > maxBedrooms 
      ? maxBedrooms.toString() 
      : formData.bedrooms_min
  });
};