import { useState, useEffect } from "react";
import { getMapLoader } from "@/utils/mapLoader";

export const useGoogleMaps = () => {
  const [googleMaps, setGoogleMaps] = useState<typeof google.maps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initGoogleMaps = async () => {
      try {
        console.log("Initializing Google Maps...");
        setIsLoading(true);
        setError(null);
        
        const google = await getMapLoader();
        setGoogleMaps(google.maps);
        setIsLoading(false);
        console.log("Google Maps initialized successfully");
      } catch (err) {
        console.error("Error initializing Google Maps:", err);
        setError('Failed to load Google Maps. Please try again later.');
        setIsLoading(false);
      }
    };

    initGoogleMaps();
  }, []);

  return { googleMaps, error, isLoading };
};