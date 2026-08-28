import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Trash2, Pencil, X, Upload, Package, MessageCircle, Star, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, type Project, type Service } from "@/lib/supabase";
import { toast } from "sonner";

type Tab = "projects" | "services" | "messages";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    tags: "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [p, s, m] = await Promise.all([
      supabase.from("inspire_projects").select("*").order("sort_order"),
      supabase.from("inspire_services").select("*").order("sort_order"),
      supabase.from("inspire_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setProjects(p.data as Project[] || []);
    setServices(s.data as Service[] || []);
    setMessages(m.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Project CRUD
  const resetForm = () => {
    setForm({ title: "", description: "", category: "", url: "", tags: "" });
    setImageUrl("");
    setEditingItem(null);
    setShowForm(false);
  };

  const startEdit = (p: Project) => {
    setEditingItem(p);
    setForm({
      title: p.title,
      description: p.description || "",
      category: p.category || "",
      url: p.url || "",
      tags: p.tags?.join(", ") || "",
    });
    setImageUrl(p.image_url || "");
    setShowForm(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `inspire/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
      toast.success("Image uploadée");
    } catch (e: any) {
      toast.error(e?.message || "Erreur");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Titre requis"); return; }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim() || "Projet",
      image_url: imageUrl || null,
      url: form.url.trim() || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingItem) {
        const { error } = await supabase.from("inspire_projects").update(payload).eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Projet mis à jour");
      } else {
        const { error } = await supabase.from("inspire_projects").insert({
          ...payload,
          sort_order: projects.length,
        });
        if (error) throw error;
        toast.success("Projet ajouté");
      }
      resetForm();
      fetchAll();
    } catch (e: any) {
      toast.error(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm("Supprimer ?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Supprimé");
    fetchAll();
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/inspire-by-yuustore/logo.png" alt="INSPIRE" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-display font-bold text-heading">INSPIRE Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-sm text-muted hover:text-accent">Voir le site</button>
            <button onClick={() => { signOut(); navigate("/"); }} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:border-accent">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h1 className="font-display text-2xl font-bold text-heading">Tableau de bord</h1>
          {tab === "projects" && (
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="px-4 h-11 rounded-lg bg-accent text-background font-semibold flex items-center gap-2 hover:bg-accent-hover"
            >
              <Plus className="h-4 w-4" /> Nouveau projet
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: "projects" as Tab, label: "Projets", icon: <Package className="h-4 w-4" />, count: projects.length },
            { id: "services" as Tab, label: "Services", icon: <Star className="h-4 w-4" />, count: services.length },
            { id: "messages" as Tab, label: "Messages", icon: <MessageCircle className="h-4 w-4" />, count: messages.length },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shrink-0 transition-colors ${
                tab === t.id ? "bg-accent text-background" : "bg-surface text-muted"
              }`}
            >
              {t.icon} {t.label}
              <span className="ml-1 text-xs opacity-60">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Projects tab */}
        {tab === "projects" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="glass rounded-xl overflow-hidden">
                <div className="aspect-video bg-surface-light overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl"></div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-heading">{p.title}</p>
                  <p className="text-xs text-muted line-clamp-1">{p.category}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => startEdit(p)} className="flex-1 h-8 rounded-lg bg-surface-light flex items-center justify-center gap-1 text-xs hover:bg-accent/20">
                      <Pencil className="h-3 w-3" /> Modifier
                    </button>
                    <button onClick={() => handleDelete(p.id, "inspire_projects")} className="h-8 px-2 rounded-lg bg-surface-light hover:bg-red-500/20">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-muted text-sm col-span-full text-center py-12">Aucun projet. Ajoutez-en un !</p>
            )}
          </div>
        )}

        {/* Services tab */}
        {tab === "services" && (
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.id} className="glass rounded-xl p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <p className="font-semibold text-heading">{s.title}</p>
                  </div>
                  <p className="text-xs text-muted mt-1">{s.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.features?.map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-surface border border-surface-light text-muted">{f}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => handleDelete(s.id, "inspire_services")} className="text-red-500 p-2 hover:bg-red-500/10 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {services.length === 0 && <p className="text-muted text-sm">Aucun service.</p>}
          </div>
        )}

        {/* Messages tab */}
        {tab === "messages" && (
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="glass rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-heading">{m.name}</p>
                    <p className="text-xs text-accent">{m.email}</p>
                    <p className="text-sm text-muted mt-2">{m.message}</p>
                  </div>
                  <span className="text-[10px] text-muted">{new Date(m.created_at).toLocaleString("fr-FR")}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <a href={`mailto:${m.email}`} className="text-xs text-accent hover:underline">Répondre</a>
                  <button onClick={() => handleDelete(m.id, "inspire_messages")} className="text-xs text-red-500 hover:underline">Supprimer</button>
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="text-muted text-sm">Aucun message.</p>}
          </div>
        )}
      </main>

      {/* Project form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-heading">
                {editingItem ? "Modifier" : "Nouveau projet"}
              </h2>
              <button onClick={resetForm} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-muted mb-1 block">Titre *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: App de livraison"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Décrivez le projet..." rows={3}
                  className="w-full bg-background border border-surface-light rounded-lg px-4 py-2 text-sm focus:border-accent outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted mb-1 block">Catégorie</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Web, IA, Mobile..."
                    className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">URL (optionnel)</label>
                  <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Tags (séparés par virgules)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Flutter, IA"
                  className="w-full bg-background border border-surface-light rounded-lg px-4 h-11 text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Image</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg bg-surface-light border border-surface-light overflow-hidden flex items-center justify-center">
                    {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover" /> : <Package className="h-6 w-6 text-muted" />}
                  </div>
                  <label className="px-4 h-10 rounded-lg bg-surface-light border border-surface-light flex items-center gap-2 text-sm cursor-pointer hover:border-accent">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? "Upload..." : "Changer"}
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={saving}
                className="w-full h-12 rounded-lg bg-accent text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-hover disabled:opacity-50">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingItem ? "Mettre à jour" : "Publier"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
