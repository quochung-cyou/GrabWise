import { motion } from "framer-motion";
import { Globe, ChartBar, Rocket } from "lucide-react";

const TechnologySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powered by Advanced Technology</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge AI and machine learning to deliver accurate predictions
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
          >
            <Globe className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Real-time Data Processing</h3>
            <p className="text-gray-600">
              Process millions of data points in real-time to provide accurate predictions
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8"
          >
            <ChartBar className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
            <p className="text-gray-600">
              Deep learning models analyze patterns to predict optimal pricing
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 p-8"
          >
            <Rocket className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Smart Algorithms</h3>
            <p className="text-gray-600">
              Continuously learning and improving prediction accuracy
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;