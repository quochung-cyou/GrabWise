import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

const DemoSection = () => {
  const navigate = useNavigate();

  const demoSlides = [
    {
      title: "Intuitive Interface",
      image: "https://i.ibb.co/W50wcWV/image.png",
      description: "Easy to use with modern design",
      link: "/predict"
    },
    {
      title: "Interactive Map",
      image: "https://i.ibb.co/9n2F3PL/image-1.png",
      description: "View locations and routes in real-time",
      link: "/predict"
    },
    {
      title: "Data Analytics",
      image: "https://i.ibb.co/Wc210SZ/Capture.png",
      description: "Detailed charts and statistics",
      link: "/analytics"
    }
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">App Demo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our intuitive and user-friendly interface
          </p>
        </motion.div>
        <Carousel 
          className="max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
          autoPlay={true}
          interval={5000}
        >
          <CarouselContent>
            {demoSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-none p-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                    />
                    <h3 className="text-2xl font-bold mt-4">{slide.title}</h3>
                    <p className="text-gray-600">{slide.description}</p>
                    <Button 
                      className="mt-4"
                      onClick={() => navigate(slide.link)}
                    >
                      Try Now
                    </Button>
                  </motion.div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-16" />
          <CarouselNext className="-right-16" />
        </Carousel>
      </div>
    </section>
  );
};

export default DemoSection;