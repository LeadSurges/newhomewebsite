import { MapPin, DollarSign, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyStats } from "./PropertyStats";
import { Link } from "react-router-dom";

interface PropertyMainInfoProps {
  title: string;
  location: string;
  price: number;
  price_range_min?: number;
  price_range_max?: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  created_at: string;
  builder?: {
    name: string;
    id: string;
  } | null;
  maintenance_fee_per_sqft?: number;
  parking_cost?: number;
  storage_cost?: number;
  deposit_structure?: any;
  incentives?: any;
}

export const PropertyMainInfo = ({
  title,
  location,
  price,
  price_range_min,
  price_range_max,
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
}: PropertyMainInfoProps) => {
  const formatPrice = (value?: number) => {
    return value ? `$${value.toLocaleString()}` : 'N/A';
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
          
          <div className="text-2xl font-bold text-primary">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 mr-1" />
              {price?.toLocaleString()}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <PropertyStats
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          square_feet={square_feet}
          created_at={created_at}
        />

        <Separator className="my-6" />

        {(maintenance_fee_per_sqft || parking_cost || storage_cost || price_range_min || price_range_max) && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(price_range_min || price_range_max) && (
                  <div>
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="font-medium">
                      {formatPrice(price_range_min)} - {formatPrice(price_range_max)}
                    </p>
                  </div>
                )}
                {maintenance_fee_per_sqft && (
                  <div>
                    <p className="text-sm text-muted-foreground">Maintenance Fee (per sq ft)</p>
                    <p className="font-medium">${maintenance_fee_per_sqft}</p>
                  </div>
                )}
                {parking_cost && (
                  <div>
                    <p className="text-sm text-muted-foreground">Parking Cost</p>
                    <p className="font-medium">${parking_cost.toLocaleString()}</p>
                  </div>
                )}
                {storage_cost && (
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Cost</p>
                    <p className="font-medium">${storage_cost.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {deposit_structure && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Deposit Structure</h2>
              <div className="space-y-2">
                {typeof deposit_structure === 'object' && Object.entries(deposit_structure).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {incentives && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Incentives</h2>
              <div className="space-y-2">
                {typeof incentives === 'object' && Object.entries(incentives).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
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