import { motion } from "framer-motion";
import { BarChart3, Wifi, Signal, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const operators = [
  { name: "BTC", download: "34.2", upload: "12.8", latency: "28", coverage: "87%" },
  { name: "Mascom", download: "42.1", upload: "15.3", latency: "22", coverage: "91%" },
  { name: "Orange", download: "29.7", upload: "10.1", latency: "35", coverage: "79%" },
];

export default function QoS() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>QoS Botswana</h1>
        <p className="text-muted-foreground mt-1">Network quality insights across Botswana.</p>
      </motion.div>

      {/* Location selector */}
      <motion.div variants={fadeUp} className="glass-panel p-5 flex flex-wrap items-center gap-4">
        <MapPin className="w-5 h-5 text-accent" />
        <select className="bg-transparent text-sm text-foreground outline-none font-medium">
          <option>Gaborone</option>
          <option>Francistown</option>
          <option>Maun</option>
          <option>Kasane</option>
          <option>Serowe</option>
        </select>
        <span className="text-xs text-muted-foreground">Showing data for selected region</span>
      </motion.div>

      {/* Operator cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {operators.map((op) => (
          <div key={op.name} className="neu-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{op.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{op.coverage}</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Download</span><span className="tabular-nums">{op.download} Mbps</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(parseFloat(op.download) / 50) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Upload</span><span className="tabular-nums">{op.upload} Mbps</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${(parseFloat(op.upload) / 20) * 100}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>Latency</span><span className="tabular-nums">{op.latency}ms</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Map placeholder */}
      <motion.div variants={fadeUp} className="neu-card p-6">
        <h2 className="font-semibold text-foreground mb-4">Coverage Map</h2>
        <div className="h-64 rounded-xl bg-muted flex items-center justify-center">
          <div className="text-center">
            <Wifi className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Interactive coverage map</p>
            <p className="text-xs text-muted-foreground mt-1">Connect to mapping service for live data</p>
          </div>
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div variants={fadeUp} className="glass-panel p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">AI Insight</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Based on recent measurements, <strong className="text-foreground">Mascom</strong> offers the best network performance in Gaborone with 42.1 Mbps average download speeds and 91% coverage. Consider this provider for data-intensive applications.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
