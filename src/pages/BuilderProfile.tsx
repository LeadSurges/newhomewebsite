import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BuilderProfile = () => {
  const { id } = useParams();

  const { data: builder, isLoading } = useQuery({
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4">{builder.name}</h1>
        <img src={builder.logo_url || "/placeholder.svg"} alt={builder.name} className="w-full h-auto mb-4" />
        <p className="text-lg text-muted-foreground">{builder.description}</p>
      </div>
      <Footer />
    </div>
  );
};

export default BuilderProfile;
