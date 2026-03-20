import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="w-full max-w-md"
      >
        <motion.div variants={fadeUp} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join BOCRA's digital services platform</p>
        </motion.div>

        <motion.div variants={fadeUp} className="neu-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                <input
                  type="text"
                  placeholder="Mothusi"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Kgosi"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Organization (optional)</label>
              <input
                type="text"
                placeholder="Your company name"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters</p>
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="rounded border-input mt-0.5" required />
              I agree to the BOCRA Terms of Service and Privacy Policy
            </label>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
