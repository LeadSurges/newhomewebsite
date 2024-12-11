import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatters";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { PropertyStats } from "./card/PropertyStats";
import { BuilderInfo } from "./card/BuilderInfo";
import { FavoriteButton } from "./card/FavoriteButton";

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
      name: string;
      id: string;
    } | null;
    bedrooms_min?: string;
    bedrooms_max?: string;
    bathrooms_min?: string;
    bathrooms_max?: string;
    square_feet_min?: string;
    square_feet_max?: string;
  };
  size?: "default" | "small";
}

export const PropertyCard = ({ property, size = "default" }: PropertyCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      await removeFavorite(property.id);
    } else {
      await addFavorite(property.id);
    }
  };

  const formatRange = (value?: number | string, min?: string, max?: string) => {
    if (min && max) {
      return `${min} - ${max}`;
    }
    if (min) {
      return `${min}+`;
    }
    if (max) {
      return `Up to ${max}`;
    }
    if (value) {
      return value.toString();
    }
    return null;
  };

  const formatSquareFeet = (value?: string) => {
    if (!value) return null;
    return parseInt(value).toLocaleString();
  };

  const bedroomsDisplay = formatRange(property.bedrooms, property.bedrooms_min, property.bedrooms_max);
  const bathroomsDisplay = formatRange(property.bathrooms, property.bathrooms_min, property.bathrooms_max);
  const squareFeetDisplay = formatRange(
    property.square_feet?.toString(),
    property.square_feet_min ? formatSquareFeet(property.square_feet_min) : undefined,
    property.square_feet_max ? formatSquareFeet(property.square_feet_max) : undefined
  );

  return (
    <Link to={`/properties/details/${property.id}`} className="block">
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
            <FavoriteButton
              isFavorite={favorite}
              onClick={handleFavoriteClick}
            />
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
            <PropertyStats
              bedroomsDisplay={bedroomsDisplay}
              bathroomsDisplay={bathroomsDisplay}
              squareFeetDisplay={squareFeetDisplay}
            />
            <BuilderInfo builder={property.builders} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};