import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const news = [
  {
    title: "BOCRA Launches New Digital Services Platform",
    summary: "The Authority has unveiled a modernized online portal to streamline regulatory services for operators and the public.",
    date: "2026-03-18",
    category: "Announcement",
    featured: true,
  },
  {
    title: "Public Consultation on 5G Spectrum Allocation",
    summary: "BOCRA invites stakeholders to provide input on the proposed framework for 5G spectrum assignment in Botswana.",
    date: "2026-03-10",
    category: "Consultation",
    featured: false,
  },
  {
    title: "QoS Report: Q4 2025 Network Performance Results",
    summary: "The latest Quality of Service assessment shows improvement in broadband speeds across major urban centers.",
    date: "2026-02-28",
    category: "Report",
    featured: false,
  },
  {
    title: "New .bw Domain Registration Guidelines",
    summary: "Updated guidelines for registering and managing .bw domain names are now effective.",
    date: "2026-02-15",
    category: "Policy",
    featured: false,
  },
  {
    title: "BOCRA Signs MoU with SADC Regulators",
    summary: "A new memorandum of understanding aims to harmonize communications regulation across the SADC region.",
    date: "2026-02-01",
    category: "International",
    featured: false,
  },
  {
    title: "Consumer Rights Awareness Campaign Launched",
    summary: "BOCRA partners with local media to educate citizens on their rights when dealing with telecom service providers.",
    date: "2026-01-20",
    category: "Announcement",
    featured: false,
  },
];

export default function News() {
  const featured = news.find((n) => n.featured);
  const rest = news.filter((n) => !n.featured);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-12">
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">News & Announcements</h1>
        <p className="text-muted-foreground mt-2">Stay updated with the latest from BOCRA.</p>
      </motion.div>

      {/* Featured */}
      {featured && (
        <motion.div variants={fadeUp} className="neu-card p-6 md:p-8 relative overflow-hidden hover-lift cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Featured</span>
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1">
                <Tag className="w-3 h-3" /> {featured.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{featured.title}</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">{featured.summary}</p>
            <div className="flex items-center justify-between mt-5">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" /> {featured.date}
              </span>
              <span className="flex items-center gap-1 text-sm text-primary font-medium">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((item) => (
          <div key={item.title} className="glass-panel p-5 hover-lift cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">{item.category}</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{item.summary}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> {item.date}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
