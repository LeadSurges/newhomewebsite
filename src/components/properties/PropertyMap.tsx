import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader as LoadingSpinner } from "lucide-react";

interface PropertyMapProps {
  location: string;
  className?: string;
}

export const PropertyMap = ({ location, className = "" }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Initializing map for location:", location);
        
        const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
        if (secretError || !secret) {
          throw new Error("Failed to load Google Maps API key");
        }

        const loader = new Loader({
          apiKey: secret,
          version: "weekly",
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        if (!mapRef.current) return;

        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: location }, (results, status) => {
            if (status === "OK" && results) {
              resolve(results);
            } else {
              reject(new Error(`Failed to geocode location: ${status}`));
            }
          });
        });

        const map = new google.maps.Map(mapRef.current, {
          center: results[0].geometry.location,
          zoom: 15,
        });

        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });

      } catch (err) {
        console.error("Error initializing map:", err);
        setError('Failed to load the map. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (mapRef.current) {
      initMap();
    }
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
      <div className={`flex items-center justify-center bg-secondary/50 rounded-lg ${className}`} style={{ height: "300px" }}>
        <LoadingSpinner className="h-8 w-8 animate-spin text-primary" />
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