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
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, FileText, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// Mock Invoice Data based on orders
const mockInvoices = mockOrders.filter(o => o.status !== 'cancelled').map(order => ({
  id: `INV-${order.orderNumber.split('-')[2]}`,
  orderNumber: order.orderNumber,
  retailerId: order.retailerId,
  issueDate: order.orderDate,
  dueDate: new Date(new Date(order.orderDate).setDate(new Date(order.orderDate).getDate() + 30)).toISOString().split('T')[0],
  amount: order.totalAmount,
  status: order.paymentStatus === 'paid' ? 'paid' : order.paymentStatus === 'partial' ? 'partial' : 'outstanding',
}));

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const isAdmin = user.role === 'admin';

  // Filter invoices based on role
  const relevantInvoices = isAdmin 
    ? mockInvoices 
    : mockInvoices.filter(inv => inv.retailerId === user.retailerId);

  const filteredInvoices = relevantInvoices.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Invoices</h2>
          <p className="text-muted-foreground mt-1">
            {isAdmin ? "Manage billing and payments." : "View and pay your invoices."}
          </p>
        </div>
        {isAdmin && (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                <FileText className="mr-2 h-4 w-4" /> Generate Invoice
            </Button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Invoice # or Order #..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/60">
                <TableHead>Invoice #</TableHead>
                {isAdmin && <TableHead>Retailer</TableHead>}
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                   <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    No invoices found.
                   </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((inv) => {
                  const retailer = mockRetailers.find(r => r.id === inv.retailerId);
                  return (
                    <TableRow key={inv.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="font-medium text-foreground">{inv.id}</div>
                        <div className="text-xs text-muted-foreground">{inv.orderNumber}</div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                            <div className="font-medium">{retailer?.name}</div>
                            <div className="text-xs text-muted-foreground">{retailer?.contactPerson}</div>
                        </TableCell>
                      )}
                      <TableCell className="text-sm text-muted-foreground">{inv.issueDate}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{inv.dueDate}</TableCell>
                      <TableCell className="font-mono font-medium text-foreground">${inv.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn(
                            "capitalize border",
                            inv.status === 'paid' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            inv.status === 'outstanding' ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                            {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            {isAdmin && inv.status !== 'paid' && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                                    <Send className="h-4 w-4" />
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
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
