import { FormData } from "../../types";

export const handleMinSquareFeetChange = (value: string, formData: FormData, setFormData: (data: FormData) => void) => {
  console.log("handleMinSquareFeetChange - value:", value);
  
  if (value === "") {
    setFormData({ ...formData, square_feet_min: "" });
    return;
  }
  
  const minSqFt = parseInt(value);
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