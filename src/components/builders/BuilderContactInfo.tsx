import { MapPin, Phone, Globe } from "lucide-react";
import type { Builder } from "@/types/builder";

interface BuilderContactInfoProps {
  builder: Builder | null;
}

export const BuilderContactInfo = ({ builder }: BuilderContactInfoProps) => {
  if (!builder) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {builder.address && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{builder.address}</span>
        </div>
      )}
      
      {builder.phone && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0" />
          <span>{builder.phone}</span>
        </div>
      )}
      
      {builder.website && (
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
          <a 
            href={builder.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
};