import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const tenders = [
  { id: "T-2026-001", title: "ICT Infrastructure Assessment", status: "Published", deadline: "2026-04-15", applicants: 8 },
  { id: "T-2026-002", title: "Spectrum Monitoring Equipment", status: "Published", deadline: "2026-04-30", applicants: 3 },
  { id: "T-2026-003", title: "National Broadband Strategy", status: "Published", deadline: "2026-03-28", applicants: 12 },
  { id: "T-2026-004", title: "Office Renovation Phase 2", status: "Draft", deadline: "2026-05-15", applicants: 0 },
];

export default function AdminTenders() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Tenders Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Create, edit, and publish tenders.</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all active:scale-[0.97]"
        >
          <Plus className="w-4 h-4" /> New Tender
        </button>
      </motion.div>

      {/* Create form */}
      {showCreate && (
        <motion.div variants={fadeUp} className="glass-panel p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Create New Tender</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input placeholder="Tender title" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>Consulting</option>
                <option>Equipment</option>
                <option>Services</option>
                <option>Construction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Deadline</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Budget (optional)</label>
              <input placeholder="e.g. P2,500,000" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <textarea rows={3} placeholder="Full description and requirements..." className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Attachments</label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
              Drop files here or click to upload (PDF, DOC, images)
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-xl text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors">Cancel</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors">Save as Draft</button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:shadow-lg transition-all">Publish</button>
          </div>
        </motion.div>
      )}

      {/* Tender list */}
      <motion.div variants={fadeUp} className="space-y-3">
        {tenders.map((t) => (
          <div key={t.id} className="neu-card p-5 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground">{t.id}</span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  t.status === "Published" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}>{t.status}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{t.title}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.deadline}</span>
                <span>{t.applicants} applicants</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></button>
              <button className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
              <button className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
