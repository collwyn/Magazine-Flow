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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useMagazines, useUpdateMagazine } from "@/hooks/useApi";
import type { Magazine } from "@shared/schema";
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
import { toast } from "sonner";

export default function Inventory() {
  const { data: magazines = [], isLoading } = useMagazines();
  const updateMagazine = useUpdateMagazine();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMagazine, setEditingMagazine] = useState<Magazine | null>(null);
  const [editForm, setEditForm] = useState<Partial<Magazine>>({});

  const filteredMagazines = magazines.filter(mag => 
    mag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mag.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (magazine: Magazine) => {
    setEditingMagazine(magazine);
    setEditForm(magazine);
  };

  const handleSave = () => {
    if (editingMagazine && editForm) {
      const { id, createdAt, ...updateData } = editForm;
      updateMagazine.mutate(
        { id: editingMagazine.id, data: updateData },
        {
          onSuccess: () => {
            toast.success("Magazine updated successfully");
            setEditingMagazine(null);
          },
          onError: (error) => {
            toast.error(`Failed to update: ${error.message}`);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading magazines...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Inventory</h2>
          <p className="text-muted-foreground mt-1">Manage magazine stock and catalog.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Magazine
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or SKU..."
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
                <TableHead className="w-[80px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMagazines.map((mag) => (
                <TableRow key={mag.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="w-10 h-14 bg-muted rounded overflow-hidden shadow-sm">
                        <img src={mag.coverUrl} alt={mag.title} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{mag.title}
                    <div className="text-xs text-muted-foreground font-normal">{mag.publisher}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal text-muted-foreground bg-secondary/50">
                        {mag.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{mag.sku}</TableCell>
                  <TableCell className="text-right font-medium">${parseFloat(mag.price).toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                         <span className={mag.stock < 50 ? "text-destructive font-bold" : ""}>{mag.stock}</span>
                         {mag.stock < 50 && (
                             <Badge variant="destructive" className="h-5 px-1 text-[10px] gap-0.5">
                                 <AlertTriangle className="h-3 w-3" /> Low
                             </Badge>
                         )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        mag.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                        {mag.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={editingMagazine?.id === mag.id} onOpenChange={(open) => !open && setEditingMagazine(null)}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(mag)}>Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Magazine</DialogTitle>
                          <DialogDescription>
                            Make changes to the magazine details below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={editForm.title || ''} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input id="price" type="number" step="0.01" value={editForm.price || '0'} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">Stock</Label>
                            <Input id="stock" type="number" value={editForm.stock || 0} onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="publisher" className="text-right">Publisher</Label>
                            <Input id="publisher" value={editForm.publisher || ''} onChange={(e) => setEditForm({...editForm, publisher: e.target.value})} className="col-span-3" />
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
