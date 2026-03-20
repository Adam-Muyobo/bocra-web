import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Calendar, Search, Eye, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const tenders = [
  { id: "T-2026-001", title: "Provision of ICT Infrastructure Assessment Services", category: "Consulting", deadline: "2026-04-15", budget: "P2,500,000", status: "Open" },
  { id: "T-2026-002", title: "Supply and Installation of Spectrum Monitoring Equipment", category: "Equipment", deadline: "2026-04-30", budget: "P8,200,000", status: "Open" },
  { id: "T-2026-003", title: "Development of National Broadband Strategy", category: "Consulting", deadline: "2026-03-28", budget: "P1,800,000", status: "Closing Soon" },
  { id: "T-2025-047", title: "Annual IT Support and Maintenance Contract", category: "Services", deadline: "2025-12-15", budget: "P950,000", status: "Closed" },
];

const categories = ["All", "Consulting", "Equipment", "Services"];

export default function PublicTenders() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = tenders.filter(
    (t) =>
      (selectedCategory === "All" || t.category === selectedCategory) &&
      (searchQuery === "" || t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl mx-auto px-4 md:px-6 py-16 space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Open Tenders</h1>
        <p className="text-muted-foreground mt-1">Browse current BOCRA procurement opportunities.</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <div className="neu-inset flex items-center gap-2 px-4 py-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenders..."
            className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tender list */}
      <motion.div variants={fadeUp} className="space-y-3">
        {filtered.map((t) => (
          <div key={t.id} className="neu-card p-5 hover-lift cursor-pointer" onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-medium text-muted-foreground">{t.id}</span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.status === "Open" ? "bg-green-100 text-green-700" :
                    t.status === "Closing Soon" ? "bg-amber-100 text-amber-700" :
                    "bg-muted text-muted-foreground"
                  }`}>{t.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{t.category}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{t.title}</h3>
              </div>
              <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Deadline: {t.deadline}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {t.budget}</span>
            </div>

            {expandedId === t.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-border space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  The Botswana Communications Regulatory Authority invites qualified and experienced firms to submit proposals for this tender. Full terms of reference and documentation are available for download.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors">
                    📄 Download TOR
                  </button>
                  {t.status !== "Closed" && (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:shadow-lg transition-all"
                    >
                      Sign in to Apply <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeUp} className="glass-panel p-6 text-center">
        <p className="text-sm text-muted-foreground">Want to apply for a tender? Create an account to get started.</p>
        <Link to="/register" className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all">
          Create Account <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
