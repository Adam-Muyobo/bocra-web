import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Maximize2, Minimize2, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { text: "How do I apply for a license?", icon: "📋" },
  { text: "Ke batla go itse ka ditirelo tsa BOCRA", icon: "🇧🇼" },
  { text: "Check network quality in my area", icon: "📶" },
  { text: "Register a .bw domain", icon: "🌐" },
  { text: "File a complaint", icon: "⚠️" },
  { text: "Browse open tenders", icon: "📑" },
];

export function AIChatBubble() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Dumelang! 👋 I'm **BOCRA AI** — your intelligent regulatory assistant. I can help you navigate licensing, spectrum management, domain registration, complaints, and all BOCRA services.\n\nI understand both **English** and **Setswana**. Ask me anything!\n\n*Ke ka go thusa ka eng gompieno?*",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const getContextHint = () => {
    const path = location.pathname;
    if (path.includes("licensing")) return "licensing";
    if (path.includes("spectrum")) return "spectrum management";
    if (path.includes("domains")) return "domain registration";
    if (path.includes("qos")) return "quality of service";
    if (path.includes("complaints")) return "complaints";
    if (path.includes("tenders")) return "tenders";
    return "general";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const context = getContextHint();

    // Simulated LLM-style response (will be replaced with real API)
    setTimeout(() => {
      const responses: Record<string, string> = {
        license: "To apply for a license, you'll go through our guided 4-step process:\n\n1. **Select license type** — telecom, broadcasting, or postal\n2. **Review requirements** — see exactly what's needed\n3. **Complete application** — fill in details with smart auto-fill\n4. **Review & submit** — confirm and track your application\n\nWould you like me to guide you through it step by step?",
        domain: "You can register a **.bw domain** through our Register.BW service. Here's how:\n\n1. Search for your desired domain name\n2. Check availability instantly\n3. Complete registration with your details\n4. Domain goes live within 24 hours\n\nGo to **Domains** in the sidebar to start searching.",
        status: "You can check your application status from the **Dashboard**. Your active applications, pending reviews, and complaint statuses are all displayed there in real-time.",
        complaint: "To file a complaint:\n\n1. Go to the **Complaints** section\n2. Select a category (telecom, broadcasting, postal, internet)\n3. Describe your issue\n4. Submit and receive a tracking number\n\nWe typically resolve complaints within **48 hours**.",
        tender: "You can browse all **open tenders** in the Tenders section. Filter by category, deadline, or search by keyword. Each tender shows full details, requirements, and attached documents.",
        setswana: "Ee, ke kgona go go thusa ka Setswana! BOCRA e neela ditirelo tse di farologaneng tse di akaretsang:\n\n• **Ditshwanelo tsa mafaratlhatlha** — kopa laesense\n• **Mananeo a diphethephethe** — laola dikgaisanyo\n• **Go kwala leina la .bw** — fumanela webosaete ya gago leina\n\nKe eng se o batlang thuso ka sona?",
      };

      const inputLower = input.toLowerCase();
      let key: string | undefined;
      if (inputLower.includes("license") || inputLower.includes("laesense")) key = "license";
      else if (inputLower.includes("domain") || inputLower.includes("leina")) key = "domain";
      else if (inputLower.includes("status")) key = "status";
      else if (inputLower.includes("complaint") || inputLower.includes("ngongorego")) key = "complaint";
      else if (inputLower.includes("tender")) key = "tender";
      else if (/setswana|ke batla|ke kopa|thusa|dumelang|go itse/i.test(inputLower)) key = "setswana";

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: key
          ? responses[key]
          : `I understand you're asking about ${context !== "general" ? `**${context}**` : "BOCRA services"}. Let me help you with that.\n\nCould you provide more details about what you need? I can:\n\n• Guide you through applications\n• Explain requirements and processes\n• Help you find the right service\n• Answer in Setswana if you prefer\n\n*Ke mo go go thusa!*`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Dumelang! 👋 I'm **BOCRA AI** — your intelligent regulatory assistant. How can I help you today?\n\n*Ke ka go thusa ka eng gompieno?*",
        timestamp: new Date(),
      },
    ]);
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
            return <em key={j}>{part.slice(1, -1)}</em>;
          }
          return part;
        })}
        {i < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const panelSize = expanded
    ? "w-[520px] max-w-[calc(100vw-2rem)] h-[680px] max-h-[calc(100vh-4rem)]"
    : "w-[400px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-6rem)]";

  return (
    <>
      {/* Floating BOCRA AI button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-8 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold block leading-none">BOCRA AI</span>
              <span className="text-[10px] opacity-80 leading-none">Ask me anything</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className={`fixed bottom-6 right-6 z-50 ${panelSize} glass-panel flex flex-col shadow-2xl overflow-hidden transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    BOCRA AI
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Intelligent regulatory assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
                  title="New conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
                  title={expanded ? "Minimize" : "Expand"}
                >
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mb-1">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "neu-card-sm text-card-foreground rounded-bl-md"
                      }`}
                    >
                      {renderContent(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="neu-card-sm rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 1 && (
              <div className="px-5 pb-3">
                <p className="text-[11px] text-muted-foreground font-medium mb-2 uppercase tracking-wider">Quick actions</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => {
                        setInput(prompt.text);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="text-xs px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left flex items-center gap-2"
                    >
                      <span>{prompt.icon}</span>
                      <span className="truncate">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/50">
              <div className="neu-inset flex items-center gap-2 px-4 py-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask BOCRA AI anything..."
                  className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all hover:shadow-md disabled:hover:shadow-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-60">
                BOCRA AI • English & Setswana • Powered by AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
