"use client";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka",
    rating: 5,
    comment: "Amazing experience at Sajek Valley! The guides were incredibly knowledgeable and the arrangements were perfect. Will definitely book again.",
    avatar: "R",
    tour: "Sajek Valley Trek",
  },
  {
    name: "Fatima Begum",
    location: "Chittagong",
    rating: 5,
    comment: "Cox's Bazar tour was beyond expectations. Everything was well-organized from booking to checkout. Highly recommended!",
    avatar: "F",
    tour: "Cox's Bazar Beach Getaway",
  },
  {
    name: "Kamal Hassan",
    location: "Sylhet",
    rating: 5,
    comment: "The Sundarbans expedition was unforgettable. Saw wildlife up close and the boat ride through the mangroves was magical.",
    avatar: "K",
    tour: "Sundarbans Explorer",
  },
  {
    name: "Nusrat Jahan",
    location: "Rajshahi",
    rating: 5,
    comment: "Srimangal tea trail was a wonderful cultural experience. The seven-layer tea is a must-try! Great value for money.",
    avatar: "N",
    tour: "Srimangal Tea Trail",
  },
  {
    name: "Tanvir Islam",
    location: "Comilla",
    rating: 5,
    comment: "Best travel agency in Bangladesh! Professional service, great communication, and unforgettable experiences every single time.",
    avatar: "T",
    tour: "Cox's Bazar Beach Getaway",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleReviews = 3;

  const next = () => setCurrentIndex((prev) => (prev + 1) % (reviews.length - visibleReviews + 1));
  const prev = () => setCurrentIndex((prev) => (prev - 1 + (reviews.length - visibleReviews + 1)) % (reviews.length - visibleReviews + 1));

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Testimonials
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              What Travelers Say
            </h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(currentIndex, currentIndex + visibleReviews).map((review, i) => (
            <motion.div
              key={review.name + currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all relative"
            >
              <Quote className="h-8 w-8 text-primary/15 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${j < review.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-primary font-sans font-semibold mb-3">{review.tour}</p>
              <p className="text-foreground/80 text-sm font-sans leading-relaxed mb-6">
                {review.comment}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm font-sans">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm font-sans">
                    {review.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-sans">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: reviews.length - visibleReviews + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;