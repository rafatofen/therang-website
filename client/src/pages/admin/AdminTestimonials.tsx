import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Save, Star, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const utils = trpc.useUtils();
  const { data: testimonials, isLoading } = trpc.testimonials.getAll.useQuery();

  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => { toast.success("Testimonial added"); utils.testimonials.getAll.invalidate(); setShowAdd(false); resetForm(); },
    onError: () => toast.error("Failed to add testimonial"),
  });

  const updateMutation = trpc.testimonials.update.useMutation({
    onSuccess: () => { toast.success("Testimonial updated"); utils.testimonials.getAll.invalidate(); },
    onError: () => toast.error("Failed to update"),
  });

  const deleteMutation = trpc.testimonials.delete.useMutation({
    onSuccess: () => { toast.success("Testimonial deleted"); utils.testimonials.getAll.invalidate(); },
    onError: () => toast.error("Failed to delete"),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", source: "Google", text: "", rating: 5, sortOrder: 0 });

  const resetForm = () => setForm({ name: "", source: "Google", text: "", rating: 5, sortOrder: 0 });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-white/40" size={24} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">Manage guest reviews displayed on the website.</p>
        <Button onClick={() => { setShowAdd(!showAdd); resetForm(); }} className="bg-white text-black hover:bg-white/90" size="sm">
          <Plus size={14} className="mr-1.5" /> Add Review
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h4 className="text-white/80 font-medium text-sm">New Testimonial</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-white/60 text-xs uppercase">Name</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="Guest name" />
            </div>
            <div>
              <Label className="text-white/60 text-xs uppercase">Source</Label>
              <Input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="Google" />
            </div>
            <div>
              <Label className="text-white/60 text-xs uppercase">Rating (1-5)</Label>
              <Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
            </div>
          </div>
          <div>
            <Label className="text-white/60 text-xs uppercase">Review Text</Label>
            <Textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={4} className="mt-1.5 bg-white/5 border-white/10 text-white resize-y" placeholder="Write the review..." />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)} className="text-white/40 hover:text-white">Cancel</Button>
            <Button size="sm" onClick={() => createMutation.mutate(form)} disabled={createMutation.isPending || !form.name || !form.text} className="bg-white text-black hover:bg-white/90">
              {createMutation.isPending ? <Loader2 className="animate-spin mr-1.5" size={14} /> : <Save size={14} className="mr-1.5" />} Save
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {(testimonials || []).map((t) => (
          <div key={t.id} className="bg-white/5 border border-white/5 rounded-xl p-5">
            {editingId === t.id ? (
              <EditTestimonialForm
                testimonial={t}
                onSave={(data) => { updateMutation.mutate({ id: t.id, ...data }); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
                isPending={updateMutation.isPending}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white/90 font-medium text-sm">{t.name}</p>
                      <span className="text-white/30 text-xs">— {t.source}</span>
                      {!t.visible && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">Hidden</span>}
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => updateMutation.mutate({ id: t.id, visible: t.visible ? 0 : 1 })} className="text-white/30 hover:text-white h-8 w-8 p-0">
                      {t.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingId(t.id)} className="text-white/30 hover:text-white h-8 px-2 text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this testimonial?")) deleteMutation.mutate({ id: t.id }); }} className="text-white/30 hover:text-red-400 h-8 w-8 p-0">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditTestimonialForm({ testimonial, onSave, onCancel, isPending }: {
  testimonial: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState({
    name: testimonial.name,
    source: testimonial.source,
    text: testimonial.text,
    rating: testimonial.rating,
    sortOrder: testimonial.sortOrder,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-white/60 text-xs uppercase">Name</Label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <Label className="text-white/60 text-xs uppercase">Source</Label>
          <Input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <Label className="text-white/60 text-xs uppercase">Rating</Label>
          <Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
      </div>
      <div>
        <Label className="text-white/60 text-xs uppercase">Review Text</Label>
        <Textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={4} className="mt-1.5 bg-white/5 border-white/10 text-white resize-y" />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel} className="text-white/40 hover:text-white">Cancel</Button>
        <Button size="sm" onClick={() => onSave(form)} disabled={isPending} className="bg-white text-black hover:bg-white/90">
          {isPending ? <Loader2 className="animate-spin mr-1.5" size={14} /> : <Save size={14} className="mr-1.5" />} Save
        </Button>
      </div>
    </div>
  );
}
