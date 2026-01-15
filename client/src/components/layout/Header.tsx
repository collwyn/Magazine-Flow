import { Bell, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/mockData";

export function Header() {
  const user = getCurrentUser();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders, magazines, retailers..."
            className="pl-9 w-full bg-secondary/50 border-transparent focus:bg-background focus:border-input transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
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
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{user.role}</p>
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
