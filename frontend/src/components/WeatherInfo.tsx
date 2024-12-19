
import axios from "axios";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VITE_OPENWEATHER_API_KEY } from "./config";

interface WeatherInfoProps {
  lat: number;
  lng: number;
  locationType: "pickup" | "dropoff";
}



const WeatherInfo = ({ lat, lng, locationType }: WeatherInfoProps) => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchWeather = async () => {
        if (lat && lng) {
          setIsLoading(true);
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${VITE_OPENWEATHER_API_KEY}&units=metric`
            );
            setWeather(response.data);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          } finally {
            setIsLoading(false);
          }
        }
      };
  
      fetchWeather();
    }, [lat, lng]);

  if (!weather || isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 bg-white/90 backdrop-blur-sm">
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          {locationType === "pickup" ? "Pickup" : "Dropoff"} Weather
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            {weather.main.temp > 20 ? (
              <Sun className="h-4 w-4 text-yellow-500" />
            ) : (
              <Cloud className="h-4 w-4 text-gray-500" />
            )}
            <span className="text-sm">{Math.round(weather.main.temp)}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{weather.main.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-primary" />
            <span className="text-sm">{Math.round(weather.wind.speed)} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherInfo;