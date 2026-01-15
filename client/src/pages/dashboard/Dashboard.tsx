import { mockOrders, mockRetailers, mockMagazines } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

const salesData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 2800 },
];

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100/50",
    },
    {
      title: "Total Orders",
      value: "+2350",
      change: "+180.1% from last month",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100/50",
    },
    {
      title: "Active Retailers",
      value: `${mockRetailers.length}`,
      change: "+2 new this month",
      trend: "up",
      icon: Users,
      color: "text-violet-600",
      bgColor: "bg-violet-100/50",
    },
    {
      title: "Low Stock Items",
      value: "4",
      change: "Requires attention",
      trend: "down",
      icon: Package,
      color: "text-amber-600",
      bgColor: "bg-amber-100/50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of your distribution performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-full", stat.bgColor)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-600" : "text-amber-600"}>
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockOrders.slice(0, 5).map((order) => {
                const retailer = mockRetailers.find(r => r.id === order.retailerId);
                return (
                  <div key={order.id} className="flex items-center">
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{retailer?.name}</p>
                      <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "text-xs px-2 py-1 rounded-full capitalize font-medium",
                            order.status === 'delivered' && "bg-emerald-100 text-emerald-700",
                            order.status === 'pending' && "bg-amber-100 text-amber-700",
                            order.status === 'processing' && "bg-blue-100 text-blue-700",
                            order.status === 'in-transit' && "bg-purple-100 text-purple-700",
                        )}>
                            {order.status}
                        </div>
                        <div className="font-medium font-mono text-sm">
                        ${order.totalAmount.toFixed(2)}
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
