import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Phone, MessageCircle, Mail, Globe, Facebook, Instagram, Star, Smartphone } from "lucide-react";
import { useApp } from "@/lib/store";
import { initials, priorityColor, statusColor, waLink } from "@/lib/helpers";
import { STATUS_LABELS, type Status } from "@/data/contacts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contacts/$id")({
  head: () => ({ meta: [{ title: "Contact — EstaRosa" }] }),
  component: ContactDetail,
});

const STATUSES: Status[] = ["new", "contacted", "interested", "meeting", "client", "lost"];

function ContactDetail() {
  const { id } = Route.useParams();
  const { contacts, updateContact } = useApp();
  const navigate = useNavigate();
  const contact = contacts.find((c) => c.id === Number(id));

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 text-center">
        <div>
          <p className="text-muted-foreground">Contact introuvable.</p>
          <Link to="/contacts" className="mt-3 inline-block text-primary">← Retour</Link>
        </div>
      </div>
    );
  }

  const c = contact;
  const presentationMsg = `Bonjour, je suis Hervé d'EstaRosa. Concernant ${c.name}…`;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-6 md:py-10 space-y-8">
        <button
          onClick={() => navigate({ to: "/contacts" })}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Contacts
        </button>

        {/* Hero */}
        <header className="rounded-2xl bg-card border border-border p-6 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-full gradient-brand flex items-center justify-center text-lg font-bold text-primary-foreground">
              {initials(c.name)}
            </div>
            <span className={cn("absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-card", priorityColor(c.priority))} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">{c.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{c.zone}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs bg-warning/15 text-warning border border-warning/30 px-2 py-1 rounded-md">
                <Star className="h-3 w-3 fill-warning" />
                {c.rating.toFixed(1)} · {c.reviews} avis
              </span>
              <span className={cn("inline-flex text-[10px] uppercase tracking-wide px-2 py-1 rounded-md border", statusColor(c.status))}>
                {STATUS_LABELS[c.status]}
              </span>
            </div>
          </div>
        </header>

        {/* Actions */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <ActionBtn href={`tel:${c.phone}`} icon={Phone} label="Appeler" />
          <ActionBtn href={waLink(c.phone, presentationMsg, false)} icon={MessageCircle} label="WhatsApp" />
          <ActionBtn href={waLink(c.phone, presentationMsg, true)} icon={Smartphone} label="WA Business" />
          <ActionBtn href={`sms:${c.phone}`} icon={MessageCircle} label="SMS" />
          {c.email && <ActionBtn href={`mailto:${c.email}`} icon={Mail} label="Email" />}
          {c.facebook && <ActionBtn href={c.facebook} icon={Facebook} label="Facebook" />}
          {c.instagram && <ActionBtn href={c.instagram} icon={Instagram} label="Instagram" />}
          {c.site && <ActionBtn href={c.site.startsWith("http") ? c.site : `https://${c.site}`} icon={Globe} label="Site web" />}
        </section>

        {/* Status manager */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Statut</h2>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => updateContact(c.id, { status: s })}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all",
                  c.status === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </section>

        {/* Subscription */}
        {(c.status === "client" || c.subStart || c.subEnd) && (
          <section className="rounded-2xl bg-card border border-border p-5 space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Abonnement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground">Début</span>
                <input
                  type="date"
                  value={c.subStart}
                  onChange={(e) => updateContact(c.id, { subStart: e.target.value })}
                  className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Fin</span>
                <input
                  type="date"
                  value={c.subEnd}
                  onChange={(e) => updateContact(c.id, { subEnd: e.target.value })}
                  className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-sm"
                />
              </label>
            </div>
          </section>
        )}

        {/* Notes */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Notes</h2>
          <textarea
            value={c.notes}
            onChange={(e) => updateContact(c.id, { notes: e.target.value })}
            placeholder="Ajouter une note..."
            rows={5}
            className="w-full bg-card border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
          />
        </section>
      </div>
    </div>
  );
}

function ActionBtn({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:text-primary transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </a>
  );
}
