import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      navigate("/admin");
    },
    onError: (err) => {
      setError("Invalid username or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white/70" size={20} />
          </div>
          <h1 className="font-serif text-2xl text-white font-light tracking-tight">
            The Rang Admin
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Sign in to manage your website content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-white/60 text-xs tracking-wide uppercase">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0"
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white/60 text-xs tracking-wide uppercase">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-white text-black hover:bg-white/90 font-medium"
          >
            {loginMutation.isPending ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : null}
            Sign In
          </Button>
        </form>

        <p className="text-center text-white/20 text-xs mt-8">
          The Rang Uluwatu — Content Management
        </p>
      </div>
    </div>
  );
}
