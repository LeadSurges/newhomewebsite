import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const BuilderList = () => {
  const { toast } = useToast();
  
  const { data: builders, isLoading } = useQuery({
    queryKey: ["builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("builders")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Builder has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return <div>Loading builders...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Existing Builders</h2>
      {builders?.map((builder) => (
        <Card key={builder.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              {builder.logo_url && (
                <img
                  src={builder.logo_url}
                  alt={builder.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{builder.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {builder.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(builder.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};