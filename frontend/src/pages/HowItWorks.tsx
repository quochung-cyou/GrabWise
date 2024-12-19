import { motion } from "framer-motion";
import { Car, Shield, Clock, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      title: "Book Your Ride",
      description: "Open the app and enter your destination. Choose your preferred ride type and confirm your pickup location."
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Get Matched",
      description: "We'll connect you with the nearest available driver in seconds."
    },
    {
      icon: <Car className="w-12 h-12 text-primary" />,
      title: "Track Your Journey",
      description: "Watch your driver arrive in real-time and track your entire journey."
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Arrive Safely",
      description: "Reach your destination safely and rate your experience."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">How GrabWise Works</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting from A to B has never been easier. Follow these simple steps to start your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;