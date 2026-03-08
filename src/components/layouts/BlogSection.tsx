"use client";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";


const blogs = [
  {
    title: "Top 10 Hidden Beaches in Bangladesh",
    excerpt: "Beyond Cox's Bazar, discover untouched coastal paradises that most travelers miss.",
    date: "Mar 1, 2026",
    category: "Travel Tips",
    image: "/coxs-bazar.jpg",
    readTime: "5 min read",
  },
  {
    title: "A Guide to the Sundarbans Mangrove Forest",
    excerpt: "Everything you need to know before visiting the world's largest mangrove ecosystem.",
    date: "Feb 20, 2026",
    category: "Destination Guide",
    image: "/sundarbans.jpg",
    readTime: "8 min read",
  },
  {
    title: "Tea Culture of Srimangal",
    excerpt: "Experience the seven-layer tea and lush tea gardens of Bangladesh's tea capital.",
    date: "Feb 14, 2026",
    category: "Culture",
    image: "/srimangal.jpg",
    readTime: "4 min read",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Travel Stories
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Recent Blog Posts
            </h2>
          </div>
          <Link href="/blog" className="mt-4 md:mt-0">
            <Button variant="outline" className="font-sans bg-primary text-white gap-2 group">
              View All Posts
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group cursor-pointer hover:-translate-y-1"
            >
              <Link href="/blog">
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full font-sans">
                      {blog.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {blog.date}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-sm font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground font-sans">{blog.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;