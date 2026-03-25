/*
 * Renders the authenticated portal dashboard with quick access to profile management flows.
 */
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Briefcase, Building2, FileText, FolderOpen, Globe, Radio, Settings2, UserCircle2, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

export default function Dashboard() {
  const { user } = useAuth();

  const actionCards = [
    { title: "Licensing", desc: "Start or track license work", icon: FileText, path: "/portal/licensing", color: "bg-primary" },
    { title: "Spectrum", desc: "Use ASMS frequency tools", icon: Radio, path: "/portal/spectrum", color: "bg-secondary" },
    { title: "Domains", desc: "Search and manage .bw domains", icon: Globe, path: "/portal/domains", color: "bg-accent" },
    { title: "Tenders", desc: "Browse active opportunities", icon: Briefcase, path: "/portal/tenders", color: "bg-primary" },
    { title: user?.user.userType === "ORGANIZATION" ? "Organization Profile" : "My Profile", desc: "Keep BOCRA-facing details current", icon: user?.user.userType === "ORGANIZATION" ? Building2 : UserCircle2, path: user?.user.userType === "ORGANIZATION" ? "/portal/organization" : "/portal/profile", color: "bg-secondary" },
    { title: user?.user.userType === "ORGANIZATION" ? "Organization Contacts" : "Documents", desc: user?.user.userType === "ORGANIZATION" ? "Manage optional contact people" : "Store official files", icon: user?.user.userType === "ORGANIZATION" ? UsersRound : FolderOpen, path: user?.user.userType === "ORGANIZATION" ? "/portal/organization/contacts" : "/portal/documents", color: "bg-accent" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={fadeUp} className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Welcome back, {displayName(user)}.</h1>
        <p className="text-muted-foreground text-base">Manage the details and submissions that BOCRA will use in your ongoing interactions with the system.</p>
      </motion.div>

      {!user?.user.profileCompleted && (
        <motion.div variants={fadeUp} className="glass-panel p-5 border border-dashed border-primary/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Finish your onboarding</h2>
              <p className="text-sm text-muted-foreground mt-1">Your core BOCRA profile is not complete yet. Finish it before you begin interacting with live services.</p>
            </div>
            <Link to="/portal/onboarding" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              Complete now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionCards.map((card) => (
          <Link key={card.title} to={card.path}>
            <div className="glass-panel p-5 hover-lift group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}><card.icon className="w-5 h-5 text-primary-foreground" /></div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="font-semibold text-foreground mt-4 text-sm">{card.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <InfoCard title="Account Type" value={user?.user.userType.replaceAll("_", " ") ?? "Unknown"} icon={Settings2} />
        <InfoCard title="Role" value={user?.user.role.replaceAll("_", " ") ?? "Unknown"} icon={BarChart3} />
        <InfoCard title="Profile Status" value={user?.user.profileCompleted ? "Complete" : "Pending"} icon={UserCircle2} />
      </motion.div>
    </motion.div>
  );
}

function InfoCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ComponentType<{ className?: string }>; }) {
  return (
    <div className="neu-card p-5">
      <div className="flex items-center gap-3 mb-3"><Icon className="w-5 h-5 text-accent" /><span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span></div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function displayName(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "there";
  if (user.user.userType === "ORGANIZATION") {
    return user.organization?.displayName ?? user.user.username;
  }
  return user.person ? `${user.person.forenames} ${user.person.surname}` : user.user.username;
}
