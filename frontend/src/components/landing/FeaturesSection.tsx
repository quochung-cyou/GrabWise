import { motion } from "framer-motion";
import { Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Intelligent Prediction",
      description: "Using AI to accurately predict ride prices based on multiple factors",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
      route: "/predict"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Ensuring information safety and user data security",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      route: "/about"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "In-Depth Analysis",
      description: "Providing detailed reports and price trend analysis",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop",
      route: "/analytics"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-2xl mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Button 
                variant="outline" 
                onClick={() => navigate(feature.route)}
                className="group-hover:bg-primary group-hover:text-white transition-colors"
              >
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;