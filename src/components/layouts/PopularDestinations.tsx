"use client";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="text-center mb-16">
          <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Top Destinations
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Popular Places to Visit
          </h2>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;