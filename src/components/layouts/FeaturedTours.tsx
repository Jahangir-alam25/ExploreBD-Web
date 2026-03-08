"use client";
import { Clock, Star, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";


const tours = [
  {
    title: "Cox's Bazar Beach Getaway",
    location: "Cox's Bazar",
    duration: "3 Days",
    price: 8500,
    rating: 4.8,
    reviews: 124,
    image: "/coxs-bazar.jpg",
    maxGroup: 15,
    tag: "Bestseller",
  },
  {
    title: "Sajek Valley Trek",
    location: "Rangamati",
    duration: "4 Days",
    price: 12000,
    rating: 4.9,
    reviews: 89,
    image: "/sajek-valley.jpg",
    maxGroup: 10,
    tag: "Popular",
  },
  {
    title: "Sundarbans Explorer",
    location: "Khulna",
    duration: "5 Days",
    price: 15000,
    rating: 4.7,
    reviews: 67,
    image: "/sundarbans.jpg",
    maxGroup: 20,
    tag: "Adventure",
  },
  {
    title: "Srimangal Tea Trail",
    location: "Sylhet",
    duration: "2 Days",
    price: 5500,
    rating: 4.6,
    reviews: 52,
    image: "/srimangal.jpg",
    maxGroup: 12,
    tag: "Cultural",
  },
];

const FeaturedTours = () => {
  const [wishlisted, setWishlisted] = useState<string[]>([]);

  const toggleWishlist = (title: string) => {
    setWishlisted((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
    toast.success(wishlisted.includes(title) ? "Removed from wishlist" : "Added to wishlist!");
  };

  return (
    <section id="tours" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Curated Experiences
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Tour Packages
            </h2>
          </div>
          <Link href="/dashboard/tours" className="mt-4 md:mt-0">
            <Button variant="outline" className="font-sans bg-primary text-white gap-2 group">
              View All Tours
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, i) => (
            <motion.div
              key={tour.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full font-sans uppercase tracking-wider">
                  {tour.tag}
                </div>
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full font-sans">
                  ৳{tour.price.toLocaleString()}
                </div>
                <button
                  onClick={() => toggleWishlist(tour.title)}
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Heart className={`h-4 w-4 transition-colors ${wishlisted.includes(tour.title) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold text-foreground font-sans">
                    {tour.rating}
                  </span>
                  <span className="text-xs text-muted-foreground font-sans">
                    ({tour.reviews} reviews)
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-4 text-muted-foreground text-xs font-sans mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {tour.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Max {tour.maxGroup}
                  </span>
                </div>
                <Link href="/dashboard/tours">
                  <Button variant="outline" size="sm" className="w-full font-sans group/btn">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;