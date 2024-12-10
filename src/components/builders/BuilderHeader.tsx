import { Star } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Builder = Database["public"]["Tables"]["builders"]["Row"];

interface BuilderHeaderProps {
  builder: Builder;
  averageRating: number;
  reviewCount: number;
}

export const BuilderHeader = ({ builder, averageRating, reviewCount }: BuilderHeaderProps) => {
  return (
    <div className="bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6">
          {builder.logo_url && (
            <img
              src={builder.logo_url}
              alt={builder.name}
              className="w-24 h-24 object-contain rounded-lg bg-white p-2"
            />
          )}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{builder.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-5 w-5 ${
                      value <= averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>

            {(builder.address || builder.phone || builder.website) && (
              <div className="space-y-2 text-muted-foreground">
                {builder.address && <p>{builder.address}</p>}
                {builder.phone && <p>{builder.phone}</p>}
                {builder.website && (
                  <a 
                    href={builder.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {builder.website}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};