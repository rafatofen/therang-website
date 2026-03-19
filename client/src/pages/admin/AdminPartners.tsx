import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminPartners() {
  const utils = trpc.useUtils();
  const { data: partners, isLoading } = trpc.partners.getAll.useQuery();

  const createMutation = trpc.partners.create.useMutation({
    onSuccess: () => { toast.success("Partner added"); utils.partners.getAll.invalidate(); setShowAdd(false); resetForm(); },
    onError: () => toast.error("Failed to add partner"),
  });

  const updateMutation = trpc.partners.update.useMutation({
    onSuccess: () => { toast.success("Partner updated"); utils.partners.getAll.invalidate(); },
    onError: () => toast.error("Failed to update"),
  });

  const deleteMutation = trpc.partners.delete.useMutation({
    onSuccess: () => { toast.success("Partner deleted"); utils.partners.getAll.invalidate(); },
    onError: () => toast.error("Failed to delete"),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", type: "", perk: "", description: "", imageUrl: "", website: "", address: "", sortOrder: 0 });

  const resetForm = () => setForm({ name: "", type: "", perk: "", description: "", imageUrl: "", website: "", address: "", sortOrder: 0 });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-white/40" size={24} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">Manage partner venues and exclusive guest perks.</p>
        <Button onClick={() => { setShowAdd(!showAdd); resetForm(); }} className="bg-white text-black hover:bg-white/90" size="sm">
          <Plus size={14} className="mr-1.5" /> Add Partner
        </Button>
      </div>

      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h4 className="text-white/80 font-medium text-sm">New Partner</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/60 text-xs uppercase">Name</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="Partner name" />
            </div>
            <div>
              <Label className="text-white/60 text-xs uppercase">Type</Label>
              <Input value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="e.g. Japanese Restaurant" />
            </div>
          </div>
          <div>
            <Label className="text-white/60 text-xs uppercase">Perk</Label>
            <Input value={form.perk} onChange={e => setForm(f => ({ ...f, perk: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="e.g. 15% lunch discount" />
          </div>
          <div>
            <Label className="text-white/60 text-xs uppercase">Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="mt-1.5 bg-white/5 border-white/10 text-white resize-y" />
          </div>
          <ImageUpload
            currentUrl={form.imageUrl}
            onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))}
            label="Partner Photo"
            aspectHint="16:9"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/60 text-xs uppercase">Website</Label>
              <Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="https://..." />
            </div>
            <div>
              <Label className="text-white/60 text-xs uppercase">Address</Label>
              <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" placeholder="Location address" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)} className="text-white/40 hover:text-white">Cancel</Button>
            <Button size="sm" onClick={() => createMutation.mutate(form)} disabled={createMutation.isPending || !form.name || !form.type} className="bg-white text-black hover:bg-white/90">
              {createMutation.isPending ? <Loader2 className="animate-spin mr-1.5" size={14} /> : <Save size={14} className="mr-1.5" />} Save
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {(partners || []).map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/5 rounded-xl p-5">
            {editingId === p.id ? (
              <EditPartnerForm
                partner={p}
                onSave={(data) => { updateMutation.mutate({ id: p.id, ...data }); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
                isPending={updateMutation.isPending}
              />
            ) : (
              <div className="flex items-start gap-4">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white/90 font-medium text-sm">{p.name}</p>
                    <span className="text-white/30 text-xs">— {p.type}</span>
                    {!p.visible && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">Hidden</span>}
                  </div>
                  {p.perk && <p className="text-green-400/70 text-xs mb-1">{p.perk}</p>}
                  {p.description && <p className="text-white/40 text-sm line-clamp-2">{p.description}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => updateMutation.mutate({ id: p.id, visible: p.visible ? 0 : 1 })} className="text-white/30 hover:text-white h-8 w-8 p-0">
                    {p.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(p.id)} className="text-white/30 hover:text-white h-8 px-2 text-xs">Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this partner?")) deleteMutation.mutate({ id: p.id }); }} className="text-white/30 hover:text-red-400 h-8 w-8 p-0">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditPartnerForm({ partner, onSave, onCancel, isPending }: {
  partner: any; onSave: (data: any) => void; onCancel: () => void; isPending: boolean;
}) {
  const [form, setForm] = useState({
    name: partner.name, type: partner.type, perk: partner.perk || "", description: partner.description || "",
    imageUrl: partner.imageUrl || "", website: partner.website || "", address: partner.address || "", sortOrder: partner.sortOrder,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/60 text-xs uppercase">Name</Label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <Label className="text-white/60 text-xs uppercase">Type</Label>
          <Input value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
      </div>
      <div>
        <Label className="text-white/60 text-xs uppercase">Perk</Label>
        <Input value={form.perk} onChange={e => setForm(f => ({ ...f, perk: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
      </div>
      <div>
        <Label className="text-white/60 text-xs uppercase">Description</Label>
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="mt-1.5 bg-white/5 border-white/10 text-white resize-y" />
      </div>
      <ImageUpload
        currentUrl={form.imageUrl}
        onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))}
        label="Partner Photo"
        aspectHint="16:9"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/60 text-xs uppercase">Website</Label>
          <Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <Label className="text-white/60 text-xs uppercase">Address</Label>
          <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="mt-1.5 bg-white/5 border-white/10 text-white" />
        </div>
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
