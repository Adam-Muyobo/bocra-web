/*
 * Collects first-login profile data for individual and organization accounts.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, UserCircle2 } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { toast } from "@/components/ui/sonner";
import { getOrganizationProfile, getPersonProfile, updateOrganizationProfile, updatePersonProfile, type UpdateOrganizationPayload, type UpdatePersonPayload } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Onboarding() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personForm, setPersonForm] = useState<UpdatePersonPayload>({
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
  const [organizationForm, setOrganizationForm] = useState<UpdateOrganizationPayload>({
    displayName: user?.organization?.displayName ?? "",
    tradingName: "",
    registrationNumber: "",
    taxIdentifier: "",
    contactEmail: user?.user.email ?? "",
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
    if (!user) {
      return;
    }

    if (user.user.userType === "INDIVIDUAL" && user.person) {
      setPersonForm({
        forenames: user.person.forenames,
        surname: user.person.surname,
        dateOfBirth: user.person.dateOfBirth,
        gender: user.person.gender,
        nationality: user.person.nationality,
        nationalIdType: user.person.nationalIdType,
        identityNumber: user.person.identityNumber,
        phoneNumber: user.person.phoneNumber,
        alternatePhoneNumber: user.person.alternatePhoneNumber ?? "",
        residentialAddressLine1: user.person.residentialAddressLine1,
        residentialAddressLine2: user.person.residentialAddressLine2 ?? "",
        city: user.person.city,
        district: user.person.district,
        country: user.person.country,
        postalCode: user.person.postalCode ?? "",
        occupation: user.person.occupation ?? "",
        organizationName: user.person.organizationName ?? "",
        profilePhotoUrl: user.person.profilePhotoUrl ?? "",
      });
    }

    if (user.user.userType === "ORGANIZATION" && user.organization) {
      setOrganizationForm({
        displayName: user.organization.displayName,
        tradingName: user.organization.tradingName ?? "",
        registrationNumber: user.organization.registrationNumber ?? "",
        taxIdentifier: user.organization.taxIdentifier ?? "",
        contactEmail: user.organization.contactEmail ?? user.user.email,
        contactPhoneNumber: user.organization.contactPhoneNumber ?? "",
        addressLine1: user.organization.addressLine1 ?? "",
        addressLine2: user.organization.addressLine2 ?? "",
        city: user.organization.city ?? "",
        district: user.organization.district ?? "",
        country: user.organization.country ?? "Botswana",
        postalCode: user.organization.postalCode ?? "",
        logoUrl: user.organization.logoUrl ?? "",
      });
    }
  }, [user]);

  const submitPerson = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      await updatePersonProfile(personForm);
      await refreshUser();
      toast.success("Your profile is ready. These details will be used in your BOCRA interactions.");
      navigate("/portal");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOrganization = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      await updateOrganizationProfile(organizationForm);
      await refreshUser();
      toast.success("Organization profile saved. These details will be used in BOCRA interactions.");
      navigate("/portal/organization/contacts");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save organization profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={fadeUp} className="flex justify-start">
        <BackLink to="/portal" label="Back to portal" />
      </motion.div>
      <motion.div variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Complete your profile</h1>
        <p className="text-sm text-muted-foreground">This is the information BOCRA will use whenever you interact with the system. You can edit it later from your account pages.</p>
      </motion.div>

      {user.user.userType === "INDIVIDUAL" ? (
        <motion.form variants={fadeUp} onSubmit={submitPerson} className="neu-card p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3"><UserCircle2 className="h-6 w-6 text-primary" /><h2 className="text-lg font-semibold">Personal Profile</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Forenames" value={personForm.forenames} onChange={(value) => setPersonForm((current) => ({ ...current, forenames: value }))} required />
            <Input label="Surname" value={personForm.surname} onChange={(value) => setPersonForm((current) => ({ ...current, surname: value }))} required />
            <Input label="Date of Birth" type="date" value={personForm.dateOfBirth} onChange={(value) => setPersonForm((current) => ({ ...current, dateOfBirth: value }))} required />
            <Select label="Gender" value={personForm.gender} onChange={(value) => setPersonForm((current) => ({ ...current, gender: value }))} options={["MALE", "FEMALE", "NON_BINARY", "PREFER_NOT_TO_SAY", "OTHER"]} />
            <Input label="Nationality" value={personForm.nationality} onChange={(value) => setPersonForm((current) => ({ ...current, nationality: value }))} required />
            <Select label="Identity Type" value={personForm.nationalIdType} onChange={(value) => setPersonForm((current) => ({ ...current, nationalIdType: value }))} options={["OMANG", "PASSPORT", "DRIVERS_LICENSE", "RESIDENCE_PERMIT", "OTHER"]} />
            <Input label="Identity Number" value={personForm.identityNumber} onChange={(value) => setPersonForm((current) => ({ ...current, identityNumber: value }))} required />
            <Input label="Phone Number" value={personForm.phoneNumber} onChange={(value) => setPersonForm((current) => ({ ...current, phoneNumber: value }))} required />
            <Input label="Alternate Phone" value={personForm.alternatePhoneNumber ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, alternatePhoneNumber: value }))} />
            <Input label="Occupation" value={personForm.occupation ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, occupation: value }))} />
            <Input label="Organization Name (optional)" value={personForm.organizationName ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, organizationName: value }))} />
            <Input label="Profile Image URL (optional)" value={personForm.profilePhotoUrl ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, profilePhotoUrl: value }))} />
          </div>
          <Input label="Residential Address Line 1" value={personForm.residentialAddressLine1} onChange={(value) => setPersonForm((current) => ({ ...current, residentialAddressLine1: value }))} required />
          <Input label="Residential Address Line 2" value={personForm.residentialAddressLine2 ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, residentialAddressLine2: value }))} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="City" value={personForm.city} onChange={(value) => setPersonForm((current) => ({ ...current, city: value }))} required />
            <Input label="District" value={personForm.district} onChange={(value) => setPersonForm((current) => ({ ...current, district: value }))} required />
            <Input label="Country" value={personForm.country} onChange={(value) => setPersonForm((current) => ({ ...current, country: value }))} required />
            <Input label="Postal Code" value={personForm.postalCode ?? ""} onChange={(value) => setPersonForm((current) => ({ ...current, postalCode: value }))} />
          </div>
          <SubmitButton isSubmitting={isSubmitting} label="Save Personal Profile" />
        </motion.form>
      ) : (
        <motion.form variants={fadeUp} onSubmit={submitOrganization} className="neu-card p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-primary" /><h2 className="text-lg font-semibold">Organization Profile</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Display Name" value={organizationForm.displayName} onChange={(value) => setOrganizationForm((current) => ({ ...current, displayName: value }))} required />
            <Input label="Trading Name" value={organizationForm.tradingName ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, tradingName: value }))} />
            <Input label="Registration Number" value={organizationForm.registrationNumber ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, registrationNumber: value }))} />
            <Input label="Tax Identifier" value={organizationForm.taxIdentifier ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, taxIdentifier: value }))} />
            <Input label="Contact Email" type="email" value={organizationForm.contactEmail ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, contactEmail: value }))} />
            <Input label="Contact Phone" value={organizationForm.contactPhoneNumber ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, contactPhoneNumber: value }))} />
            <Input label="Logo URL (optional)" value={organizationForm.logoUrl ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, logoUrl: value }))} />
          </div>
          <Input label="Address Line 1" value={organizationForm.addressLine1 ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, addressLine1: value }))} />
          <Input label="Address Line 2" value={organizationForm.addressLine2 ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, addressLine2: value }))} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="City" value={organizationForm.city ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, city: value }))} />
            <Input label="District" value={organizationForm.district ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, district: value }))} />
            <Input label="Country" value={organizationForm.country ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, country: value }))} />
            <Input label="Postal Code" value={organizationForm.postalCode ?? ""} onChange={(value) => setOrganizationForm((current) => ({ ...current, postalCode: value }))} />
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">After saving, you can add one or more optional contact people for the organization.</div>
          <SubmitButton isSubmitting={isSubmitting} label="Save Organization Profile" />
        </motion.form>
      )}
    </motion.div>
  );
}

function Input({ label, value, onChange, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; }) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[]; }) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
        {options.map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}
      </select>
    </label>
  );
}

function SubmitButton({ isSubmitting, label }: { isSubmitting: boolean; label: string; }) {
  return (
    <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:shadow-lg inline-flex items-center justify-center gap-2">
      {isSubmitting ? "Saving..." : label} <ArrowRight className="h-4 w-4" />
    </button>
  );
}
