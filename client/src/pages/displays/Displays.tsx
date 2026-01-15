import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Ruler, Box, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";

export default function Displays() {
  const { displays } = useData();
  const [selectedType, setSelectedType] = useState<"all" | "floor" | "wall">("all");
  
  const filteredDisplays = selectedType === "all" 
    ? displays
    : displays.filter(d => d.type === selectedType);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto z-50 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center overflow-hidden">
                    <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-heading font-bold text-xl tracking-wide">ICONIC</span>
              </div>
            </Link>
        </div>
        <div className="flex items-center gap-6">
            <Link href="/browse-catalog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Magazines
            </Link>
            <Link href="/displays" className="text-sm font-medium text-primary transition-colors">
                Displays
            </Link>
            <Link href="/login">
                <Button>Retailer Login</Button>
            </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Store Fixtures</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Need displays? Iconic has options. Whether it's to display a small quantity, or an entire wall rack, we can assist with design and installation.
            </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-12">
            <Button 
                variant={selectedType === "all" ? "default" : "outline"} 
                onClick={() => setSelectedType("all")}
                className="rounded-full px-6"
            >
                All Fixtures
            </Button>
            <Button
                variant={selectedType === "floor" ? "default" : "outline"}
                onClick={() => setSelectedType("floor")}
                className="rounded-full px-6"
            >
                Floor Stands
            </Button>
            <Button
                variant={selectedType === "wall" ? "default" : "outline"}
                onClick={() => setSelectedType("wall")}
                className="rounded-full px-6"
            >
                Wall Mounted
            </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDisplays.map((display) => (
                <Card key={display.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
                    <div className="aspect-square overflow-hidden bg-muted relative">
                        <img 
                            src={display.imageUrl} 
                            alt={display.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-3 right-3">
                             {display.inStock ? (
                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 backdrop-blur-sm shadow-sm border-transparent">In Stock</Badge>
                             ) : (
                                <Badge variant="secondary" className="bg-red-100 text-red-700 backdrop-blur-sm shadow-sm border-transparent">Out of Stock</Badge>
                             )}
                        </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <h3 className="font-heading font-bold text-2xl leading-tight mb-1">{display.name}</h3>
                            <p className="text-primary font-bold text-lg">${display.price.toFixed(2)}</p>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{display.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-2">
                                <Ruler className="w-4 h-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-foreground">Dimensions</p>
                                    <p className="text-xs text-muted-foreground">{display.dimensions}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Box className="w-4 h-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-foreground">Capacity</p>
                                    <p className="text-xs text-muted-foreground">{display.capacity}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <Button className="w-full gap-2" disabled={!display.inStock}>
                            <ShoppingBag className="w-4 h-4" /> Add to Order
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center">
            <Link href="/browse-catalog">
                <Button variant="link" className="text-muted-foreground hover:text-primary gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Magazine Catalog
                </Button>
            </Link>
        </div>
      </main>
    </div>
  );
}
