import { MapPin } from 'lucide-react';
import WeatherInfo from '../WeatherInfo';
import type { Location } from '@/pages/Index';
interface WeatherDisplayProps {
  location: Location | null;
  type: 'pickup' | 'dropoff';
}
const WeatherDisplay = ({ location, type }: WeatherDisplayProps) => {
  const bgColor = type === 'pickup' ? 'bg-primary/5' : 'bg-destructive/5';
  const textColor = type === 'pickup' ? 'text-primary' : 'text-destructive';
  const title = type === 'pickup' ? 'Pickup Location' : 'Dropoff Location';
  return (
    <div className={`flex items-center space-x-3 ${bgColor} p-3 rounded-lg`}>
      <MapPin className={`h-5 w-5 ${textColor}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          {location ? location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Not set'}
        </p>
      </div>
      {location && (
        <div className="w-48">
          <WeatherInfo lat={location.lat} lng={location.lng} locationType={type} />
        </div>
      )}
    </div>
  );
};
export default WeatherDisplay;