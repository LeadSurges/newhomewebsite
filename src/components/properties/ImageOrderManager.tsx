import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageOrderManagerProps {
  images: string[];
  onChange: (newOrder: string[]) => void;
  propertyId?: string;
}

export const ImageOrderManager = ({ images, onChange, propertyId }: ImageOrderManagerProps) => {
  const [orderedImages, setOrderedImages] = useState<string[]>(images);
  const [isSaving, setIsSaving] = useState(false);

  // Load initial image order from database
  useEffect(() => {
    const loadImageOrder = async () => {
      if (!propertyId) return;

      const { data, error } = await supabase
        .from('properties')
        .select('image_order, image_url')
        .eq('id', propertyId)
        .single();

      if (error) {
        console.error("Error loading image order:", error);
        return;
      }

      // If there's a saved order, use it
      if (data?.image_order?.length) {
        console.log("Using saved image order:", data.image_order);
        setOrderedImages(data.image_order);
        onChange(data.image_order);
      } else if (data?.image_url) {
        // If no saved order but we have images, create initial order
        const initialImages = data.image_url.split(',');
        console.log("Creating initial image order:", initialImages);
        setOrderedImages(initialImages);
        onChange(initialImages);
        // Save this initial order
        await saveImageOrder(initialImages);
      }
    };

    loadImageOrder();
  }, [propertyId]);

  const saveImageOrder = async (newOrder: string[]) => {
    if (!propertyId) return;
    
    setIsSaving(true);
    console.log("Saving new image order:", newOrder);
    
    const { error } = await supabase
      .from('properties')
      .update({ image_order: newOrder })
      .eq('id', propertyId);

    if (error) {
      console.error("Error saving image order:", error);
      toast.error("Failed to save image order");
      return false;
    }
    
    console.log("Image order saved successfully");
    toast.success("Image order saved");
    setIsSaving(false);
    return true;
  };

  const moveImage = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedImages.length || isSaving) return;
    
    const newOrder = [...orderedImages];
    const [movedImage] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedImage);
    
    // Update local state immediately for responsive UI
    setOrderedImages(newOrder);
    
    // Attempt to save to database
    const success = await saveImageOrder(newOrder);
    
    if (success) {
      // If save was successful, update parent
      onChange(newOrder);
    } else {
      // If save failed, revert to previous order
      setOrderedImages(orderedImages);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Image Order</h3>
      <div className="grid gap-4">
        {orderedImages.map((image, index) => (
          <div key={index} className="flex items-center gap-4 p-2 border rounded-lg">
            <img
              src={image}
              alt={`Property image ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveImage(index, index - 1)}
                disabled={index === 0 || isSaving}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveImage(index, index + 1)}
                disabled={index === orderedImages.length - 1 || isSaving}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};