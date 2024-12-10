import { Heart, MapPin, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: string;
    location: string;
    bedrooms: string;
    bathrooms: number;
    sqft: string;
    developer: string;
    status: string;
    featured: boolean;
    virtualTour: boolean;
    image: string;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="property-card rounded-lg group"
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="property-image rounded-t-lg w-full h-[300px] object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.virtualTour && (
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
              VIRTUAL TOUR
            </span>
          )}
          {property.status && (
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.status}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
        {property.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              FEATURED
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
          {property.title}
        </h3>
        <p className="text-lg font-bold text-primary mb-4">{property.price}</p>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {property.location}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{property.developer}</p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.bedrooms} beds
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.bathrooms} baths
          </span>
          <span>{property.sqft} SqFt</span>
        </div>
      </div>
    </Link>
  );
};