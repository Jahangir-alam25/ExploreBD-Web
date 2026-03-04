"use client";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka",
    rating: 5,
    comment: "Amazing experience at Sajek Valley! The guides were incredibly knowledgeable and the arrangements were perfect.",
    avatar: "R",
  },
  {
    name: "Fatima Begum",
    location: "Chittagong",
    rating: 5,
    comment: "Cox's Bazar tour was beyond expectations. Everything was well-organized from booking to checkout. Highly recommended!",
    avatar: "F",
  },
  {
    name: "Kamal Hassan",
    location: "Sylhet",
    rating: 4,
    comment: "The Sundarbans expedition was unforgettable. Saw wildlife up close and the boat ride through the mangroves was magical.",
    avatar: "K",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            What Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-card relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${j < review.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/80 text-sm font-sans leading-relaxed mb-6">
                {review.comment}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm font-sans">
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
      </div>
    </section>
  );
};

export default ReviewsSection;