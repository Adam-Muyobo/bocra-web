import { motion } from "framer-motion";
import { MessageSquare, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const complaints = [
  { id: "C-1923", user: "Kagiso Molefe", category: "Network Quality", summary: "Frequent internet outages in Maun area", date: "2026-03-19", status: "New", priority: "High" },
  { id: "C-1922", user: "Tebogo Modise", category: "Billing", summary: "Overcharged for data bundle", date: "2026-03-18", status: "In Progress", priority: "Medium" },
  { id: "C-1921", user: "Lebo Kgatlhane", category: "Service Quality", summary: "Poor customer service from operator", date: "2026-03-17", status: "In Progress", priority: "Low" },
  { id: "C-1920", user: "Mpho Seabo", category: "Network Quality", summary: "No coverage in Kasane CBD", date: "2026-03-15", status: "Resolved", priority: "High" },
];

export default function AdminComplaints() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Complaints Management</h1>
        <p className="text-muted-foreground text-sm mt-1">View and respond to user complaints.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
        {[
          { label: "New", value: "6", icon: AlertTriangle, color: "text-amber-500" },
          { label: "In Progress", value: "12", icon: Clock, color: "text-accent" },
          { label: "Resolved", value: "245", icon: CheckCircle2, color: "text-green-500" },
        ].map((s) => (
          <div key={s.label} className="glass-panel p-4 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* List */}
      <motion.div variants={fadeUp} className="space-y-3">
        {complaints.map((c) => (
          <div key={c.id} className="neu-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-medium text-muted-foreground">{c.id}</span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    c.status === "New" ? "bg-amber-100 text-amber-700" :
                    c.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>{c.status}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                    c.priority === "High" ? "bg-red-100 text-red-700" :
                    c.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-muted text-muted-foreground"
                  }`}>{c.priority}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{c.summary}</p>
                <p className="text-xs text-muted-foreground mt-1">By {c.user} · {c.category} · {c.date}</p>
              </div>
              <button className="p-2 rounded-xl bg-primary text-primary-foreground hover:shadow-lg transition-all" title="Respond">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
