import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

let loader: Loader | null = null;
let loadPromise: Promise<typeof google> | null = null;

export const getMapLoader = async () => {
  try {
    // Return existing promise if already loading
    if (loadPromise) {
      console.log("Returning existing Maps loader promise");
      return loadPromise;
    }

    console.log("Initializing new Google Maps loader");
    const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
    
    if (secretError || !secret) {
      console.error("Failed to get Maps API key:", secretError);
      throw new Error("Failed to load Google Maps API key");
    }

    if (!loader) {
      loader = new Loader({
        apiKey: secret,
        version: "weekly",
        libraries: ["places", "geometry"],
      });
    }

    // Create new load promise
    loadPromise = loader.load().then(google => {
      console.log("Google Maps loaded successfully");
      return google;
    }).catch(error => {
      console.error("Error loading Google Maps:", error);
      loadPromise = null; // Reset promise on error
      throw error;
    });

    return loadPromise;
  } catch (error) {
    console.error("Error in getMapLoader:", error);
    loadPromise = null; // Reset promise on error
    throw error;
  }
};