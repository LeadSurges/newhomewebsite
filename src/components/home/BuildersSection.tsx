import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const BuildersSection = () => {
  const { data: builders } = useQuery({
    queryKey: ["builders-home"],
    queryFn: async () => {
      const { data: buildersData, error: buildersError } = await supabase
        .from("builders")
        .select("*")
        .eq("type", "builder")
        .limit(6);

      if (buildersError) throw buildersError;

      // Fetch average ratings for each builder
      const buildersWithRatings = await Promise.all(
        buildersData.map(async (builder) => {
          const { data: reviews } = await supabase
            .from("builder_reviews")
            .select("rating")
            .eq("builder_id", builder.id);

          // Default to 5 stars if no reviews
          const averageRating = reviews?.length
            ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            : 5;

          return {
            ...builder,
            averageRating: Math.round(averageRating * 2) / 2,
            reviewCount: reviews?.length || 0,
          };
        })
      );

      return buildersWithRatings;
    },
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Builders</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Top new construction builders
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {builders?.map((builder) => (
            <Link
              key={builder.id}
              to={`/builders/${builder.id}`}
              className="group p-4 bg-card rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square mb-3 overflow-hidden rounded-lg flex items-center justify-center bg-secondary">
                <img
                  src={builder.logo_url || "/placeholder.svg"}
                  alt={builder.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="text-sm font-semibold group-hover:text-accent truncate">
                {builder.name}
              </h3>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= builder.averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({builder.reviewCount})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};