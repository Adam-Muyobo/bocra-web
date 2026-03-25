/*
 * Lets organization accounts maintain the organization details used across BOCRA workflows.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { getOrganizationProfile, updateOrganizationProfile, type UpdateOrganizationPayload } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

export default function OrganizationSettings() {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<UpdateOrganizationPayload>({
    displayName: "",
    tradingName: "",
    registrationNumber: "",
    taxIdentifier: "",
    contactEmail: "",
    contactPhoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    country: "Botswana",
    postalCode: "",
    logoUrl: "",
  });

  useEffect(() => {
    void (async () => {
      try {
        const profile = await getOrganizationProfile();
        setForm({
          displayName: profile.displayName,
          tradingName: profile.tradingName ?? "",
          registrationNumber: profile.registrationNumber ?? "",
          taxIdentifier: profile.taxIdentifier ?? "",
          contactEmail: profile.contactEmail ?? "",
          contactPhoneNumber: profile.contactPhoneNumber ?? "",
          addressLine1: profile.addressLine1 ?? "",
          addressLine2: profile.addressLine2 ?? "",
          city: profile.city ?? "",
          district: profile.district ?? "",
          country: profile.country ?? "Botswana",
          postalCode: profile.postalCode ?? "",
          logoUrl: profile.logoUrl ?? "",
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load organization profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updateOrganizationProfile(form);
      await refreshUser();
      toast.success("Organization profile updated successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update organization profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading organization profile...</div>;
  }

  return (
    <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organization Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">These organization details identify your organization across BOCRA interactions and submissions.</p>
      </div>
      <div className="neu-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className={`space-y-1.5 ${key.includes("address") ? "md:col-span-2" : ""}`}>
            <span className="text-sm font-medium text-foreground">{labelFor(key)}</span>
            <input
              type={key.toLowerCase().includes("email") ? "email" : key.toLowerCase().includes("url") ? "url" : "text"}
              value={String(value ?? "")}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              required={key === "displayName"}
            />
          </label>
        ))}
      </div>
      <button type="submit" disabled={saving} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground inline-flex items-center gap-2">
        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Organization"}
      </button>
    </motion.form>
  );
}

function labelFor(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
