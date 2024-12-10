import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyHeroProps {
  imageUrl: string;
  title: string;
  featured: boolean;
}

export const PropertyHero = ({ imageUrl, title, featured }: PropertyHeroProps) => {
  // Split image URLs if multiple images exist
  const images = imageUrl ? imageUrl.split(',') : ['/placeholder.svg'];

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
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