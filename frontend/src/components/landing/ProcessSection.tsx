import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Map, Car, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Open the App",
      description: "Launch GrabWise and enter your destination details"
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: "View Predictions",
      description: "Get AI-powered price predictions based on real-time data"
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "Book Your Ride",
      description: "Choose your preferred vehicle type and confirm booking"
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Enjoy Your Journey",
      description: "Track your ride and arrive safely at your destination"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with GrabWise in four simple steps
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-primary mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;