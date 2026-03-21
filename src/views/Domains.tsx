import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, CheckCircle2, XCircle, ShoppingCart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const myDomains = [
  { name: "bocra-portal.bw", status: "Active", expires: "2027-01-15" },
  { name: "telecom-bw.co.bw", status: "Active", expires: "2026-08-20" },
];

export default function Domains() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<{ domain: string; available: boolean; price: string }[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    const base = query.replace(/\.bw$|\.co\.bw$/, "").trim();
    setResults([
      { domain: `${base}.bw`, available: true, price: "P250/yr" },
      { domain: `${base}.co.bw`, available: true, price: "P200/yr" },
      { domain: `${base}.org.bw`, available: false, price: "P250/yr" },
    ]);
    setSearched(true);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Register.BW</h1>
        <p className="text-muted-foreground mt-1">Search and register .bw domain names.</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="neu-card p-6">
        <div className="neu-inset flex items-center gap-3 px-5 py-3.5">
          <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Find your perfect .bw domain..."
            className="flex-1 bg-transparent text-base outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all active:scale-[0.97]"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Results */}
      {searched && (
        <motion.div variants={fadeUp} className="space-y-3">
          {results.map((r) => (
            <div key={r.domain} className="glass-panel p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {r.available ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="font-medium text-foreground text-sm">{r.domain}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{r.price}</span>
                {r.available && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:shadow-lg transition-all active:scale-[0.97]">
                    <ShoppingCart className="w-3.5 h-3.5" /> Register
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* My Domains */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">My Domains</h2>
        <div className="neu-card divide-y divide-border">
          {myDomains.map((d) => (
            <div key={d.name} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">Expires: {d.expires}</p>
              </div>
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{d.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
