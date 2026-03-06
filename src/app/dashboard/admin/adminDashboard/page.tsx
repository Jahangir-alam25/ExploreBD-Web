"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, CreditCard, Package, TrendingUp, TrendingDown, ArrowUpRight,
  CalendarCheck, Star, Eye, DollarSign, MapPin, Clock
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000, bookings: 32 },
  { month: "Feb", revenue: 52000, bookings: 41 },
  { month: "Mar", revenue: 61000, bookings: 55 },
  { month: "Apr", revenue: 78000, bookings: 68 },
  { month: "May", revenue: 95000, bookings: 82 },
  { month: "Jun", revenue: 112000, bookings: 97 },
  { month: "Jul", revenue: 135000, bookings: 115 },
];

const tourCategoryData = [
  { name: "Beach", value: 35, color: "hsl(174, 62%, 30%)" },
  { name: "Adventure", value: 25, color: "hsl(38, 80%, 55%)" },
  { name: "Wildlife", value: 20, color: "hsl(200, 40%, 50%)" },
  { name: "Cultural", value: 20, color: "hsl(0, 84%, 60%)" },
];

const recentBookings = [
  { id: "BK-2401", customer: "Rahim Ahmed", tour: "Cox's Bazar 3-Day Beach Tour", amount: "৳8,500", status: "Confirmed", date: "2 hours ago" },
  { id: "BK-2402", customer: "Fatima Begum", tour: "Sundarbans Wildlife Safari", amount: "৳5,500", status: "Pending", date: "4 hours ago" },
  { id: "BK-2403", customer: "Karim Hossain", tour: "Sajek Valley Adventure", amount: "৳12,000", status: "Confirmed", date: "6 hours ago" },
  { id: "BK-2404", customer: "Nusrat Jahan", tour: "Srimangal Tea Garden", amount: "৳3,200", status: "Cancelled", date: "8 hours ago" },
  { id: "BK-2405", customer: "Imran Khan", tour: "Saint Martin Getaway", amount: "৳9,800", status: "Confirmed", date: "12 hours ago" },
];

const topTours = [
  { name: "Cox's Bazar Beach Tour", bookings: 124, revenue: "৳10,54,000", trend: "+12%" },
  { name: "Sajek Valley Adventure", bookings: 98, revenue: "৳11,76,000", trend: "+8%" },
  { name: "Sundarbans Safari", bookings: 89, revenue: "৳4,89,500", trend: "+15%" },
  { name: "Saint Martin Getaway", bookings: 76, revenue: "৳7,44,800", trend: "-3%" },
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const stats = [
    { label: "Total Revenue", value: "৳5,78,000", change: "+23.5%", up: true, icon: DollarSign, color: "text-primary" },
    { label: "Total Bookings", value: "490", change: "+18.2%", up: true, icon: CalendarCheck, color: "text-accent" },
    { label: "Active Users", value: "2,847", change: "+12.8%", up: true, icon: Users, color: "text-primary" },
    { label: "Avg. Rating", value: "4.7", change: "+0.3", up: true, icon: Star, color: "text-accent" },
    { label: "Active Tours", value: "24", change: "+4", up: true, icon: Package, color: "text-primary" },
    { label: "Page Views", value: "45.2K", change: "+31.4%", up: true, icon: Eye, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div className="flex items-center gap-2">
        {(["7d", "30d", "90d"] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
          </Button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-primary" : "text-destructive"}`}>
                  {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `৳${v / 1000}k`} />
                <Tooltip formatter={(value: number) => [`৳${value.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(174, 62%, 30%)" strokeWidth={2} fill="url(#adminRevenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tour Categories</CardTitle>
            <CardDescription>Booking distribution by type</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={tourCategoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {tourCategoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2">
              {tourCategoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name} ({cat.value}%)
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Bookings</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All <ArrowUpRight className="h-3 w-3 ml-1" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{booking.customer}</p>
                    <Badge variant={booking.status === "Confirmed" ? "default" : booking.status === "Pending" ? "secondary" : "destructive"} className="text-[10px] px-1.5 py-0">
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{booking.tour}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-2.5 w-2.5" />{booking.date}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-semibold text-foreground">{booking.amount}</p>
                  <p className="text-[10px] text-muted-foreground">{booking.id}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Tours */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Performing Tours</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All <ArrowUpRight className="h-3 w-3 ml-1" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={50 * topTours.length + 20}>
              <BarChart data={topTours} layout="vertical" margin={{ left: 0, right: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={140} axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip formatter={(value: number) => [value, "Bookings"]} />
                <Bar dataKey="bookings" fill="hsl(174, 62%, 30%)" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {topTours.map((tour) => (
                <div key={tour.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{tour.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{tour.revenue}</span>
                    <Badge variant={tour.trend.startsWith("+") ? "default" : "destructive"} className="text-[10px] px-1.5 py-0">
                      {tour.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;