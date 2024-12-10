import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

interface PropertyMapProps {
  location: string;
  className?: string;
}

export const PropertyMap = ({ location, className = "" }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { googleMaps, error: mapsError, isLoading: isMapsLoading } = useGoogleMaps();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!googleMaps || !mapRef.current || !location) {
      return;
    }

    const initializeMap = async () => {
      try {
        console.log('Initializing map with location:', location);
        setIsLoading(true);
        setError(null);

        // Default to Toronto if geocoding fails
        const defaultLocation = new googleMaps.LatLng(43.6532, -79.3832);

        // Create map instance
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new googleMaps.Map(mapRef.current, {
            center: defaultLocation,
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
        }

        // Geocode the location
        const geocoder = new googleMaps.Geocoder();
        const fullLocation = location.toLowerCase().includes('ontario') 
          ? location 
          : `${location}, Ontario, Canada`;

        console.log('Geocoding location:', fullLocation);
        
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: fullLocation }, (results, status) => {
            if (status === "OK" && results) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        const coordinates = results[0].geometry.location;
        console.log('Successfully geocoded to coordinates:', coordinates.toString());

        // Update map center
        mapInstanceRef.current.setCenter(coordinates);

        // Clear existing marker
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Add new marker
        markerRef.current = new googleMaps.Marker({
          map: mapInstanceRef.current,
          position: coordinates,
          animation: googleMaps.Animation.DROP,
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load the map location');
        setIsLoading(false);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [googleMaps, location]);

  if (mapsError || error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertDescription>{mapsError || error}</AlertDescription>
      </Alert>
    );
  }

  if (isMapsLoading || isLoading) {
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