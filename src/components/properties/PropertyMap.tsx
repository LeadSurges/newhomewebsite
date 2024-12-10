import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

interface PropertyMapProps {
  location: string;
  className?: string;
}

export const PropertyMap = ({ location, className = "" }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        console.log("Initializing map for location:", location);
        
        const { data: { secret } } = await supabase.functions.invoke('get-maps-key');
        if (!secret) {
          console.error("No Google Maps API key found");
          return;
        }

        const loader = new Loader({
          apiKey: secret,
          version: "weekly",
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK" && results && results[0] && mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
              center: results[0].geometry.location,
              zoom: 15,
            });

            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          } else {
            console.error("Geocoding failed:", status);
          }
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, [location]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-[300px] rounded-lg ${className}`}
    />
  );
};