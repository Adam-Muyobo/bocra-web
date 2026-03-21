import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Eye, Clock, Search } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const applications = [
  { id: "L-2026-089", applicant: "BTC Ltd", type: "Telecommunications", date: "2026-03-15", status: "Pending" },
  { id: "L-2026-088", applicant: "MascomWireless", type: "Broadcasting", date: "2026-03-12", status: "Pending" },
  { id: "L-2026-087", applicant: "OrangeBW", type: "ISP License", date: "2026-03-10", status: "Approved" },
  { id: "L-2026-086", applicant: "BotswanaPost", type: "Postal Services", date: "2026-03-08", status: "Rejected" },
  { id: "L-2026-085", applicant: "nTelligence", type: "Telecommunications", date: "2026-03-05", status: "Under Review" },
];

const statusFilters = ["All", "Pending", "Under Review", "Approved", "Rejected"];

export default function AdminLicenses() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = applications.filter(
    (a) => (filter === "All" || a.status === filter) &&
           (search === "" || a.applicant.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">License Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage license applications.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <div className="neu-inset flex items-center gap-2 px-4 py-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by applicant or ID..." className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3">
        {filtered.map((app) => (
          <div key={app.id} className="neu-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-medium text-muted-foreground">{app.id}</span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === "Approved" ? "bg-green-100 text-green-700" :
                    app.status === "Rejected" ? "bg-red-100 text-red-700" :
                    app.status === "Under Review" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>{app.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{app.type}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{app.applicant}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Submitted: {app.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {app.status === "Pending" && (
                  <>
                    <button className="p-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-colors" title="Approve">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-colors" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground transition-colors" title="View details">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
