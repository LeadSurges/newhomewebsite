import { MapPin, DollarSign, Building2, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyStats } from "./PropertyStats";
import { Link } from "react-router-dom";
import { PropertyMainInfoProps } from "./types";
import { PropertyAmenities } from "./details/PropertyAmenities";
import { PropertyPricing } from "./details/PropertyPricing";

export const PropertyMainInfo = ({
  title,
  location,
  price,
  description,
  bedrooms,
  bathrooms,
  square_feet,
  created_at,
  builder,
  maintenance_fee_per_sqft,
  parking_cost,
  storage_cost,
  deposit_structure,
  incentives,
  bedrooms_min,
  bedrooms_max,
  bathrooms_min,
  bathrooms_max,
  square_feet_min,
  square_feet_max,
  home_type,
  amenities,
  features_and_finishes,
  price_range_min,
  price_range_max,
}: PropertyMainInfoProps) => {
  console.log("PropertyMainInfo - Range values:", {
    bedrooms_min,
    bedrooms_max,
    bathrooms_min,
    bathrooms_max,
    square_feet_min,
    square_feet_max
  });

  const formatJsonValue = (value: any): string => {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return '';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          
          {builder && (
            <div className="flex items-center text-primary">
              <Building2 className="h-5 w-5 mr-2" />
              <Link 
                to={`/builders/${builder.id}`}
                className="hover:underline font-medium"
              >
                {builder.name}
              </Link>
            </div>
          )}
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-5 w-5 mr-2" />
            {location}
          </div>

          {home_type && (
            <div className="flex items-center text-muted-foreground">
              <Home className="h-5 w-5 mr-2" />
              {home_type}
            </div>
          )}
          
          <div className="text-2xl font-bold text-primary">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 mr-1" />
              From ${price?.toLocaleString()}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <PropertyStats
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          square_feet={square_feet}
          created_at={created_at}
          bedrooms_min={bedrooms_min}
          bedrooms_max={bedrooms_max}
          bathrooms_min={bathrooms_min}
          bathrooms_max={bathrooms_max}
          square_feet_min={square_feet_min}
          square_feet_max={square_feet_max}
        />

        <Separator className="my-6" />

        {amenities && amenities.length > 0 && (
          <>
            <PropertyAmenities amenities={amenities} />
            <Separator className="my-6" />
          </>
        )}

        {features_and_finishes && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Features & Finishes</h2>
              <div className="p-4 rounded-lg border bg-card">
                <p className="whitespace-pre-wrap">{features_and_finishes}</p>
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        <PropertyPricing
          maintenance_fee_per_sqft={maintenance_fee_per_sqft}
          parking_cost={parking_cost}
          storage_cost={storage_cost}
          price_range_min={price_range_min}
          price_range_max={price_range_max}
        />

        {deposit_structure && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Deposit Structure</h2>
              <div className="p-4 rounded-lg border bg-card">
                <p className="whitespace-pre-wrap">{formatJsonValue(deposit_structure)}</p>
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {incentives && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Incentives</h2>
              <div className="p-4 rounded-lg border bg-card">
                <p className="whitespace-pre-wrap">{formatJsonValue(incentives)}</p>
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};