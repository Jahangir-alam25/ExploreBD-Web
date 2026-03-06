"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, FileText, Calendar, MessageSquare } from "lucide-react";

const initialPosts = [
  { id: 1, title: "Top 10 Beaches in Bangladesh You Must Visit", author: "Admin", category: "Travel Guide", status: "Published", views: 12400, comments: 45, date: "2025-02-15" },
  { id: 2, title: "Complete Guide to Sundarbans Safari", author: "Karim Hossain", category: "Adventure", status: "Published", views: 8900, comments: 32, date: "2025-02-10" },
  { id: 3, title: "Budget-Friendly Travel Tips for Cox's Bazar", author: "Fatima Begum", category: "Tips", status: "Published", views: 15600, comments: 67, date: "2025-01-28" },
  { id: 4, title: "Why Sajek Valley Should Be Your Next Destination", author: "Admin", category: "Destinations", status: "Draft", views: 0, comments: 0, date: "2025-02-22" },
  { id: 5, title: "Best Street Food to Try in Dhaka", author: "Nusrat Jahan", category: "Food", status: "Published", views: 21300, comments: 89, date: "2025-01-15" },
  { id: 6, title: "Monsoon Travel: A Different Experience", author: "Admin", category: "Seasonal", status: "Draft", views: 0, comments: 0, date: "2025-02-25" },
  { id: 7, title: "Photography Guide for Hill Tracts", author: "Imran Khan", category: "Photography", status: "Published", views: 7200, comments: 28, date: "2025-02-05" },
];

const AdminBlog = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editPost, setEditPost] = useState<typeof initialPosts[0] | null>(null);
  const [form, setForm] = useState({ title: "", category: "", content: "", status: "Draft" });

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    setPosts([{ id: Date.now(), ...form, author: "Admin", views: 0, comments: 0, date: new Date().toISOString().split("T")[0] }, ...posts]);
    setShowAdd(false);
    setForm({ title: "", category: "", content: "", status: "Draft" });
  };

  const handleEdit = () => {
    if (!editPost) return;
    setPosts(posts.map((p) => p.id === editPost.id ? { ...p, title: form.title, category: form.category, status: form.status } : p));
    setEditPost(null);
  };

  const handleDelete = (id: number) => setPosts(posts.filter((p) => p.id !== id));
  const togglePublish = (id: number) => setPosts(posts.map((p) => p.id === id ? { ...p, status: p.status === "Published" ? "Draft" : "Published" } : p));

  const openEdit = (p: typeof initialPosts[0]) => {
    setEditPost(p);
    setForm({ title: p.title, category: p.category, content: "", status: p.status });
  };

  const totalViews = posts.reduce((a, p) => a + p.views, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: posts.length, icon: FileText },
          { label: "Published", value: posts.filter((p) => p.status === "Published").length },
          { label: "Total Views", value: totalViews.toLocaleString() },
          { label: "Comments", value: posts.reduce((a, p) => a + p.comments, 0) },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-2xl font-bold text-foreground mt-1">{s.value}</p></CardContent></Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-1" />New Post</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Blog Post</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Travel Guide" /></div>
              <div><Label>Content</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your blog post..." rows={6} /></div>
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleAdd} disabled={!form.title}>Create Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editPost} onOpenChange={(o) => !o && setEditPost(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Post</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Draft">Draft</SelectItem><SelectItem value="Published">Published</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Author</TableHead>
                <TableHead className="hidden md:table-cell">Views</TableHead>
                <TableHead className="hidden md:table-cell">Comments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <p className="font-medium text-foreground text-sm">{p.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant="outline">{p.category}</Badge></TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{p.author}</TableCell>
                  <TableCell className="hidden md:table-cell"><span className="flex items-center gap-1 text-sm"><Eye className="h-3 w-3" />{p.views.toLocaleString()}</span></TableCell>
                  <TableCell className="hidden md:table-cell"><span className="flex items-center gap-1 text-sm"><MessageSquare className="h-3 w-3" />{p.comments}</span></TableCell>
                  <TableCell><Badge variant={p.status === "Published" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(p)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(p.id)}><Eye className="h-4 w-4 mr-2" />{p.status === "Published" ? "Unpublish" : "Publish"}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
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

export default AdminBlog;