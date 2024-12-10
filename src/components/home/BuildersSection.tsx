import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const BuildersSection = () => {
  const { data: builders } = useQuery({
    queryKey: ["builders-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .eq("type", "builder")
        .limit(4);

      if (error) throw error;
      return data;
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {builders?.map((builder) => (
            <Link
              key={builder.id}
              to={`/builders/${builder.id}`}
              className="group p-6 bg-card rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={builder.logo_url || "/placeholder.svg"}
                  alt={builder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-accent">
                {builder.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};