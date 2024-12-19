import { Marker } from "react-map-gl";
import { MapPin, X } from "lucide-react";
import type { Location } from "@/pages/MainScreen";
interface MapMarkerProps {
  location: Location;
  type: "pickup" | "dropoff";
  onClear: () => void;
}
export const MapMarker = ({ location, type, onClear }: MapMarkerProps) => (
  <Marker longitude={location.lng} latitude={location.lat}>
    <div className="relative">
      <MapPin 
        className={`h-6 w-6 ${
          type === "pickup" ? "text-primary" : "text-destructive"
        } animate-bounce`} 
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  </Marker>
);