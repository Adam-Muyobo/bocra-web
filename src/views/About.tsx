import { motion } from "framer-motion";
import { Shield, Target, Eye, Users, Building, Award } from "lucide-react";
import professionalWoman from "@/assets/professional-woman.jpg";
import partnership from "@/assets/partnership.jpg";
import gaboroneSkyline from "@/assets/gaborone-skyline.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const leadership = [
  { name: "Dr. Thari G. Pheko", role: "Chief Executive", initials: "TGP" },
  { name: "Martin Mokgware", role: "Director, Broadband & ICT", initials: "MM" },
  { name: "Tshepo Raditladi", role: "Director, Legal & Compliance", initials: "TR" },
  { name: "Boitumelo Keitumetse", role: "Director, Corporate Services", initials: "BK" },
];

export default function About() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={gaboroneSkyline.src} alt="Gaborone city skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/80 to-[hsl(var(--background))]/50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 relative">
          <motion.div variants={fadeUp} className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
              About BOCRA
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              The Botswana Communications Regulatory Authority (BOCRA) is an independent body established under the Communications Regulatory Authority Act, 2012 to regulate the communications sector in Botswana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Our Mission", desc: "To regulate the communications sector in Botswana in a manner that promotes affordable, accessible, and reliable communications services.", icon: Target },
            { title: "Our Vision", desc: "A connected and digitally empowered Botswana where communications services drive socio-economic development.", icon: Eye },
            { title: "Our Mandate", desc: "To licence and regulate telecommunications, internet, broadcasting, postal services, and the radio frequency spectrum.", icon: Shield },
          ].map((item) => (
            <div key={item.title} className="neu-card p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Image + Key Functions */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Key Functions</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, text: "Licensing of telecommunications, broadcasting, and postal operators" },
                  { icon: Shield, text: "Management of the radio frequency spectrum" },
                  { icon: Building, text: "Administration of the .bw domain name space" },
                  { icon: Users, text: "Consumer protection and complaints resolution" },
                ].map((f, i) => (
                  <div key={i} className="glass-panel p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <img src={professionalWoman.src} alt="BOCRA professional at work in regulatory office" className="rounded-2xl object-cover w-full h-64" />
              <img src={partnership.src} alt="BOCRA officials in partnership meeting" className="rounded-2xl object-cover w-full h-48" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leadership.map((person) => (
              <div key={person.name} className="neu-card p-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary-foreground font-bold text-lg">{person.initials}</span>
                </div>
                <p className="font-semibold text-foreground text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <motion.div variants={fadeUp} className="glass-panel p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium text-foreground">Address</p>
              <p className="text-muted-foreground mt-1">Plot 206/207 Independence Avenue<br />Private Bag 00495<br />Gaborone, Botswana</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Phone & Fax</p>
              <p className="text-muted-foreground mt-1">Tel: +267 395 7755<br />Fax: +267 395 7976</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Email & Web</p>
              <p className="text-muted-foreground mt-1">info@bocra.org.bw<br />www.bocra.org.bw</p>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
