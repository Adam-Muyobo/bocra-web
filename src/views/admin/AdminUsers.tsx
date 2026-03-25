/*
 * Shows admin users a live view of registered BOCRA accounts for review and oversight.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search, Shield, User, UsersRound } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { listUsers, type UserSummary } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        setUsers(await listUsers());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load users.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredUsers = useMemo(() => users.filter((user) => {
    const needle = search.toLowerCase();
    return needle === ""
      || user.username.toLowerCase().includes(needle)
      || user.email.toLowerCase().includes(needle)
      || user.userType.toLowerCase().includes(needle);
  }), [search, users]);

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">User Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor individuals, organization accounts, and administrators from one place.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Total Users" value={String(users.length)} icon={UsersRound} />
        <MetricCard label="Organizations" value={String(users.filter((user) => user.userType === "ORGANIZATION").length)} icon={Building2} />
        <MetricCard label="Admins" value={String(users.filter((user) => ["ADMIN", "SUPER_ADMIN"].includes(user.role)).length)} icon={Shield} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="neu-inset flex items-center gap-2 px-4 py-2 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by username, email, or type..." className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground" />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="neu-card overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Onboarding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.uuid} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                          {user.userType === "ORGANIZATION" ? <Building2 className="w-4 h-4 text-secondary-foreground" /> : <User className="w-4 h-4 text-secondary-foreground" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.username}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-foreground">{user.userType.replaceAll("_", " ")}</td>
                    <td className="px-5 py-4 text-sm text-foreground">{user.role.replaceAll("_", " ")}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${user.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.accountStatus}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{user.profileCompleted ? "Complete" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; }) {
  return (
    <div className="neu-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-accent" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-bold text-foreground tabular-nums">{value}</p>
    </div>
  );
}
