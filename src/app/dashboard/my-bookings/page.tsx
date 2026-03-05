import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MapPin, Users, Clock, Download, Eye } from "lucide-react";

const bookings = [
  { id: "BK-001", tour: "Cox's Bazar Beach Tour", location: "Cox's Bazar", date: "2025-03-15", persons: 2, total: "৳8,500", status: "Confirmed", duration: "3 Days", guide: "Kamal Hossain" },
  { id: "BK-002", tour: "Sundarbans Wildlife Safari", location: "Khulna", date: "2025-04-02", persons: 4, total: "৳22,000", status: "Pending", duration: "2 Days", guide: "Rashid Khan" },
  { id: "BK-003", tour: "Sajek Valley Adventure", location: "Rangamati", date: "2025-02-10", persons: 3, total: "৳14,700", status: "Completed", duration: "4 Days", guide: "Nusrat Jahan" },
  { id: "BK-004", tour: "Srimangal Tea Garden Tour", location: "Moulvibazar", date: "2025-01-20", persons: 2, total: "৳6,400", status: "Completed", duration: "1 Day", guide: "Farhan Ali" },
  { id: "BK-005", tour: "Saint Martin Island Getaway", location: "Cox's Bazar", date: "2025-05-12", persons: 5, total: "৳49,000", status: "Confirmed", duration: "3 Days", guide: "Sumon Roy" },
];

const statusColor = (s: string) =>
  s === "Confirmed" ? "default" : s === "Pending" ? "secondary" : "outline";

const MyBookings = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <CalendarCheck className="h-6 w-6 text-primary" /> My Bookings
      </h1>
      <Badge variant="secondary" className="text-xs">{bookings.length} Total</Badge>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Confirmed", count: bookings.filter(b => b.status === "Confirmed").length, color: "text-primary" },
        { label: "Pending", count: bookings.filter(b => b.status === "Pending").length, color: "text-accent" },
        { label: "Completed", count: bookings.filter(b => b.status === "Completed").length, color: "text-muted-foreground" },
        { label: "Total Spent", count: "৳100,600", color: "text-foreground" },
      ].map(s => (
        <Card key={s.label}>
          <CardContent className="p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-4">
      {bookings.map((b) => (
        <Card key={b.id} className="hover:shadow-card-hover transition-shadow">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{b.tour}</h3>
                  <Badge variant={statusColor(b.status)} className="text-xs">{b.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{b.location}</span>
                  <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" />{b.date}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{b.persons} persons</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground">Guide: <span className="text-foreground font-medium">{b.guide}</span> · Booking ID: <span className="font-mono">{b.id}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-foreground">{b.total}</p>
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="h-3.5 w-3.5 mr-1" /> Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MyBookings;