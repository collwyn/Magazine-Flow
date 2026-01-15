import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation and auth would happen here
    // Redirect based on user role - for mockup we just default to Admin for now, 
    // but in a real flow we would check the user role.
    // Let's redirect to /admin by default for this demo since we are logged in as admin
    setLocation("/admin/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-primary skew-y-[-4deg] origin-top-left -translate-y-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-[40vh] bg-gray-100 skew-y-[-4deg] origin-bottom-right translate-y-20 z-0"></div>

      <Card className="w-full max-w-md z-10 border-none shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center pb-8">
           <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto shadow-lg overflow-hidden mb-2">
             <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-heading font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to ICONIC Distributions portal
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" className="bg-gray-50 border-gray-200" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <Input id="password" type="password" className="bg-gray-50 border-gray-200" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11 text-base shadow-lg shadow-primary/20">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 pb-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Contact Support</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
