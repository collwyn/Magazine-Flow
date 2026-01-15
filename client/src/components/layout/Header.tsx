import { Bell, Search, User, Repeat } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { user, switchRole } = useAuth();
  
  const isAdmin = user.role === 'admin';

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={isAdmin ? "Search orders, magazines, retailers..." : "Search catalog..."}
            className="pl-9 w-full bg-secondary/50 border-transparent focus:bg-background focus:border-input transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher for Demo */}
        <div className="flex items-center mr-4 bg-secondary/50 rounded-full p-1 border border-border">
             <Button 
                variant={isAdmin ? "default" : "ghost"} 
                size="sm" 
                onClick={() => switchRole('admin')}
                className="h-7 rounded-full text-xs px-3"
             >
                Admin
             </Button>
             <Button 
                variant={!isAdmin ? "default" : "ghost"} 
                size="sm" 
                onClick={() => switchRole('retailer')}
                className="h-7 rounded-full text-xs px-3"
             >
                Retailer
             </Button>
        </div>

        <button className="relative p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-secondary transition-colors group">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{user.username}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    {user.role === 'retailer' && <Badge variant="outline" className="text-[10px] h-4 px-1 py-0">ID: {user.retailerId}</Badge>}
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
