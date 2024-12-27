import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  imageOrder?: string[];
}

export const ImageGallery = ({ images, title, imageOrder }: ImageGalleryProps) => {
  // Use imageOrder if provided, otherwise use original images array
  const orderedImages = imageOrder?.length ? 
    // Filter out any ordered images that don't exist in the images array
    imageOrder.filter(orderedUrl => images.includes(orderedUrl)).concat(
      // Add any images that aren't in the order
      images.filter(url => !imageOrder.includes(url))
    ) : 
    images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % orderedImages.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + orderedImages.length) % orderedImages.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-[500px] rounded-xl overflow-hidden cursor-pointer" onClick={() => setShowFullscreen(true)}>
        <img
          src={orderedImages[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {orderedImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {orderedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {orderedImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0">
          <div className="relative w-full h-full">
            <img
              src={orderedImages[currentIndex]}
              alt={`${title} - Fullscreen ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-white/80 hover:bg-white"
              onClick={() => setShowFullscreen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            {orderedImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};