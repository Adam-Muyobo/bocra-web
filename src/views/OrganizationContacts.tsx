/*
 * Lets organization accounts add and update multiple optional contact people.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { addOrganizationContact, listOrganizationContacts, updateOrganizationContact, type OrganizationContact, type UpsertOrganizationContactPayload } from "@/lib/api";

const emptyForm: UpsertOrganizationContactPayload = {
  forenames: "",
  surname: "",
  email: "",
  phoneNumber: "",
  jobTitle: "",
  primaryContact: false,
};

export default function OrganizationContacts() {
  const [contacts, setContacts] = useState<OrganizationContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingContactUuid, setEditingContactUuid] = useState<string | null>(null);
  const [form, setForm] = useState<UpsertOrganizationContactPayload>(emptyForm);

  const loadContacts = async () => {
    try {
      setContacts(await listOrganizationContacts());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load organization contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadContacts();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSaving(true);
      if (editingContactUuid) {
        await updateOrganizationContact(editingContactUuid, form);
        toast.success("Organization contact updated successfully.");
      } else {
        await addOrganizationContact(form);
        toast.success("Organization contact added successfully.");
      }
      setEditingContactUuid(null);
      setForm(emptyForm);
      await loadContacts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save organization contact.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organization Contacts</h1>
        <p className="text-sm text-muted-foreground mt-1">Contacts can be created before they have their own BOCRA credentials. They can later be linked to real user accounts without losing contact history.</p>
      </div>

      <form onSubmit={submit} className="neu-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold"><PlusCircle className="h-5 w-5 text-primary" /> {editingContactUuid ? "Edit Contact" : "Add Contact"}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Forenames" value={form.forenames} onChange={(value) => setForm((current) => ({ ...current, forenames: value }))} required />
          <Input label="Surname" value={form.surname} onChange={(value) => setForm((current) => ({ ...current, surname: value }))} required />
          <Input label="Email" value={form.email ?? ""} onChange={(value) => setForm((current) => ({ ...current, email: value }))} type="email" />
          <Input label="Phone Number" value={form.phoneNumber ?? ""} onChange={(value) => setForm((current) => ({ ...current, phoneNumber: value }))} />
          <Input label="Job Title" value={form.jobTitle ?? ""} onChange={(value) => setForm((current) => ({ ...current, jobTitle: value }))} />
          <label className="flex items-center gap-2 text-sm text-foreground pt-8"><input type="checkbox" checked={form.primaryContact} onChange={(event) => setForm((current) => ({ ...current, primaryContact: event.target.checked }))} /> Primary Contact</label>
        </div>
        <button type="submit" disabled={saving} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground inline-flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : editingContactUuid ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div className="neu-card overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No contacts added yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {contacts.map((contact) => (
              <button
                key={contact.uuid}
                type="button"
                onClick={() => {
                  setEditingContactUuid(contact.uuid);
                  setForm({
                    forenames: contact.forenames,
                    surname: contact.surname,
                    email: contact.email ?? "",
                    phoneNumber: contact.phoneNumber ?? "",
                    jobTitle: contact.jobTitle ?? "",
                    primaryContact: contact.primaryContact,
                  });
                }}
                className="w-full px-6 py-4 text-left hover:bg-muted/40 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-foreground">{contact.forenames} {contact.surname}</div>
                    <div className="text-sm text-muted-foreground">{contact.jobTitle || "No job title"} • {contact.email || "No email"}</div>
                  </div>
                  {contact.primaryContact && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Primary</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Input({ label, value, onChange, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; }) {
  return (
    <label className="space-y-1.5 block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
