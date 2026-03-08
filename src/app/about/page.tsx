"use client";
// import Navbar from "../../components/layouts/Navbar";
// import Footer from "../../components/layouts/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Award, Globe, Heart, Shield, Phone, Mail, ArrowRight, Star, Mountain, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
    { icon: Globe, label: "Destinations", value: "100+" },
    { icon: Users, label: "Happy Travelers", value: "50,000+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
];

const team = [
    { name: "Rahim Ahmed", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { name: "Fatima Khan", role: "Head of Operations", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
    { name: "Kamal Hossain", role: "Lead Tour Guide", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { name: "Nusrat Jahan", role: "Marketing Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
];

const values = [
    { icon: Heart, title: "Passion for Travel", description: "We live and breathe travel. Every tour is crafted with love for Bangladesh's rich culture and natural beauty." },
    { icon: Shield, title: "Safety First", description: "Your safety is our top priority. All tours include comprehensive insurance and certified guides." },
    { icon: Mountain, title: "Authentic Experiences", description: "We go beyond tourist spots to offer genuine cultural immersion and off-the-beaten-path adventures." },
    { icon: TreePine, title: "Eco-Friendly Tourism", description: "We're committed to sustainable practices that preserve Bangladesh's natural heritage for future generations." },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* <Navbar /> */}
            <Link href="/" className="flex items-center gap-2 p-2 text-xl font-bold">
                <div className="border-2 border-primary p-2 rounded"><MapPin /></div>
                Explore<span className="text-primary">BD</span>
            </Link>
            {/* Hero */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-5" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">About Us</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Discover Bangladesh with <span className="text-gradient-primary">ExploreBD</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Since 2018, we have been helping travelers experience the hidden gems of Bangladesh —
                            from the pristine beaches of Cox's Bazar to the mystical Sundarbans mangrove forest.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div {...fadeUp}>
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Born from a Love for Bangladesh
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    ExploreBD started when our founder, Rahim Ahmed, realized that Bangladesh —
                                    a country with incredible biodiversity, rich history, and warm hospitality — was
                                    one of the most underrated travel destinations in the world.
                                </p>
                                <p>
                                    What began as a small group of passionate tour guides has grown into Bangladesh is
                                    most trusted travel platform, connecting over 50,000 travelers with unforgettable experiences.
                                </p>
                                <p>
                                    Today, we offer 500+ curated tours across 100+ destinations, from the world's
                                    longest sea beach to ancient archaeological sites and lush tea gardens.
                                </p>
                            </div>
                            <Link href="/auth/register">
                                <Button className="mt-6 bg-gradient-primary text-primary-foreground">
                                    Start Your Journey <ArrowRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="grid grid-cols-2 gap-4">
                            <img src="/sundarbans.jpg" alt="Sundarbans" className="rounded-xl shadow-card w-full h-48 object-cover" />
                            <img src="/coxs-bazar.jpg" alt="Cox's Bazar" className="rounded-xl shadow-card w-full h-48 object-cover mt-8" />
                            <img src="/srimangal.jpg" alt="Srimangal" className="rounded-xl shadow-card w-full h-48 object-cover" />
                            <img src="/sajek-valley.jpg" alt="Sajek Valley" className="rounded-xl shadow-card w-full h-48 object-cover mt-8" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp} className="text-center mb-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Values</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Drives Us</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                                <Card className="h-full border-border/50 hover:shadow-card-hover transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                                            <v.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp} className="text-center mb-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">Our Team</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet the Experts</h2>
                        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Passionate professionals dedicated to making your travels extraordinary.</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                                <Card className="border-border/50 overflow-hidden group hover:shadow-card-hover transition-shadow">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <CardContent className="p-4 text-center">
                                        <h3 className="font-bold text-foreground">{member.name}</h3>
                                        <p className="text-sm text-primary">{member.role}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp}>
                        <Card className="bg-primary border-0 overflow-hidden relative">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/30 blur-3xl" />
                            </div>
                            <CardContent className="p-8 md:p-12 text-center relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Explore Bangladesh?</h2>
                                <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join 50,000+ travelers who have discovered the beauty of Bangladesh with ExploreBD.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/register">
                                        <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                                            Get Started Free <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                    <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => window.location.href = "mailto:hello@explorebd.com"}>
                                        <Mail className="h-4 w-4 mr-2" /> Contact Us
                                    </Button>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 text-primary-foreground/80 text-sm">
                                    <span className="flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> +880 1700-000000</span>
                                    <span className="flex items-center justify-center gap-2"><Mail className="h-4 w-4" /> hello@explorebd.com</span>
                                    <span className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4" /> Dhaka, Bangladesh</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* <Footer /> */}
        </div>
    );
};

export default About;