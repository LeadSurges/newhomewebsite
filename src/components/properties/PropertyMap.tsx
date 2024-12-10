import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader";

interface PropertyMapProps {
  location: string;
  className?: string;
}

export const PropertyMap = ({ location, className = "" }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let map: google.maps.Map | null = null;
    let marker: google.maps.Marker | null = null;

    const initMap = async () => {
      if (!mapRef.current || !location) {
        console.error("Map reference or location not available");
        setError("Unable to load map");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Initializing map for location:", location);
        setIsLoading(true);
        setError(null);

        // Get API key from Supabase function
        const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
        
        if (secretError || !secret) {
          console.error("Failed to get Maps API key:", secretError);
          setError("Failed to load map configuration");
          setIsLoading(false);
          return;
        }

        // Initialize Google Maps
        const loader = new GoogleMapsLoader({
          apiKey: secret,
          version: "weekly",
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();
        
        // Add ", Ontario, Canada" to the location if it's not already specified
        const fullLocation = location.toLowerCase().includes('ontario') 
          ? location 
          : `${location}, Ontario, Canada`;

        console.log("Geocoding location:", fullLocation);
        
        const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: fullLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        const coordinates = geocodeResult[0].geometry.location;
        console.log("Successfully geocoded location:", coordinates.toString());

        // Create map
        map = new google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add marker
        marker = new google.maps.Marker({
          map,
          position: coordinates,
          animation: google.maps.Animation.DROP,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("Failed to load the map. Please try again later.");
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (map) {
        // @ts-ignore - type definition issue with Google Maps
        map = null;
      }
    };
  }, [location]);

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-secondary/50 rounded-lg ${className}`}>
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`w-full h-[300px] rounded-lg ${className}`}
    />
  );
};