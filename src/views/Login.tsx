/*
 * Renders the BOCRA login form and redirects users into onboarding or their target workspace.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { toast } from "@/components/ui/sonner";
import { login } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await login({ identifier, password });
      const { role, profileCompleted } = response.user.user;

      if (isAdmin && !["ADMIN", "SUPER_ADMIN"].includes(role)) {
        toast.error("This account does not have admin portal access.");
        return;
      }

      setSession(response);
      toast.success("Signed in successfully.");

      if (!profileCompleted && response.user.user.userType !== "ADMIN") {
        navigate("/portal/onboarding");
        return;
      }

      navigate(isAdmin ? "/admin" : "/portal");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="w-full max-w-md">
        <motion.div variants={fadeUp} className="mb-6 flex justify-start">
          <BackLink to="/" label="Back to homepage" />
        </motion.div>
        <motion.div variants={fadeUp} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in with your username or email to continue.</p>
        </motion.div>

        <motion.div variants={fadeUp} className="neu-card p-6 md:p-8">
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button type="button" onClick={() => setIsAdmin(false)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isAdmin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              User Portal
            </button>
            <button type="button" onClick={() => setIsAdmin(true)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isAdmin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              Admin Portal
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username or Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="your.username or you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              On your first sign-in, BOCRA will ask you to complete the profile details that will be used in your interactions with the system.
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {isSubmitting ? "Signing In..." : isAdmin ? "Sign in as Admin" : "Sign In"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account? <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
