import { Map, MapPin, Clock, Star, Users, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tours = [
  { id: 1, title: "Cox's Bazar 3-Day Beach Tour", duration: "3 Days", price: "৳8,500", originalPrice: "৳10,000", status: "Available", rating: 4.8, reviews: 124, location: "Cox's Bazar", maxGroup: 15, booked: 11, image: "/coxs-bazar.jpg", featured: true },
  { id: 2, title: "Sundarbans Wildlife Safari", duration: "2 Days", price: "৳5,500", originalPrice: "৳6,500", status: "Available", rating: 4.6, reviews: 89, location: "Khulna", maxGroup: 20, booked: 14, image: "/sundarbans.jpg", featured: false },
  { id: 3, title: "Sajek Valley Cloud Adventure", duration: "4 Days", price: "৳12,000", originalPrice: "৳12,000", status: "Sold Out", rating: 4.9, reviews: 203, location: "Rangamati", maxGroup: 12, booked: 12, image: "/sajek-valley.jpg", featured: true },
  { id: 4, title: "Srimangal Tea Garden Explorer", duration: "1 Day", price: "৳3,200", originalPrice: "৳3,200", status: "Available", rating: 4.4, reviews: 56, location: "Moulvibazar", maxGroup: 25, booked: 8, image: "/srimangal.jpg", featured: false },
  { id: 5, title: "Saint Martin Island Getaway", duration: "3 Days", price: "৳9,800", originalPrice: "৳12,000", status: "Available", rating: 4.7, reviews: 167, location: "Cox's Bazar", maxGroup: 18, booked: 13, image: "/coxs-bazar.jpg", featured: true },
  { id: 6, title: "Bandarban Golden Temple Trek", duration: "2 Days", price: "৳6,500", originalPrice: "৳7,500", status: "Available", rating: 4.5, reviews: 78, location: "Bandarban", maxGroup: 10, booked: 6, image: "/sajek-valley.jpg", featured: false },
];

const Tours = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <Map className="h-6 w-6 text-primary" /> Browse Tours
      </h1>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{tours.filter(t => t.status === "Available").length} Available</Badge>
        <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1" />Filter</Button>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden hover:shadow-card-hover transition-shadow group">
          <div className="relative h-40 overflow-hidden">
            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {tour.featured && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">Featured</Badge>}
            {tour.status === "Sold Out" && (
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">Sold Out</Badge>
              </div>
            )}
            {tour.price !== tour.originalPrice && (
              <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs">
                {Math.round((1 - parseInt(tour.price.replace(/\D/g, '')) / parseInt(tour.originalPrice.replace(/\D/g, ''))) * 100)}% OFF
              </Badge>
            )}
          </div>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground leading-tight">{tour.title}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{tour.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tour.duration}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{tour.rating} ({tour.reviews})</span>
            </div>
            {/* Capacity bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{tour.booked}/{tour.maxGroup} booked</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(tour.booked / tour.maxGroup) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-bold text-foreground text-lg">{tour.price}</span>
                {tour.price !== tour.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-2">{tour.originalPrice}</span>
                )}
              </div>
              <Button size="sm" disabled={tour.status === "Sold Out"}>
                {tour.status === "Sold Out" ? "Sold Out" : "Book"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Tours;