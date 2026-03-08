"use client";
import { Shield, Compass, Headphones, BadgeDollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";


const features = [
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions with Stripe. Your money is always protected.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Compass,
    title: "Trusted Guides",
    description: "Experienced local guides who know every hidden gem of Bangladesh.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for a worry-free travel experience.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "Get the best rates or we'll match it. No hidden fees, ever.",
    color: "from-accent/20 to-accent/5",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Why Explore BD
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Travelers Choose Us
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              We have been helping travelers discover the beauty of Bangladesh since 2020. 
              With over 10,000 happy customers, we are the most trusted travel platform in the country.
            </p>
            <div className="flex gap-4">
              <Link href="/about">
                <Button className="bg-primary text-primary-foreground px-6 py-5 rounded-xl font-sans font-semibold">
                  Learn More About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-6 py-5 rounded-xl font-sans">
                  Contact Us <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all group cursor-pointer hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;