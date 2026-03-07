"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, Package, MoreHorizontal, Copy } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialTours = [
  { id: 1, title: "Cox's Bazar 3-Day Beach Tour", location: "Cox's Bazar", duration: "3 Days", price: 8500, status: "Active", bookings: 124, rating: 4.8, featured: true },
  { id: 2, title: "Sundarbans Wildlife Safari", location: "Khulna", duration: "2 Days", price: 5500, status: "Active", bookings: 89, rating: 4.6, featured: false },
  { id: 3, title: "Sajek Valley Cloud Adventure", location: "Rangamati", duration: "4 Days", price: 12000, status: "Sold Out", bookings: 203, rating: 4.9, featured: true },
  { id: 4, title: "Srimangal Tea Garden Explorer", location: "Moulvibazar", duration: "1 Day", price: 3200, status: "Active", bookings: 56, rating: 4.4, featured: false },
  { id: 5, title: "Saint Martin Island Getaway", location: "Cox's Bazar", duration: "3 Days", price: 9800, status: "Active", bookings: 167, rating: 4.7, featured: true },
  { id: 6, title: "Bandarban Golden Temple Trek", location: "Bandarban", duration: "2 Days", price: 6500, status: "Draft", bookings: 0, rating: 0, featured: false },
  { id: 7, title: "Rangpur Tajhat Palace Tour", location: "Rangpur", duration: "1 Day", price: 2800, status: "Active", bookings: 34, rating: 4.2, featured: false },
  { id: 8, title: "Sylhet Ratargul Swamp Forest", location: "Sylhet", duration: "2 Days", price: 7200, status: "Active", bookings: 72, rating: 4.5, featured: false },
];

const AdminTours = () => {
  const [tours, setTours] = useState(initialTours);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTour, setEditingTour] = useState<typeof initialTours[0] | null>(null);
  const [viewTour, setViewTour] = useState<typeof initialTours[0] | null>(null);

  const [formData, setFormData] = useState({ title: "", location: "", duration: "", price: "", status: "Active", featured: false, description: "" });

  const filtered = tours.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: number) => {
    setTours(tours.filter((t) => t.id !== id));
  };

  const handleDuplicate = (tour: typeof initialTours[0]) => {
    const newTour = { ...tour, id: Date.now(), title: `${tour.title} (Copy)`, bookings: 0, status: "Draft", rating: 0 };
    setTours([newTour, ...tours]);
  };

  const handleAdd = () => {
    const newTour = {
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      duration: formData.duration,
      price: parseInt(formData.price) || 0,
      status: formData.status,
      bookings: 0,
      rating: 0,
      featured: formData.featured,
    };
    setTours([newTour, ...tours]);
    setShowAddDialog(false);
    setFormData({ title: "", location: "", duration: "", price: "", status: "Active", featured: false, description: "" });
  };

  const handleEdit = () => {
    if (!editingTour) return;
    setTours(tours.map((t) => (t.id === editingTour.id ? { ...editingTour, ...formData, price: parseInt(formData.price) || editingTour.price } : t)));
    setEditingTour(null);
    setFormData({ title: "", location: "", duration: "", price: "", status: "Active", featured: false, description: "" });
  };

  const openEdit = (tour: typeof initialTours[0]) => {
    setEditingTour(tour);
    setFormData({ title: tour.title, location: tour.location, duration: tour.duration, price: tour.price.toString(), status: tour.status, featured: tour.featured, description: "" });
  };

  const statusColor = (s: string) => s === "Active" ? "default" : s === "Sold Out" ? "destructive" : "secondary";

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tours", value: tours.length, icon: Package },
          { label: "Active Tours", value: tours.filter((t) => t.status === "Active").length, icon: Eye },
          { label: "Total Bookings", value: tours.reduce((a, t) => a + t.bookings, 0), icon: Package },
          { label: "Avg Rating", value: (tours.filter((t) => t.rating > 0).reduce((a, t) => a + t.rating, 0) / tours.filter((t) => t.rating > 0).length).toFixed(1), icon: Package },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tours..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Sold Out">Sold Out</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Add Tour</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Tour</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Tour Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter tour title" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Location</Label><Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Location" /></div>
                <div><Label>Duration</Label><Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 3 Days" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Price (৳)</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" /></div>
                <div><Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Tour description..." rows={3} /></div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleAdd} disabled={!formData.title || !formData.location}>Add Tour</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTour} onOpenChange={(o) => !o && setEditingTour(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Tour</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Tour Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Location</Label><Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} /></div>
              <div><Label>Duration</Label><Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Price (৳)</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} /></div>
              <div><Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Sold Out">Sold Out</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewTour} onOpenChange={(o) => !o && setViewTour(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{viewTour?.title}</DialogTitle></DialogHeader>
          {viewTour && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{viewTour.location}</span></div>
                <div><span className="text-muted-foreground">Duration:</span> <span className="font-medium text-foreground">{viewTour.duration}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="font-medium text-foreground">৳{viewTour.price.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant={statusColor(viewTour.status)}>{viewTour.status}</Badge></div>
                <div><span className="text-muted-foreground">Bookings:</span> <span className="font-medium text-foreground">{viewTour.bookings}</span></div>
                <div><span className="text-muted-foreground">Rating:</span> <span className="font-medium text-foreground">{viewTour.rating || "N/A"}</span></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{tour.title}</span>
                      {tour.featured && <Badge variant="secondary" className="text-[10px] px-1 py-0">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{tour.location}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{tour.duration}</TableCell>
                  <TableCell className="font-medium">৳{tour.price.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{tour.bookings}</TableCell>
                  <TableCell><Badge variant={statusColor(tour.status)}>{tour.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewTour(tour)}><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(tour)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(tour)}><Copy className="h-4 w-4 mr-2" />Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(tour.id)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
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

export default AdminTours;