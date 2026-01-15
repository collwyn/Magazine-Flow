import { mockMagazines } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredMagazines = mockMagazines.filter(mag => 
    mag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mag.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (title: string) => {
    toast({
        title: "Added to order",
        description: `10 copies of ${title} added to your draft order.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Catalog</h2>
          <p className="text-muted-foreground mt-1">Browse and order magazines for your store.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" /> View Current Order (0)
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or category..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMagazines.map((mag) => (
            <Card key={mag.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    <img 
                        src={mag.coverUrl} 
                        alt={mag.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">{mag.category}</Badge>
                    </div>
                </div>
                <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-heading font-bold text-lg leading-tight">{mag.title}</h3>
                            <p className="text-xs text-muted-foreground">{mag.publisher}</p>
                        </div>
                        <div className="text-right">
                             <span className="block font-bold text-primary">${mag.price}</span>
                             <span className="text-[10px] text-muted-foreground">MSRP</span>
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1">
                        Stock: <span className={mag.stock < 50 ? "text-amber-600 font-medium" : "text-emerald-600 font-medium"}>
                            {mag.stock > 0 ? "Available" : "Out of Stock"}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button onClick={() => handleAddToCart(mag.title)} className="w-full" variant="secondary">
                        <Plus className="h-4 w-4 mr-2" /> Add to Order
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
