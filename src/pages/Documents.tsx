import { motion } from "framer-motion";
import { FileText, Download, Search, Filter } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const documents = [
  { title: "Telecommunications Act, 2014", category: "Legislation", date: "2014-08-15", size: "2.4 MB" },
  { title: "National Broadband Strategy 2024–2030", category: "Strategy", date: "2024-03-01", size: "5.1 MB" },
  { title: "QoS Framework Guidelines", category: "Guidelines", date: "2025-06-20", size: "1.8 MB" },
  { title: "Spectrum Management Regulations", category: "Regulations", date: "2023-11-10", size: "3.2 MB" },
  { title: "Consumer Protection Rules", category: "Guidelines", date: "2025-01-15", size: "1.1 MB" },
  { title: "Annual Report 2024/2025", category: "Reports", date: "2025-09-30", size: "8.7 MB" },
  { title: "Licensing Framework Review", category: "Reports", date: "2025-04-18", size: "4.3 MB" },
  { title: "Domain Name Registration Policy", category: "Policy", date: "2024-07-22", size: "980 KB" },
];

const cats = ["All", "Legislation", "Strategy", "Guidelines", "Regulations", "Reports", "Policy"];

export default function Documents() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = documents.filter(
    (d) =>
      (cat === "All" || d.category === cat) &&
      (search === "" || d.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Documents</h1>
        <p className="text-muted-foreground mt-1">Access regulatory documents, reports, and publications.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <div className="neu-inset flex items-center gap-2 px-4 py-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="neu-card divide-y divide-border">
        {filtered.map((doc) => (
          <div key={doc.title} className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{doc.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">{doc.category}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Filter className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No documents match your search.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
