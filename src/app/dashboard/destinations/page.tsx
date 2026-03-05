import { MapPin, Map, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const destinations = [
  { id: 1, name: "Cox's Bazar", district: "Cox's Bazar", tours: 12, rating: 4.8, description: "World's longest natural sea beach with stunning sunsets and seafood.", image: "/coxs-bazar.jpg", popular: true },
  { id: 2, name: "Sundarbans", district: "Khulna", tours: 8, rating: 4.6, description: "The largest mangrove forest, home to the Royal Bengal Tiger.", image: "/sundarbans.jpg", popular: true },
  { id: 3, name: "Sajek Valley", district: "Rangamati", tours: 6, rating: 4.9, description: "The Queen of Hills — clouds beneath your feet and breathtaking views.", image: "/sajek-valley.jpg", popular: true },
  { id: 4, name: "Srimangal", district: "Moulvibazar", tours: 5, rating: 4.4, description: "Tea capital of Bangladesh with lush green gardens and seven-layer tea.", image: "/srimangal.jpg", popular: false },
  { id: 5, name: "Saint Martin Island", district: "Cox's Bazar", tours: 4, rating: 4.7, description: "Bangladesh's only coral island with crystal-clear water.", image: "/coxs-bazar.jpg", popular: true },
  { id: 6, name: "Bandarban", district: "Bandarban", tours: 9, rating: 4.5, description: "Hill district with tribal culture, golden temples, and trekking trails.", image: "/sajek-valley.jpg", popular: false },
];

const Destinations = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" /> Destinations
      </h1>
      <Badge variant="secondary">{destinations.length} Places</Badge>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {destinations.map((d) => (
        <Card key={d.id} className="overflow-hidden hover:shadow-card-hover transition-shadow group">
          <div className="relative h-44 overflow-hidden">
            <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {d.popular && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">Popular</Badge>}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
              <h3 className="text-lg font-bold text-white font-display">{d.name}</h3>
            </div>
          </div>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Map className="h-3 w-3" />{d.district}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{d.rating}</span>
              <span>{d.tours} tours</span>
            </div>
            <Button variant="outline" size="sm" className="w-full group/btn">
              Explore <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Destinations;