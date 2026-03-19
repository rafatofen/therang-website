import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard, FileText, MessageSquare, Users, Search, Link2, Lock, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import AdminContentEditor from "./admin/AdminContentEditor";
import AdminTestimonials from "./admin/AdminTestimonials";
import AdminPartners from "./admin/AdminPartners";
import AdminSeo from "./admin/AdminSeo";
import AdminLinks from "./admin/AdminLinks";
import AdminPassword from "./admin/AdminPassword";
import AdminOverview from "./admin/AdminOverview";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "content", label: "Content", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "partners", label: "Partners", icon: Users },
  { id: "seo", label: "SEO", icon: Search },
  { id: "links", label: "Links", icon: Link2 },
  { id: "password", label: "Security", icon: Lock },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: admin, isLoading, error } = trpc.admin.me.useQuery(undefined, {
    retry: false,
  });

  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => navigate("/admin/login"),
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !admin && error) {
      navigate("/admin/login");
    }
  }, [isLoading, admin, error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="animate-spin text-white/40" size={32} />
      </div>
    );
  }

  if (!admin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <AdminOverview />;
      case "content": return <AdminContentEditor />;
      case "testimonials": return <AdminTestimonials />;
      case "partners": return <AdminPartners />;
      case "seo": return <AdminSeo />;
      case "links": return <AdminLinks />;
      case "password": return <AdminPassword />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#111] border-r border-white/5
        flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-lg text-white font-light tracking-tight">The Rang</h1>
            <p className="text-white/30 text-xs mt-0.5">Content Management</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${activeTab === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }
              `}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-white/50">Signed in as</p>
            <p className="text-sm text-white/80 font-medium">{admin.displayName || admin.username}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex-1 text-white/40 hover:text-white hover:bg-white/5 text-xs"
            >
              <ChevronLeft size={14} className="mr-1" />
              View Site
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              className="text-white/40 hover:text-red-400 hover:bg-white/5 text-xs"
            >
              <LogOut size={14} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-medium text-white/90">
            {navItems.find(n => n.id === activeTab)?.label || "Dashboard"}
          </h2>
        </header>

        <div className="p-4 lg:p-8 max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
