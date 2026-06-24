import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, CheckSquare, Square, Send, Star, X, Plus } from "lucide-react";
import { useApp } from "@/lib/store";
import { initials, priorityColor, statusColor } from "@/lib/helpers";
import { STATUS_LABELS, type Priority } from "@/data/contacts";
import { cn } from "@/lib/utils";

type Filter = "all" | "high" | "client";

export const Route = createFileRoute("/contacts/")({
  validateSearch: (s: Record<string, unknown>) => ({
    sector: typeof s.sector === "string" ? s.sector : undefined,
  }),
  head: () => ({
    meta: [{ title: "Contacts — EstaRosa" }],
  }),
  component: Contacts,
});

interface NewContactForm {
  name: string;
  phone: string;
  zone: string;
  sector: string;
  priority: Priority;
  facebook: string;
  instagram: string;
  email: string;
  site: string;
}

function Contacts() {
  const { contacts, selectedIds, toggleSelected, clearSelected, sectors, addContact } = useApp();
  const { sector } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectMode, setSelectMode] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<NewContactForm>({
    name: "", phone: "", zone: "", sector: sectors[0]?.id ?? "",
    priority: "medium", facebook: "", instagram: "", email: "", site: "",
  });

  const list = useMemo(() => {
    return contacts.filter((c) => {
      if (filter === "high" && c.priority !== "high") return false;
      if (filter === "client" && c.status !== "client") return false;
      if (sector && c.sector !== sector) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.zone.toLowerCase().includes(q) ||
          c.phone.includes(q)
        );
      }
      return true;
    });
  }, [contacts, filter, query, sector]);

  const activeSector = sectors.find((s) => s.id === sector);

  function submitNew() {
    if (!form.name.trim() || !form.phone.trim()) return;
    addContact({
      name: form.name.trim(),
      phone: form.phone.trim(),
      zone: form.zone.trim(),
      rating: 0,
      reviews: 0,
      priority: form.priority,
      sector: form.sector || (sectors[0]?.id ?? ""),
      facebook: form.facebook.trim(),
      instagram: form.instagram.trim(),
      email: form.email.trim(),
      site: form.site.trim(),
      status: "new",
      notes: "",
      lastAction: "",
      subStart: "",
      subEnd: "",
    });
    setShowAdd(false);
    setForm({ name: "", phone: "", zone: "", sector: sectors[0]?.id ?? "", priority: "medium", facebook: "", instagram: "", email: "", site: "" });
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-6 md:py-10">
        <header className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Contacts</h1>
            <p className="text-sm text-muted-foreground mt-1">{list.length} contact{list.length > 1 ? "s" : ""}{activeSector ? ` · ${activeSector.name}` : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdd(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium gradient-brand text-primary-foreground inline-flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Ajouter</span>
            </button>
            <button
              onClick={() => { setSelectMode((v) => !v); if (selectMode) clearSelected(); }}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                selectMode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              {selectMode ? "Annuler" : "Sélection"}
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, zone, téléphone…"
            className="w-full bg-card border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(["all", "high", "client"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors",
                filter === f
                  ? "bg-teal/20 text-teal border-teal/40"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "Tous" : f === "high" ? "Priorité haute" : "Clients"}
            </button>
          ))}
          {activeSector && (
            <button
              onClick={() => navigate({ to: "/contacts" })}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border flex items-center gap-1 hover:text-destructive"
            >
              {activeSector.name} <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* List */}
        <ul className="space-y-2.5">
          {list.map((c) => {
            const selected = selectedIds.includes(c.id);
            const sec = sectors.find((s) => s.id === c.sector);
            return (
              <li key={c.id}>
                <div
                  onClick={() => {
                    if (selectMode) toggleSelected(c.id);
                    else navigate({ to: "/contacts/$id", params: { id: String(c.id) } });
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl bg-card border transition-colors cursor-pointer",
                    selected ? "border-primary/60 ring-1 ring-primary/40" : "border-border hover:border-border/80"
                  )}
                >
                  {selectMode && (
                    <div className="text-primary">
                      {selected ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  )}
                  <div className="relative">
                    <div className="h-11 w-11 rounded-full gradient-brand flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {initials(c.name)}
                    </div>
                    <span className={cn("absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card", priorityColor(c.priority))} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{c.name}</p>
                      {sec && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-teal/15 text-teal text-[10px] border border-teal/30 shrink-0">
                          <span>{sec.icon}</span>{sec.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.zone}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span>{c.rating.toFixed(1)}</span>
                  </div>
                  <span className={cn("hidden md:inline-flex text-[10px] uppercase tracking-wide px-2 py-1 rounded-md border", statusColor(c.status))}>
                    {STATUS_LABELS[c.status]}
                  </span>
                </div>
              </li>
            );
          })}
          {list.length === 0 && (
            <li className="p-10 text-center text-sm text-muted-foreground">Aucun contact ne correspond.</li>
          )}
        </ul>
      </div>

      {/* Floating broadcast bar */}
      {selectMode && selectedIds.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 inset-x-0 px-5 z-40 pointer-events-none">
          <div className="max-w-md mx-auto rounded-2xl bg-card border border-border shadow-elevated p-3 flex items-center gap-3 pointer-events-auto">
            <span className="text-sm font-medium flex-1">{selectedIds.length} sélectionné{selectedIds.length > 1 ? "s" : ""}</span>
            <Link
              to="/broadcast"
              className="px-4 py-2 rounded-lg gradient-brand text-primary-foreground text-sm font-medium flex items-center gap-2"
            >
              <Send className="h-4 w-4" /> Broadcast
            </Link>
          </div>
        </div>
      )}

      {/* Add contact modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-3 shadow-elevated max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold">Nouveau contact</h3>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nom *"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Téléphone *"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              value={form.zone}
              onChange={(e) => setForm({ ...form, zone: e.target.value })}
              placeholder="Zone"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                className="bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
              >
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                ))}
              </select>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
              >
                <option value="high">Priorité haute</option>
                <option value="medium">Priorité moyenne</option>
                <option value="low">Priorité basse</option>
              </select>
            </div>
            <input
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              placeholder="Facebook (URL)"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="Instagram (URL)"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              value={form.site}
              onChange={(e) => setForm({ ...form, site: e.target.value })}
              placeholder="Site web"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground">Annuler</button>
              <button
                onClick={submitNew}
                disabled={!form.name.trim() || !form.phone.trim()}
                className="px-4 py-2 rounded-lg gradient-brand text-primary-foreground text-sm font-medium disabled:opacity-40"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
