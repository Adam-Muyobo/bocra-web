import { motion } from "framer-motion";
import {
  FileText,
  Radio,
  Globe,
  AlertTriangle,
  Briefcase,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const actionCards = [
  { title: "Apply for License", desc: "Start a new application", icon: FileText, path: "/portal/licensing", color: "bg-primary" },
  { title: "Manage Spectrum", desc: "ASMS frequency tools", icon: Radio, path: "/portal/spectrum", color: "bg-secondary" },
  { title: "Register Domain", desc: "Search .bw domains", icon: Globe, path: "/portal/domains", color: "bg-accent" },
  { title: "File Complaint", desc: "Report an issue", icon: AlertTriangle, path: "/portal/complaints", color: "bg-destructive" },
  { title: "View Tenders", desc: "Browse opportunities", icon: Briefcase, path: "/portal/tenders", color: "bg-primary" },
  { title: "Network Quality", desc: "QoS insights & maps", icon: BarChart3, path: "/portal/qos", color: "bg-secondary" },
];

const widgets = [
  { label: "Active Licenses", value: "12", icon: CheckCircle2, trend: "+2 this quarter" },
  { label: "Pending Applications", value: "3", icon: Clock, trend: "1 under review" },
  { label: "Open Complaints", value: "1", icon: AlertCircle, trend: "Avg 48hr resolution" },
  { label: "Active Tenders", value: "7", icon: Briefcase, trend: "3 closing soon" },
];

export default function Dashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Welcome */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>
          Good morning, Mothusi 👋
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          What would you like to do today?
        </p>
      </motion.div>

      {/* Action cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionCards.map((card) => (
          <Link key={card.title} to={card.path}>
            <div className="glass-panel p-5 hover-lift group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1 transition-transform duration-200" />
              </div>
              <h3 className="font-semibold text-foreground mt-4 text-sm">{card.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Widgets */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {widgets.map((w) => (
            <div key={w.label} className="neu-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <w.icon className="w-5 h-5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{w.label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground tabular-nums">{w.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{w.trend}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="neu-card divide-y divide-border">
          {[
            { action: "License renewal approved", time: "2 hours ago", status: "success" },
            { action: "Spectrum allocation request submitted", time: "Yesterday", status: "pending" },
            { action: "Domain bocra-portal.bw registered", time: "3 days ago", status: "success" },
            { action: "Complaint #1847 resolved", time: "1 week ago", status: "success" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "success" ? "bg-green-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-sm text-foreground">{item.action}</span>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
