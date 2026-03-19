import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Shield } from "lucide-react";
import { toast } from "sonner";

export default function AdminPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeMutation = trpc.admin.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to change password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    changeMutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="max-w-md space-y-6">
      <div className="mb-2">
        <p className="text-white/40 text-sm">Change your admin password. Make sure to use a strong password.</p>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-white/50" />
          </div>
          <div>
            <p className="text-white/80 font-medium text-sm">Change Password</p>
            <p className="text-white/30 text-xs">Update your admin credentials</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-white/60 text-xs uppercase tracking-wide">Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-white/60 text-xs uppercase tracking-wide">New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>

          <div>
            <Label className="text-white/60 text-xs uppercase tracking-wide">Confirm New Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={changeMutation.isPending || !currentPassword || !newPassword || !confirmPassword}
            className="w-full bg-white text-black hover:bg-white/90 mt-2"
          >
            {changeMutation.isPending ? (
              <Loader2 className="animate-spin mr-2" size={14} />
            ) : (
              <Save size={14} className="mr-2" />
            )}
            Update Password
          </Button>
        </form>
      </div>

      <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-5">
        <p className="text-yellow-400/80 text-sm font-medium mb-1">Default Credentials</p>
        <p className="text-white/40 text-xs">
          The default admin account is <strong className="text-white/60">admin</strong> with password <strong className="text-white/60">admin123</strong>. 
          Please change this immediately after your first login.
        </p>
      </div>
    </div>
  );
}
