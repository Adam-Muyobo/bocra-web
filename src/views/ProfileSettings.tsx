/*
 * Lets individual users review and update the personal details BOCRA uses in system interactions.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { getPersonProfile, updatePersonProfile, type UpdatePersonPayload } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

export default function ProfileSettings() {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<UpdatePersonPayload>({
    forenames: "",
    surname: "",
    dateOfBirth: "",
    gender: "PREFER_NOT_TO_SAY",
    nationality: "Botswana",
    nationalIdType: "OMANG",
    identityNumber: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    residentialAddressLine1: "",
    residentialAddressLine2: "",
    city: "",
    district: "",
    country: "Botswana",
    postalCode: "",
    occupation: "",
    organizationName: "",
    profilePhotoUrl: "",
  });

  useEffect(() => {
    void (async () => {
      try {
        const profile = await getPersonProfile();
        setForm({
          forenames: profile.forenames,
          surname: profile.surname,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          nationality: profile.nationality,
          nationalIdType: profile.nationalIdType,
          identityNumber: profile.identityNumber,
          phoneNumber: profile.phoneNumber,
          alternatePhoneNumber: profile.alternatePhoneNumber ?? "",
          residentialAddressLine1: profile.residentialAddressLine1,
          residentialAddressLine2: profile.residentialAddressLine2 ?? "",
          city: profile.city,
          district: profile.district,
          country: profile.country,
          postalCode: profile.postalCode ?? "",
          occupation: profile.occupation ?? "",
          organizationName: profile.organizationName ?? "",
          profilePhotoUrl: profile.profilePhotoUrl ?? "",
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSaving(true);
      await updatePersonProfile(form);
      await refreshUser();
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading profile...</div>;
  }

  return (
    <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Keep these details accurate because BOCRA uses them in your account activity and interactions.</p>
      </div>
      <div className="neu-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className={`space-y-1.5 ${key.includes("AddressLine1") || key.includes("AddressLine2") ? "md:col-span-2" : ""}`}>
            <span className="text-sm font-medium text-foreground">{labelFor(key)}</span>
            {key === "gender" || key === "nationalIdType" ? (
              <select value={String(value)} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                {(key === "gender" ? ["MALE", "FEMALE", "NON_BINARY", "PREFER_NOT_TO_SAY", "OTHER"] : ["OMANG", "PASSPORT", "DRIVERS_LICENSE", "RESIDENCE_PERMIT", "OTHER"]).map((option) => (
                  <option key={option} value={option}>{option.replaceAll("_", " ")}</option>
                ))}
              </select>
            ) : (
              <input
                type={key === "dateOfBirth" ? "date" : key.toLowerCase().includes("url") ? "url" : "text"}
                value={String(value ?? "")}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            )}
          </label>
        ))}
      </div>
      <button type="submit" disabled={saving} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground inline-flex items-center gap-2">
        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Profile"}
      </button>
    </motion.form>
  );
}

function labelFor(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
