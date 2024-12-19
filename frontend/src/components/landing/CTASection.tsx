import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Using Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Discover the Power of AI in Car Price Prediction
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/predict')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Try For Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;