import { mockMagazines } from "@/lib/mockData";
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

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMagazines = mockMagazines.filter(mag => 
    mag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mag.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <TableCell className="text-right font-medium">${mag.price.toFixed(2)}</TableCell>
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
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <div className="h-4 w-4 rotate-90 flex items-center justify-center gap-[2px]">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      </div>
                    </Button>
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
