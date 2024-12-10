import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

let loader: Loader | null = null;
let loadPromise: Promise<typeof google> | null = null;

export const getMapLoader = async () => {
  try {
    // If we already have a load promise in progress, return it
    if (loadPromise) return loadPromise;

    console.log("Initializing Google Maps loader");
    const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
    
    if (secretError || !secret) {
      throw new Error("Failed to load Google Maps API key");
    }

    if (!loader) {
      loader = new Loader({
        apiKey: secret,
        version: "weekly",
        libraries: ["places", "geometry"]
      });
    }

    // Create and store the load promise
    loadPromise = loader.load();
    return loadPromise;
  } catch (error) {
    console.error("Error initializing map loader:", error);
    throw error;
  }
};