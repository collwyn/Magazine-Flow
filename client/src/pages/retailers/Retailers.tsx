import { mockRetailers } from "@/lib/mockData";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Retailers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRetailers = mockRetailers.filter(retailer => 
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Retailers</h2>
          <p className="text-muted-foreground mt-1">Manage retailer accounts and credit limits.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Retailer
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, contact, or email..."
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
                <TableHead>Retailer Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Credit Limit</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRetailers.map((retailer) => (
                <TableRow key={retailer.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="font-medium text-foreground">{retailer.name}</div>
                    <div className="text-xs text-muted-foreground">ID: RET-{retailer.id.toString().padStart(4, '0')}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{retailer.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="w-3 h-3" /> {retailer.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone className="w-3 h-3" /> {retailer.phone}
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1.5 text-sm text-muted-foreground max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> 
                        <span className="truncate">{retailer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">${retailer.creditLimit.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`font-mono text-sm font-medium ${
                        retailer.currentBalance > retailer.creditLimit * 0.8 ? "text-amber-600" : 
                        retailer.currentBalance > retailer.creditLimit ? "text-destructive" : 
                        "text-emerald-600"
                    }`}>
                        ${retailer.currentBalance.toLocaleString()}
                    </span>
                    <div className="w-20 h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${
                                retailer.currentBalance > retailer.creditLimit * 0.9 ? "bg-destructive" : "bg-primary"
                            }`} 
                            style={{ width: `${Math.min((retailer.currentBalance / retailer.creditLimit) * 100, 100)}%` }}
                        />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`
                        ${retailer.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}
                    `}>
                        {retailer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Retailer</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
