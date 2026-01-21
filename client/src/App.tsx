import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Inventory from "@/pages/inventory/Inventory";
import ManageDisplays from "@/pages/inventory/ManageDisplays";
import Orders from "@/pages/orders/Orders";
import Catalog from "@/pages/catalog/Catalog";
import PublicCatalog from "@/pages/catalog/PublicCatalog";
import Displays from "@/pages/displays/Displays";
import Retailers from "@/pages/retailers/Retailers";
import Invoices from "@/pages/invoices/Invoices";
import Login from "@/pages/auth/Login";
import LandingPage from "@/pages/LandingPage";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/browse-catalog" component={PublicCatalog} />
      <Route path="/login" component={Login} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>
      <Route path="/admin/dashboard">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>
      <Route path="/admin/inventory">
        <DashboardLayout><Inventory /></DashboardLayout>
      </Route>
      <Route path="/admin/inventory/displays">
        <DashboardLayout><ManageDisplays /></DashboardLayout>
      </Route>
      <Route path="/admin/orders">
        <DashboardLayout><Orders /></DashboardLayout>
      </Route>
      <Route path="/admin/retailers">
        <DashboardLayout><Retailers /></DashboardLayout>
      </Route>
      <Route path="/admin/invoices">
        <DashboardLayout><Invoices /></DashboardLayout>
      </Route>

      {/* Retailer Routes */}
      <Route path="/dashboard">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>
      <Route path="/orders">
        <DashboardLayout><Orders /></DashboardLayout>
      </Route>
      <Route path="/catalog">
        <DashboardLayout><Catalog /></DashboardLayout>
      </Route>
      <Route path="/invoices">
        <DashboardLayout><Invoices /></DashboardLayout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Router />
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
