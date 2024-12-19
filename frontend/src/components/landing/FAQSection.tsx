import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How accurate are the price predictions?",
      answer: "Our AI model achieves 99% accuracy in price predictions by analyzing multiple factors including weather conditions, time of day, and historical data."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we implement industry-standard security measures to protect your personal information and travel data."
    },
    {
      question: "How often is the prediction model updated?",
      answer: "Our AI models are continuously trained with new data to ensure the most accurate and up-to-date predictions."
    },
    {
      question: "Can I use the app in different cities?",
      answer: "Yes, GrabWise is available in over 100 cities worldwide, with more locations being added regularly."
    },
    {
      question: "What factors influence the price predictions?",
      answer: "Our algorithm considers weather conditions, time of day, day of week, special events, and historical pricing data."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about GrabWise
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;