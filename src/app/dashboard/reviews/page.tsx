import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  { id: 1, tour: "Cox's Bazar Beach Tour", rating: 5, comment: "Absolutely amazing experience! The beach was pristine and the sunset was breathtaking. Our guide Kamal was incredibly knowledgeable and made the trip unforgettable.", date: "Feb 12, 2025", likes: 12, replies: 3, helpful: true },
  { id: 2, tour: "Sundarbans Wildlife Safari", rating: 4, comment: "Great wildlife tour! Saw Royal Bengal Tigers from the boat. The guide was very experienced. Only downside was the weather could have been better.", date: "Jan 20, 2025", likes: 8, replies: 1, helpful: true },
  { id: 3, tour: "Sajek Valley Adventure", rating: 5, comment: "The most beautiful place in Bangladesh! Cloud sea view from the hilltop was magical. Highly recommend the sunrise trek.", date: "Dec 15, 2024", likes: 22, replies: 5, helpful: true },
  { id: 4, tour: "Srimangal Tea Garden Tour", rating: 4, comment: "Lovely green landscapes and fresh tea tasting. Short but sweet day trip. The seven-layer tea was incredible!", date: "Nov 28, 2024", likes: 6, replies: 2, helpful: false },
];

const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

const Reviews = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <Star className="h-6 w-6 text-accent" /> My Reviews
      </h1>
      <Button size="sm">Write a Review</Button>
    </div>

    {/* Summary */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Card><CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-accent">{avgRating}</p>
        <div className="flex justify-center gap-0.5 my-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < Math.round(Number(avgRating)) ? "fill-accent text-accent" : "text-muted"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Avg Rating</p>
      </CardContent></Card>
      <Card><CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-foreground">{reviews.length}</p>
        <p className="text-xs text-muted-foreground">Total Reviews</p>
      </CardContent></Card>
      <Card><CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-foreground">{reviews.reduce((s, r) => s + r.likes, 0)}</p>
        <p className="text-xs text-muted-foreground">Total Likes</p>
      </CardContent></Card>
      <Card><CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-foreground">{reviews.filter(r => r.helpful).length}</p>
        <p className="text-xs text-muted-foreground">Marked Helpful</p>
      </CardContent></Card>
    </div>

    <div className="grid gap-4">
      {reviews.map((r) => (
        <Card key={r.id} className="hover:shadow-card-hover transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{r.tour}</h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{r.date}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{r.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{r.replies} replies</span>
                  {r.helpful && <Badge variant="outline" className="text-xs">Helpful</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reviews;