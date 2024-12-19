import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface VehicleClassSelectorProps {
  selectedClass: string;
  onClassSelect: (value: string) => void;
}

const vehicles = [
  {
    id: "tietkiem",
    name: "GrabCar Lite",
    description: "Affordable and convenient",
    image: "/car1.png",
  },
  {
    id: "standard",
    name: "GrabCar Standard",
    description: "Affordable and convenient",
    image: "/car2.png",
  },
  {
    id: "standard7",
    name: "GrabCar 7",
    description: "Affordable and convenient",
    image: "/car3.png",
  },
];

const VehicleClassSelector = ({ selectedClass, onClassSelect }: VehicleClassSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Vehicle Class</h3>
      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <motion.button
            key={vehicle.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClassSelect(vehicle.id)}
            className={cn(
              "relative flex items-center gap-4 p-4 rounded-lg border transition-all duration-200",
              selectedClass === vehicle.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="relative w-16 h-10 rounded-md overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{vehicle.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{vehicle.description}</p>
            </div>
            {selectedClass === vehicle.id && (
              <div className="absolute right-2 top-2">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VehicleClassSelector;