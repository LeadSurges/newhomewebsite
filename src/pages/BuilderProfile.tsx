import { Navigation } from "@/components/Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";
import { BuilderHeader } from "@/components/builders/BuilderHeader";
import { BuilderProperties } from "@/components/builders/BuilderProperties";
import { BuilderReviews } from "@/components/builders/BuilderReviews";
import type { Profile } from "@/types/profile";

type Builder = Database["public"]["Tables"]["builders"]["Row"];
type BuilderReview = Database["public"]["Tables"]["builder_reviews"]["Row"];

interface ReviewWithProfile extends BuilderReview {
  profile: Profile | null;
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

  const { data: builder } = useQuery<Builder>({
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
      
      console.log("Fetching builder reviews for builder:", id);
      
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("builder_reviews")
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq("builder_id", id);

      if (reviewsError) {
        console.error("Error fetching reviews:", reviewsError);
        throw reviewsError;
      }

      return reviewsData as ReviewWithProfile[];
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
        <BuilderHeader 
          builder={builder} 
          averageRating={averageRating} 
          reviewCount={reviews?.length || 0} 
        />
        <BuilderProperties 
          properties={properties} 
          builderName={builder.name} 
        />
        <BuilderReviews 
          builderId={builder.id} 
          reviews={reviews?.map(review => ({
            ...review,
            profiles: review.profile
          }))} 
        />
      </div>
    </div>
  );
};

export default BuilderProfile;