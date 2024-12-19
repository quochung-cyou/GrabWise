import { motion } from "framer-motion";
import { Users, Globe, Zap, BarChart3 } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Users className="w-8 h-8" />, value: "10M+", label: "Người Dùng" },
            { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Thành Phố" },
            { icon: <Zap className="w-8 h-8" />, value: "99%", label: "Độ Chính Xác" },
            { icon: <BarChart3 className="w-8 h-8" />, value: "24/7", label: "Hỗ Trợ" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-white shadow-lg"
            >
              <div className="text-primary mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;