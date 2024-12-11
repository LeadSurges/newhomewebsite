import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PropertyImage } from "./card/PropertyImage";
import { PropertyTitle } from "./card/PropertyTitle";
import { PropertyStats } from "./card/PropertyStats";
import { PriceDisplay } from "./card/PriceDisplay";
import { BuilderInfo } from "./card/BuilderInfo";
import { FavoriteButton } from "./card/FavoriteButton";
import { generatePropertyUrl } from "@/utils/formatters";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  image_url?: string;
  featured?: boolean;
  builder?: {
    id: string;
    name: string;
  };
  className?: string;
}

export const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  square_feet,
  image_url,
  featured,
  builder,
  className = "",
}: PropertyCardProps) => {
  const propertyUrl = generatePropertyUrl(id, title);

  return (
    <Card className={`group overflow-hidden ${className}`}>
      <Link to={propertyUrl} className="block">
        <PropertyImage imageUrl={image_url} title={title} featured={featured} />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={propertyUrl} className="block flex-grow">
            <PropertyTitle title={title} location={location} />
          </Link>
          <FavoriteButton propertyId={id} />
        </div>

        <PriceDisplay price={price} />
        
        <PropertyStats
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          square_feet={square_feet}
        />

        {builder && <BuilderInfo builder={builder} />}
      </div>
    </Card>
  );
};