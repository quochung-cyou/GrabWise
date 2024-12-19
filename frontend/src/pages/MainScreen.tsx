import { useState } from 'react';
import { motion } from 'framer-motion';
import Map from '@/components/Map';
import Header from '@/components/Header';
import LocationPanel from '@/components/LocationPanel';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

const Index = () => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  useToast();
  const [routeDistance, setRouteDistance] = useState<number | null>(null);

  const handleUpdateRouteDistance = (distance: number) => {
    console.log('got updated distance', distance);
    setRouteDistance(distance);
  }

  const handleLocationSelect = (location: Location, type: 'pickup' | 'dropoff') => {
    console.log('location', location);
    if (type === 'pickup') {
      setPickup(location);
    } else {
      setDropoff(location);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <motion.div 
          className="flex-1 h-[400px] md:h-auto relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Map
            pickup={pickup}
            dropoff={dropoff}
            onLocationSelect={handleLocationSelect}
            isCalculating={isCalculating}
            onUpdateRouteDistance={handleUpdateRouteDistance}
          />
        </motion.div>
        
        <motion.div 
          className="w-full md:w-96"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LocationPanel
            pickup={pickup}
            dropoff={dropoff}
            isCalculating={isCalculating}
            setIsCalculating={setIsCalculating}
            onLocationSelect={handleLocationSelect}
            routeDistance={routeDistance}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;