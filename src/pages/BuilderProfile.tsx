import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe } from "lucide-react";
import { BuilderReview } from "@/components/builders/BuilderReview";
import { BuilderProperties } from "@/components/builders/BuilderProperties";

const TYPE_LABELS = {
  builder: "Builder",
  realty: "Realty Company",
  marketing: "Marketing Company",
};

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
        <div className="flex items-start gap-8">
          {builder?.logo_url && (
            <img 
              src={builder.logo_url} 
              alt={builder.name} 
              className="w-32 h-32 object-contain rounded-lg bg-white p-2 border"
            />
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{builder?.name}</h1>
              <Badge variant="secondary">
                {TYPE_LABELS[builder?.type as keyof typeof TYPE_LABELS]}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {builder?.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {builder?.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{builder.address}</span>
                </div>
              )}
              
              {builder?.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{builder.phone}</span>
                </div>
              )}
              
              {builder?.website && (
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