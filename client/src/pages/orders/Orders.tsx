import { mockOrders, mockRetailers } from "@/lib/mockData";
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
import { Plus, Search, Filter, Eye, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const isAdmin = user.role === 'admin';

  // Filter orders based on role
  const relevantOrders = isAdmin 
    ? mockOrders 
    : mockOrders.filter(o => o.retailerId === user.retailerId);

  const filteredOrders = relevantOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'processing': return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 'in-transit': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'delivered': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'cancelled': return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            {isAdmin ? "All Orders" : "My Orders"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isAdmin ? "Track and manage distribution orders." : "Track your store orders and history."}
          </p>
        </div>
        {!isAdmin && (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                <Plus className="mr-2 h-4 w-4" /> Create Order
            </Button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Order ID..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/60">
                <TableHead>Order ID</TableHead>
                {isAdmin && <TableHead>Retailer</TableHead>}
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const retailer = mockRetailers.find(r => r.id === order.retailerId);
                  return (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono font-medium text-foreground">{order.orderNumber}</TableCell>
                      {isAdmin && (
                        <TableCell>
                            <div className="font-medium">{retailer?.name}</div>
                            <div className="text-xs text-muted-foreground">{retailer?.contactPerson}</div>
                        </TableCell>
                      )}
                      <TableCell className="text-muted-foreground">{order.orderDate}</TableCell>
                      <TableCell>
                        <div className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(order.status))}>
                          {order.status}
                        </div>
                      </TableCell>
                      <TableCell>
                           <div className={cn(
                              "inline-flex items-center gap-1.5 text-xs font-medium",
                              order.paymentStatus === 'paid' ? "text-emerald-600" : 
                              order.paymentStatus === 'partial' ? "text-amber-600" : "text-destructive"
                          )}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", 
                                   order.paymentStatus === 'paid' ? "bg-emerald-500" : 
                                   order.paymentStatus === 'partial' ? "bg-amber-500" : "bg-destructive"
                              )} />
                              <span className="capitalize">{order.paymentStatus}</span>
                          </div>
                      </TableCell>
                      <TableCell className="text-right font-medium font-mono">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
