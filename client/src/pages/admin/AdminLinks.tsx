import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AdminLinks() {
  const { data: links, isLoading, refetch } = trpc.links.getAll.useQuery();
  const updateMutation = trpc.links.update.useMutation({
    onSuccess: () => { toast.success("Link updated"); refetch(); },
    onError: () => toast.error("Failed to update link"),
  });

  const [editValues, setEditValues] = useState<Record<string, string>>({});

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-white/40" size={24} /></div>;
  }

  const allLinks = links || [];

  const getVal = (linkKey: string, field: string, defaultVal: string) => {
    return editValues[`${linkKey}.${field}`] ?? defaultVal;
  };

  const setVal = (linkKey: string, field: string, value: string) => {
    setEditValues(prev => ({ ...prev, [`${linkKey}.${field}`]: value }));
  };

  const handleSave = (link: any) => {
    const label = editValues[`${link.linkKey}.label`] ?? link.label;
    const url = editValues[`${link.linkKey}.url`] ?? link.url;
    updateMutation.mutate({ linkKey: link.linkKey, label, url });
  };

  const linkIcons: Record<string, string> = {
    airbnb: "🏠",
    instagram: "📸",
    google_reviews: "⭐",
    matterport: "🏗️",
    email: "✉️",
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <p className="text-white/40 text-sm">Manage external links used across the website (Airbnb, Instagram, Google Reviews, etc.).</p>
      </div>

      <div className="space-y-3">
        {allLinks.map((link) => (
          <div key={link.linkKey} className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{linkIcons[link.linkKey] || "🔗"}</span>
              <div className="flex-1">
                <p className="text-white/80 font-medium text-sm">{link.label}</p>
                <p className="text-white/30 text-xs">{link.linkKey}</p>
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white">
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/60 text-xs uppercase">Label</Label>
                <Input
                  value={getVal(link.linkKey, "label", link.label)}
                  onChange={(e) => setVal(link.linkKey, "label", e.target.value)}
                  className="mt-1.5 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-white/60 text-xs uppercase">URL</Label>
                <Input
                  value={getVal(link.linkKey, "url", link.url)}
                  onChange={(e) => setVal(link.linkKey, "url", e.target.value)}
                  className="mt-1.5 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave(link)} disabled={updateMutation.isPending} size="sm" className="bg-white text-black hover:bg-white/90">
                {updateMutation.isPending ? <Loader2 className="animate-spin mr-1.5" size={14} /> : <Save size={14} className="mr-1.5" />}
                Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
