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

export const handleMinSquareFeetChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMinSquareFeetChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, square_feet_min: "" });
    return;
  }
  
  const minSqFt = Math.max(500, parseInt(value));
  const maxSqFt = formData.square_feet_max ? parseInt(formData.square_feet_max) : null;
  
  setFormData({ 
    ...formData, 
    square_feet_min: minSqFt.toString(),
    square_feet_max: maxSqFt && maxSqFt < minSqFt 
      ? minSqFt.toString() 
      : formData.square_feet_max
  });
};

export const handleMaxSquareFeetChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMaxSquareFeetChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, square_feet_max: "" });
    return;
  }
  
  const maxSqFt = parseInt(value);
  const minSqFt = formData.square_feet_min ? parseInt(formData.square_feet_min) : null;
  
  setFormData({ 
    ...formData, 
    square_feet_max: maxSqFt.toString(),
    square_feet_min: minSqFt && minSqFt > maxSqFt 
      ? maxSqFt.toString() 
      : formData.square_feet_min
  });
};