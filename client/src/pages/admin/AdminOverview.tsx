import { trpc } from "@/lib/trpc";
import { FileText, MessageSquare, Users, Link2, Loader2 } from "lucide-react";

export default function AdminOverview() {
  const { data: content, isLoading: loadingContent } = trpc.content.getAll.useQuery();
  const { data: testimonials, isLoading: loadingTestimonials } = trpc.testimonials.getAll.useQuery();
  const { data: partners, isLoading: loadingPartners } = trpc.partners.getAll.useQuery();
  const { data: links, isLoading: loadingLinks } = trpc.links.getAll.useQuery();

  const isLoading = loadingContent || loadingTestimonials || loadingPartners || loadingLinks;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-white/40" size={24} />
      </div>
    );
  }

  const stats = [
    { label: "Content Sections", value: content?.length || 0, icon: FileText, color: "bg-blue-500/10 text-blue-400" },
    { label: "Testimonials", value: testimonials?.length || 0, icon: MessageSquare, color: "bg-green-500/10 text-green-400" },
    { label: "Partners", value: partners?.length || 0, icon: Users, color: "bg-purple-500/10 text-purple-400" },
    { label: "Site Links", value: links?.length || 0, icon: Link2, color: "bg-orange-500/10 text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-white/90 text-lg font-medium mb-1">Welcome back</h3>
        <p className="text-white/40 text-sm">Here's an overview of your website content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/5 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
            <p className="text-white/40 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
        <h4 className="text-white/80 font-medium mb-3">Quick Guide</h4>
        <div className="space-y-3 text-sm text-white/50">
          <p><strong className="text-white/70">Content</strong> — Edit text, headings, and descriptions for each section of the website.</p>
          <p><strong className="text-white/70">Testimonials</strong> — Manage guest reviews. Add, edit, reorder, or hide reviews.</p>
          <p><strong className="text-white/70">Partners</strong> — Manage partner venues with photos, descriptions, and perks.</p>
          <p><strong className="text-white/70">SEO</strong> — Edit page titles, meta descriptions, and Open Graph tags for each page.</p>
          <p><strong className="text-white/70">Links</strong> — Update external links (Airbnb, Instagram, Google Reviews, etc.).</p>
          <p><strong className="text-white/70">Security</strong> — Change your admin password.</p>
        </div>
      </div>
    </div>
  );
}
