"use client";
import { Shield, Compass, Headphones, BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions with Stripe. Your money is always protected.",
  },
  {
    icon: Compass,
    title: "Trusted Guides",
    description: "Experienced local guides who know every hidden gem of Bangladesh.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for a worry-free travel experience.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "Get the best rates or we'll match it. No hidden fees, ever.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Why Explore BD
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6">
                <feat.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feat.title}
              </h3>
              <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;