import { motion } from "framer-motion";

const IntegrationSection = () => {
  const integrations = [
    {
      name: "Weather API",
      logo: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?w=100&h=100&fit=crop",
      description: "Real-time weather data integration"
    },
    {
      name: "Maps Platform",
      logo: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&h=100&fit=crop",
      description: "Accurate location services"
    },
    {
      name: "Payment Gateway",
      logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop",
      description: "Secure payment processing"
    },
    {
      name: "Analytics Engine",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      description: "Advanced data analytics"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Integrations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seamlessly connected with industry-leading services
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={integration.logo}
                alt={integration.name}
                className="w-16 h-16 mx-auto mb-4 rounded-lg"
              />
              <h3 className="font-semibold mb-2">{integration.name}</h3>
              <p className="text-gray-600 text-sm">{integration.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;