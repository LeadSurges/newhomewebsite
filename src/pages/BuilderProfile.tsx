import { Navigation } from "@/components/Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { BuilderReview } from "@/components/builders/BuilderReview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";

type BuilderReview = Database["public"]["Tables"]["builder_reviews"]["Row"];

interface ReviewWithProfile extends BuilderReview {
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

const BuilderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Validate UUID format
  useEffect(() => {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (id && !UUID_REGEX.test(id)) {
      navigate("/");
    }
  }, [id, navigate]);

  const { data: builder } = useQuery({
    queryKey: ["builder", id],
    queryFn: async () => {
      if (!id) throw new Error("No builder ID provided");
      
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: properties } = useQuery({
    queryKey: ["builder-properties", id],
    queryFn: async () => {
      if (!id) throw new Error("No builder ID provided");
      
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("builder_id", id);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: reviews } = useQuery<ReviewWithProfile[]>({
    queryKey: ["builder-reviews", id],
    queryFn: async () => {
      if (!id) throw new Error("No builder ID provided");
      
      const { data, error } = await supabase
        .from("builder_reviews")
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .eq("builder_id", id);

      if (error) throw error;
      return data as ReviewWithProfile[];
    },
    enabled: !!id,
  });

  const averageRating = reviews?.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 5;

  if (!builder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Builder Header */}
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
                    ({reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Properties by {builder.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Reviews</h2>
          <div className="space-y-8">
            <BuilderReview builderId={builder.id} />
            
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div key={review.id} className="bg-secondary rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={`h-4 w-4 ${
                          value <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {review.profiles?.username || "Anonymous"}
                  </p>
                  {review.comment && (
                    <p className="text-muted-foreground">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderProfile;