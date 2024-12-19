import { MAPBOX_TOKEN } from '@/components/config';
import type { Location } from '@/pages/MainScreen';
export const getLocationDetails = async (location: Location): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }
    
    // If no location name is found, return a formatted string of coordinates
    return `${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E`;
  } catch (error) {
    console.error('Error fetching location details:', error);
    // Return formatted coordinates as fallback
    return `${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E`;
  }
};