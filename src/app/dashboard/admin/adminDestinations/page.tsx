"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, MapPin, Eye, Star } from "lucide-react";

const initialDestinations = [
  { id: 1, name: "Cox's Bazar", division: "Chattogram", tours: 8, rating: 4.8, visitors: "2.5M", status: "Active", image: "/images/coxs-bazar.jpg", description: "World's longest natural sea beach" },
  { id: 2, name: "Sundarbans", division: "Khulna", tours: 4, rating: 4.6, visitors: "800K", status: "Active", image: "/images/sundarbans.jpg", description: "Largest mangrove forest in the world" },
  { id: 3, name: "Sajek Valley", division: "Rangamati", tours: 5, rating: 4.9, visitors: "1.2M", status: "Active", image: "/images/sajek-valley.jpg", description: "Queen of hills with cloud views" },
  { id: 4, name: "Srimangal", division: "Sylhet", tours: 3, rating: 4.4, visitors: "600K", status: "Active", image: "/images/srimangal.jpg", description: "Tea capital of Bangladesh" },
  { id: 5, name: "Bandarban", division: "Chattogram", tours: 6, rating: 4.7, visitors: "1.8M", status: "Active", image: "/images/sajek-valley.jpg", description: "Hill district with golden temples" },
  { id: 6, name: "Saint Martin", division: "Chattogram", tours: 3, rating: 4.5, visitors: "500K", status: "Seasonal", image: "/images/coxs-bazar.jpg", description: "Only coral island of Bangladesh" },
];

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editDest, setEditDest] = useState<typeof initialDestinations[0] | null>(null);
  const [form, setForm] = useState({ name: "", division: "", description: "", status: "Active" });

  const filtered = destinations.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.division.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    setDestinations([{ id: Date.now(), ...form, tours: 0, rating: 0, visitors: "0", image: "/images/hero-beach.jpg" }, ...destinations]);
    setShowAdd(false);
    setForm({ name: "", division: "", description: "", status: "Active" });
  };

  const handleEdit = () => {
    if (!editDest) return;
    setDestinations(destinations.map((d) => d.id === editDest.id ? { ...d, ...form } : d));
    setEditDest(null);
  };

  const handleDelete = (id: number) => setDestinations(destinations.filter((d) => d.id !== id));

  const openEdit = (d: typeof initialDestinations[0]) => {
    setEditDest(d);
    setForm({ name: d.name, division: d.division, description: d.description, status: d.status });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search destinations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-1" />Add Destination</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Destination</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Destination name" /></div>
              <div><Label>Division</Label><Input value={form.division} onChange={(e) => setForm({ ...form, division: e.target.value })} placeholder="Division" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" rows={3} /></div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleAdd} disabled={!form.name}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editDest} onOpenChange={(o) => !o && setEditDest(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Destination</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Division</Label><Input value={form.division} onChange={(e) => setForm({ ...form, division: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <Card key={d.id} className="overflow-hidden hover:shadow-card-hover transition-shadow group">
            <div className="relative h-40 overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <Badge className="absolute top-2 right-2" variant={d.status === "Active" ? "default" : "secondary"}>{d.status}</Badge>
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground text-lg">{d.name}</h3>
                <div className="flex items-center gap-1 text-sm text-accent"><Star className="h-3.5 w-3.5 fill-accent" />{d.rating || "N/A"}</div>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{d.division} Division</p>
              <p className="text-xs text-muted-foreground">{d.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>{d.tours} Tours</span>
                <span>{d.visitors} Visitors</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(d)}><Edit className="h-3.5 w-3.5 mr-1" />Edit</Button>
                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(d.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDestinations;