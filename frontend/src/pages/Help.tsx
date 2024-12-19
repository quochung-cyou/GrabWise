import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Download our app and click 'Sign Up'. Follow the prompts to enter your details and verify your account."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay."
    },
    {
      question: "How do I contact my driver?",
      answer: "Once matched with a driver, you can call or message them directly through the app using our secure communication system."
    },
    {
      question: "What if I left something in the car?",
      answer: "Don't worry! Report lost items through the app or contact our support team, and we'll help you reconnect with your driver."
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
          <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions or reach out to our support team.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Input
              placeholder="Search for help..."
              className="pl-10"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
            <Button>Contact Support</Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;