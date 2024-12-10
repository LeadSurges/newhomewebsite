import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required").transform(Number),
  location: z.string().min(1, "Location is required"),
  bedrooms: z.string().transform(Number).optional(),
  bathrooms: z.string().transform(Number).optional(),
  square_feet: z.string().transform(Number).optional(),
});

export const PropertyUploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      square_feet: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    try {
      setIsLoading(true);
      
      const imageInput = document.querySelector<HTMLInputElement>('#property-image');
      const imageFile = imageInput?.files?.[0];
      
      let image_url = null;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const response = await fetch('/functions/v1/upload-property-image', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        
        const { publicUrl } = await response.json();
        image_url = publicUrl;
      }
      
      const { data: property, error } = await supabase
        .from('properties')
        .insert([
          {
            ...values,
            image_url,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property has been uploaded successfully.",
      });

      navigate(`/properties/${property.id}`);
    } catch (error) {
      console.error('Error uploading property:', error);
      toast({
        title: "Error",
        description: "Failed to upload property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Luxury Villa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A beautiful property with amazing views..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Miami, FL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="square_feet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Feet</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel htmlFor="property-image">Property Image</FormLabel>
          <Input
            id="property-image"
            type="file"
            accept="image/*"
            className="mt-2"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Property"}
        </Button>
      </form>
    </Form>
  );
};