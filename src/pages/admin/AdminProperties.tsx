import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PropertyUploadForm } from "@/components/properties/PropertyUploadForm";
import { BulkUploadForm } from "@/components/properties/BulkUploadForm";
import { MarkdownUploadForm } from "@/components/properties/MarkdownUploadForm";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";

type Property = Database['public']['Tables']['properties']['Row'];

const AdminProperties = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      console.log("Fetching properties for admin view");
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching properties:", error);
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }

      console.log("Fetched properties:", data);
      return data as Property[];
    },
  });

  const handleDeleteProperty = async () => {
    if (!deletingProperty) return;

    try {
      console.log("Deleting property:", deletingProperty.id);
      
      // First delete any associated files from storage if they exist
      if (deletingProperty.image_url) {
        const imageUrls = deletingProperty.image_url.split(',');
        for (const url of imageUrls) {
          const filePath = url.split('/').pop();
          if (filePath) {
            const { error: storageError } = await supabase.storage
              .from('property-images')
              .remove([filePath]);
            
            if (storageError) {
              console.error("Error deleting image:", storageError);
            }
          }
        }
      }

      // Then delete the property record
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", deletingProperty.id);

      if (error) {
        console.error("Error deleting property:", error);
        throw error;
      }

      // Invalidate the properties query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });

      toast({
        title: "Success",
        description: "Property has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting property:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setDeletingProperty(null);
    }
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-secondary pt-24">
      <Helmet>
        <title>Admin Properties | LuxuryHomes</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Properties</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/upload-property")}>
              Add New Property
            </Button>
          </div>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="markdown-upload">Markdown Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="grid gap-4">
              {properties?.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 flex justify-between items-center bg-background"
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

                    <Button
                      variant="destructive"
                      onClick={() => setDeletingProperty(property)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadForm />
          </TabsContent>

          <TabsContent value="markdown-upload">
            <MarkdownUploadForm />
          </TabsContent>
        </Tabs>

        <AlertDialog open={!!deletingProperty} onOpenChange={(open) => !open && setDeletingProperty(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the property
                and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProperty}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default AdminProperties;