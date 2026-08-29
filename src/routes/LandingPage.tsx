import { useEffect, useState } from "react";
import Hero3D from "@/components/Hero3D";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Brain, Cpu, Globe, Zap, ArrowRight,
  Check, Star, Sparkles, Menu, X, Mail, Phone, MapPin, ExternalLink,
  Loader2, Send,
} from "lucide-react";
import { supabase, type Project, type Service } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const DEFAULT_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Conception & Développement Web",
    description: "Sites web modernes, rapides et responsive. Du landing page à l'e-commerce complet.",
    icon: "WEB",
    features: ["Sites vitrines", "E-commerce", "Applications web", "Optimisation SEO"],
    sort_order: 1,
  },
  {
    id: "s2",
    title: "Applications Cross-Plateformes",
    description: "Une seule base de code pour iOS, Android et Web avec Flutter et React Native.",
    icon: "APP",
    features: ["iOS & Android", "PWA", "Temps réel", "Offline-first"],
    sort_order: 2,
  },
  {
    id: "s3",
    title: "Développement IA",
    description: "Agents intelligents, automatisation et intégration de modèles d'IA dans vos workflows.",
    icon: "AI",
    features: ["Chatbots IA", "Automatisation n8n", "Agents intelligents", "Integration API"],
    sort_order: 3,
  },
  {
    id: "s4",
    title: "Entraînement de Modeles de Langage",
    description: "Fine-tuning et entraînement de LLMs pour des cas d'usage specifiques a votre business.",
    icon: "LLM",
    features: ["Fine-tuning LLM", "RAG personnalisé", "Datasets sur mesure", "Déploiement"],
    sort_order: 4,
  },
];

const STATS = [
  { value: "20+", label: "Projets livrés" },
  { value: "15+", label: "Clients satisfaits" },
  { value: "3", label: "Pays" },
  { value: "99.9%", label: "Uptime" },
];

