import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const licenseTypes = [
  { id: "telecom", name: "Telecommunications", desc: "Fixed, mobile, and VANS operators" },
  { id: "broadcast", name: "Broadcasting", desc: "Radio and television services" },
  { id: "postal", name: "Postal Services", desc: "Postal and courier operators" },
  { id: "spectrum", name: "Spectrum License", desc: "Radio frequency spectrum usage" },
  { id: "type-approval", name: "Type Approval", desc: "Equipment certification" },
  { id: "internet", name: "Internet Services", desc: "ISP and data services" },
];

const steps = ["License Type", "Requirements", "Application", "Review"];

export default function Licensing() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ lineHeight: 1.1 }}>Licensing</h1>
        <p className="text-muted-foreground mt-1">Apply for a new license or manage existing ones.</p>
      </motion.div>

      {/* Progress */}
      <motion.div variants={fadeUp} className="neu-card p-5">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2 hidden sm:block" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step content */}
      {step === 0 && (
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {licenseTypes.map((lt) => (
            <button
              key={lt.id}
              onClick={() => setSelectedType(lt.id)}
              className={`glass-panel p-5 text-left hover-lift transition-all ${
                selectedType === lt.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <h3 className="font-semibold text-foreground text-sm">{lt.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{lt.desc}</p>
            </button>
          ))}
        </motion.div>
      )}

      {step === 1 && (
        <motion.div variants={fadeUp} className="neu-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Requirements</h3>
          <ul className="space-y-3">
            {["Company registration certificate", "Tax clearance certificate", "Technical network plan", "Financial projections (3 years)", "Proof of address"].map((req) => (
              <li key={req} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div variants={fadeUp} className="neu-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Application Details</h3>
          {["Company Name", "Registration Number", "Contact Person", "Email Address", "Phone Number"].map((field) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field}</label>
              <div className="neu-inset mt-1.5 px-4 py-2.5">
                <input type="text" placeholder={`Enter ${field.toLowerCase()}`} className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {step === 3 && (
        <motion.div variants={fadeUp} className="neu-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Review & Submit</h3>
          <p className="text-sm text-muted-foreground">Please review your application before submitting. You can go back to make changes.</p>
          <div className="glass-panel p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">License Type</span><span className="font-medium text-foreground">Telecommunications</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="font-medium text-accent">Ready to submit</span></div>
          </div>
        </motion.div>
      )}

      {/* Nav buttons */}
      <motion.div variants={fadeUp} className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === 0 && !selectedType}
          className="px-6 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground disabled:opacity-40 hover:shadow-lg transition-all active:scale-[0.97]"
        >
          {step === steps.length - 1 ? "Submit Application" : "Continue"}
        </button>
      </motion.div>
    </motion.div>
  );
}
