"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, CalendarCheck, MoreHorizontal, Eye, CheckCircle, XCircle, Download } from "lucide-react";

const initialBookings = [
  { id: "BK-2401", customer: "Rahim Ahmed", email: "rahim@example.com", tour: "Cox's Bazar 3-Day Beach Tour", date: "2025-03-15", guests: 2, amount: 17000, status: "Confirmed", payment: "Paid", createdAt: "2025-02-20" },
  { id: "BK-2402", customer: "Fatima Begum", email: "fatima@example.com", tour: "Sundarbans Wildlife Safari", date: "2025-03-22", guests: 4, amount: 22000, status: "Pending", payment: "Unpaid", createdAt: "2025-02-21" },
  { id: "BK-2403", customer: "Karim Hossain", email: "karim@example.com", tour: "Sajek Valley Adventure", date: "2025-04-01", guests: 1, amount: 12000, status: "Confirmed", payment: "Paid", createdAt: "2025-02-22" },
  { id: "BK-2404", customer: "Nusrat Jahan", email: "nusrat@example.com", tour: "Srimangal Tea Garden", date: "2025-03-28", guests: 3, amount: 9600, status: "Cancelled", payment: "Refunded", createdAt: "2025-02-23" },
  { id: "BK-2405", customer: "Imran Khan", email: "imran@example.com", tour: "Saint Martin Getaway", date: "2025-04-10", guests: 2, amount: 19600, status: "Confirmed", payment: "Paid", createdAt: "2025-02-24" },
  { id: "BK-2406", customer: "Aisha Sultana", email: "aisha@example.com", tour: "Bandarban Trek", date: "2025-04-05", guests: 5, amount: 32500, status: "Pending", payment: "Partial", createdAt: "2025-02-25" },
  { id: "BK-2407", customer: "Tanvir Rahman", email: "tanvir@example.com", tour: "Rangpur Palace Tour", date: "2025-03-30", guests: 2, amount: 5600, status: "Confirmed", payment: "Paid", createdAt: "2025-02-26" },
  { id: "BK-2408", customer: "Sadia Islam", email: "sadia@example.com", tour: "Sylhet Swamp Forest", date: "2025-04-08", guests: 3, amount: 21600, status: "Pending", payment: "Unpaid", createdAt: "2025-02-27" },
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewBooking, setViewBooking] = useState<typeof initialBookings[0] | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.tour.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: CalendarCheck },
    { label: "Confirmed", value: bookings.filter((b) => b.status === "Confirmed").length },
    { label: "Pending", value: bookings.filter((b) => b.status === "Pending").length },
    { label: "Revenue", value: `৳${bookings.filter((b) => b.status !== "Cancelled").reduce((a, b) => a + b.amount, 0).toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-2xl font-bold text-foreground mt-1">{s.value}</p></CardContent></Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export CSV</Button>
      </div>

      <Dialog open={!!viewBooking} onOpenChange={(o) => !o && setViewBooking(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Booking Details - {viewBooking?.id}</DialogTitle></DialogHeader>
          {viewBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Customer:</span><p className="font-medium text-foreground">{viewBooking.customer}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="font-medium text-foreground">{viewBooking.email}</p></div>
                <div><span className="text-muted-foreground">Tour:</span><p className="font-medium text-foreground">{viewBooking.tour}</p></div>
                <div><span className="text-muted-foreground">Travel Date:</span><p className="font-medium text-foreground">{viewBooking.date}</p></div>
                <div><span className="text-muted-foreground">Guests:</span><p className="font-medium text-foreground">{viewBooking.guests}</p></div>
                <div><span className="text-muted-foreground">Amount:</span><p className="font-medium text-foreground">৳{viewBooking.amount.toLocaleString()}</p></div>
                <div><span className="text-muted-foreground">Status:</span><p><Badge variant={viewBooking.status === "Confirmed" ? "default" : viewBooking.status === "Pending" ? "secondary" : "destructive"}>{viewBooking.status}</Badge></p></div>
                <div><span className="text-muted-foreground">Payment:</span><p><Badge variant="outline">{viewBooking.payment}</Badge></p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Tour</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground text-sm">{b.customer}</p>
                    <p className="text-xs text-muted-foreground">{b.email}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{b.tour}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{b.date}</TableCell>
                  <TableCell className="font-medium">৳{b.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge variant={b.status === "Confirmed" ? "default" : b.status === "Pending" ? "secondary" : "destructive"}>{b.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewBooking(b)}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(b.id, "Confirmed")}><CheckCircle className="h-4 w-4 mr-2" />Confirm</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(b.id, "Cancelled")} className="text-destructive"><XCircle className="h-4 w-4 mr-2" />Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminBookings;