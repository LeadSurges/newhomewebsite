import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PropertyUploadForm } from "@/components/properties/PropertyUploadForm";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Property = Database['public']['Tables']['properties']['Row'];

export default function AdminProperties() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(name)")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }

      return data as Property[];
    },
  });

  if (!user) {
    navigate("/signin");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Properties</h1>
        <Button onClick={() => navigate("/admin/properties/new")}>
          Add New Property
        </Button>
      </div>

      <div className="grid gap-4">
        {properties?.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-sm font-medium">
                ${property.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProperty(property)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Property</DialogTitle>
                  </DialogHeader>
                  {editingProperty && (
                    <PropertyUploadForm initialData={editingProperty} />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}