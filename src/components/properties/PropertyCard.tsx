import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatters";

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
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={property.image_url || "/placeholder.svg"}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
            <p className="text-xl font-bold text-primary">
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};