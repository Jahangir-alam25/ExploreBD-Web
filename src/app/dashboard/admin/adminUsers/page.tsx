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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Eye, Ban, ShieldCheck, Mail, UserCheck, UserX } from "lucide-react";

const initialUsers = [
  { id: 1, name: "Rahim Ahmed", email: "rahim@example.com", role: "User", status: "Active", bookings: 12, spent: 85000, joined: "2024-01-15", lastActive: "2 hours ago" },
  { id: 2, name: "Fatima Begum", email: "fatima@example.com", role: "User", status: "Active", bookings: 8, spent: 52000, joined: "2024-02-20", lastActive: "1 day ago" },
  { id: 3, name: "Karim Hossain", email: "karim@example.com", role: "Admin", status: "Active", bookings: 5, spent: 34000, joined: "2023-11-10", lastActive: "30 min ago" },
  { id: 4, name: "Nusrat Jahan", email: "nusrat@example.com", role: "User", status: "Suspended", bookings: 3, spent: 18000, joined: "2024-03-05", lastActive: "1 week ago" },
  { id: 5, name: "Imran Khan", email: "imran@example.com", role: "User", status: "Active", bookings: 15, spent: 120000, joined: "2023-09-22", lastActive: "5 hours ago" },
  { id: 6, name: "Aisha Sultana", email: "aisha@example.com", role: "Moderator", status: "Active", bookings: 7, spent: 48000, joined: "2024-01-28", lastActive: "3 hours ago" },
  { id: 7, name: "Tanvir Rahman", email: "tanvir@example.com", role: "User", status: "Active", bookings: 2, spent: 11200, joined: "2024-05-10", lastActive: "2 days ago" },
  { id: 8, name: "Sadia Islam", email: "sadia@example.com", role: "User", status: "Inactive", bookings: 0, spent: 0, joined: "2024-06-01", lastActive: "1 month ago" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [viewUser, setViewUser] = useState<typeof initialUsers[0] | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: number) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  const changeRole = (id: number, role: string) => {
    setUsers(users.map((u) => u.id === id ? { ...u, role } : u));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length },
          { label: "Active Users", value: users.filter((u) => u.status === "Active").length },
          { label: "Admins", value: users.filter((u) => u.role === "Admin").length },
          { label: "Total Revenue", value: `৳${users.reduce((a, u) => a + u.spent, 0).toLocaleString()}` },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-2xl font-bold text-foreground mt-1">{s.value}</p></CardContent></Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={!!viewUser} onOpenChange={(o) => !o && setViewUser(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>User Profile</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{viewUser.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-foreground">{viewUser.name}</p>
                  <p className="text-sm text-muted-foreground">{viewUser.email}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={viewUser.role === "Admin" ? "default" : "secondary"}>{viewUser.role}</Badge>
                    <Badge variant={viewUser.status === "Active" ? "default" : "destructive"}>{viewUser.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Bookings:</span><p className="font-medium text-foreground">{viewUser.bookings}</p></div>
                <div><span className="text-muted-foreground">Total Spent:</span><p className="font-medium text-foreground">৳{viewUser.spent.toLocaleString()}</p></div>
                <div><span className="text-muted-foreground">Joined:</span><p className="font-medium text-foreground">{viewUser.joined}</p></div>
                <div><span className="text-muted-foreground">Last Active:</span><p className="font-medium text-foreground">{viewUser.lastActive}</p></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Mail className="h-4 w-4 mr-1" />Send Email</Button>
                <Button size="sm" variant={viewUser.status === "Active" ? "destructive" : "default"} onClick={() => { toggleStatus(viewUser.id); setViewUser({ ...viewUser, status: viewUser.status === "Active" ? "Suspended" : "Active" }); }}>
                  {viewUser.status === "Active" ? <><Ban className="h-4 w-4 mr-1" />Suspend</> : <><UserCheck className="h-4 w-4 mr-1" />Activate</>}
                </Button>
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
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="hidden sm:table-cell">Bookings</TableHead>
                <TableHead className="hidden md:table-cell">Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{u.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant={u.role === "Admin" ? "default" : "secondary"}>{u.role}</Badge></TableCell>
                  <TableCell className="hidden sm:table-cell">{u.bookings}</TableCell>
                  <TableCell className="hidden md:table-cell">৳{u.spent.toLocaleString()}</TableCell>
                  <TableCell><Badge variant={u.status === "Active" ? "default" : u.status === "Suspended" ? "destructive" : "secondary"}>{u.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewUser(u)}><Eye className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeRole(u.id, "Admin")}><ShieldCheck className="h-4 w-4 mr-2" />Make Admin</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(u.id)} className={u.status === "Active" ? "text-destructive" : ""}>
                          {u.status === "Active" ? <><UserX className="h-4 w-4 mr-2" />Suspend</> : <><UserCheck className="h-4 w-4 mr-2" />Activate</>}
                        </DropdownMenuItem>
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

export default AdminUsers;