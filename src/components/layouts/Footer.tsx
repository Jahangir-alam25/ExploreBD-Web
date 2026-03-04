import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-display text-xl font-bold text-primary-foreground">
                Explore<span className="text-primary">BD</span>
              </span>
            </div>
            <p className="text-sm font-sans leading-relaxed text-primary-foreground/60">
              Your trusted travel partner for exploring the beauty of Bangladesh.
              From beaches to hills, we've got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 font-sans text-sm">
              {["Home", "Tours", "Destinations", "Blog", "About Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
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
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hello@explorebd.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +880 1712-345678
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-xs font-sans text-primary-foreground/40">
            © 2026 ExploreBD. All rights reserved. Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;