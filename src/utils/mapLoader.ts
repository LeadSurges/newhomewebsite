import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

let loader: Loader | null = null;

export const getMapLoader = async () => {
  try {
    if (loader) return loader;

    console.log("Initializing Google Maps loader");
    const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
    
    if (secretError || !secret) {
      throw new Error("Failed to load Google Maps API key");
    }

    loader = new Loader({
      apiKey: secret,
      version: "weekly",
    });

    return loader;
  } catch (error) {
    console.error("Error initializing map loader:", error);
    throw error;
  }
};