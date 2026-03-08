"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import Navbar from "../../components/layouts/Navbar";
// import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";
import Link from "next/link";

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        detail: "hello@explorebd.com",
        sub: "We reply within 24 hours",
        href: "mailto:hello@explorebd.com",
    },
    {
        icon: Phone,
        title: "Call Us",
        detail: "+880 1712-345678",
        sub: "Mon-Sat, 9AM-8PM BST",
        href: "tel:+8801712345678",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        detail: "Gulshan-2, Dhaka",
        sub: "Bangladesh, 1212",
        href: "#map",
    },
    {
        icon: Clock,
        title: "Business Hours",
        detail: "Sat - Thu: 9AM - 8PM",
        sub: "Friday: Closed",
        href: "#",
    },
];

const faqs = [
    {
        q: "How do I book a tour?",
        a: "Simply browse our tour packages, select your preferred one, choose dates, and complete the booking with our secure payment system.",
    },
    {
        q: "What is your cancellation policy?",
        a: "Free cancellation up to 48 hours before the tour start date. After that, a 25% cancellation fee applies.",
    },
    {
        q: "Do you offer group discounts?",
        a: "Yes! Groups of 5+ get 10% off, and groups of 10+ get 20% off. Contact us for custom group packages.",
    },
    {
        q: "Are meals included in tour packages?",
        a: "Most multi-day tours include breakfast and dinner. Check individual tour details for the complete meal plan.",
    },
    {
        q: "What should I pack for a hill trek?",
        a: "Comfortable hiking shoes, light layers, rain jacket, sunscreen, insect repellent, and a water bottle. We provide a detailed packing list upon booking.",
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", subject: "", message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            return;
        }
        setSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        }, 4000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* <Navbar /> */}
            <Link href="/" className="flex items-center gap-2 p-2 text-xl font-bold">
                <div className="border-2 border-primary p-2 rounded"><MapPin /></div>
                Explore<span className="text-primary">BD</span>
            </Link>

            {/* Hero */}
            <section className="pt-24 pb-16 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto pt-8"
                    >
                        <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                            Get in Touch
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                            Contact Us
                        </h1>
                        <p className="text-muted-foreground font-sans text-lg">
                            Have questions about our tours? Want a custom travel package? We hare here to help you plan your perfect Bangladesh adventure.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12 -mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, i) => (
                            <motion.a
                                key={info.title}
                                href={info.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all text-center group hover:-translate-y-1"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                                    <info.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-display text-lg font-bold text-foreground mb-1">{info.title}</h3>
                                <p className="text-foreground font-sans text-sm font-semibold">{info.detail}</p>
                                <p className="text-muted-foreground font-sans text-xs mt-1">{info.sub}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form + Map */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Send us a Message</h2>
                            <p className="text-muted-foreground font-sans mb-8">Fill out the form below and we will get back to you within 24 hours.</p>

                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-primary/10 rounded-2xl p-12 text-center"
                                >
                                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground font-sans">Thank you for reaching out. We will respond within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">
                                                Full Name <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">
                                                Email <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Phone</label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+880 1XXX-XXXXXX"
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Subject</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans text-sm"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="booking">Tour Booking Inquiry</option>
                                                <option value="custom">Custom Package Request</option>
                                                <option value="support">Customer Support</option>
                                                <option value="partnership">Business Partnership</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">
                                            Message <span className="text-destructive">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Tell us how we can help you..."
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans text-sm resize-none"
                                        />
                                    </div>
                                    <Button type="submit" className="bg-gradient-primary text-primary-foreground px-8 py-6 rounded-xl font-sans font-semibold w-full sm:w-auto">
                                        <Send className="h-4 w-4 mr-2" /> Send Message
                                    </Button>
                                </form>
                            )}
                        </motion.div>

                        {/* Map placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            id="map"
                        >
                            <div className="bg-card rounded-2xl overflow-hidden shadow-card h-full min-h-[400px] flex flex-col">
                                <div className="flex-1 bg-muted relative flex items-center justify-center">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692868!2d90.27923710646498!3d23.780573258035027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b9a30acab8!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1710000000000"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: 350 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Our Location - Dhaka, Bangladesh"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Our Office</h3>
                                    <p className="text-muted-foreground font-sans text-sm">
                                        House 42, Road 11, Gulshan-2, Dhaka 1212, Bangladesh
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=Gulshan+2+Dhaka+Bangladesh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-sans text-sm font-semibold mt-2 inline-flex items-center gap-1 hover:underline"
                                    >
                                        <Globe className="h-3.5 w-3.5" /> Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                            FAQ
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-card rounded-xl shadow-card overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-sans font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                                    <MessageSquare className={`h-4 w-4 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="px-5 pb-5"
                                    >
                                        <p className="text-muted-foreground font-sans text-sm leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full translate-x-1/3 -translate-y-1/3" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full -translate-x-1/3 translate-y-1/3" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                Ready for Your Next Adventure?
                            </h2>
                            <p className="text-primary-foreground/70 font-sans mb-8 max-w-xl mx-auto">
                                Let us help you plan the perfect trip. Browse our tours or get a custom quote today.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    className="bg-accent text-accent-foreground px-8 py-6 rounded-xl font-sans font-semibold hover:opacity-90"
                                    onClick={() => window.location.href = "/dashboard/tours"}
                                >
                                    Browse Tours
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-primary-foreground/30 text-black hover:bg-primary-foreground/10 px-8 py-6 rounded-xl font-sans"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    Back to Top
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Footer /> */}
        </div>
    );
};

export default Contact;