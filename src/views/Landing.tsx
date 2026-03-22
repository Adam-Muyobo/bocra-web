import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, Radio, Globe, BarChart3, AlertTriangle, Briefcase,
  ArrowRight, Shield, Wifi, Users, ChevronRight, Zap, Phone,
} from "lucide-react";
import heroImage from "@/assets/hero-meeting.jpg";
import telecomEngineer from "@/assets/telecom-engineer.jpg";
import digitalCommunity from "@/assets/digital-community.jpg";
import gaboroneSkyline from "@/assets/gaborone-skyline.jpg";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
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

const publicUpdates = [
  {
    title: "Digital Services Platform Now Live",
    summary: "Citizens, organizations, and operators can now begin account registration online before completing detailed BOCRA onboarding.",
    link: "/news",
    category: "Announcement",
  },
  {
    title: "5G Spectrum Consultation Open",
    summary: "Stakeholders can review the latest consultation direction and prepare submissions through the BOCRA digital experience.",
    link: "/news",
    category: "Consultation",
  },
  {
    title: "What You Can Do Without Signing In",
    summary: "Browse tenders, read BOCRA updates, and review public service information before creating an account or signing in.",
    link: "/about",
    category: "Guide",
  },
];

export default function Landing() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage.src} alt="BOCRA regulatory professionals in boardroom meeting" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))]/95 via-[hsl(var(--background))]/80 to-[hsl(var(--background))]/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative">
          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 backdrop-blur-sm">
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
              <span className="block mt-1 italic">Fitlhelela ditirelo tsa rona mo lefelong le le lengwe fela.</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card/80 backdrop-blur-sm text-foreground font-medium text-sm hover:bg-card transition-colors border border-border"
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

      {/* Connecting Botswana section with images */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              Connecting Every Corner
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Bridging Botswana's Digital Divide
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              From the bustling streets of Gaborone to the remote villages of the Kalahari, BOCRA ensures that every Motswana has access to reliable, affordable communications services. Our regulatory framework drives infrastructure investment and digital inclusion across the nation.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="neu-card-sm p-4">
                <Phone className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-foreground text-sm">Mobile Coverage</p>
                <p className="text-xs text-muted-foreground mt-1">98% population coverage nationwide</p>
              </div>
              <div className="neu-card-sm p-4">
                <Wifi className="w-5 h-5 text-accent mb-2" />
                <p className="font-semibold text-foreground text-sm">Broadband Growth</p>
                <p className="text-xs text-muted-foreground mt-1">45% internet penetration and growing</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={telecomEngineer.src} alt="Motswana telecom engineer servicing rural tower" className="rounded-2xl object-cover h-48 w-full" />
            <img src={digitalCommunity.src} alt="Batswana youth at a digital community hub" className="rounded-2xl object-cover h-48 w-full" />
            <img src={gaboroneSkyline.src} alt="Gaborone skyline with telecommunications towers" className="rounded-2xl object-cover h-48 w-full col-span-2" />
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
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
        </div>
      </section>

      {/* Public updates */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <motion.div variants={fadeUp} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Public News & Service Details</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              You do not need to sign in first to keep up with BOCRA updates, public notices, and service information.
            </p>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all updates <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publicUpdates.map((update) => (
            <Link key={update.title} to={update.link}>
              <div className="glass-panel h-full p-6 hover-lift">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{update.category}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground leading-snug">{update.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{update.summary}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Read more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
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
