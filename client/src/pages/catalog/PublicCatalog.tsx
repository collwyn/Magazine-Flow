import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag, Filter } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";

export default function PublicCatalog() {
  const { magazines } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(magazines.map(m => m.category)));
  
  const filteredMagazines = selectedCategory 
    ? magazines.filter(m => m.category === selectedCategory)
    : magazines;

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
            <Link href="/browse-catalog" className="text-sm font-medium text-primary transition-colors">
                Magazines
            </Link>
            <Link href="/displays" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Displays
            </Link>
            <Link href="/login">
                <Button>Retailer Login</Button>
            </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Our Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our curated selection of premium magazines available for wholesale distribution.
            </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <Button 
                variant={selectedCategory === null ? "default" : "outline"} 
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
            >
                All
            </Button>
            {categories.map(category => (
                <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                >
                    {category}
                </Button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMagazines.map((mag) => (
                <Card key={mag.id} className="group border-none shadow-none bg-transparent hover:bg-transparent overflow-visible">
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-muted relative shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                        <img 
                            src={mag.coverUrl} 
                            alt={mag.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <Button className="w-full bg-white text-black hover:bg-white/90">
                                View Wholesale Details
                            </Button>
                        </div>
                        <div className="absolute top-3 right-3">
                             <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm shadow-sm">{mag.category}</Badge>
                        </div>
                    </div>
                    <CardContent className="pt-6 px-2 space-y-1 text-center">
                        <h3 className="font-heading font-bold text-xl leading-tight group-hover:text-primary transition-colors">{mag.title}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide text-[10px] font-semibold">{mag.publisher}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 pt-2 px-2">{mag.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 bg-secondary/30 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold">Ready to stock these titles?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Create a wholesale account today and get access to our full catalog with retailer pricing.</p>
            <Link href="/login">
                <Button size="lg" className="h-12 px-8">Apply for Account</Button>
            </Link>
        </div>
      </main>
    </div>
  );
}
