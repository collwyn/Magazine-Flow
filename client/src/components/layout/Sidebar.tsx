import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingCart, Users, Package, FileText, Settings, LogOut, BookOpen, ClipboardList } from "lucide-react";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user.role === 'admin';

  const menuItems = isAdmin 
    ? [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
        { icon: Package, label: "Inventory", href: "/admin/inventory" },
        { icon: ShoppingCart, label: "All Orders", href: "/admin/orders" },
        { icon: Users, label: "Retailers", href: "/admin/retailers" },
        { icon: ClipboardList, label: "Applications", href: "/admin/applications" },
        { icon: FileText, label: "Invoices", href: "/admin/invoices" },
      ]
    : [
        { icon: LayoutDashboard, label: "My Dashboard", href: "/dashboard" },
        { icon: BookOpen, label: "Catalog", href: "/catalog" },
        { icon: ShoppingCart, label: "My Orders", href: "/orders" },
        { icon: FileText, label: "My Invoices", href: "/invoices" },
      ];

  return (
    <div className="h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0 overflow-hidden">
             <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
        </div>
        <div className="font-heading font-bold text-xl tracking-wide">ICONIC</div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/settings">
           <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer mb-1",
                   location === "/settings"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}>
            <Settings className="w-4 h-4" />
            Settings
          </div>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
