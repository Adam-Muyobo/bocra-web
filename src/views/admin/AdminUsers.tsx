import { motion } from "framer-motion";
import { Search, MoreVertical, Shield, User, Ban } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const users = [
  { id: "U-001", name: "Mothusi Kgosi", email: "mothusi@example.com", role: "User", status: "Active", joined: "2025-06-12" },
  { id: "U-002", name: "Kagiso Molefe", email: "kagiso@example.com", role: "User", status: "Active", joined: "2025-08-20" },
  { id: "U-003", name: "Admin Motlhale", email: "motlhale@bocra.org.bw", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: "U-004", name: "Tebogo Modise", email: "tebogo@company.co.bw", role: "User", status: "Suspended", joined: "2025-11-03" },
  { id: "U-005", name: "Lebo Kgatlhane", email: "lebo@org.bw", role: "User", status: "Active", joined: "2026-01-10" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) => search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">User Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage registered users.</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="neu-inset flex items-center gap-2 px-4 py-2 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground" />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="neu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                        <span className="text-secondary-foreground text-xs font-semibold">
                          {u.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      u.role === "Admin" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {u.role === "Admin" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
