import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, Radio, Globe, BarChart3, AlertTriangle, Briefcase,
  ArrowRight, Shield, Wifi, Users, ChevronRight,
} from "lucide-react";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const services = [
  { title: "Licensing", desc: "Apply for telecom, broadcasting, and postal licenses", icon: FileText, path: "/login" },
  { title: "Spectrum Management", desc: "Frequency allocation and monitoring tools", icon: Radio, path: "/login" },
  { title: "Domain Registration", desc: "Register and manage .bw domains", icon: Globe, path: "/login" },
  { title: "Quality of Service", desc: "Network performance insights across Botswana", icon: BarChart3, path: "/login" },
  { title: "Complaints", desc: "File and track regulatory complaints", icon: AlertTriangle, path: "/login" },
  { title: "Tenders", desc: "Browse and apply for open tenders", icon: Briefcase, path: "/tenders" },
];

const stats = [
  { value: "500+", label: "Active Licenses", icon: Shield },
  { value: "99.2%", label: "Network Uptime", icon: Wifi },
  { value: "50K+", label: "Domains Registered", icon: Globe },
  { value: "2M+", label: "Citizens Served", icon: Users },
];

export default function Landing() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 relative">
          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Shield className="w-3.5 h-3.5" />
              Regulating for a Connected Botswana
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              Your Gateway to{" "}
              <span className="text-primary">Digital Regulatory</span>{" "}
              Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Access licensing, spectrum management, domain registration, and more — all from one unified platform. 
              <span className="block mt-1">Fitlhelela ditirelo tsa rona mo lefelong le le lengwe fela.</span>
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all active:scale-[0.97]"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Our Services</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Everything you need to interact with BOCRA, streamlined into one platform.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link key={s.title} to={s.path}>
              <div className="glass-panel p-6 hover-lift group cursor-pointer h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-base">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium text-primary">
                  {s.title === "Tenders" ? "Browse tenders" : "Sign in to access"} <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <motion.div variants={fadeUp} className="neu-card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Create your account to access all BOCRA digital services. It's fast, secure, and free.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg transition-all"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
