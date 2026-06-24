import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users, MessageCircle, Trophy, Search, Send, Plus } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Status } from "@/data/contacts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EstaRosa" },
      { name: "description", content: "Vue d'ensemble de votre prospection EstaRosa." },
    ],
  }),
  component: Dashboard,
});

const PIPELINE: { key: Status; label: string }[] = [
  { key: "new", label: "Nouveau" },
  { key: "contacted", label: "Contacté" },
  { key: "interested", label: "Intéressé" },
  { key: "meeting", label: "RDV fixé" },
  { key: "client", label: "Client" },
];

function Dashboard() {
  const { contacts, sectors, addSector } = useApp();
  const [showSectorForm, setShowSectorForm] = useState(false);
  const [newSector, setNewSector] = useState({ name: "", icon: "✨" });

  const stats = useMemo(() => {
    const total = contacts.length;
    const contacted = contacts.filter((c) => c.status !== "new").length;
    const clients = contacts.filter((c) => c.status === "client").length;
    return { total, contacted, clients };
  }, [contacts]);

  const pipelineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PIPELINE.forEach((p) => (counts[p.key] = 0));
    contacts.forEach((c) => {
      if (counts[c.status] !== undefined) counts[c.status]++;
    });
    return counts;
  }, [contacts]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12 space-y-10">
        {/* Greeting */}
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bonjour <span className="text-gradient-brand">Hervé</span>
          </h1>
          <p className="text-muted-foreground">Voici votre vue d'ensemble du jour.</p>
        </header>

        {/* KPI cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard icon={Users} label="Prospects" value={stats.total} accent="primary" />
          <KpiCard icon={MessageCircle} label="Contactés" value={stats.contacted} accent="teal" />
          <KpiCard icon={Trophy} label="Clients" value={stats.clients} accent="success" />
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/contacts"
            className="flex items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
          >
            <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Rechercher un prospect</p>
              <p className="text-xs text-muted-foreground">Parcourir vos {stats.total} contacts</p>
            </div>
          </Link>
          <Link
            to="/broadcast"
            className="flex items-center gap-3 p-5 rounded-2xl gradient-brand text-primary-foreground hover:opacity-95 transition-opacity"
          >
            <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Nouveau broadcast</p>
              <p className="text-xs opacity-90">Envoi WhatsApp ciblé</p>
            </div>
          </Link>
        </section>

        {/* Pipeline */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Pipeline de conversion</h2>
            <span className="text-xs text-muted-foreground">5 étapes</span>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-stretch gap-2 overflow-x-auto">
              {PIPELINE.map((p, i) => (
                <div key={p.key} className="flex items-center gap-2 min-w-fit">
                  <div className="rounded-xl bg-surface-2 px-4 py-3 min-w-[110px] text-center">
                    <p className="text-2xl font-bold text-primary">{pipelineCounts[p.key]}</p>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{p.label}</p>
                  </div>
                  {i < PIPELINE.length - 1 && <span className="text-muted-foreground/40">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Secteurs</h2>
            <span className="text-xs text-muted-foreground">Filtrez vos contacts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <Link
                key={s.id}
                to="/contacts"
                search={{ sector: s.id } as never}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm hover:border-teal/60 hover:text-teal transition-colors"
              >
                <span className="mr-1.5">{s.icon}</span>
                {s.name}
              </Link>
            ))}
            <button
              onClick={() => setShowSectorForm((v) => !v)}
              className="px-3 py-2 rounded-full bg-primary/15 text-primary border border-primary/30 text-sm hover:bg-primary/25 transition-colors flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {showSectorForm && (
            <div className="flex flex-wrap gap-2 items-center p-4 rounded-xl bg-card border border-border">
              <input
                placeholder="Nom du secteur"
                value={newSector.name}
                onChange={(e) => setNewSector((s) => ({ ...s, name: e.target.value }))}
                className="flex-1 min-w-0 bg-input border border-border rounded-lg px-3 py-2 text-sm"
              />
              <input
                placeholder="Icône"
                value={newSector.icon}
                onChange={(e) => setNewSector((s) => ({ ...s, icon: e.target.value }))}
                className="w-20 bg-input border border-border rounded-lg px-3 py-2 text-sm text-center"
              />
              <button
                onClick={() => {
                  if (!newSector.name.trim()) return;
                  addSector(newSector);
                  setNewSector({ name: "", icon: "✨" });
                  setShowSectorForm(false);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Ajouter
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: "primary" | "teal" | "success";
}) {
  const accentClass = {
    primary: "text-primary bg-primary/15",
    teal: "text-teal bg-teal/15",
    success: "text-success bg-success/15",
  }[accent];
  return (
    <div className="rounded-2xl bg-card border border-border p-5 hover:border-border/80 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${accentClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
