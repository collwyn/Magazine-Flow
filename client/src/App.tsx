import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Inventory from "@/pages/inventory/Inventory";
import Orders from "@/pages/orders/Orders";
import Login from "@/pages/auth/Login";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      {/* Protected Routes Wrapper */}
      <Route path="/dashboard">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>
      <Route path="/inventory">
        <DashboardLayout><Inventory /></DashboardLayout>
      </Route>
      <Route path="/orders">
        <DashboardLayout><Orders /></DashboardLayout>
      </Route>
      
      <Route path="/">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
