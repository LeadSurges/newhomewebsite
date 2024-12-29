import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PropertyImage } from "./card/PropertyImage";
import { PropertyTitle } from "./card/PropertyTitle";
import { PropertyStats } from "./card/PropertyStats";
import { PriceDisplay } from "./card/PriceDisplay";
import { BuilderInfo } from "./card/BuilderInfo";
import { generatePropertyUrl } from "@/utils/formatters";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  size?: "default" | "small";
  className?: string;
}

export const PropertyCard = ({
  property,
  size = "default",
  className = "",
}: PropertyCardProps) => {
  const propertyUrl = generatePropertyUrl(property.id, property.title);
  const mainImage = property.image_url?.split(',')[0] || '/placeholder.svg';

  return (
    <Card className={`group overflow-hidden ${className}`}>
      <PropertyImage 
        id={property.id}
        imageUrl={mainImage}
        title={property.title} 
        featured={property.featured}
      />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={propertyUrl} className="block flex-grow">
            <PropertyTitle 
              title={property.title} 
              location={property.location}
              size={size} 
            />
          </Link>
        </div>

        <PriceDisplay price={property.price} size={size} />
        
        <PropertyStats
          bedroomsDisplay={property.bedrooms?.toString()}
          bathroomsDisplay={property.bathrooms?.toString()}
          squareFeetDisplay={property.square_feet?.toString()}
        />

        {property.builders && <BuilderInfo builder={property.builders} />}
      </div>
    </Card>
  );
};