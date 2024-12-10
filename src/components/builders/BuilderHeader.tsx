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
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-4">{builder.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {builder.description}
            </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};