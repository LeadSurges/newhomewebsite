import { MapPin, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyStats } from "./PropertyStats";
import { format } from "date-fns";

interface PropertyMainInfoProps {
  title: string;
  location: string;
  price: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  created_at: string;
}

export const PropertyMainInfo = ({
  title,
  location,
  price,
  description,
  bedrooms,
  bathrooms,
  square_feet,
  created_at,
}: PropertyMainInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          {location}
        </div>
        
        <div className="text-2xl font-bold text-primary mb-6">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 mr-1" />
            {price?.toLocaleString()}
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