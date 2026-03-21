import { motion } from "framer-motion";
import { Radio, RefreshCw, Signal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const allocations = [
  { band: "700 MHz", assignee: "BTC", status: "Active", expiry: "2027-03-15" },
  { band: "800 MHz", assignee: "Mascom", status: "Active", expiry: "2026-11-20" },
  { band: "900 MHz", assignee: "Orange", status: "Active", expiry: "2028-06-01" },
  { band: "1800 MHz", assignee: "BTC", status: "Renewal Due", expiry: "2025-12-31" },
  { band: "2100 MHz", assignee: "Mascom", status: "Active", expiry: "2027-09-15" },
  { band: "2600 MHz", assignee: "Unassigned", status: "Available", expiry: "—" },
];

export default function Spectrum() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Spectrum Management</h1>
        <p className="text-muted-foreground mt-1">ASMS frequency allocation and management dashboard.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Allocations", value: "42", icon: Radio },
          { label: "Active Licenses", value: "38", icon: Signal },
          { label: "Pending Renewals", value: "4", icon: RefreshCw },
        ].map((s) => (
          <div key={s.label} className="neu-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <s.icon className="w-5 h-5 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground tabular-nums">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Spectrum visual */}
      <motion.div variants={fadeUp} className="neu-card p-6">
        <h2 className="font-semibold text-foreground mb-4">Frequency Spectrum Map</h2>
        <div className="flex gap-1 h-12 rounded-xl overflow-hidden">
          {[
            { w: "15%", color: "bg-primary", label: "700" },
            { w: "12%", color: "bg-secondary", label: "800" },
            { w: "18%", color: "bg-accent", label: "900" },
            { w: "20%", color: "bg-primary/70", label: "1800" },
            { w: "15%", color: "bg-secondary/70", label: "2100" },
            { w: "20%", color: "bg-muted", label: "2600" },
          ].map((band) => (
            <div
              key={band.label}
              style={{ width: band.w }}
              className={`${band.color} flex items-center justify-center text-xs font-semibold text-primary-foreground`}
            >
              {band.label}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> BTC</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-secondary" /> Mascom</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-accent" /> Orange</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-muted" /> Available</span>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} className="neu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Band</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Assignee</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Expiry</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allocations.map((a) => (
                <tr key={a.band} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{a.band}</td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{a.assignee}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      a.status === "Active" ? "bg-green-100 text-green-700" :
                      a.status === "Available" ? "bg-accent/10 text-accent" :
                      "bg-amber-100 text-amber-700"
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground tabular-nums">{a.expiry}</td>
                  <td className="px-5 py-3.5">
                    {a.status === "Renewal Due" && (
                      <button className="text-xs font-medium text-primary hover:underline">Renew</button>
                    )}
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
