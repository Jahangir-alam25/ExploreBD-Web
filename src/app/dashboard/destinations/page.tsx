"use client";
import { MapPin, Map, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";



interface Destination {
  _id?: string;
  name: string;
  division: string;
  description: string;
  status: string;
  tours: number;
  rating: number;
  visitors: string;
  image: string;
}

const Destinations = () => {
 const [destinations, setDestinations] = useState<Destination[]>([]);

 useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
     <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" /> Destinations
      </h1>
      <Badge variant="secondary">{destinations.length} Places</Badge>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {destinations.map((d) => (
        <Card key={d._id} className="overflow-hidden hover:shadow-card-hover transition-shadow group">
          <div className="relative h-44 overflow-hidden">
            <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {d.status === "Active" && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">Popular</Badge>}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
              <h3 className="text-lg font-bold text-white font-display">{d.name}</h3>
            </div>
          </div>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Map className="h-3 w-3" />{d.division}</span>
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
}


export default Destinations;