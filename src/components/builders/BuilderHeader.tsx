import { Star, MapPin, Phone, Globe } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Builder = Database["public"]["Tables"]["builders"]["Row"];

interface BuilderHeaderProps {
  builder: Builder;
  averageRating: number;
  reviewCount: number;
}

export const BuilderHeader = ({ builder, averageRating, reviewCount }: BuilderHeaderProps) => {
  const displayRating = reviewCount === 0 ? 5 : averageRating;

  return (
    <div className="bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start gap-6">
          {builder.logo_url && (
            <img
              src={builder.logo_url}
              alt={builder.name}
              className="w-16 h-16 object-contain rounded-lg bg-white p-2"
            />
          )}
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-3xl font-bold mb-2">{builder.name}</h1>
              <p className="text-muted-foreground">{builder.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-5 w-5 ${
                      value <= displayRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};