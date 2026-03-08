"use client";
import { useState } from "react";
import { Search, Calendar, Clock, ArrowRight, Tag, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
// import Navbar from "../../components/layouts/Navbar";
// import Footer from "../../components/layouts/Footer";

const allPosts = [
    {
        id: 1,
        title: "Top 10 Hidden Beaches in Bangladesh",
        excerpt: "Beyond Cox's Bazar, discover untouched coastal paradises that most travelers miss. From Teknaf to Kuakata, these beaches offer solitude and natural beauty.",
        date: "Mar 1, 2026",
        category: "Travel Tips",
        image: "/coxs-bazar.jpg",
        readTime: "5 min read",
        author: "Rahim Ahmed",
    },
    {
        id: 2,
        title: "A Guide to the Sundarbans Mangrove Forest",
        excerpt: "Everything you need to know before visiting the world's largest mangrove ecosystem. Wildlife, boat tours, best seasons, and safety tips.",
        date: "Feb 20, 2026",
        category: "Destination Guide",
        image: "/sundarbans.jpg",
        readTime: "8 min read",
        author: "Fatima Begum",
    },
    {
        id: 3,
        title: "Tea Culture of Srimangal",
        excerpt: "Experience the seven-layer tea and lush tea gardens of Bangladesh's tea capital. A journey through flavors and traditions.",
        date: "Feb 14, 2026",
        category: "Culture",
        image: "/srimangal.jpg",
        readTime: "4 min read",
        author: "Kamal Hassan",
    },
    {
        id: 4,
        title: "Sajek Valley: A Cloud Paradise in Rangamati",
        excerpt: "Discover why Sajek Valley is called the 'Queen of Hills'. Trekking routes, homestays, and the breathtaking sunrise views.",
        date: "Feb 8, 2026",
        category: "Adventure",
        image: "/sajek-valley.jpg",
        readTime: "6 min read",
        author: "Nusrat Jahan",
    },
    {
        id: 5,
        title: "Best Street Food in Dhaka You Must Try",
        excerpt: "From fuchka to jhalmuri, explore the vibrant street food scene of Old Dhaka. A food lover's ultimate guide.",
        date: "Jan 30, 2026",
        category: "Food & Culture",
        image: "/coxs-bazar.jpg",
        readTime: "5 min read",
        author: "Tanvir Islam",
    },
    {
        id: 6,
        title: "How to Plan a Budget Trip to Cox's Bazar",
        excerpt: "Complete budget breakdown for a 3-day Cox's Bazar trip. Affordable hotels, transport tips, and free activities.",
        date: "Jan 22, 2026",
        category: "Travel Tips",
        image: "/coxs-bazar.jpg",
        readTime: "7 min read",
        author: "Rahim Ahmed",
    },
];

const categories = ["All", "Travel Tips", "Destination Guide", "Culture", "Adventure", "Food & Culture"];

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = allPosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = allPosts[0];

    return (
        <div className="min-h-screen bg-background">
            {/* <Navbar /> */}
            <Link href="/" className="flex items-center gap-2 p-2 text-xl font-bold">
                <div className="border-2 border-primary p-2 rounded"><MapPin /></div>
                Explore<span className="text-primary">BD</span>
            </Link>
            {/* Hero */}
            <section className="pt-24 pb-12 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto pt-8"
                    >
                        <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                            Our Blog
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                            Travel Stories & Guides
                        </h1>
                        <p className="text-muted-foreground font-sans text-lg mb-8">
                            Discover travel tips, destination guides, and cultural stories from Bangladesh and beyond.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto">
                            <div className="bg-card rounded-2xl p-2 flex items-center gap-2 shadow-card">
                                <div className="flex-1 flex items-center gap-3 px-4">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none py-3 text-sm font-sans"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-6 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {selectedCategory === "All" && !searchQuery && (
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                        >
                            <div className="h-64 lg:h-auto overflow-hidden">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full font-sans">
                                        Featured
                                    </span>
                                    <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full font-sans">
                                        {featuredPost.category}
                                    </span>
                                </div>
                                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-muted-foreground text-sm font-sans mb-6">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" /> {featuredPost.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> {featuredPost.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" /> {featuredPost.readTime}
                                    </span>
                                </div>
                                <Button className="bg-primary text-primary-foreground w-fit px-8 py-5 rounded-xl font-sans font-semibold gap-2">
                                    Read Full Article <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground font-sans text-lg">No articles found matching your criteria.</p>
                            <Button
                                variant="outline"
                                className="mt-4 font-sans"
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, i) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group cursor-pointer hover:-translate-y-1"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="text-xs font-semibold text-primary-foreground bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full font-sans">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-sans">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm font-sans leading-relaxed mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                                                    {post.author[0]}
                                                </div>
                                                <span className="text-xs font-sans text-muted-foreground">{post.author}</span>
                                            </div>
                                            <span className="text-primary text-sm font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {filteredPosts.length > 0 && (
                        <div className="text-center mt-12">
                            <Button variant="outline" className="px-8 py-5 rounded-xl font-sans font-semibold">
                                Load More Articles
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* <Footer /> */}
        </div>
    );
};

export default Blog;