import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ImageOrderManagerProps {
  images: string[];
  onChange: (newOrder: string[]) => void;
}

export const ImageOrderManager = ({ images, onChange }: ImageOrderManagerProps) => {
  const [orderedImages, setOrderedImages] = useState<string[]>(images);

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedImages.length) return;
    
    const newOrder = [...orderedImages];
    const [movedImage] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedImage);
    
    setOrderedImages(newOrder);
    onChange(newOrder);
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
                disabled={index === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveImage(index, index + 1)}
                disabled={index === orderedImages.length - 1}
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