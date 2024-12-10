import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatters";
import { Heart, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms?: number;
    bathrooms?: number;
    square_feet?: number;
    image_url?: string;
    builders?: {
      id: string;
      name: string;
    } | null;
  };
  size?: "default" | "small";
}

export const PropertyCard = ({ property, size = "default" }: PropertyCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    if (favorite) {
      await removeFavorite(property.id);
    } else {
      await addFavorite(property.id);
    }
  };

  return (
    <Link to={`/properties/${property.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className={cn(
          "relative overflow-hidden",
          size === "small" ? "aspect-[4/3]" : "aspect-[16/9]"
        )}>
          <img
            src={property.image_url || "/placeholder.svg"}
            alt={property.title}
            className="object-cover w-full h-full"
          />
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  favorite ? "fill-red-500 text-red-500" : "text-gray-500"
                )}
              />
            </Button>
          )}
        </div>
        <CardContent className={cn(
          "p-4",
          size === "small" ? "space-y-1" : "space-y-2"
        )}>
          <div className="space-y-2">
            <h3 className={cn(
              "font-semibold line-clamp-1",
              size === "small" ? "text-base" : "text-lg"
            )}>{property.title}</h3>
            <p className={cn(
              "font-bold text-primary",
              size === "small" ? "text-lg" : "text-xl"
            )}>
              {formatPrice(property.price)}
            </p>
            <p className="text-muted-foreground text-sm">{property.location}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.bedrooms && (
                <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
              )}
              {property.bathrooms && (
                <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
              )}
              {property.square_feet && (
                <span>{property.square_feet} sq ft</span>
              )}
            </div>
            {property.builders && (
              <Link 
                to={`/builders/${property.builders.id}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Building2 className="h-4 w-4" />
                <span>Built by {property.builders.name}</span>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};