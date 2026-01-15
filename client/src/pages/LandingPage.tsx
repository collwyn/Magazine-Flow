import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, BarChart3, ShieldCheck, ArrowRight, PlayCircle } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";
import heroImage from "@assets/generated_images/abstract_magazine_distribution_network_visualization.png";

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
            <a href="#features" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary hidden sm:block">Support</a>
            <Button variant="outline" className="hidden sm:flex" onClick={() => setLocation("/login")}>Retailer Portal</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        The Future of Distribution
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                        Global Reach, <br/>
                        <span className="text-primary">Local Precision.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                        Streamline your magazine distribution with our AI-powered logistics platform. Real-time inventory tracking, automated billing, and predictive analytics for modern publishers and retailers.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:translate-y-[-2px]" onClick={() => setLocation("/dashboard")}>
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-secondary/50">
                            <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-muted-foreground grayscale opacity-70">
                        <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="h-5 w-5" /> Trusted by 500+ Publishers</div>
                        <div className="flex items-center gap-2 text-sm font-bold"><Globe className="h-5 w-5" /> 50+ Countries</div>
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
                                    alt="Distribution Network" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                                    <p className="font-heading font-bold text-xl">Global Logistics</p>
                                    <p className="text-sm text-white/80">Connecting publishers to readers worldwide.</p>
                                </div>
                            </div>

                            {/* Login Form Side */}
                            <div className="md:col-span-2 p-8 bg-white/95 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h3 className="font-heading font-bold text-2xl mb-1">Welcome Back</h3>
                                    <p className="text-sm text-muted-foreground">Access your retailer dashboard.</p>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input type="email" placeholder="Email Address" className="bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <Input type="password" placeholder="Password" className="bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                        Sign In
                                    </Button>
                                    <div className="text-center text-xs text-muted-foreground mt-4">
                                        <a href="#" className="hover:text-primary transition-colors">Forgot your password?</a>
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

        {/* Features Strip */}
        <section className="bg-slate-50 border-y border-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Real-Time Tracking", desc: "Monitor inventory levels and shipments with millisecond precision.", icon: Globe },
                        { title: "Automated Fulfillment", desc: "AI-driven algorithms optimize your supply chain automatically.", icon: CheckCircle },
                        { title: "Predictive Analytics", desc: "Forecast demand trends before they happen with our data engine.", icon: BarChart3 }
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
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Ready to scale your distribution?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join the world's leading magazine distributors and retailers on the ICONIC platform.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="h-12 px-8">Become a Partner</Button>
                    <Button size="lg" variant="outline" className="h-12 px-8">Contact Sales</Button>
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
                        Empowering the publishing industry with next-generation distribution technology.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Retailers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Publishers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
                <p>&copy; 2024 ICONIC Distributions Inc. All rights reserved.</p>
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
