"use client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Stay in the Loop
          </h2>
          <p className="text-primary-foreground/70 font-sans mb-8">
            Subscribe to get travel deals, destination guides, and insider tips
            delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 outline-none focus:border-primary-foreground/50 transition-colors font-sans text-sm"
            />
            <Button className="bg-accent text-accent-foreground px-6 rounded-xl font-sans font-semibold hover:opacity-90">
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;