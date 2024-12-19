import { DollarSign, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface PriceDisplayProps {
  fare: number | null;
  distance: number | null;
}

const formatPrice = (price: number): string => {
  // Round to whole number and format with comma separators
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PriceDisplay = ({ fare, distance }: PriceDisplayProps) => {
  if (!fare || !distance) return null;

  // Round distance to 1 decimal place
  const roundedDistance = Math.round(distance * 10) / 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="font-medium">Estimated Fare</span>
        </div>
        <span className="text-lg font-bold">{formatPrice(fare)} VND</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Estimated Distance</span>
        </div>
        <span className="text-lg font-bold">{roundedDistance} km</span>
      </div>
    </motion.div>
  );
};

export default PriceDisplay;