"use client";
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";


const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/dashboard/tours" },
  { label: "Destinations", href: "/dashboard/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Privacy Policy", href: "/about" },
  { label: "Terms of Service", href: "/about" },
  { label: "My Account", href: "/dashboard" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">
                Explore<span className="text-primary">BD</span>
              </span>
            </Link>
            <p className="text-sm font-sans leading-relaxed text-primary-foreground/60 mb-6">
              Your trusted travel partner for exploring the beauty of Bangladesh.
              From beaches to hills, we have got you covered.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, url: "https://facebook.com" },
                { icon: Instagram, url: "https://instagram.com" },
                { icon: Twitter, url: "https://twitter.com" },
                { icon: Youtube, url: "https://youtube.com" },
              ].map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 font-sans text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a href="mailto:hello@explorebd.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                  hello@explorebd.com
                </a>
              </li>
              <li>
                <a href="tel:+8801712345678" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                  +880 1712-345678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Dhaka, Bangladesh
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Get Directions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-primary-foreground/40">
            © 2026 ExploreBD. All rights reserved. Made with ❤️ in Bangladesh
          </p>
          <div className="flex gap-6 text-xs font-sans text-primary-foreground/40">
            <Link href="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;