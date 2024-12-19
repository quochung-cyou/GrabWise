import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MapPin, Loader2, Navigation } from "lucide-react";
import type { Location } from "@/pages/MainScreen";
import { VITE_OPENWEATHER_API_KEY } from "./config";
import { toast } from "sonner";
import VehicleClassSelector from "./VehicleClassSelector";
import { useAuth } from "@/contexts/AuthContext";
import { createBooking } from "@/services/bookingService";
import { useNavigate } from "react-router-dom";
import LocationSearch from "./location/LocationSearch";
import { getLocationDetails } from "@/services/locationService";
import { predictPrice } from "@/services/priceService";
import axios from "axios";
import WeatherDisplay from "./booking/WeatherDisplay";
import PriceDisplay from "./booking/PriceDisplay";

interface LocationPanelProps {
  pickup: Location | null;
  dropoff: Location | null;
  isCalculating: boolean;
  setIsCalculating: (value: boolean) => void;
  onLocationSelect: (location: Location, type: "pickup" | "dropoff") => void;
  routeDistance: number | null;
}

const LocationPanel = ({
  pickup,
  dropoff,
  isCalculating,
  setIsCalculating,
  onLocationSelect,
  routeDistance,
}: LocationPanelProps) => {
  const [fare, setFare] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState("standard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"pickup" | "dropoff">("pickup");
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "got rerendered, data prop " + pickup + dropoff + routeDistance
    );
  }, [pickup, dropoff, routeDistance]);

  const fetchWeatherData = async (lat: number, lng: number) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${VITE_OPENWEATHER_API_KEY}&units=metric`
    );
    return {
      temp: response.data.main.temp,
      clouds: response.data.clouds.all,
      pressure: response.data.main.pressure,
      rain: response.data.rain?.["1h"] || 0,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    };
  };

  const calculatePrice = async (distance: number) => {
    if (!pickup || !dropoff) return;

    try {
      setIsCalculating(true);
      const [pickupWeather, dropoffWeather] = await Promise.all([
        fetchWeatherData(pickup.lat, pickup.lng),
        fetchWeatherData(dropoff.lat, dropoff.lng),
      ]);
      
      let predictedPrice = await predictPrice(
        distance,
        pickupWeather,
        dropoffWeather
      );
      if (selectedClass === "tietkiem") {
        predictedPrice *= 1;
      } else if (selectedClass === "standard") {
        predictedPrice *= 1.07;
      } else if (selectedClass === "standard7") {
        predictedPrice *= 1.34;
      }
      //set round to 2 decimal places
      predictedPrice = Math.round(predictedPrice * 100) / 100;
      setFare(predictedPrice);
      console.log("predicted price", predictedPrice);
    } catch (error) {
      console.error("Error calculating price:", error);
      toast.error("Failed to calculate price");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please sign in to book a ride");
      return;
    }

    if (!pickup || !dropoff || !fare || !duration) {
      toast.error("Please fill in all required information");
      return;
    }

    setIsBooking(true);
    try {
      const pickupAddress = await getLocationDetails(pickup);
      const dropoffAddress = await getLocationDetails(dropoff);

      const pickupWithAddress = { ...pickup, address: pickupAddress };
      const dropoffWithAddress = { ...dropoff, address: dropoffAddress };

      await createBooking(
        user.uid,
        pickupWithAddress,
        dropoffWithAddress,
        fare,
        duration,
        selectedClass
      );
      toast.success("Booking created successfully!");
      navigate("/booking-history");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking");
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    if (pickup && dropoff) {
      setIsCalculating(true);
      console.log("pickup", pickup);
      console.log("dropoff", dropoff);
      console.log("routeDistance", routeDistance);
      const distance = routeDistance || 0;
      console.log("distance", distance);
      calculatePrice(distance);
    }
  }, [pickup, dropoff, selectedClass, routeDistance]);

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Book your ride</h2>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant={searchType === "pickup" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType("pickup")}
              className="flex-1"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Pickup
            </Button>
            <Button
              variant={searchType === "dropoff" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType("dropoff")}
              className="flex-1"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Dropoff
            </Button>
          </div>

          <LocationSearch
            searchType={searchType}
            onLocationSelect={onLocationSelect}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      <div className="space-y-4">
        <WeatherDisplay location={pickup} type="pickup" />
        <WeatherDisplay location={dropoff} type="dropoff" />
        <VehicleClassSelector
          selectedClass={selectedClass}
          onClassSelect={setSelectedClass}
        />
      </div>

      {isCalculating ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        fare !== null &&
        routeDistance !== null && (
          <PriceDisplay fare={fare} distance={routeDistance} />
        )
      )}

      <Button
        className="w-full"
        disabled={!pickup || !dropoff || isCalculating || isBooking}
        onClick={handleBooking}
      >
        {isBooking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Booking...
          </>
        ) : (
          "Book Now"
        )}
      </Button>
    </Card>
  );
};

export default LocationPanel;
