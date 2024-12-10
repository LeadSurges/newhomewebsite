import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploadField } from "@/components/properties/FileUploadField";
import { ImagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const BuilderForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let logo_url = null;
      
      if (selectedLogo) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(`builders/${Date.now()}-${selectedLogo.name}`, selectedLogo);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("property-images")
          .getPublicUrl(uploadData.path);

        logo_url = publicUrl;
      }

      const { error } = await supabase
        .from("builders")
        .insert({
          name,
          description,
          logo_url,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Builder has been created successfully.",
      });

      // Reset form
      setName("");
      setDescription("");
      setSelectedLogo(null);
      setLogoPreview(null);

      // Invalidate builders query
      queryClient.invalidateQueries({ queryKey: ["builders"] });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Builder Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <FileUploadField
            id="logo"
            label="Builder Logo"
            icon={ImagePlus}
            preview={logoPreview}
            onChange={(file) => {
              setSelectedLogo(file);
              setLogoPreview(URL.createObjectURL(file));
            }}
          />

          <Button type="submit" className="w-full">
            Create Builder
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};