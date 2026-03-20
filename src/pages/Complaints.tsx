import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Send, Clock, CheckCircle2, MessageSquare } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const categories = [
  "Poor Network Quality",
  "Billing Dispute",
  "Service Interruption",
  "Unfair Business Practice",
  "Spam / Unsolicited Communication",
  "Other",
];

const existingComplaints = [
  { id: "#1847", subject: "Repeated service outage in Gaborone West", status: "Resolved", date: "2025-12-10" },
  { id: "#1902", subject: "Incorrect billing by ISP provider", status: "Under Review", date: "2026-01-15" },
];

export default function Complaints() {
  const [category, setCategory] = useState("");

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Complaints</h1>
        <p className="text-muted-foreground mt-1">File a complaint or track existing ones.</p>
      </motion.div>

      {/* New Complaint */}
      <motion.div variants={fadeUp} className="neu-card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-foreground">File a New Complaint</h2>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                  category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
          <div className="neu-inset mt-1.5 px-4 py-2.5">
            <input type="text" placeholder="Brief description of your complaint" className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Details</label>
          <div className="neu-inset mt-1.5 px-4 py-2.5">
            <textarea rows={4} placeholder="Provide detailed information about your complaint..." className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground resize-none" />
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all active:scale-[0.97]">
          <Send className="w-4 h-4" /> Submit Complaint
        </button>
      </motion.div>

      {/* Existing */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">My Complaints</h2>
        <div className="space-y-3">
          {existingComplaints.map((c) => (
            <div key={c.id} className="glass-panel p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{c.id}</span>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      c.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>{c.status}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{c.subject}</p>
                  <p className="text-xs text-muted-foreground mt-1">Filed: {c.date}</p>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {c.status === "Resolved" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-amber-500" />}
                </div>
              </div>
              {/* Timeline */}
              <div className="mt-4 pl-2 border-l-2 border-border space-y-3">
                <div className="pl-4">
                  <p className="text-xs font-medium text-foreground">Complaint Filed</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <div className="pl-4">
                  <p className="text-xs font-medium text-foreground">Acknowledged</p>
                  <p className="text-xs text-muted-foreground">Within 24 hours</p>
                </div>
                {c.status === "Resolved" && (
                  <div className="pl-4">
                    <p className="text-xs font-medium text-foreground">Resolved</p>
                    <p className="text-xs text-muted-foreground">Issue addressed by operator</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
