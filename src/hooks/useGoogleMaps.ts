import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';

export const useGoogleMaps = () => {
  const [googleMaps, setGoogleMaps] = useState<typeof google.maps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initGoogleMaps = async () => {
      try {
        console.log('Initializing Google Maps...');
        const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
        
        if (secretError || !secret) {
          throw new Error('Failed to get Maps API key');
        }

        const loader = new Loader({
          apiKey: secret,
          version: 'weekly',
        });

        const google = await loader.load();
        if (isMounted) {
          console.log('Google Maps loaded successfully');
          setGoogleMaps(google.maps);
          setError(null);
        }
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
        if (isMounted) {
          setError('Failed to load Google Maps');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initGoogleMaps();

    return () => {
      isMounted = false;
    };
  }, []);

  return { googleMaps, error, isLoading };
};