export default function LandingPage() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const [{ data: projData }, { data: servData }] = await Promise.all([
        supabase.from("inspire_projects").select("*").order("sort_order"),
        supabase.from("inspire_services").select("*").order("sort_order"),
      ]);
      if (projData?.length) setProjects(projData as Project[]);
      if (servData?.length) setServices(servData as Service[]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/inspire-by-yuustore/logo.png" alt="INSPIRE" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <span className="font-display font-bold text-lg text-heading">INSPIRE</span>
              <span className="text-xs text-muted ml-1">by YuuStore</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm text-default hover:text-accent transition-colors">Services</a>
            <a href="#projects" className="text-sm text-default hover:text-accent transition-colors">Projets</a>
            <a href="#about" className="text-sm text-default hover:text-accent transition-colors">À propos</a>
            <a href="#contact" className="text-sm text-default hover:text-accent transition-colors">Contact</a>
            {isAdmin && (
              <Link to="/admin" className="text-sm text-accent font-semibold">Admin</Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden sm:flex items-center gap-2 px-4 h-9 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-hover transition-colors">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden glass border-t border-white/5 px-4 py-4 space-y-3">
            <a href="#services" onClick={() => setMenuOpen(false)} className="block text-sm text-default hover:text-accent">Services</a>
            <a href="#projects" onClick={() => setMenuOpen(false)} className="block text-sm text-default hover:text-accent">Projets</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block text-sm text-default hover:text-accent">À propos</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-sm text-default hover:text-accent">Contact</a>
            {isAdmin && <Link to="/admin" className="block text-sm text-accent font-semibold">Admin</Link>}
          </div>
        )}
      </nav>

      {/* Hero with 3D */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-surface/60 via-background/30 to-background">
        <Hero3D />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-accent/30 mb-6">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-xs text-accent font-medium tracking-wider uppercase">Solutions numériques premium</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-bold text-heading leading-tight">
              Nous créons.
              <br />
              <span className="gradient-text">Nous développons.</span>
              <br />
              Nous inspirons.
            </h1>

            <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Conception de sites web, applications cross-plateformes, developpement
              d'intelligence artificielle et entraînement de modeles de langage.
            </p>

            <div className="flex items-center justify-center gap-4 mt-10">
              <a href="#services"
                className="px-6 h-12 rounded-lg bg-accent text-background font-semibold flex items-center gap-2 hover:bg-accent-hover transition-colors">
                Nos services <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projects"
                className="px-6 h-12 rounded-lg glass text-heading font-semibold flex items-center gap-2 hover:border-accent transition-colors">
                <ExternalLink className="h-4 w-4" /> Voir nos projets
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 py-12 border-t border-accent/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold gradient-text">{s.value}</p>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading">Nos Services</h2>
            <p className="text-muted mt-3 max-w-xl mx-auto">
              De la conception à la mise en production, nous couvrons tout le cycle de vie de vos produits numériques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-heading mb-1">{service.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-xs text-default">
                          <Check className="h-3.5 w-3.5 text-accent shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-4 sm:px-6 py-20 border-t border-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading">Nos Projets</h2>
          </motion.div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl overflow-hidden hover:border-accent/30 transition-all"
                >
                  {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-heading">{p.title}</h3>
                    <p className="text-sm text-muted mt-2">{p.description}</p>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent mt-3">Voir <ExternalLink className="h-3 w-3" /></a>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted py-12">
              <p>Projets a venir. Une idee ? <a href="#contact" className="text-accent">Contactez-nous</a></p>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 sm:px-6 py-20 border-t border-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading">A Propos</h2>
            <p className="text-muted mt-6 leading-relaxed max-w-2xl mx-auto">
              Nous concevons, développons et deployons des solutions numériques sur mesure :
              sites web, applications mobiles, et intelligence artificielle. Notre approche combine
              creativite, performance et technologies de pointe pour donner vie a vos idees.
            </p>
            <p className="text-muted mt-4 leading-relaxed max-w-2xl mx-auto">
              Bases a Kinshasa, RDC, nous servons des clients en Afrique et au-dela avec
              un standard de qualite international.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-4 text-center">
              <Code2 className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-semibold text-heading">Web</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Smartphone className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-semibold text-heading">Mobile</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Brain className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-semibold text-heading">IA</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Cpu className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-semibold text-heading">LLM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 sm:px-6 py-20 border-t border-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading">Contact</h2>
            <p className="text-muted mt-3">Discutons de votre projet</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-4 text-center">
              <Mail className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-heading">Email</p>
              <p className="text-xs text-muted mt-1">contact@inspire-yuustore.com</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Phone className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-heading">Telephone</p>
              <p className="text-xs text-muted mt-1">+243 977 555 768</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <MapPin className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-heading">Localisation</p>
              <p className="text-xs text-muted mt-1">Kinshasa, RDC</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/inspire-by-yuustore/logo.png" alt="INSPIRE" className="w-9 h-9 rounded-lg object-cover" />
          <span className="font-display font-bold text-heading">INSPIRE by YuuStore</span>
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} INSPIRE by YuuStore Inc. A division of YuuStore Inc.
        </p>
        <p className="text-xs text-muted mt-1">Designed by INSPIRE by YuuStore</p>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { toast.error("Remplissez tous les champs"); return; }
    setSending(true);
    try {
      const { error } = await supabase.from("inspire_messages").insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      if (error) throw error;
      toast.success("Message envoyé ! Nous vous répondrons rapidement.");
      setName(""); setEmail(""); setMessage("");
    } catch (e: any) {
      const msg = encodeURIComponent(`Bonjour, je suis ${name}. ${message}`);
      window.open(`https://wa.me/243977555768?text=${msg}`, "_blank");
      toast.success("Redirection vers WhatsApp...");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4 max-w-lg mx-auto">
      <div>
        <label className="text-xs text-muted mb-1 block">Nom</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-muted mb-1 block">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="votre@email.com"
          className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-muted mb-1 block">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre projet..."
          rows={4}
          className="w-full bg-background border border-surface-light rounded-lg px-4 py-2 text-sm focus:border-accent outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full h-12 rounded-lg bg-accent text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors disabled:opacity-50"
      >
        {sending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Envoi...</>
        ) : (
          <><Send className="h-4 w-4" /> Envoyer</>
        )}
      </button>
    </form>
  );
}
