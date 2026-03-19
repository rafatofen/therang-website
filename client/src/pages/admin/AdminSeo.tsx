import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

const pageLabels: Record<string, string> = {
  home: "Home Page",
  space: "Space Page",
  partners: "Partners Page",
  location: "Location Page",
  tour: "3D Tour Page",
  booking: "Booking Page",
};

export default function AdminSeo() {
  const { data: seoSettings, isLoading, refetch } = trpc.seo.getAll.useQuery();
  const updateMutation = trpc.seo.update.useMutation({
    onSuccess: () => { toast.success("SEO settings saved"); refetch(); },
    onError: () => toast.error("Failed to save SEO settings"),
  });

  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-white/40" size={24} /></div>;
  }

  const settings = seoSettings || [];

  const getVal = (pageKey: string, field: string, defaultVal: string) => {
    return editValues[`${pageKey}.${field}`] ?? defaultVal;
  };

  const setVal = (pageKey: string, field: string, value: string) => {
    setEditValues(prev => ({ ...prev, [`${pageKey}.${field}`]: value }));
  };

  const handleSave = (setting: any) => {
    const data: any = { pageKey: setting.pageKey };
    for (const f of ["title", "description", "ogImage", "keywords"]) {
      const key = `${setting.pageKey}.${f}`;
      data[f] = editValues[key] !== undefined ? editValues[key] : (setting[f] || "");
    }
    updateMutation.mutate(data);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <p className="text-white/40 text-sm">Edit SEO meta tags for each page. These affect search engine results and social media previews.</p>
      </div>

      {settings.map((setting) => {
        const isExpanded = expandedPage === setting.pageKey;
        return (
          <div key={setting.pageKey} className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedPage(isExpanded ? null : setting.pageKey)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-white/90 font-medium text-sm">{pageLabels[setting.pageKey] || setting.pageKey}</p>
                <p className="text-white/30 text-xs mt-0.5 truncate max-w-md">{setting.title || "No title set"}</p>
              </div>
              {isExpanded ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wide">Page Title</Label>
                  <Input
                    value={getVal(setting.pageKey, "title", setting.title || "")}
                    onChange={(e) => setVal(setting.pageKey, "title", e.target.value)}
                    className="mt-1.5 bg-white/5 border-white/10 text-white"
                    placeholder="Page title for search engines"
                  />
                  <p className="text-white/20 text-xs mt-1">{(getVal(setting.pageKey, "title", setting.title || "")).length}/60 characters</p>
                </div>

                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wide">Meta Description</Label>
                  <Textarea
                    value={getVal(setting.pageKey, "description", setting.description || "")}
                    onChange={(e) => setVal(setting.pageKey, "description", e.target.value)}
                    rows={3}
                    className="mt-1.5 bg-white/5 border-white/10 text-white resize-y"
                    placeholder="Description shown in search results"
                  />
                  <p className="text-white/20 text-xs mt-1">{(getVal(setting.pageKey, "description", setting.description || "")).length}/160 characters</p>
                </div>

                <ImageUpload
                  currentUrl={getVal(setting.pageKey, "ogImage", setting.ogImage || "")}
                  onUpload={(url) => setVal(setting.pageKey, "ogImage", url)}
                  label="OG Image (Social Preview)"
                  aspectHint="1200x630 (1.91:1)"
                  accept="image/*"
                />

                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wide">Keywords</Label>
                  <Input
                    value={getVal(setting.pageKey, "keywords", setting.keywords || "")}
                    onChange={(e) => setVal(setting.pageKey, "keywords", e.target.value)}
                    className="mt-1.5 bg-white/5 border-white/10 text-white"
                    placeholder="luxury villa, bali, uluwatu"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => handleSave(setting)} disabled={updateMutation.isPending} className="bg-white text-black hover:bg-white/90">
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save size={14} className="mr-2" />}
                    Save SEO
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
