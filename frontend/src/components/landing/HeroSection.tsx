import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12"
      >
        <div className="flex-1 text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Intelligent Ride Price Prediction
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Applying artificial intelligence to predict ride prices based on weather conditions and time factors
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/predict')}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/how-it-works')}
            >
              Learn More
            </Button>
          </div>
        </div>
        <motion.div 
          className="flex-1 perspective-1000"
          initial={{ opacity: 0, rotateY: -20 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="https://vir.com.vn/stores/news_dataimages/2024/022024/29/16/ab589a6404da7d90f932e8f6e384bbba.jpg?rt=20240229163239" 
            alt="Hero" 
            className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;