import { Heart, MapPin, Clock, Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const wishlist = [
  { id: 1, title: "Bandarban Hill Trek", location: "Bandarban", price: "৳6,500", rating: 4.7, duration: "3 Days", image: "/images/sajek-valley.jpg", available: true },
  { id: 2, title: "Ratargul Swamp Forest", location: "Sylhet", price: "৳4,200", rating: 4.5, duration: "1 Day", image: "/images/srimangal.jpg", available: true },
  { id: 3, title: "Saint Martin Island", location: "Cox's Bazar", price: "৳9,800", rating: 4.9, duration: "3 Days", image: "/images/coxs-bazar.jpg", available: true },
  { id: 4, title: "Nilgiri Hills Retreat", location: "Bandarban", price: "৳7,200", rating: 4.6, duration: "2 Days", image: "/images/sajek-valley.jpg", available: false },
  { id: 5, title: "Tanguar Haor Boat Ride", location: "Sunamganj", price: "৳5,500", rating: 4.4, duration: "2 Days", image: "/images/sundarbans.jpg", available: true },
  { id: 6, title: "Kuakata Sea Beach", location: "Patuakhali", price: "৳5,000", rating: 4.3, duration: "2 Days", image: "/images/coxs-bazar.jpg", available: true },
];

const Wishlist = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <Heart className="h-6 w-6 text-destructive" /> Wishlist
      </h1>
      <Badge variant="secondary">{wishlist.length} saved</Badge>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishlist.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-card-hover transition-shadow group">
          <div className="relative h-36 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <button className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-destructive/20 transition-colors">
              <Heart className="h-4 w-4 fill-destructive text-destructive" />
            </button>
            {!item.available && (
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <Badge variant="destructive">Currently Unavailable</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{item.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{item.rating}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-foreground">{item.price}</span>
              <Button size="sm" disabled={!item.available}>Book Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Wishlist;