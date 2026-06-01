import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, BookOpen, ArrowRight, ClipboardList, Package, Store } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";

export default function HowItWorks() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto z-50 relative">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center overflow-hidden">
            <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading font-bold text-xl tracking-wide">ICONIC</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="/browse-catalog" className="hover:text-primary transition-colors">Catalog</a>
          <a href="/how-it-works" className="text-primary font-semibold transition-colors">How it Works</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex" onClick={() => setLocation("/login")}>
            Retailer Portal
          </Button>
        </div>
      </nav>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-blue-50/60 to-background border-b border-slate-100">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Wholesale · NYC Only
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight">
              Magazine distribution,<br />
              <span className="text-primary">made simple.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              ICONIC supplies curated, small-quantity wholesale magazine stock to independent retail locations across New York City.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                size="lg"
                className="h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:translate-y-[-2px]"
                onClick={() => setLocation("/login")}
                data-testid="button-apply-hero"
              >
                Apply for an Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-2"
                onClick={() => setLocation("/browse-catalog")}
                data-testid="button-browse-hero"
              >
                <BookOpen className="mr-2 h-5 w-5" /> Browse the Catalog
              </Button>
            </div>
          </div>
        </section>

        {/* How it Works Steps */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-14">
              Here's how it works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  number: "01",
                  icon: ClipboardList,
                  title: "Apply",
                  description:
                    "Submit an application for a wholesale account. Our team reviews each application and reaches out to approved retailers within a few business days.",
                },
                {
                  number: "02",
                  icon: BookOpen,
                  title: "Browse & Order",
                  description:
                    "Once approved, you get access to the retailer portal. Browse our curated catalog and place orders with a minimum of 5 copies per title.",
                },
                {
                  number: "03",
                  icon: Truck,
                  title: "We Deliver",
                  description:
                    "Orders are fulfilled and delivered to your location within NYC (all 5 boroughs). Deliveries can be scheduled weekly or biweekly based on your preference.",
                },
                {
                  number: "04",
                  icon: Store,
                  title: "Sell",
                  description:
                    "Stock your shelves, sell to your customers. All sales between ICONIC and the retailer are final — there are no returns or refunds on purchased inventory.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-testid={`card-step-${step.number}`}
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                      Step {step.number}
                    </p>
                    <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-14">
              What to expect
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Package,
                  title: "Minimum Orders",
                  description:
                    "5 copies per title, per order. We're built for small retailers — no bulk commitments required.",
                },
                {
                  icon: CheckCircle,
                  title: "All Sales Final",
                  description:
                    "We don't accept returns. Retailers own their inventory once it ships. An optional resale program (Amazon/eBay) is available for a one-time setup fee for retailers who want help liquidating unsold stock.",
                },
                {
                  icon: ArrowRight,
                  title: "Month-to-Month",
                  description:
                    "No long-term contracts. Either party can end the agreement with 5 days' written notice.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-testid={`card-policy-${i}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Built for shops like yours
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We work with small, independent retailers across New York City who want to carry quality magazines without the overhead of large-quantity orders. If you run a shop where culture matters, we're a good fit.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                "Independent Bookstores",
                "Boutique Gift Shops",
                "Beauty & Lifestyle Stores",
                "Fashion Retailers",
                "Specialty Food Shops",
                "Newsstands",
              ].map((type) => (
                <span
                  key={type}
                  className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100"
                  data-testid={`tag-store-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-primary text-primary-foreground">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              Ready to stock your shelves?
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Apply for a wholesale account and get access to our full catalog.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-10 text-primary font-semibold hover:bg-white/90 transition-all hover:translate-y-[-2px] shadow-lg"
              onClick={() => setLocation("/login")}
              data-testid="button-apply-cta"
            >
              Apply for an Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
                <li><a href="/login" className="hover:text-white transition-colors">Apply for Account</a></li>
                <li><a href="/browse-catalog" className="hover:text-white transition-colors">Catalog</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
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
