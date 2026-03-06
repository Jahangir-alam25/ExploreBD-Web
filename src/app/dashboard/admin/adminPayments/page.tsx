"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, DollarSign, TrendingUp, CreditCard, Download, ArrowUpRight, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyRevenue = [
  { month: "Aug", revenue: 78000, refunds: 3200 },
  { month: "Sep", revenue: 92000, refunds: 4100 },
  { month: "Oct", revenue: 105000, refunds: 2800 },
  { month: "Nov", revenue: 88000, refunds: 5600 },
  { month: "Dec", revenue: 145000, refunds: 6200 },
  { month: "Jan", revenue: 112000, refunds: 3900 },
  { month: "Feb", revenue: 135000, refunds: 4500 },
];

const transactions = [
  { id: "TXN-4501", customer: "Rahim Ahmed", tour: "Cox's Bazar Beach Tour", amount: 17000, method: "bKash", status: "Completed", date: "2025-02-28" },
  { id: "TXN-4502", customer: "Fatima Begum", tour: "Sundarbans Safari", amount: 22000, method: "Card", status: "Completed", date: "2025-02-27" },
  { id: "TXN-4503", customer: "Karim Hossain", tour: "Sajek Valley", amount: 12000, method: "Nagad", status: "Pending", date: "2025-02-26" },
  { id: "TXN-4504", customer: "Nusrat Jahan", tour: "Srimangal", amount: 9600, method: "bKash", status: "Refunded", date: "2025-02-25" },
  { id: "TXN-4505", customer: "Imran Khan", tour: "Saint Martin", amount: 19600, method: "Card", status: "Completed", date: "2025-02-24" },
  { id: "TXN-4506", customer: "Aisha Sultana", tour: "Bandarban Trek", amount: 32500, method: "Bank Transfer", status: "Completed", date: "2025-02-23" },
  { id: "TXN-4507", customer: "Tanvir Rahman", tour: "Rangpur Palace", amount: 5600, method: "bKash", status: "Completed", date: "2025-02-22" },
  { id: "TXN-4508", customer: "Sadia Islam", tour: "Sylhet Forest", amount: 21600, method: "Nagad", status: "Failed", date: "2025-02-21" },
];

const AdminPayments = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [txns, setTxns] = useState(transactions);

  const filtered = txns.filter((t) => {
    const matchSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = txns.filter(t => t.status === "Completed").reduce((a, t) => a + t.amount, 0);
  const totalRefunds = txns.filter(t => t.status === "Refunded").reduce((a, t) => a + t.amount, 0);

  const retryPayment = (id: string) => {
    setTxns(txns.map(t => t.id === id ? { ...t, status: "Pending" } : t));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, change: "+23%" },
          { label: "This Month", value: "৳1,35,000", icon: TrendingUp, change: "+18%" },
          { label: "Refunds", value: `৳${totalRefunds.toLocaleString()}`, icon: RefreshCw, change: "-5%" },
          { label: "Transactions", value: txns.length.toString(), icon: CreditCard, change: "+12%" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <s.icon className="h-4 w-4 text-primary" />
                <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>{s.change}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Revenue vs Refunds</CardTitle>
          <CardDescription>Monthly comparison over last 7 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `৳${v / 1000}k`} />
              <Tooltip formatter={(value: number) => [`৳${value.toLocaleString()}`, ""]} />
              <Bar dataKey="revenue" fill="hsl(174, 62%, 30%)" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="refunds" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="Refunds" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Tour</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell className="font-medium text-sm">{t.customer}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{t.tour}</TableCell>
                  <TableCell className="font-medium">৳{t.amount.toLocaleString()}</TableCell>
                  <TableCell className="hidden sm:table-cell"><Badge variant="outline">{t.method}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={t.status === "Completed" ? "default" : t.status === "Pending" ? "secondary" : t.status === "Refunded" ? "outline" : "destructive"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{t.date}</TableCell>
                  <TableCell className="text-right">
                    {t.status === "Failed" && (
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => retryPayment(t.id)}>
                        <RefreshCw className="h-3 w-3 mr-1" />Retry
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;