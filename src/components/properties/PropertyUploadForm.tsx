import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const PropertyUploadForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const price = parseFloat(formData.get("price") as string);
      const location = formData.get("location") as string;
      const bedrooms = parseInt(formData.get("bedrooms") as string);
      const bathrooms = parseInt(formData.get("bathrooms") as string);
      const squareFeet = parseFloat(formData.get("squareFeet") as string);

      // Upload image if selected
      let imagePath = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;
        imagePath = filePath;
      }

      // Create property record
      const { data: property, error } = await supabase
        .from('properties')
        .insert({
          title,
          description,
          price,
          location,
          bedrooms,
          bathrooms,
          square_feet: squareFeet,
          image_url: imagePath
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property has been uploaded successfully.",
      });

      navigate(`/properties/${property.id}`);
    } catch (error) {
      console.error('Error uploading property:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload property. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="text"
          name="title"
          placeholder="Property Title"
          required
          className="w-full"
        />
      </div>

      <div>
        <Textarea
          name="description"
          placeholder="Property Description"
          required
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          name="price"
          placeholder="Price"
          required
          min="0"
          step="0.01"
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          required
          min="0"
        />
        <Input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          required
          min="0"
        />
        <Input
          type="number"
          name="squareFeet"
          placeholder="Square Feet"
          required
          min="0"
        />
      </div>

      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload Property"
        )}
      </Button>
    </form>
  );
};