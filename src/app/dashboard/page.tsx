"use client";
import { CalendarCheck, Map, CreditCard, Star, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Bookings", value: "12", icon: CalendarCheck, color: "text-primary", bg: "bg-primary/10", change: "+3", up: true },
  { label: "Tours Visited", value: "8", icon: Map, color: "text-accent", bg: "bg-accent/10", change: "+2", up: true },
  { label: "Total Spent", value: "৳45,200", icon: CreditCard, color: "text-primary", bg: "bg-primary/10", change: "৳8,500", up: true },
  { label: "Reviews Given", value: "6", icon: Star, color: "text-accent", bg: "bg-accent/10", change: "+1", up: true },
];

const spendingData = [
  { month: "Jan", amount: 3200 },
  { month: "Feb", amount: 5800 },
  { month: "Mar", amount: 8500 },
  { month: "Apr", amount: 4200 },
  { month: "May", amount: 7100 },
  { month: "Jun", amount: 9500 },
  { month: "Jul", amount: 6800 },
  { month: "Aug", amount: 12000 },
];

const recentBookings = [
  { id: 1, tour: "Cox's Bazar Beach Tour", date: "Mar 15, 2025", status: "Confirmed", amount: "৳8,500" },
  { id: 2, tour: "Sundarbans Adventure", date: "Apr 02, 2025", status: "Pending", amount: "৳22,000" },
  { id: 3, tour: "Sajek Valley Trip", date: "Feb 10, 2025", status: "Completed", amount: "৳14,700" },
];

const upcomingTours = [
  { id: 1, title: "Cox's Bazar Beach Tour", date: "Mar 15, 2025", persons: 2, daysLeft: 10 },
  { id: 2, title: "Sundarbans Wildlife Safari", date: "Apr 02, 2025", persons: 4, daysLeft: 28 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Welcome Back, Rahim! 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your travel plans.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Spending Overview</CardTitle>
              <Badge variant="secondary" className="text-xs">Last 8 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`৳${value.toLocaleString()}`, "Amount"]}
                />
                <Area type="monotone" dataKey="amount" stroke="hsl(174, 62%, 30%)" fill="url(#colorAmount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Tours */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Upcoming Tours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTours.map((tour) => (
              <div key={tour.id} className="p-3 rounded-xl bg-muted/50 space-y-2">
                <p className="text-sm font-semibold text-foreground">{tour.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>📅 {tour.date}</span>
                  <span>👤 {tour.persons}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {tour.daysLeft} days left
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Bookings</CardTitle>
            <a href="/dashboard/MyBookings" className="text-xs text-primary hover:underline font-medium">View all →</a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{b.tour}</p>
                  <p className="text-xs text-muted-foreground">{b.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{b.amount}</p>
                  <Badge
                    variant={b.status === "Confirmed" ? "default" : b.status === "Pending" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {b.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;