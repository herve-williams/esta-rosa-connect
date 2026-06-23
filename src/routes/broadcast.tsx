import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Smartphone, Trash2, Pencil, Plus, ArrowLeft } from "lucide-react";
import { useApp, type Template } from "@/lib/store";
import { initials, personalize, waLink } from "@/lib/helpers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/broadcast")({
  head: () => ({ meta: [{ title: "Broadcast — EstaRosa" }] }),
  component: Broadcast,
});

function Broadcast() {
  const { contacts, selectedIds, clearSelected, templates, addTemplate, updateTemplate, deleteTemplate } = useApp();
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<Template | null>(null);
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);

  const recipients = contacts.filter((c) => selectedIds.includes(c.id));

  function send(business: boolean) {
    if (!recipients.length || !message.trim()) return;
    recipients.forEach((r, i) => {
      setTimeout(() => {
        const link = waLink(r.phone, personalize(message, r.name), business);
        window.open(link, "_blank");
      }, i * 400);
    });
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-6 md:py-10 space-y-8">
        <header>
          <Link to="/contacts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Contacts
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Broadcast WhatsApp</h1>
          <p className="text-sm text-muted-foreground mt-1">Composez un message personnalisé pour vos destinataires.</p>
        </header>

        {/* Recipients */}
        <section className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Destinataires · {recipients.length}
            </h2>
            {recipients.length > 0 && (
              <button onClick={clearSelected} className="text-xs text-destructive hover:underline">Vider</button>
            )}
          </div>
          {recipients.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun destinataire. Allez dans <Link to="/contacts" className="text-primary">Contacts</Link>, activez la sélection, puis envoyez vers le broadcast.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recipients.map((r) => (
                <span key={r.id} className="inline-flex items-center gap-2 bg-surface-2 px-2.5 py-1 rounded-full text-xs">
                  <span className="h-5 w-5 rounded-full gradient-brand flex items-center justify-center text-[9px] text-primary-foreground font-bold">
                    {initials(r.name)}
                  </span>
                  {r.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Composer */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Message</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message… Utilisez {nom} pour personnaliser."
            rows={6}
            className="w-full bg-card border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => send(false)}
              disabled={!recipients.length || !message.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-success text-primary-foreground font-medium disabled:opacity-40"
            >
              <Send className="h-4 w-4" /> Envoyer via WhatsApp
            </button>
            <button
              onClick={() => send(true)}
              disabled={!recipients.length || !message.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal text-primary-foreground font-medium disabled:opacity-40"
            >
              <Smartphone className="h-4 w-4" /> Envoyer via WhatsApp Business
            </button>
          </div>
        </section>

        {/* Templates */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Modèles</h2>
            <button
              onClick={() => { setShowNew(true); setEditing({ id: "", name: "", text: "" }); }}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Nouveau
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {templates.map((t) => (
              <div key={t.id} className="group p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm">{t.name}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditing(t); setShowNew(true); }} className="p-1 text-muted-foreground hover:text-foreground">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => deleteTemplate(t.id)} className="p-1 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mt-2">{t.text}</p>
                <button
                  onClick={() => setMessage(t.text)}
                  className="mt-3 text-xs text-primary hover:underline"
                >
                  Utiliser ce modèle →
                </button>
              </div>
            ))}
          </div>
        </section>

        {showNew && editing && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowNew(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-4 shadow-elevated">
              <h3 className="text-lg font-semibold">{editing.id ? "Modifier le modèle" : "Nouveau modèle"}</h3>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="Nom du modèle"
                className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
              />
              <textarea
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                placeholder="Texte du message... {nom} pour personnaliser"
                rows={5}
                className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm resize-none"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground">Annuler</button>
                <button
                  onClick={() => {
                    if (!editing.name.trim() || !editing.text.trim()) return;
                    if (editing.id) updateTemplate(editing.id, { name: editing.name, text: editing.text });
                    else addTemplate({ name: editing.name, text: editing.text });
                    setShowNew(false); setEditing(null);
                  }}
                  className="px-4 py-2 rounded-lg gradient-brand text-primary-foreground text-sm font-medium"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
