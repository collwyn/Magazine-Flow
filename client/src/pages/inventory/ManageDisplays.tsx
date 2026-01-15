import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { DisplayProduct } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ManageDisplays() {
  const { displays, updateDisplay } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDisplay, setEditingDisplay] = useState<DisplayProduct | null>(null);
  const [editForm, setEditForm] = useState<Partial<DisplayProduct>>({});

  const filteredDisplays = displays.filter(display => 
    display.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (display: DisplayProduct) => {
    setEditingDisplay(display);
    setEditForm(display);
  };

  const handleSave = () => {
    if (editingDisplay && editForm) {
      updateDisplay(editingDisplay.id, editForm);
      setEditingDisplay(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Manage Displays</h2>
          <p className="text-muted-foreground mt-1">Update display fixture information.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Display
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/60">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisplays.map((display) => (
                <TableRow key={display.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="w-10 h-10 bg-muted rounded overflow-hidden shadow-sm">
                        <img src={display.imageUrl} alt={display.name} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{display.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize font-normal text-muted-foreground bg-secondary/50">
                        {display.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{display.dimensions}</TableCell>
                  <TableCell className="text-right font-medium">${display.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        display.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {display.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={editingDisplay?.id === display.id} onOpenChange={(open) => !open && setEditingDisplay(null)}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(display)}>Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Edit Display Fixture</DialogTitle>
                          <DialogDescription>
                            Update the display product details.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={editForm.name || ''} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input id="price" type="number" step="0.01" value={editForm.price || 0} onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Select 
                              value={editForm.type} 
                              onValueChange={(value: "floor" | "wall") => setEditForm({...editForm, type: value})}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="floor">Floor</SelectItem>
                                <SelectItem value="wall">Wall</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={editForm.description || ''} onChange={(e) => setEditForm({...editForm, description: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleSave}>Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}