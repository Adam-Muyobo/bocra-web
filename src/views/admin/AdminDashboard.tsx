import { motion } from "framer-motion";
import { FileText, Briefcase, AlertTriangle, Users, TrendingUp, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const stats = [
  { label: "Pending Licenses", value: "24", icon: FileText, trend: "+5 this week", color: "bg-primary" },
  { label: "Active Tenders", value: "7", icon: Briefcase, trend: "2 closing soon", color: "bg-secondary" },
  { label: "Open Complaints", value: "18", icon: AlertTriangle, trend: "-3 from last week", color: "bg-destructive" },
  { label: "Registered Users", value: "1,247", icon: Users, trend: "+32 this month", color: "bg-accent" },
];

const recentActions = [
  { action: "License #L-2026-089 approved", by: "Admin Kgosi", time: "12 min ago", type: "success" },
  { action: "New tender T-2026-004 published", by: "Admin Motlhale", time: "1 hour ago", type: "info" },
  { action: "Complaint #C-1923 escalated", by: "System", time: "2 hours ago", type: "warning" },
  { action: "User verification pending review", by: "Admin Kgosi", time: "3 hours ago", type: "pending" },
  { action: "License #L-2026-087 rejected", by: "Admin Motlhale", time: "Yesterday", type: "error" },
];

export default function AdminDashboard() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of all BOCRA services and operations.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="neu-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <p className="text-xs text-accent mt-0.5">{s.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* Recent Actions */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Actions</h2>
        <div className="neu-card divide-y divide-border">
          {recentActions.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === "success" ? "bg-green-500" :
                  item.type === "error" ? "bg-destructive" :
                  item.type === "warning" ? "bg-amber-500" :
                  item.type === "info" ? "bg-accent" :
                  "bg-muted-foreground"
                }`} />
                <div>
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.by}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap ml-4">
                <Clock className="w-3 h-3" /> {item.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
