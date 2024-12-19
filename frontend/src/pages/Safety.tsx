import { motion } from "framer-motion";
import { Shield, Users, Bell, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Driver Verification",
      description: "All drivers undergo thorough background checks and vehicle inspections."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Share Your Trip",
      description: "Share your trip details with trusted contacts in real-time."
    },
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: "24/7 Support",
      description: "Our support team is always available to assist you."
    },
    {
      icon: <Phone className="w-8 h-8 text-primary" />,
      title: "Emergency Assistance",
      description: "Quick access to emergency services within the app."
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
          <h1 className="text-4xl font-bold mb-4">Your Safety is Our Priority</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've implemented comprehensive safety measures to ensure every ride is secure and comfortable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {safetyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Safety;