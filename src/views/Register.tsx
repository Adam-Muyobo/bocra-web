/*
 * Renders minimal individual and organization registration forms for first-step account creation.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Eye, EyeOff, UserRound } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { toast } from "@/components/ui/sonner";
import { register, type RegisterPayload } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    username: "",
    password: "",
    userType: "INDIVIDUAL",
    organizationDisplayName: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await register(form);
      toast.success(response.message);
      toast.info("Use these credentials for every interaction you have with the BOCRA system.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof RegisterPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="w-full max-w-lg">
        <motion.div variants={fadeUp} className="mb-6 flex justify-start">
          <BackLink to="/" label="Back to homepage" />
        </motion.div>
        <motion.div variants={fadeUp} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Create your BOCRA account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start with your account credentials and complete your profile after your first sign-in.</p>
        </motion.div>

        <motion.div variants={fadeUp} className="neu-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted p-1">
              <button
                type="button"
                onClick={() => updateField("userType", "INDIVIDUAL")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${form.userType === "INDIVIDUAL" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4" /> Individual</span>
              </button>
              <button
                type="button"
                onClick={() => updateField("userType", "ORGANIZATION")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${form.userType === "ORGANIZATION" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> Organization</span>
              </button>
            </div>

            {form.userType === "ORGANIZATION" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Organization Name</label>
                <input
                  type="text"
                  value={form.organizationDisplayName ?? ""}
                  onChange={(e) => updateField("organizationDisplayName", e.target.value)}
                  placeholder="DemoTel Botswana"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">This is the organization identity BOCRA will use in future interactions.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="your.unique.username"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Your username must be unique and can be used instead of email at login.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">You will complete the rest of your profile after the first sign-in.</p>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              The details entered here will identify you in future BOCRA interactions. You can update your profile later from your account settings.
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="rounded border-input mt-0.5" required />
              I confirm these account details are correct and agree to the BOCRA Terms of Service and Privacy Policy.
            </label>

            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {isSubmitting ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
