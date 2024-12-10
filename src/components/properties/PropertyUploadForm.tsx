import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const PropertyUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    square_feet: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if selected
      let image_url = "";
      if (selectedFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(`${Date.now()}-${selectedFile.name}`, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("property-images")
          .getPublicUrl(uploadData.path);

        image_url = publicUrl;
      }

      // Insert property data
      const { error: insertError } = await supabase
        .from("properties")
        .insert({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          location: formData.location,
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
          square_feet: formData.square_feet ? Number(formData.square_feet) : null,
          image_url,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Property has been uploaded successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        square_feet: "",
      });
      setSelectedFile(null);
      setPreview(null);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="input"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        className="input"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
        className="input"
      />
      <input
        type="number"
        placeholder="Bedrooms"
        value={formData.bedrooms}
        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={formData.bathrooms}
        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Square Feet"
        value={formData.square_feet}
        onChange={(e) => setFormData({ ...formData, square_feet: e.target.value })}
        className="input"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setSelectedFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      {preview && <img src={preview} alt="Preview" className="preview" />}
      <button type="submit" className="btn">Upload Property</button>
    </form>
  );
};