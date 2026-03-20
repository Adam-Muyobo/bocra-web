import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Search, Upload, Eye, Clock, CheckCircle2, XCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const tenders = [
  { id: "T-2026-001", title: "Provision of ICT Infrastructure Assessment Services", category: "Consulting", deadline: "2026-04-15", budget: "P2,500,000", status: "Open" },
  { id: "T-2026-002", title: "Supply and Installation of Spectrum Monitoring Equipment", category: "Equipment", deadline: "2026-04-30", budget: "P8,200,000", status: "Open" },
  { id: "T-2026-003", title: "Development of National Broadband Strategy", category: "Consulting", deadline: "2026-03-28", budget: "P1,800,000", status: "Closing Soon" },
  { id: "T-2025-047", title: "Annual IT Support and Maintenance Contract", category: "Services", deadline: "2025-12-15", budget: "P950,000", status: "Closed" },
];

const myApplications = [
  { tenderId: "T-2026-001", title: "ICT Infrastructure Assessment", status: "Under Review", submitted: "2026-02-20" },
  { tenderId: "T-2025-044", title: "Network Quality Testing Equipment", status: "Accepted", submitted: "2025-11-10" },
];

const categories = ["All", "Consulting", "Equipment", "Services", "Construction"];

export default function Tenders() {
  const [tab, setTab] = useState<"browse" | "applications">("browse");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTender, setSelectedTender] = useState<string | null>(null);

  const filtered = tenders.filter(
    (t) =>
      (selectedCategory === "All" || t.category === selectedCategory) &&
      (searchQuery === "" || t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Tenders</h1>
        <p className="text-muted-foreground mt-1">Browse opportunities and manage your applications.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="flex gap-2">
        {(["browse", "applications"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "browse" ? "Browse Tenders" : "My Applications"}
          </button>
        ))}
      </motion.div>

      {tab === "browse" && (
        <>
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
              <div key={t.id} className="neu-card p-5 hover-lift cursor-pointer" onClick={() => setSelectedTender(selectedTender === t.id ? null : t.id)}>
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

                {selectedTender === t.id && (
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
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:shadow-lg transition-all active:scale-[0.97]">
                          <Upload className="w-3.5 h-3.5" /> Apply Now
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </>
      )}

      {tab === "applications" && (
        <motion.div variants={fadeUp} className="space-y-3">
          {myApplications.map((app) => (
            <div key={app.tenderId} className="glass-panel p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{app.tenderId}</span>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.status === "Accepted" ? "bg-green-100 text-green-700" :
                      app.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{app.status}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{app.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Submitted: {app.submitted}</p>
                </div>
                {app.status === "Accepted" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                 app.status === "Rejected" ? <XCircle className="w-5 h-5 text-destructive" /> :
                 <Clock className="w-5 h-5 text-amber-500" />}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
