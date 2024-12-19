import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, LayerProps } from "react-map-gl";
import type { Location } from "@/pages/MainScreen";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "sonner";
import { MAPBOX_TOKEN } from "./config";
import { MAP_STYLES, routeLayer } from "./map/constants";
import { MapStyleSelector } from "@/components/MapStyleSelector";
import { MapMarker } from "@/components/MapMarker";

interface MapViewProps {
  pickup: Location | null;
  dropoff: Location | null;
  onLocationSelect: (location: Location, type: "pickup" | "dropoff") => void;
  isCalculating: boolean;
  onUpdateRouteDistance: (distance: number) => void;
}

const VIETNAM_BOUNDS = {
  north: 23.393395,
  south: 8.559615,
  west: 102.148224,
  east: 109.469326,
};

const MapView = ({ pickup, dropoff, onLocationSelect, isCalculating, onUpdateRouteDistance }: MapViewProps) => {
  const mapRef = useRef(null);
  const [route, setRoute] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>("light");
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [locationDetails, setLocationDetails] = useState<{
    pickup: string | null;
    dropoff: string | null;
  }>({
    pickup: null,
    dropoff: null,
  });

  const handleClick = async (event: any) => {
    const { lngLat } = event;
    const location = {
      lng: lngLat.lng,
      lat: lngLat.lat,
    };

    // Check if location is within Vietnam bounds
    if (
      location.lat < VIETNAM_BOUNDS.south ||
      location.lat > VIETNAM_BOUNDS.north ||
      location.lng < VIETNAM_BOUNDS.west ||
      location.lng > VIETNAM_BOUNDS.east
    ) {
      toast.error("Please select a location within Vietnam");
      return;
    }

    if (!pickup) {
      onLocationSelect(location, "pickup");
      await fetchLocationDetails(location, "pickup");
    } else if (!dropoff) {
      onLocationSelect(location, "dropoff");
      await fetchLocationDetails(location, "dropoff");
    }
  };

  const fetchLocationDetails = async (
    location: Location,
    type: "pickup" | "dropoff"
  ) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${MAPBOX_TOKEN}&language=vi&country=vn`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setLocationDetails((prev) => ({
          ...prev,
          [type]: data.features[0].place_name,
        }));
        toast.success(
          `${type === "pickup" ? "Điểm đón" : "Điểm đến"}: ${
            data.features[0].place_name
          }`
        );
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      toast.error("Không thể lấy thông tin địa điểm");
    }
  };

  const clearLocation = (type: "pickup" | "dropoff") => {
    onLocationSelect(null, type);
    setLocationDetails((prev) => ({
      ...prev,
      [type]: null,
    }));
    setRoute(null);
    setRouteDistance(null);
    onUpdateRouteDistance(0);
  };

  const optimizeRoute = async (start: Location, end: Location) => {
    try {
      // Get multiple route alternatives
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&alternatives=true&overview=full&annotations=distance,duration&language=vi&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Find the optimal route based on distance and duration
        const optimalRoute = data.routes.reduce((best: any, current: any) => {
          const score = current.distance * 0.6 + current.duration * 0.4;
          const bestScore = best.distance * 0.6 + best.duration * 0.4;
          return score < bestScore ? current : best;
        });

        return optimalRoute;
      }
      return null;
    } catch (error) {
      console.error("Error optimizing route:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (pickup && dropoff) {
        try {
          const optimalRoute = await optimizeRoute(pickup, dropoff);
          
          if (optimalRoute) {
            setRoute({
              type: "Feature" as const,
              properties: {},
              geometry: optimalRoute.geometry,
            });

            // Calculate distance in kilometers with 3 decimal places
            const distance = turf.length(optimalRoute.geometry, {
              units: "kilometers",
            });
            const roundedDistance = Math.round(distance * 1000) / 1000;
            setRouteDistance(roundedDistance);
            toast.success(
              `Khoảng cách: ${roundedDistance} km`
            );
            onUpdateRouteDistance(roundedDistance);

            // Fit map to route bounds with padding
            if (mapRef.current) {
              const coordinates = optimalRoute.geometry.coordinates;
              const bounds = coordinates.reduce(
                (bounds: any, coord: number[]) => {
                  return bounds.extend(coord);
                },
                new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
              );
              
              (mapRef.current as any).fitBounds(bounds, {
                padding: 100,
                duration: 1000,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching route:", error);
          toast.error("Không thể tìm đường đi");
        }
      }
    };

    fetchRoute();
  }, [pickup, dropoff]);

  const routeLayer: LayerProps = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#0EA5E9",
      "line-width": 4,
      "line-opacity": 0.8,
    },
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px]"> 
      <div className="flex justify-between items-center p-2">
        <MapStyleSelector value={mapStyle} onChange={setMapStyle} />
        {routeDistance && (
          <div className="bg-white px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium">
              Distance: {routeDistance} km
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 relative rounded-lg shadow-lg overflow-hidden"> 
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: 105.7838807151931,
            latitude: 20.99044920459727,
            zoom: 15,
            pitch: 60
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={MAP_STYLES[mapStyle]}
          onClick={handleClick}
        >
          {pickup && (
            <MapMarker
              location={pickup}
              type="pickup"
              onClear={() => clearLocation("pickup")}
            />
          )}

          {dropoff && (
            <MapMarker
              location={dropoff}
              type="dropoff"
              onClear={() => clearLocation("dropoff")}
            />
          )}

          {route && (
            <Source type="geojson" data={route}>
              <Layer {...routeLayer} />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};

export default MapView;
