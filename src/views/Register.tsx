/*
 * Renders a production-minded registration form wired to the BOCRA API.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
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
    forenames: "",
    surname: "",
    middleNames: "",
    email: "",
    username: "",
    organizationName: "",
    password: "",
    dateOfBirth: "",
    gender: "MALE",
    nationality: "Botswana",
    nationalIdType: "OMANG",
    nationalIdNumber: "",
    passportNumber: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    residentialAddressLine1: "",
    residentialAddressLine2: "",
    city: "",
    district: "",
    country: "Botswana",
    postalCode: "",
    occupation: "",
    profilePhotoUrl: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await register(form);
      toast.success(response.message);
      toast.info(`Verification required before login. Token expires at ${new Date(response.verificationTokenExpiresAt).toLocaleString()}.`);
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Forenames</label>
                <input
                  type="text"
                  value={form.forenames}
                  onChange={(e) => updateField("forenames", e.target.value)}
                  placeholder="Mothusi"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Surname</label>
                <input
                  type="text"
                  value={form.surname}
                  onChange={(e) => updateField("surname", e.target.value)}
                  placeholder="Kgosi"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Middle Names</label>
              <input
                type="text"
                value={form.middleNames}
                onChange={(e) => updateField("middleNames", e.target.value)}
                placeholder="Optional middle names"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username (optional)</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="bocra_user"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Organization (optional)</label>
              <input
                type="text"
                value={form.organizationName}
                onChange={(e) => updateField("organizationName", e.target.value)}
                placeholder="Your company name"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
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

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="NON_BINARY">Non-binary</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nationality</label>
                <input
                  type="text"
                  value={form.nationality}
                  onChange={(e) => updateField("nationality", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">National ID Type</label>
                <select
                  value={form.nationalIdType}
                  onChange={(e) => updateField("nationalIdType", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="OMANG">Omang</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVERS_LICENSE">Driver's License</option>
                  <option value="RESIDENCE_PERMIT">Residence Permit</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">National ID Number</label>
                <input
                  type="text"
                  value={form.nationalIdNumber}
                  onChange={(e) => updateField("nationalIdNumber", e.target.value)}
                  placeholder="Identity number"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Passport Number</label>
                <input
                  type="text"
                  value={form.passportNumber}
                  onChange={(e) => updateField("passportNumber", e.target.value)}
                  placeholder="Required if passport is selected"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                  placeholder="+267 71 234 567"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Alternate Phone Number</label>
              <input
                type="tel"
                value={form.alternatePhoneNumber}
                onChange={(e) => updateField("alternatePhoneNumber", e.target.value)}
                placeholder="Optional secondary number"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Residential Address Line 1</label>
              <input
                type="text"
                value={form.residentialAddressLine1}
                onChange={(e) => updateField("residentialAddressLine1", e.target.value)}
                placeholder="Street address"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Residential Address Line 2</label>
              <input
                type="text"
                value={form.residentialAddressLine2}
                onChange={(e) => updateField("residentialAddressLine2", e.target.value)}
                placeholder="Apartment, ward, or plot details"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">District</label>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Postal Code</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Occupation</label>
                <input
                  type="text"
                  value={form.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Profile Photo URL</label>
                <input
                  type="url"
                  value={form.profilePhotoUrl}
                  onChange={(e) => updateField("profilePhotoUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="rounded border-input mt-0.5" required />
              I agree to the BOCRA Terms of Service and Privacy Policy
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
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
