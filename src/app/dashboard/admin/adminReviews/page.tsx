"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, CheckCircle, XCircle, Flag, ThumbsUp } from "lucide-react";

const initialReviews = [
  { id: 1, user: "Rahim Ahmed", tour: "Cox's Bazar Beach Tour", rating: 5, comment: "Amazing experience! The beach was pristine and our guide was incredibly knowledgeable. Would definitely recommend to everyone.", status: "Approved", date: "2025-02-20", helpful: 24, reported: false },
  { id: 2, user: "Fatima Begum", tour: "Sundarbans Safari", rating: 4, comment: "Great wildlife experience. Saw Royal Bengal Tigers from the boat! The accommodation could have been better though.", status: "Approved", date: "2025-02-18", helpful: 18, reported: false },
  { id: 3, user: "Karim Hossain", tour: "Sajek Valley Adventure", rating: 5, comment: "Breathtaking views of clouds from above. The night sky was stunning. Best trip of my life without any doubt.", status: "Pending", date: "2025-02-22", helpful: 0, reported: false },
  { id: 4, user: "Nusrat Jahan", tour: "Srimangal Tea Garden", rating: 2, comment: "Very disappointing. The tour was rushed and we didn't get enough time at each location. Not worth the money at all.", status: "Flagged", date: "2025-02-19", helpful: 3, reported: true },
  { id: 5, user: "Imran Khan", tour: "Saint Martin Getaway", rating: 5, comment: "Paradise on earth! Crystal clear water, friendly locals, and delicious seafood. Can't wait to go back again!", status: "Approved", date: "2025-02-21", helpful: 31, reported: false },
  { id: 6, user: "Tanvir Rahman", tour: "Bandarban Trek", rating: 4, comment: "Challenging but rewarding trek. The golden temple was magnificent. Great experience overall with nice team.", status: "Pending", date: "2025-02-23", helpful: 0, reported: false },
  { id: 7, user: "Sadia Islam", tour: "Cox's Bazar Beach Tour", rating: 1, comment: "Terrible service. Hotel was dirty and food was bad. This was spam review with inappropriate content.", status: "Flagged", date: "2025-02-17", helpful: 0, reported: true },
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  const filtered = reviews.filter((r) => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) || r.tour.toLowerCase().includes(search.toLowerCase()) || r.comment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchRating = filterRating === "all" || r.rating === parseInt(filterRating);
    return matchSearch && matchStatus && matchRating;
  });

  const updateStatus = (id: number, status: string) => setReviews(reviews.map((r) => r.id === id ? { ...r, status } : r));
  const deleteReview = (id: number) => setReviews(reviews.filter((r) => r.id !== id));

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: reviews.length },
          { label: "Avg Rating", value: avgRating },
          { label: "Pending", value: reviews.filter((r) => r.status === "Pending").length },
          { label: "Flagged", value: reviews.filter((r) => r.status === "Flagged").length },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-2xl font-bold text-foreground mt-1">{s.value}</p></CardContent></Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reviews..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-28"><SelectValue placeholder="Rating" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              {[5, 4, 3, 2, 1].map((r) => <SelectItem key={r} value={r.toString()}>{r} Stars</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((review) => (
          <Card key={review.id} className={review.status === "Flagged" ? "border-destructive/30" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{review.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground text-sm">{review.user}</span>
                      <Badge variant={review.status === "Approved" ? "default" : review.status === "Pending" ? "secondary" : "destructive"} className="text-[10px] px-1.5 py-0">
                        {review.status}
                      </Badge>
                      {review.reported && <Badge variant="destructive" className="text-[10px] px-1.5 py-0"><Flag className="h-2.5 w-2.5 mr-0.5" />Reported</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.tour} • {review.date}</p>
                    <div className="flex items-center gap-0.5 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">{review.comment}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{review.helpful} helpful</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {review.status !== "Approved" && (
                    <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => updateStatus(review.id, "Approved")}>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />Approve
                    </Button>
                  )}
                  {review.status !== "Flagged" && (
                    <Button size="sm" variant="outline" className="h-8 text-xs text-destructive hover:bg-destructive/10" onClick={() => updateStatus(review.id, "Flagged")}>
                      <Flag className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="h-8 text-xs text-destructive hover:bg-destructive/10" onClick={() => deleteReview(review.id)}>
                    <XCircle className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;