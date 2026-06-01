import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, PlayCircle, BookOpen, Truck } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";
import heroImage from "@assets/generated_images/modern_boutique_magazine_display_rack.png";

const featuredTitles = [
  { title: "British Vogue", category: "Fashion", cover: "/images/covers/vogue.jpg" },
  { title: "Rolling Stone", category: "Music", cover: "/images/covers/rolling-stone-steve-lacy.jpg" },
  { title: "Interview", category: "Culture", cover: "/images/covers/interview-billie.webp" },
  { title: "Complex", category: "Culture", cover: "/images/covers/complex.jpg" },
  { title: "Cosmopolitan", category: "Lifestyle", cover: "/images/covers/cosmopolitan.jpg" },
];

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto z-50 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center overflow-hidden">
             <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading font-bold text-xl tracking-wide">ICONIC</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="/browse-catalog" className="hover:text-primary transition-colors">Catalog</a>
            <a href="/how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary hidden sm:block">Support</a>
            <Button className="hidden sm:flex" onClick={() => setLocation("/apply")} data-testid="button-nav-apply">Apply Now</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        For Bookstores, Cafes & Boutiques
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                        Stock Your Shelves <br/>
                        <span className="text-primary">With The Best.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                        Access a curated catalog of premium magazines for your storefront. Easy wholesale ordering, next-day delivery, and flexible returns for modern retailers.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:translate-y-[-2px]" onClick={() => setLocation("/apply")} data-testid="button-get-started">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-secondary/50" onClick={() => setLocation("/browse-catalog")} data-testid="button-browse-catalog">
                            <PlayCircle className="mr-2 h-5 w-5" /> Browse Catalog
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-muted-foreground grayscale opacity-70">
                        <div className="flex items-center gap-2 text-sm font-bold"><Truck className="h-5 w-5" /> Free Shipping over $200</div>
                    </div>
                </div>

                {/* Login Area / Hero Graphic */}
                <div className="relative animate-in slide-in-from-right-8 fade-in duration-1000 delay-200">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-background/50 backdrop-blur-sm">
                        <div className="grid md:grid-cols-5">
                            {/* Image Side */}
                            <div className="md:col-span-3 h-64 md:h-auto bg-muted relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img 
                                    src={heroImage} 
                                    alt="Modern Magazine Rack" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                                    <p className="font-heading font-bold text-xl">Curated Collections</p>
                                    <p className="text-sm text-white/80">From fashion to tech, find what your customers love.</p>
                                </div>
                            </div>

                            {/* Login Form Side */}
                            <div className="md:col-span-2 p-8 bg-white/95 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h3 className="font-heading font-bold text-2xl mb-1">Retailer Login</h3>
                                    <p className="text-sm text-muted-foreground">Manage your orders & inventory.</p>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input type="email" placeholder="Store Email" className="bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <Input type="password" placeholder="Password" className="bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                        Sign In
                                    </Button>
                                    <div className="text-center text-xs text-muted-foreground mt-4">
                                        <a href="/apply" className="hover:text-primary transition-colors">Apply for a wholesale account</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating decoration */}
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
                </div>
            </div>
        </section>

        {/* Featured Titles */}
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Featured Titles</h2>
                    <p className="text-muted-foreground text-lg">A curated selection from our catalog</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {featuredTitles.map((mag) => (
                        <div key={mag.title} className="flex flex-col gap-2" data-testid={`card-featured-${mag.title.toLowerCase().replace(/\s+/g, "-")}`}>
                            <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-[2/3]">
                                <img src={mag.cover} alt={mag.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-0.5 rounded-full bg-white/90 text-xs font-semibold text-slate-600 shadow-sm">
                                        {mag.category}
                                    </span>
                                </div>
                            </div>
                            <p className="font-semibold text-sm text-center leading-tight">{mag.title}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <a href="/browse-catalog" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline transition-all" data-testid="link-view-catalog">
                        View Entire Catalog <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>

        {/* Features Strip */}
        <section className="bg-slate-50 border-y border-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { title: "Curated Catalog", desc: "Browse top-tier titles across fashion, culture, music, and more.", icon: BookOpen },
                        { title: "NYC Delivery", desc: "Order by 5PM and get your stock delivered to all 5 boroughs.", icon: Truck },
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-4 items-start p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Fill your shelves with culture.</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join the NYC independent retailers who trust ICONIC for their magazine inventory.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="h-12 px-8" onClick={() => setLocation("/apply")}>Open Retail Account</Button>
                    <Button size="lg" variant="outline" className="h-12 px-8">View Wholesale Pricing</Button>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded bg-primary"></div>
                        <span className="font-heading font-bold text-lg">ICONIC</span>
                    </div>
                    <p className="max-w-sm text-slate-400 text-sm">
                        The premier wholesale partner for independent bookstores, newsstands, and boutiques.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Retailers</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/apply" className="hover:text-white transition-colors">Apply for Account</a></li>
                        <li><a href="/browse-catalog" className="hover:text-white transition-colors">Catalog</a></li>
                        <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
                <p>&copy; 2026 ICONIC Distributions Inc. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Privacy</a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
