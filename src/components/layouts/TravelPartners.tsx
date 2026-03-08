"use client";
import { motion } from "framer-motion";
import { Award, Globe, Shield, Users } from "lucide-react";

const partners = [
  { name: "Bangladesh Tourism Board", icon: Globe },
  { name: "ATAB Certified", icon: Award },
  { name: "Travel Insurance Partner", icon: Shield },
  { name: "10,000+ Travelers", icon: Users },
];

const TravelPartners = () => {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground font-sans text-sm tracking-[0.15em] uppercase font-medium mb-10">
          Trusted & Certified
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-card shadow-card flex items-center justify-center group-hover:shadow-card-hover transition-all group-hover:-translate-y-1">
                <partner.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-sm font-sans font-medium text-muted-foreground text-center">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPartners;