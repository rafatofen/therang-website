import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Space from "./pages/Space";
import SpaceNew from "./pages/SpaceNew";
import Partners from "./pages/Partners";
import Location from "./pages/Location";
import Tour from "./pages/Tour";
import Booking from "./pages/Booking";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Public pages */}
        <Route path={"/"} component={Home} />
        <Route path={"/space"} component={SpaceNew} />
        <Route path={"/space-old"} component={Space} />
        <Route path={"/partners"} component={Partners} />
        <Route path={"/location"} component={Location} />
        <Route path={"/tour"} component={Tour} />
        <Route path={"/booking"} component={Booking} />
        {/* Admin pages */}
        <Route path={"/admin/login"} component={AdminLogin} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
