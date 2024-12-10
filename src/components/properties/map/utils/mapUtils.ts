export const geocodeLocation = async (
  geocoder: google.maps.Geocoder,
  address: string
): Promise<google.maps.LatLng | null> => {
  try {
    console.log(`Attempting to geocode address: ${address}`);
    const response = await geocoder.geocode({ address });
    
    if (response.results && response.results.length > 0) {
      const { location } = response.results[0].geometry;
      console.log(`Successfully geocoded ${address} to:`, location.toString());
      return location;
    }
    
    console.error(`No results found for address: ${address}`);
    return null;
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
};

export const fitMapToBounds = (
  map: google.maps.Map,
  markers: google.maps.Marker[]
) => {
  if (markers.length === 0) return;

  const bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => {
    const position = marker.getPosition();
    if (position) {
      bounds.extend(position);
    }
  });

  map.fitBounds(bounds);

  // Add some padding
  const listener = google.maps.event.addListener(map, 'idle', () => {
    if (map.getZoom() > 16) {
      map.setZoom(16);
    }
    google.maps.event.removeListener(listener);
  });
};