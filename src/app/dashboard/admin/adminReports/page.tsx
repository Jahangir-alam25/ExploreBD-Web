"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download } from "lucide-react";

const monthlyData = [
  { month: "Aug", bookings: 45, revenue: 78000, users: 120 },
  { month: "Sep", bookings: 58, revenue: 92000, users: 145 },
  { month: "Oct", bookings: 72, revenue: 105000, users: 180 },
  { month: "Nov", bookings: 55, revenue: 88000, users: 160 },
  { month: "Dec", bookings: 95, revenue: 145000, users: 220 },
  { month: "Jan", bookings: 82, revenue: 112000, users: 195 },
  { month: "Feb", bookings: 97, revenue: 135000, users: 240 },
];

const destinationData = [
  { name: "Cox's Bazar", bookings: 245 },
  { name: "Sundarbans", bookings: 156 },
  { name: "Sajek Valley", bookings: 198 },
  { name: "Srimangal", bookings: 89 },
  { name: "Bandarban", bookings: 167 },
  { name: "Saint Martin", bookings: 134 },
];

const sourceData = [
  { name: "Direct", value: 40, color: "hsl(174, 62%, 30%)" },
  { name: "Google", value: 30, color: "hsl(38, 80%, 55%)" },
  { name: "Social", value: 20, color: "hsl(200, 40%, 50%)" },
  { name: "Referral", value: 10, color: "hsl(0, 84%, 60%)" },
];

const weeklyBookings = [
  { day: "Mon", bookings: 12 }, { day: "Tue", bookings: 18 }, { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 22 }, { day: "Fri", bookings: 28 }, { day: "Sat", bookings: 35 }, { day: "Sun", bookings: 30 },
];

const AdminReports = () => {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {(["7d", "30d", "90d", "1y"] as const).map((p) => (
            <Button key={p} variant={period === p ? "default" : "outline"} size="sm" onClick={() => setPeriod(p)}>
              {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Conversion Rate", value: "4.8%", change: "+0.5%", up: true },
          { label: "Avg. Order Value", value: "৳8,450", change: "+12%", up: true },
          { label: "Customer Retention", value: "68%", change: "+3%", up: true },
          { label: "Cancellation Rate", value: "5.2%", change: "-1.1%", up: true },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
              <span className={`text-xs font-medium ${s.up ? "text-primary" : "text-destructive"}`}>{s.change}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Bookings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Revenue Trend</CardTitle><CardDescription>Monthly revenue over time</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="reportRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174, 62%, 30%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `৳${v / 1000}k`} />
                <Tooltip formatter={(value: number) => [`৳${value.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(174, 62%, 30%)" strokeWidth={2} fill="url(#reportRevGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">User Growth</CardTitle><CardDescription>New user registrations</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="hsl(38, 80%, 55%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(38, 80%, 55%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Destination & Source */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Top Destinations</CardTitle><CardDescription>Bookings by destination</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={destinationData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Bar dataKey="bookings" fill="hsl(174, 62%, 30%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Traffic Sources</CardTitle><CardDescription>Where bookings come from</CardDescription></CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name} ({s.value}%)
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Pattern */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Weekly Booking Pattern</CardTitle><CardDescription>Average bookings by day of week</CardDescription></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyBookings}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Bar dataKey="bookings" fill="hsl(38, 80%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;