import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "./ImageGallery";

interface PropertyHeroProps {
  imageUrl: string;
  title: string;
  featured: boolean;
  imageOrder?: string[];
}

export const PropertyHero = ({ imageUrl, title, featured, imageOrder }: PropertyHeroProps) => {
  // Split image URLs if multiple images exist
  const images = imageUrl ? imageUrl.split(',') : ['/placeholder.svg'];
  
  // Use imageOrder if available, otherwise use the original image order
  const orderedImages = imageOrder?.length ? imageOrder : images;

  return (
    <div className="relative">
      <ImageGallery 
        images={images} 
        title={title} 
        imageOrder={orderedImages}
      />
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="default" className="bg-primary hover:bg-primary">
            FEATURED
          </Badge>
        </div>
      )}
    </div>
  );
};