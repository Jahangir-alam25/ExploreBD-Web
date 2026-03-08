"use client";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";


const destinations = [
  {
    name: "Cox's Bazar",
    subtitle: "World's Longest Beach",
    image: "/coxs-bazar.jpg",
    tours: 45,
  },
  {
    name: "Sajek Valley",
    subtitle: "Cloud Paradise",
    image: "/sajek-valley.jpg",
    tours: 32,
  },
  {
    name: "Sundarbans",
    subtitle: "Mangrove Wonderland",
    image: "/sundarbans.jpg",
    tours: 28,
  },
  {
    name: "Srimangal",
    subtitle: "Tea Capital",
    image: "/srimangal.jpg",
    tours: 21,
  },
];

const PopularDestinations = () => {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Top Destinations
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Popular Places to Visit
            </h2>
          </div>
          <Link href="/dashboard/destinations" className="mt-4 md:mt-0">
            <Button variant="outline" className="font-sans bg-primary text-white gap-2 group">
              View All Destinations
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <Link href="/dashboard/destinations">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-1.5 text-primary-foreground/70 mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-xs font-sans">{dest.tours} Tours</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    {dest.name}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm font-sans mt-1">
                    {dest.subtitle}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;