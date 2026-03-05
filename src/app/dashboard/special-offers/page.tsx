import { Tag, Clock, Percent, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const offers = [
  { id: 1, title: "Summer Beach Blast", discount: "25%", tour: "Cox's Bazar 3-Day Tour", originalPrice: "৳10,000", discountedPrice: "৳7,500", expires: "Jun 30, 2025", daysLeft: 117, code: "SUMMER25", image: "/coxs-bazar.jpg" },
  { id: 2, title: "Monsoon Adventure Deal", discount: "30%", tour: "Sundarbans Wildlife Safari", originalPrice: "৳6,500", discountedPrice: "৳4,550", expires: "Aug 15, 2025", daysLeft: 163, code: "MONSOON30", image: "/sundarbans.jpg" },
  { id: 3, title: "Winter Escape Special", discount: "20%", tour: "Sajek Valley Adventure", originalPrice: "৳12,000", discountedPrice: "৳9,600", expires: "Dec 31, 2025", daysLeft: 301, code: "WINTER20", image: "/sajek-valley.jpg" },
  { id: 4, title: "Tea Garden Early Bird", discount: "15%", tour: "Srimangal Day Tour", originalPrice: "৳3,200", discountedPrice: "৳2,720", expires: "Apr 30, 2025", daysLeft: 56, code: "TEABIRD15", image: "/srimangal.jpg" },
];

const SpecialOffers = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <Tag className="h-6 w-6 text-accent" /> Special Offers
      </h1>
      <Badge variant="secondary">{offers.length} Active</Badge>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {offers.map((offer) => (
        <Card key={offer.id} className="overflow-hidden hover:shadow-card-hover transition-shadow group border-accent/20">
          <div className="relative h-36 overflow-hidden">
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center p-5">
              <div>
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Limited Offer</p>
                <p className="text-3xl font-bold text-white font-display">{offer.discount} OFF</p>
              </div>
            </div>
          </div>
          <CardContent className="p-5 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">{offer.title}</h3>
              <p className="text-sm text-muted-foreground">{offer.tour}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-primary">{offer.discountedPrice}</span>
              <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{offer.daysLeft} days left</span>
              <Badge variant="outline" className="font-mono text-xs">{offer.code}</Badge>
            </div>
            <Button size="sm" className="w-full group/btn">
              Claim Offer <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SpecialOffers;