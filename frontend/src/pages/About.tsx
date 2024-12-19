import { motion } from "framer-motion";
import { Users, Globe, Heart, Trophy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "10M+", label: "Happy Riders" },
    { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Cities" },
    { icon: <Heart className="w-8 h-8" />, value: "99%", label: "Satisfaction Rate" },
    { icon: <Trophy className="w-8 h-8" />, value: "50+", label: "Awards" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl font-bold mb-4">About GrabWise</h1>
              <p className="text-xl text-white/90">
                Transforming urban mobility with technology and innovation since 2020.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To provide safe, reliable, and affordable transportation for everyone, everywhere.
                We believe in creating opportunities and connecting communities through innovative
                mobility solutions.
              </p>
              <p className="text-muted-foreground">
                Our commitment to excellence drives us to continuously improve and expand our services,
                making transportation accessible to all while reducing environmental impact.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;