import { CreditCard, Download, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const payments = [
  { id: "PAY-001", tour: "Cox's Bazar Beach Tour", amount: "৳8,500", date: "Mar 15, 2025", method: "bKash", status: "Paid" },
  { id: "PAY-002", tour: "Sundarbans Adventure", amount: "৳22,000", date: "Apr 02, 2025", method: "Nagad", status: "Pending" },
  { id: "PAY-003", tour: "Sajek Valley Trip", amount: "৳14,700", date: "Feb 10, 2025", method: "Card", status: "Paid" },
  { id: "PAY-004", tour: "Srimangal Tea Tour", amount: "৳3,200", date: "Jan 05, 2025", method: "bKash", status: "Refunded" },
  { id: "PAY-005", tour: "Saint Martin Getaway", amount: "৳49,000", date: "May 12, 2025", method: "Card", status: "Paid" },
  { id: "PAY-006", tour: "Bandarban Trek", amount: "৳6,500", date: "Dec 20, 2024", method: "Nagad", status: "Paid" },
];

const totalPaid = "৳100,900";
const totalPending = "৳22,000";
const totalRefunded = "৳3,200";

const Payments = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" /> Payment History
      </h1>
      <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-primary/10"><TrendingUp className="h-5 w-5 text-primary" /></div>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-3">{totalPaid}</p>
          <p className="text-xs text-muted-foreground">Total Paid</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <div className="p-2 rounded-xl bg-accent/10 w-fit"><CreditCard className="h-5 w-5 text-accent" /></div>
          <p className="text-2xl font-bold text-foreground mt-3">{totalPending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <div className="p-2 rounded-xl bg-destructive/10 w-fit"><CreditCard className="h-5 w-5 text-destructive" /></div>
          <p className="text-2xl font-bold text-foreground mt-3">{totalRefunded}</p>
          <p className="text-xs text-muted-foreground">Refunded</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Tour</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="font-medium">{p.tour}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{p.method}</Badge></TableCell>
                <TableCell className="font-semibold">{p.amount}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.date}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "Paid" ? "default" : p.status === "Pending" ? "secondary" : "outline"}>
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default Payments;