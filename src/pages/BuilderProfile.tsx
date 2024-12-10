import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BuilderReview } from "@/components/builders/BuilderReview";
import { BuilderProperties } from "@/components/builders/BuilderProperties";
import { BuilderHeader } from "@/components/builders/BuilderHeader";
import { BuilderContactInfo } from "@/components/builders/BuilderContactInfo";

const BuilderProfile = () => {
  const { id } = useParams();

  const { data: builder, isLoading: builderLoading } = useQuery({
    queryKey: ["builder", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: properties, isLoading: propertiesLoading } = useQuery({
    queryKey: ["builder-properties", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          builders (
            name,
            id
          )
        `)
        .eq("builder_id", id);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (builderLoading || propertiesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BuilderHeader builder={builder} />
        <BuilderContactInfo builder={builder} />

        {properties && properties.length > 0 && (
          <BuilderProperties 
            properties={properties} 
            builderName={builder?.name || ""}
          />
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
          <BuilderReview builderId={builder?.id || ""} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuilderProfile;