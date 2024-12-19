import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DemoSection from "@/components/landing/DemoSection";
import TeamSection from "@/components/landing/TeamSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TechnologySection from "@/components/landing/TechnologySection";
import FAQSection from "@/components/landing/FAQSection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import IntegrationSection from "@/components/landing/IntegrationSection";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <DemoSection />
      <TechnologySection />
      <IntegrationSection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;