import { Heart, MapPin, Bed, Bath, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number | null;
    bathrooms: number | null;
    square_feet: number | null;
    featured: boolean;
    image_url: string | null;
    builders?: { name: string } | null;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Split image_url into array if multiple images
  const images = property.image_url ? property.image_url.split(',') : ['/placeholder.svg'];

  // Check if property is favorited
  const { data: isFavorited } = useQuery({
    queryKey: ["favorite", property.id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("favorites")
        .select()
        .eq("property_id", property.id)
        .eq("user_id", user.id)
        .single();
      return !!data;
    },
    enabled: !!user,
  });

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to favorite properties",
      });
      return;
    }

    try {
      if (isFavorited) {
        await supabase
          .from("favorites")
          .delete()
          .eq("property_id", property.id)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("favorites")
          .insert([{ property_id: property.id, user_id: user.id }]);
      }

      toast({
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        description: `${property.title} has been ${
          isFavorited ? "removed from" : "added to"
        } your favorites.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating favorites",
        description: error.message,
      });
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="property-card rounded-lg group"
    >
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="property-image rounded-t-lg w-full h-[300px] object-cover"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
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
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              FEATURED
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
          onClick={toggleFavorite}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
          {property.title}
        </h3>
        {property.builders?.name && (
          <p className="text-sm text-muted-foreground mb-2">
            Built by {property.builders.name}
          </p>
        )}
        <p className="text-lg font-bold text-primary mb-4">
          ${property.price.toLocaleString()}
        </p>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {property.location}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          {property.bedrooms && (
            <span className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} baths
            </span>
          )}
          {property.square_feet && (
            <span>{property.square_feet.toLocaleString()} SqFt</span>
          )}
        </div>
      </div>
    </Link>
  );
};